<template>
  <div class="whisper-chat-board">
    <div class="chat-header">{{chatWindowNickname}}</div>
    <chat-message-window/>
    <div class="chat-input">
      <div class="input-tools">
        <div class="tool"
             v-for="(item, index) in config.chatInput"
             :key="index"
             :title="item.title"
             v-html="svg[item.svg]"
        ></div>
        <div class="input-word-number">{{ wordNumber }}/300</div>
        <div class="send-message-box" @click="sendWhisperMessage">发送</div>
      </div>
      <div class="input-textarea"
           contenteditable="true"
           @input="entering"
           @keydown.delete="deleteTextContent"
           @paste="paste"
           ref="inputTextarea"
      ></div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import ChatMessageWindow from "@/pages/message/components/ChatMessageWindow";

export default {
  name: "WhisperChatBoard",
  components: {ChatMessageWindow},
  data() {
    return {
      svg: {
        emote: `<svg t="1680599737773" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5360" width="200" height="200"><path d="M949.88112387 808.11842067L949.9556383 808.11842067 949.9556383 807.6700889Z" p-id="5361"></path><path d="M870.35263082 153.64799056c-197.58863216-197.62340628-519.11414397-197.62340628-716.70277735 0-197.62340628 197.58739061-197.62340628 519.11414397 0 716.70153458 197.58863216 197.62464783 519.11538673 197.62464783 716.70277735 0C1067.97603589 672.76089298 1067.97603589 351.23538117 870.35263082 153.64799056M818.91873163 818.95164283c-169.23447691 169.23323536-444.63776048 169.19721969-613.85236663 0-169.25186458-169.26925104-169.25186458-444.61913125 0-613.88714075 169.21460614-169.21584891 444.61913125-169.25310612 613.85236663 0C988.15072544 374.27910823 988.15072544 649.71840748 818.91873163 818.95164283" p-id="5362"></path><path d="M353.89369973 458.62623156c30.07793289 0 54.5573134-24.47813898 54.55731341-54.57345832 0-30.13257657-24.47938051-54.64673121-54.55731341-54.6467312-30.14996423 0-54.62934475 24.51415465-54.62934474 54.6467312C299.26435499 434.14809137 323.7437355 458.62623156 353.89369973 458.62623156" p-id="5363"></path><path d="M668.17015566 458.71564937c30.1127058 0 54.62561891-24.53154111 54.6256189-54.6281032 0-30.13133502-24.5129131-54.60947399-54.6256189-54.609474-30.08041597 0-54.5573134 24.47813898-54.55731341 54.609474C613.61284103 434.18410704 638.08973846 458.71564937 668.17015566 458.71564937" p-id="5364"></path><path d="M670.0702846 641.9291177l-2.97811119 0.96869368c-48.92150503 22.14706471-101.39736959 33.41619958-155.8441529 33.41619959-56.24383382 0-109.43752511-11.37842222-158.14293731-33.73785513l-2.94333827-0.90038818c-1.8305819-0.50173391-4.30696038-1.21831788-7.39436013-1.21831788-17.9096526 0-32.44626435 14.53661177-32.44626435 32.374233 0 8.46985808 3.98406209 16.97697458 10.55254967 23.36662537l-0.39492842 1.97216028 8.29102246 3.73319513c58.14644705 26.31120517 121.38847103 40.16600588 182.87194324 40.16600587 62.6334858 0 124.008911-13.49588673 183.23209877-40.48890417 10.40724545-5.70783971 16.9037017-16.65283474 16.90370169-28.53423241C711.77750665 652.12399616 692.86438745 634.92968721 670.0702846 641.9291177" p-id="5365"></path></svg>`,
        picture: `<svg t="1680599786873" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5508" width="200" height="200"><path d="M1029.81530905 562.87535408V822.68918518c0 78.6432-63.75600947 142.39920947-142.39921069 142.39920948H136.58390164c-78.6432 0-142.39920947-63.75600947-142.39921069-142.39920948V201.31081482c0-78.6432 63.75600947-142.39920947 142.39921069-142.39920948h750.83219672c78.6432 0 142.39920947 63.75600947 142.39921069 142.39920948v361.56453926z m-77.6722963-90.56589749V201.31081482a64.72691317 64.72691317 0 0 0-64.72691439-64.72691318H136.58390164a64.72691317 64.72691317 0 0 0-64.72691439 64.72691318v418.07113481A352.06262875 352.06262875 0 0 1 123.63851852 615.56306132a348.16606815 348.16606815 0 0 1 222.45345659 79.91184832C408.87708089 531.88410785 566.50006164 421.38232059 745.01688889 421.38232059c79.74355794 0 154.12772622 20.36308741 207.12612386 50.927136z m0 99.80890074c-6.47269095-10.09739852-25.64480356-26.27912651-52.97250607-39.94945065C857.60288237 511.37862163 804.53975822 499.05461689 745.01688889 499.05461689c-147.78448949 0-278.07976653 92.55948683-328.204288 229.00382105-3.31401838 9.03587673-8.98409601 24.66095408-16.98434253 46.82344888-9.32067555 25.85192889-41.81358577 34.11108386-62.34496235 15.84514843-19.94883436-17.76106549-34.65478994-30.42164978-43.85895704-37.80051793A270.50671764 270.50671764 0 0 0 123.63851852 693.23535762c-17.55393897 0-34.86191525 1.65700859-51.78153127 4.91924624V822.68918518a64.72691317 64.72691317 0 0 0 64.72691439 64.72691318h750.83219672a64.72691317 64.72691317 0 0 0 64.72691439-64.72691318V572.10541155zM278.98311111 473.16385185a116.50844445 116.50844445 0 1 1 0-233.01688888 116.50844445 116.50844445 0 0 1 0 233.01688888z m0-77.6722963a38.83614815 38.83614815 0 1 0 0-77.6722963 38.83614815 38.83614815 0 0 0 0 77.6722963z" p-id="5509"></path></svg>`,
      },
      wordNumber: 0,
      config: {
        chatInput: [{
          title: "插入图片",
          svg: "picture",
        }, {
          title: "插入表情",
          svg: "emote",
        }]
      }
    }
  },
  computed: {
    // 聊天窗口对应的昵称
    chatWindowNickname() {
      let latestUserIndex = this.$route.params.latestUserIndex;
      if(!this.$route.params.latestUserIndex) {
        latestUserIndex = this.accordingUidGetIndex(parseInt(this.$route.params.uid));
      }
      return this.$store.state.message.whisper[latestUserIndex].user.nickname
    },
    ...mapGetters(["accordingUidGetIndex"]),
  },
  methods: {
    // 发送消息
    sendWhisperMessage() {
      let messageContent = this.$refs.inputTextarea.innerText;
      let obj = {
        latestUserIndex: this.$route.params.latestUserIndex,
        messageContent,
        messageId: this.getUniqueString(30),
        currentDate: null,
      };
      // 填充当前时间
      this.$bus.$emit("getCurrentDate", obj);
      this.$store.commit("sendWhisperMessage", obj);
    },
    // 输入中
    entering(e) {
      // 删除时 e.data 为 null, 使用输入法时 e.data 为 空格, 并标识为输入法输入
      if (!e.data || (this.wordNumber + e.data.length > 300) || (e.data === " " && e.isComposing)) {
        return;
      }
      this.wordNumber += e.data.length;
    },
    // 删除
    deleteTextContent() {
      if (this.wordNumber > 0) {
        this.wordNumber--;
      }
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
            if(innerText.length > 300) {
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
    }
  },
  beforeDestroy() {
    this.clearAllRefsEvents();
  }
}
</script>

<style scoped>
.whisper-chat-board {
  display: flex;
  flex-direction: column;
  width: calc(100% - 260px);
  height: 100%;
}

.chat-header {
  font-size: 14px;
  text-align: center;
  line-height: 30px;
  border-bottom: 1px solid #bebebe;
}

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