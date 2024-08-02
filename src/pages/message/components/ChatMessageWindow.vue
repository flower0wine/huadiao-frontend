<template>
  <div class="chat-message-window">
    <div class="message-window">
      <div class="message-item-list"
           @scroll="handleWheel"
           ref="messageList">
        <div class="not-more-message"
             v-if="!hasNext"
             ref="notMoreMessage">没有更多消息了...</div>
        <div class="loading-message" v-if="accessing">
          <LoadingIcon width="20px" height="20px" fill="#aeaeae" />
        </div>
        <div class="loading-error" v-if="loadingError">
          <span>加载失败，点击</span>
          <span style="color: #d42323; cursor: pointer" @click="getWhisperMessage">重新加载</span>
        </div>
        <div class="message-item-box"
             v-for="(item, index) in messageList"
             :class="myMessage(item) ? 'me' : 'not-me'"
             :key="item.messageId"
        >
          <div class="publish-time" v-if="item.hiddenTime">{{ distributeTime(item, item.sendTime, index) }}</div>
          <div class="message-info">
            <user-avatar-box :options="{
          href: homepage(item.sendUid),
          userAvatar: myMessage(item) ? myInfo.userAvatar : whisperUser.avatar,
          scale: `30px`,
        }"/>
            <div class="message-item"
                 @contextmenu="rightClickWhisperMessage($event, index, item.messageId)"
                 v-html="item.messageContent"></div>
          </div>
        </div>
      </div>
      <div class="message-item-operation-board"
           :style="`top: ${contentMenu.top}px; left: ${contentMenu.left}px;`"
           v-if="visible.messageOperationBoard">
        <div class="delete-message" @click="deleteWhisperMessage">删除</div>
      </div>
    </div>
    <ChatInput @sendMessage="sendMessage" />
  </div>
</template>

<script>
import UserAvatarBox from "@/pages/components/UserAvatarBox";
import {mapGetters, mapMutations, mapState} from "vuex";
import useChat from "@/pages/message/hook/useChat";
import useObserver from "@/mixin/useObserver";
import {ResponseHandler, Timer} from "@/assets/js/utils";
import {apis} from "@/assets/js/constants/request-path";
import {huadiaoPopupWindowOptions} from "@/pages/components/HuadiaoPopupWindow";
import useWebsocket from "@/pages/message/hook/useWhisperWebsocket";
import usePaginator from "@/mixin/usePaginator";
import ChatInput from "@/pages/message/components/ChatInput";
import {debounce} from "@/util";
import LoadingIcon from "@/pages/components/svg/LoadingIcon";


export default {
  name: "ChatMessageWindow",
  components: {
    LoadingIcon,
    ChatInput,
    UserAvatarBox
  },
  mixins: [
    useChat,
    useWebsocket,
    usePaginator,
    useObserver,
  ],
  emits: ["getWhisperMessage"],
  data() {
    return {
      currentTime: null,
      // 两个消息之间不显示时间的最小时间间隔
      minTimeBetweenMessage: 5 * 60 * 1000,
      oneDayTime: 24 * 60 * 60 * 1000,
      timer: new Timer(),
      visible: {
        messageOperationBoard: false,
      },
      firstAcquiring: true,
      debounceGetWhisperMessage: null,
      // 消息右键菜单 top, left, index
      contentMenu: {
        top: 0,
        left: 0,
        index: -1,
        messageId: null,
      },
      loadingError: false,
    }
  },
  watch: {
    chatUid(newValue) {
      // 当在不同用户之间切换时需要重置请求参数
      if (Number.isSafeInteger(newValue)) {
        this.resetPaginator();
        this.clearMessage();
        this.getWhisperMessage();
      }
    },
  },
  computed: {
    ...mapState("whisperMessageStore", ["messageList"]),

    ...mapGetters("whisperUserStore", ["whisperUser"]),

    myInfo() {
      return this.$store.state.user;
    },
  },

  created() {
    this.currentTime = new Date();
    // 每 10 分钟设置为当前时间
    this.timer.interval(() => {
      this.currentTime = new Date();
    }, 60000);

    // 由于滚动时可能会多次触发, 所以采用防抖
    this.debounceGetWhisperMessage = debounce(this.getWhisperMessage, 500);

    this.getWhisperMessage();

    window.addEventListener("click", this.closeOperationBoard);
  },

  methods: {
    ...mapMutations("whisperMessageStore", ["pushMessage", "clearMessage"]),

    ...mapMutations("whisperUserStore", ["updateWhisperUserLatestMessage"]),

    handleWheel() {
      if (this.$refs.messageList.scrollTop < 100) {
        this.debounceGetWhisperMessage();
      }
    },

    getWhisperMessage() {
      if (!this.hasNext || this.accessing) return;
      this.accessing = true;
      this.loadingError = false;
      this.sendRequest({
        path: apis.message.whisperGet,
        params: {
          uid: this.chatUid,
          offset: this.offset,
          row: this.row,
        }
      }).then((response) => {
        let res = response.data;
        console.log(res);
        new ResponseHandler(res).succeed((data) => {
          this.offset += data.length;

          // 因为滚动条在完全到达顶部时, 当添加新元素时, 会追随顶部, 这时设置滚动条不完全贴合顶部即可
          if (!this.firstAcquiring) {
            this.$refs.messageList.scrollTo(0, 1);
          }

          if (data.length < this.row) {
            this.hasNext = false;
          }

          this.unshiftMessage(data);

          if (this.firstAcquiring) {
            this.firstAcquiring = false;
            this.$nextTick(() => {
              this.$refs.messageList.lastElementChild.scrollIntoView({block: "end"});
            });
          }
        }).notExist(() => {
          this.hasNext = false;
        });
      }).catch((error) => {
        console.log(error);
        this.loadingError = true;
      }).finally(() => {
        this.accessing = false;
      });
    },

    sendMessage(messageContent) {
      this.sendWhisperMessage({
        messageContent,
        receiveUid: this.chatUid,
      });

      this.updateWhisperUserLatestMessage({
        uid: this.chatUid,
        message: messageContent,
      });
    },

    sendMessageCallback({messageId, messageContent}) {
      const message = {
        messageType: 1,
        messageContent,
        messageId,
        receiveUid: this.chatUid,
        sendTime: new Date(),
      };

      this.pushMessage(message);

      // 发送消息后, 自动滚动到底部
      this.$nextTick(() => {
        this.$refs.messageList.scrollTo({
          top: 100_000_000,
          behavior: "smooth",
        });
      });
    },

    receiveMessageCallback(message) {
      this.pushMessage(message);

      const messageListEl = this.$refs.messageList;

      if (messageListEl.scrollTop + messageListEl.getBoundingClientRect().height !== messageListEl.scrollHeight) {
        return;
      }

      // 当滚动底部时并且接收到新的消息时, 自动滚动到底部
      this.$nextTick(() => {
        messageListEl.lastElementChild.scrollIntoView({block: "end"});
      });
    },

    // 删除信息
    deleteWhisperMessage() {
      this.huadiaoPopupWindow(
          huadiaoPopupWindowOptions.iconType.warning,
          huadiaoPopupWindowOptions.operate.confirmOrCancel,
          "确认删除吗?")
          .then(this.requestDeleteWhisperMessage)
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            this.visible.messageOperationBoard = false;
          });
    },

    requestDeleteWhisperMessage() {
      if(this.contentMenu.index === -1) return;
      this.sendRequest({
        path: apis.message.whisperDelete,
        params: {
          messageId: this.message[this.contentMenu.index].messageId,
        }
      }).then((response) => {
        let res = response.data;
        console.log(res);
        new ResponseHandler(res).succeed(() => {
          this.message.splice(this.contentMenu.index, 1);
        });
      }).catch((error) => {
        console.log(error);
      });
    },

    closeOperationBoard() {
      this.visible.messageOperationBoard = false;
    },

    // 判断是否是自己的消息
    myMessage(item) {
      return this.myInfo.uid !== item.receiveUid;
    },

    preventScrollJumping() {
      if (this.firstAcquiring) {
        this.$nextTick(() => {
          console.log(this.$refs.messageList.children.length)
          this.$refs.messageList.lastElementChild.scrollIntoView({block: "end"});
        });
        this.firstAcquiring = false;
      } else {
        this.$refs.messageList.scrollTo(0, 1);
      }
    },

    // 依据当前时间以及上一条消息的时间来显示当前消息的时间
    distributeTime(item, time, index) {
      // 如果两条消息的时间间隔小于最小间隔, 则不显示时间
      if(index + 1 < this.message.length && this.message[index + 1].sendTime - time < this.minTimeBetweenMessage) {
        // 十条信息时间相隔很近, 则第十条消息显示时间
        if(index !== 0 && index % 9 === 0) {
          item.hiddenTime = true;
        }
        else {
          return "";
        }
      }
      // 今天
      if(this.currentTime - time < this.oneDayTime) {
        let date = new Date(time);
        let hour = date.getHours();
        let name = hour < 6 ? '凌晨' : hour < 12 ? '上午' : hour < 18 ? '下午' : '晚上';
        return `${name} ${this.numberFormat(hour)}:${this.numberFormat(date.getMinutes())}`;
      }
      // 昨天
      else if(this.currentTime - time < this.oneDayTime * 2) {
        let date = new Date(time);
        return `昨天 ${this.numberFormat(date.getHours())}:${this.numberFormat(date.getMinutes())}`;
      }
      // 更早显示年月日时分
      else {
        return this.huadiaoDateFormat(time);
      }
    },

    // 操作单条信息
    rightClickWhisperMessage(e, index, messageId) {
      e.preventDefault();
      this.contentMenu.top = e.layerY;
      this.contentMenu.left = e.layerX;

      this.contentMenu.index = index;
      this.contentMenu.messageId = messageId;
      this.visible.messageOperationBoard = true;
    },
  },
  beforeDestroy() {
    this.unobserveElements();
    window.removeEventListener("click", this.closeOperationBoard);
  }
}
</script>

<style lang="scss" scoped>
.chat-message-window {
  flex: 1;
  /* 设置 height: 0, 使 flex: 1 生效 */
  height: 0;
  display: flex;
  flex-direction: column;
}

.message-window {
  position: relative;
  /* 由于子容器高度大于父容器, 会使 flex: 1 失效, 这里设置父容器高度为 0, 使 flex: 1 生效, 子容器设置 height: 100% */
  flex: 1;
  height: 0;
}

.message-item-list {
  height: 100%;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    border-radius: 5px;
    background-color: #f2f2f2;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: #b9b9b9;
  }
}

/* 一条消息 */
.message-item-box {
  /* 子元素不压缩 */
  flex-shrink: 0;
  padding: 10px 20px;
}

.not-me {
  .message-info {
    display: flex;
  }

  .message-item {
    border-top-left-radius: 0;
    margin-left: 10px;
    color: #626262;
    background-color: #fff;
  }
}

.me {
  .message-item {
    border-top-right-radius: 0;
    margin-right: 10px;
    color: #fff;
    background-color: #da6a6a;
  }

  .message-info {
    display: flex;
    flex-direction: row-reverse;
  }
}

/* 消息内部元素 */
.message-item {
  display: inline-block;
  padding: 10px;
  border-radius: 12px;
  font-size: 14px;

  &::v-deep {
    .emote {
      width: 20px;
      height: 20px;
    }

    .picture {
      width: 200px;
      border-radius: 4px;
    }
  }
}

.publish-time,
.not-more-message {
  text-align: center;
  line-height: 30px;
  font-size: 12px;
  color: #aaa;
}

.not-more-message {
  flex: 1;
}

.message-item-operation-board {
  position: absolute;
  border-radius: 6px;
  color: #7d7d7d;
  font-size: 14px;
  box-shadow: var(--box-shadow-min);
  backdrop-filter: blur(2px);
  overflow: hidden;
  cursor: pointer;

  & > div {
    padding: 6px 20px;
    background-color: #ffffffb0;

    &:hover {
      background-color: rgba(232, 232, 232, 0.69);
    }
  }
}

.loading-message {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 20px;
}

.loading-error {
  text-align: center;
  line-height: 30px;
  font-size: 14px;
  color: #545454;
}
</style>