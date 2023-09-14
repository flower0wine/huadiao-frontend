<template>
  <div class="message-window" ref="messageWindow">
    <div class="message-item-box"
         :class="item.me ? 'me' : 'not-me'"
         v-for="(item, index) in []"
         :key="item.messageId"
         @contextmenu="operationMessageItem($event, index, item.messageId)"
    >
      <div class="publish-time" v-if="publishDate(index)">{{ publishDate(index) }}</div>
      <div class="message-info">
        <user-avatar-box :options="userAvatarOptions"/>
        <div class="message-item">
          {{ item.messageContent }}
        </div>
      </div>
    </div>
    <div class="not-more-message">没有更多消息了...</div>
    <div class="message-item-operation-board"
         :style="`top: ${contentMenu.top}px; left: ${contentMenu.left}px;`"
         v-if="isShow.messageOperationBoard"
    >
      <div class="delete-message" @click="deleteMessageItem">删除</div>
    </div>
  </div>
</template>

<script>
import UserAvatarBox from "@/pages/components/UserAvatarBox";
import {Timer} from "@/assets/js/utils";

export default {
  name: "ChatMessageWindow",
  components: {UserAvatarBox},
  data() {
    return {
      isShow: {
        messageOperationBoard: false,
      },
      now: {
        year: null,
        month: null,
        day: null,
        hour: null,
        minute: null,
      },
      // 消息右键菜单 top, left， index
      contentMenu: {
        top: 0,
        left: 0,
        index: -1,
        messageId: null,
      },
      timer: new Timer(),
    }
  },
  computed: {
    userAvatarOptions() {
      return {
        userAvatar: this.whisper.user.userAvatar,
        scale: "30px",
      }
    },
    whisper() {
      console.log(this.$route.params.latestUserIndex)
      return this.$store.state.message.whisper[parseInt(this.$route.params.latestUserIndex)];
    },
  },
  created() {
    this.setCurrentDate();
    this.timer.interval(this.setCurrentDate, 60000);
  },
  mounted() {
    console.log(this.$refs.messageWindow)
    /*this.$refs.messageWindow.addEventListener("scroll", () => {
      // let messageWindow = this.$refs.messageWindow;
      // console.log(messageWindow.scrollTop, messageWindow.scrollHeight, messageWindow.clientHeight)
    });*/
    // 添加获取当前时间事件
    this.$bus.$on("getCurrentDate", this.getCurrentDate);
    // 隐藏消息操作面板
    this.$bus.$on("hiddenMessageOperationBoard", () => {this.isShow.messageOperationBoard = false;});
  },
  methods: {
    // 删除信息
    deleteMessageItem() {
      this.$store.commit("deleteWhisperMessage", {
        latestUserIndex: this.$route.params.latestUserIndex,
        messageIndex: this.contentMenu.index,
        messageId: this.contentMenu.messageId,
        unmatchedCallback: () => {
          this.huadiaoMiddleTip("删除失败! 似乎出了点问题, 尝试刷新页面看看吧!");
        }
      });
    },
    // 操作单条信息
    operationMessageItem(e, index, messageId) {
      e.preventDefault();
      this.contentMenu.top = e.layerY;
      this.contentMenu.left = e.layerX;
      this.contentMenu.index = index;
      this.contentMenu.messageId = messageId;
      this.isShow.messageOperationBoard = true;
    },
    // 每隔两分钟获取当前时间
    setCurrentDate() {
      let now = new Date();
      this.now.year = now.getFullYear();
      this.now.month = now.getMonth() + 1;
      this.now.day = now.getDate();
      this.now.hour = now.getHours();
      this.now.minute = now.getMinutes();
    },
    // 获取当前时间
    // 1. 提供一个对象则向对象中添加属性
    // 2. 否则直接返回当前时间
    getCurrentDate(obj) {
      let month = this.changeDateNumberFormat(this.now.month);
      let day = this.changeDateNumberFormat(this.now.day);
      let hour = this.changeDateNumberFormat(this.now.hour);
      let minute = this.changeDateNumberFormat(this.now.minute);
      let currentDate = `${this.now.year}-${month}-${day} ${hour}:${minute}`;
      if (obj) {
        obj.currentDate = currentDate;
      } else {
        return currentDate;
      }
    },
    // 改变日期数字格式
    changeDateNumberFormat(number) {
      return number < 10 ? '0' + number : number;
    },
    // 发布时间处理
    publishDate(index) {
      let currentMessagePublishDate = this.whisper.messageList[index].publishDate.split(/[\s:.-]/);
      // 如果是最早的消息或者只有一条消息, 不比较时间
      if (index === this.whisper.messageList.length - 1 || this.whisper.messageList.length === 1) {
        return this.judgeMessageDateWithNow(currentMessagePublishDate);
      } else {
        let previousMessagePublicDate = this.whisper.messageList[index + 1].publishDate.split(/[\s:.-]/);
        if (this.compareDate(currentMessagePublishDate, previousMessagePublicDate)) {
          return this.judgeMessageDateWithNow(currentMessagePublishDate);
        }
        return false;
      }
    },
    // 比较日期大小, 相差十分钟及以上显示消息时间
    compareDate(current, previous) {
      return parseInt(current[4]) > parseInt(previous[4]) + 10;
    },
    // 判断消息发送时间与现在的时间相差
    // 1. 如果是今天的, 显示时分
    // 2. 如果是昨天的, 显示昨天
    // 3. 如果是后天或更久, 显示年月日时分
    judgeMessageDateWithNow(messageDate) {
      // 发送时间是当前月
      if (this.now.year === parseInt(messageDate[0]) && this.now.month === parseInt(messageDate[1])) {
        let subtract = this.now.day - parseInt(messageDate[2]);
        // 是今天
        if (subtract === 0) {
          return `今天 ${messageDate[3]}:${messageDate[4]}`;
        }
        // 是昨天
        else if (subtract === 1) {
          return `昨天 ${messageDate[3]}:${messageDate[4]}`;
        }
      }
      return `${messageDate[0]}年${messageDate[1]}月${messageDate[2]}日 ${messageDate[3]}:${messageDate[4]}`;
    },
  },
  beforeDestroy() {
  }
}
</script>

<style scoped>
.message-window {
  display: flex;
  flex: 1;
  /* 竖直倒排 */
  flex-direction: column-reverse;
  overflow-y: auto;
}

.message-window::-webkit-scrollbar {
  width: 10px;
}

.message-window::-webkit-scrollbar-track {
  border-radius: 5px;
  background-color: #f2f2f2;
}

.message-window::-webkit-scrollbar-thumb {
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