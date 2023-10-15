<template>
  <div class="message-window">
    <div class="message-item-list" ref="messageWindow">
      <div class="message-item-box"
           v-for="(item, index) in message"
           :class="myMessage(item) ? 'me' : 'not-me'"
           :key="getWhisperKey(item)"
      >
        <div class="publish-time" v-if="item.showTime">{{ distributeTime(item, item.sendTime, index) }}</div>
        <div class="message-info">
          <user-avatar-box :options="{
          href: homepage(item.receiveUid),
          userAvatar: myMessage(item) ? myAvatar : whisperUser.avatar,
          scale: `30px`,
        }"/>
          <div class="message-item" @contextmenu="rightClickWhisperMessage($event, index, item.messageId)">
            {{ item.messageContent }}
          </div>
        </div>
      </div>
      <div class="not-more-message" ref="notMoreMessage">没有更多消息了...</div>
    </div>
    <div class="message-item-operation-board"
         :style="`top: ${contentMenu.top}px; left: ${contentMenu.left}px;`"
         v-if="visible.messageOperationBoard"
         ref="messageItemOperationBoard">
      <div class="delete-message" @click="deleteWhisperMessage">删除</div>
    </div>
  </div>
</template>

<script>
import UserAvatarBox from "@/pages/components/UserAvatarBox";
import {apis} from "@/assets/js/constants/request-path";
import {ResponseHandler, Timer} from "@/assets/js/utils";
import {mapState} from "vuex";
import {huadiaoPopupWindowOptions} from "@/pages/components/HuadiaoPopupWindow";

export default {
  name: "ChatMessageWindow",
  components: {UserAvatarBox},
  data() {
    return {
      offset: 0,
      row: 10,
      hasNext: true,
      accessing: false,
      observer: null,
      currentTime: null,
      // 两个消息之间不显示时间的最小时间间隔
      minTimeBetweenMessage: 5 * 60 * 1000,
      oneDayTime: 24 * 60 * 60 * 1000,
      timer: new Timer(),
      message: [],
      visible: {
        messageOperationBoard: false,
      },
      // 消息右键菜单 top, left, index
      contentMenu: {
        top: 0,
        left: 0,
        index: -1,
        messageId: null,
      },
    }
  },
  watch: {
    "$route.params.uid": {
      deep: true,
      handler(newValue, oldValue) {
        newValue = +newValue;
        oldValue = +oldValue;
        // 当在不同用户之间切换时需要重置请求参数
        if (Number.isSafeInteger(newValue) && Number.isSafeInteger(oldValue)) {
          this.resetRequestOption();
          this.getWhisperMessage();
        }
      }
    },
  },
  computed: {
    ...mapState(["latestUserIndex"]),
    myUid() {
      return this.$store.state.user.uid;
    },
    myAvatar() {
      return this.$store.state.user.userAvatar;
    },
    // 正在聊天的对象 uid
    chatUid() {
      return parseInt(this.$route.params.uid);
    },
    whisperUser() {
      return this.$store.state.message.whisper[this.latestUserIndex];
    },
  },
  mounted() {
    this.initial();
  },
  created() {
    this.currentTime = new Date();
    // 每 10 分钟设置为当前时间
    this.timer.interval(() => {
      this.currentTime = new Date();
    }, 60000);
  },
  methods: {
    // 重置请求参数
    resetRequestOption() {
      this.hasNext = true;
      this.offset = 0;
      this.message = [];
    },
    // 重置消息右键菜单数据
    resetContextMenu() {
      this.contentMenu.top = 0;
      this.contentMenu.left = 0;
      this.contentMenu.index = -1;
      this.contentMenu.messageId = null;
    },
    // 判断是否是自己的消息
    myMessage(item) {
      return this.myUid !== item.receiveUid;
    },
    initial() {
      this.$bus.$on("unshiftWhisperMessage", this.unshiftWhisperMessage);
      this.$bus.$on("hiddenMessageOperationBoard", this.closeWhisperMessageContextMenu);

      this.getIntersectionObserver(this.getWhisperMessage);
      this.observer.observe(this.$refs.notMoreMessage);
    },
    notExistCallback() {
      this.hasNext = false;
      this.observer.unobserve(this.$refs.notMoreMessage);
    },
    getWhisperMessage() {
      if (!this.hasNext || this.accessing) return;
      this.accessing = true;
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
        let responseHandler = new ResponseHandler(res);
        responseHandler.succeed((data) => {
          this.offset += data.length;
          // 默认展示时间
          data.forEach((item) => {
            item.showTime = true;
          });
          this.scrollMessageWindowToBottom();
          this.addWhisperMessage(data);
          if (data.length < this.row) {
            this.notExistCallback();
          }
        }).notExist(this.notExistCallback);
        this.accessing = false;
      }).catch((error) => {
        console.log(error);
        this.accessing = false;
      });
    },
    // 滚动消息窗口
    scrollMessageWindowToBottom() {
      this.$refs.messageWindow.scrollTo({
        top: this.$refs.messageWindow.scrollHeight,
        behavior: 'smooth'
      });
    },
    openWhisperMessageContextMenu() {
      this.visible.messageOperationBoard = true;
    },
    closeWhisperMessageContextMenu() {
      this.visible.messageOperationBoard = false;
    },
    // 添加私信消息, 末尾批量添加
    addWhisperMessage(message) {
      this.message.push(...message);
    },
    // 添加私信消息, 头部单个添加
    unshiftWhisperMessage(message) {
      this.message.unshift(message);
    },
    getWhisperKey(item) {
      return this.getKey([item.messageId]);
    },
    // 依据当前时间以及上一条消息的时间来显示当前消息的时间
    distributeTime(item, time, index) {
      // 如果两条消息的时间间隔小于最小间隔, 则不显示时间
      if(index + 1 < this.message.length && this.message[index + 1].sendTime - time < this.minTimeBetweenMessage) {
        // 十条信息时间相隔很近, 则第十条消息显示时间
        if(index !== 0 && index % 9 === 0) {
          item.showTime = true;
        }
        else {
          item.showTime = false;
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
    // 删除信息
    deleteWhisperMessage() {
      this.huadiaoPopupWindow(huadiaoPopupWindowOptions.iconType.warning, huadiaoPopupWindowOptions.operate.confirmOrCancel, "确认删除吗?")
          .then(this.requestDeleteWhisperMessage)
          .catch((error) => {
            console.log(error);
            this.resetContextMenu();
          })
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
        new ResponseHandler(res)
            .succeed(() => {
              this.message.splice(this.contentMenu.index, 1);
              this.closeWhisperMessageContextMenu();
              this.resetContextMenu();
            });
      }).catch((error) => {
        console.log(error);
        this.closeWhisperMessageContextMenu();
        this.resetContextMenu();
      })
    },
    // 操作单条信息
    rightClickWhisperMessage(e, index, messageId) {
      e.preventDefault();
      console.log(e)
      this.contentMenu.top = e.layerY;
      this.contentMenu.left = e.layerX;

      this.contentMenu.index = index;
      this.contentMenu.messageId = messageId;
      this.openWhisperMessageContextMenu();
    },
  },
  beforeDestroy() {
  }
}
</script>

<style scoped>
.message-window {
  position: relative;
  /* 由于子容器高度大于父容器, 会使 flex: 1 失效, 这里设置父容器高度为 0, 使 flex: 1 生效, 子容器设置 height: 100% */
  flex: 1;
  height: 0;
}

.message-item-list {
  height: 100%;
  display: flex;
  /* 竖直倒排 */
  flex-direction: column-reverse;
  overflow-y: auto;
}

.message-item-list::-webkit-scrollbar {
  width: 10px;
}

.message-item-list::-webkit-scrollbar-track {
  border-radius: 5px;
  background-color: #f2f2f2;
}

.message-item-list::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: #b9b9b9;
}

/* 一条消息 */
.message-item-box {
  /* 子元素不压缩 */
  flex-shrink: 0;
  padding: 10px 20px;
}

.not-me .message-info {
  display: flex;
}

.not-me .message-item {
  border-top-left-radius: 0;
  margin-left: 10px;
  color: #626262;
  background-color: #fff;
}

.me .message-info {
  display: flex;
  flex-direction: row-reverse;
}

.me .message-item {
  border-top-right-radius: 0;
  margin-right: 10px;
  color: #fff;
  background-color: #da6a6a;
}

/* 消息内部元素 */
.message-item {
  display: inline-block;
  padding: 10px;
  border-radius: 12px;
  font-size: 14px;
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
}

.message-item-operation-board > div {
  padding: 6px 20px;
  background-color: #ffffffb0;
}

.message-item-operation-board > div:hover {
  background-color: rgba(232, 232, 232, 0.69);
}
</style>