<template>
  <div class="chat-input">
    <div class="input-tools">
      <div class="tool" title="插入图片" v-html="svg.picture"></div>
      <div class="tool" title="插入表情" v-html="svg.emote"></div>
      <div class="input-word-number">{{ wordNumber }}/300</div>
      <div class="send-message-box" @click="sendWhisperMessage">发送</div>
    </div>
    <div class="input-textarea"
         contenteditable="true"
         @compositionstart="compositionstart"
         @compositionend="compositionend"
         @input="messageEntering"
         @keydown.delete="backSpaceWhisperMessage"
         @keyup.delete="backSpaceWhisperMessage"
         @keydown.enter="sendWhisperMessage"
         @paste="paste"
         ref="inputTextarea"
    ></div>
  </div>
</template>

<script>
import {svg} from "@/assets/js/constants/svgs";
import {mapState} from "vuex";
import {apis} from "@/assets/js/constants/request-path";
import {ResponseHandler} from "@/assets/js/utils";

export default {
  name: "ChatInput",
  data() {
    return {
      svg,
      websocket: null,
      wordNumber: 0,
      // 输入法合成中
      compositing: false,
    }
  },
  computed: {
    ...mapState(["latestUserIndex"]),
    chatUid() {
      return parseInt(this.$route.params.uid);
    }
  },
  created() {
    this.initWebsocket();
  },
  methods: {
    initWebsocket() {
      this.websocket = new WebSocket(apis.whisperHost);
      this.websocket.onopen = this.websocketOpenCallback;
      this.websocket.onmessage = this.websocketMessageCallback;
      this.websocket.onerror = this.websocketErrorCallback;
      this.websocket.onclose = this.websocketCloseCallback;
    },
    // websocket 连接建立
    websocketOpenCallback(e) {
      console.log(e);
    },
    // websocket 接收到服务器消息
    websocketMessageCallback(e) {
      let res = JSON.parse(e.data);
      console.log(res);
      new ResponseHandler(res)
          .succeed((res) => {
            if(res.type === "send") {
              this.sendMessageResponse(res.messageId);
            }
            else if(res.type === "receive") {
              this.receiveMessageResponse(res.whisperMessage);
            }
          });
    },
    // websocket 连接出错
    websocketErrorCallback(e) {
      console.log(e);
    },
    // websocket 连接关闭
    websocketCloseCallback(e) {
      console.log(e);
    },
    // 发送消息响应
    sendMessageResponse(messageId) {
      let messageContent = this.$refs.inputTextarea.innerText;
      let message = {
        messageType: 1,
        messageContent,
        receiveUid: this.chatUid,
        sendTime: new Date(),
      };
      message.messageId = messageId;
      this.addNewWhisperMessage(message);
      this.reset();
    },
    // 接受消息响应
    receiveMessageResponse(message) {
      this.addNewWhisperMessage(message);
    },
    addNewWhisperMessage(message) {
      this.$bus.$emit("unshiftWhisperMessage", message);
    },
    // 发送消息
    sendWhisperMessage(e) {
      e.preventDefault();
      let messageContent = this.$refs.inputTextarea.innerText;
      if (!this.checkMessageContent(messageContent)) return;
      let message = {
        messageContent,
        receiveUid: this.chatUid,
      };
      this.websocket.send(JSON.stringify(message));
      /*this.requestSendWhisperMessage(message)
          .then((res) => {
            message.messageId = res;
            this.$bus.$emit("unshiftWhisperMessage", message);
            this.reset();
          })
          .catch((error) => {
            console.log(error);
          });*/
    },
    requestSendWhisperMessage({messageContent, receiveUid}) {
      return new Promise((resolve, reject) => {
        this.sendRequest({
          path: apis.message.whisperAdd,
          method: "post",
          params: {
            uid: receiveUid,
          },
          data: {
            messageContent
          }
        }).then((response) => {
          let res = response.data;
          console.log(res);
          new ResponseHandler(res)
              .succeed(resolve.bind(null, res.data));
        }).catch((error) => {
          console.log(error);
          reject();
        });
      });
    },
    checkMessageContent(messageContent) {
      return 1 <= messageContent.length && messageContent.length <= 300;
    },
    // 输入中, 输入法输入也可以
    messageEntering(e) {
      // 删除时 e.data 为 null
      if (!e.data || (this.wordNumber + e.data.length > 300) || this.compositing) {
        return;
      }
      this.wordNumber += e.data.length;
    },
    // 输入法合成开始
    compositionstart() {
      this.compositing = true;
    },
    // 输入法合成结束
    compositionend(e) {
      this.wordNumber += e.data.length;
      this.compositing = false;
    },
    // 退格删除
    backSpaceWhisperMessage() {
      this.wordNumber = this.$refs.inputTextarea.innerText.length;
    },
    // 读取剪贴板, 去除格式化, 取出文本
    paste(e) {
      e.preventDefault();
      let innerText = this.$refs.inputTextarea.innerText;
      // 读取剪贴板
      navigator.clipboard
          .readText()
          .then((paste) => {
            innerText = innerText + paste;
            // 最大长度为 300
            if (innerText.length > 300) {
              innerText = innerText.substring(0, 300);
            }
            this.wordNumber = innerText.length;
            this.$refs.inputTextarea.innerText = innerText;

            this.moveCursorToEnd();
          })
          .catch(() => {
            this.huadiaoMiddleTip("读取剪贴板失败!请检查是否给予权限!");
          });
    },
    // 移动光标到末尾
    moveCursorToEnd() {
      // 移动光标到文本末尾
      let obj = this.$refs.inputTextarea;
      //ie11 10 9 ff safari
      if (window.getSelection) {
        //解决ff不获取焦点无法定位问题
        obj.focus();
        // 创建range
        let range = window.getSelection();
        // range 选择obj下所有子内容
        range.selectAllChildren(obj);
        // 光标移至最后
        range.collapseToEnd();
      }
      //ie10 9 8 7 6 5
      else if (document.selection) {
        // 创建选择对象
        let range = document.selection.createRange();
        // range定位到obj
        range.moveToElementText(obj);
        // 光标移至最后
        range.collapse(false);
        range.select();
      }
    },
    reset() {
      this.wordNumber = 0;
      this.$refs.inputTextarea.innerText = "";
    },
  },
  beforeDestroy() {
  }
}
</script>

<style scoped>

.chat-input {
  height: 200px;
  border-top: 1px solid #aaaaaa;
}

.input-tools {
  display: flex;
  align-items: center;
  padding: 6px;
  border-bottom: 1px solid #aaaaaa;
}

.tool {
  width: 34px;
  height: 34px;
  text-align: center;
  line-height: 34px;
  margin-right: 6px;
  border-radius: 4px;
  transition: var(--transition-300ms);
}

.tool:hover {
  background-color: #ffffff4f;
}

.tool:hover /deep/ svg {
  fill: #d15656;
}

.tool /deep/ svg {
  width: 22px;
  height: 22px;
  fill: #aaa;
  vertical-align: -6px;
  transition: var(--transition-300ms);
}

.input-word-number {
  font-size: 14px;
  color: #5e5e5e;
  margin-left: auto;
  margin-right: 20px;
}

.send-message-box {
  width: 60px;
  text-align: center;
  line-height: 30px;
  font-size: 14px;
  border-radius: 6px;
  color: #fff;
  background-color: #da4444;
  cursor: pointer;
}

.send-message-box:hover {
  background-color: #cb4040;
}

.input-textarea {
  width: 100%;
  height: calc(100% - 47px);
  outline: none;
  padding: 10px;
  font-size: 14px;
  overflow-x: hidden;
  overflow-y: auto;
  word-break: break-word;
  word-wrap: break-word;
}

.input-textarea::-webkit-scrollbar {
  width: 10px;
}

.input-textarea::-webkit-scrollbar-track {
  border-radius: 5px;
  background-color: #eee;
}

.input-textarea::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: #a5a5a5;
}
</style>