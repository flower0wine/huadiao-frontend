<template>
  <div class="message-item">
    <div class="user-avatar-container" :class="messageType === 'like' ? item.likerList.length > 1 ? 'more-liker' : '' : ''">
      <div class="user-avatar-box">
        <a href="#" :title="messageType === 'like' ? item.likerList[0].nickname : item.replyUser.nickname">
          <div class="default-user-avatar" v-html="svg.avatar"></div>
          <div class="user-avatar"
               :style="`background-image: ${addBackground(messageType === 'like' ? item.likerList[0].userAvatar : item.replyUser.userAvatar)}`"
          ></div>
        </a>
      </div>
      <div class="user-avatar-box"
           v-if="messageType === 'like' && item.likerList.length > 1"
           :title="item.likerList[1].nickname"
      >
        <a href="#">
          <div class="default-user-avatar" v-html="svg.avatar"></div>
          <div class="user-avatar"
               :style="`background-image: ${addBackground(item.likerList[0].userAvatar)}`"
          ></div>
        </a>
      </div>
    </div>
    <div class="message-info">
      <div class="message-abstract-box">
            <span class="message-abstract">
              <template v-if="messageType === 'like'">
                <a href="#" v-if="item.likerList[0]">{{ item.likerList[0].nickname }}</a>
                <template v-if="item.likerList[1]">
                  <span>、</span>
                  <a href="#" >{{ item.likerList[1].nickname }}</a>
                </template>
              </template>
              <template v-else-if="messageType === 'reply'">
                <a href="#">{{item.replyUser.nickname}}</a>
              </template>
            </span>
        <span class="user-number"
              v-if="messageType === 'like'"
              @click="lookOverMoreUser"
              ref="userNumber"
        >等 {{ messageType === 'like' ? `${item.likerList.length} 人赞了我的 ${type[item.type]}` : `` }}</span>
        <span class="reply-text"
              v-else>{{replyText[item.type]}}</span>
      </div>
      <div class="message-content" v-text="item.messageContent"></div>
      <div class="message-fields">
        <div class="message-date">2021年03月15日</div>
        <div class="delete-message" @click="deleteLikeOrReplyMessage">
          <span class="delete-icon" v-html="svg.del"></span>
          <span>删除该通知</span>
        </div>
      </div>
    </div>
    <div class="message-origin"
         :title="handlerOriginTitleAttribute(item)"
         v-text="likeMeOriginContent(item)"
         @click="proceedPage(item[item.type].url)"
         :style="item.type === 'video' ? `background-image: ${addBackground(item.video.cover)}` : ''"
    >
    </div>
  </div>
</template>

<script>
export default {
  name: "LikeReplyMessageItem",
  props: ["item", "index", "messageType"],
  data() {
    return {
      svg: {
        del: `<svg t="1680416950197" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6154" width="200" height="200"><path d="M798.4 872c0 33.6-27.2 62.4-62.4 62.4H288c-33.6 0-62.4-27.2-62.4-62.4V212.8h572.8v659.2zM348.8 100.8c0-3.2 1.6-6.4 3.2-9.6 1.6-1.6 4.8-3.2 9.6-3.2h299.2c6.4 0 12.8 4.8 12.8 12.8v36.8H348.8V100.8z m636.8 36.8H748.8V100.8c0-48-38.4-88-88-88H361.6c-48 0-88 38.4-88 88v36.8H38.4c-12.8 0-25.6 6.4-32 19.2-6.4 11.2-6.4 25.6 0 36.8 6.4 11.2 19.2 19.2 32 19.2h112v660.8c0 75.2 60.8 137.6 137.6 137.6h448c75.2 0 137.6-60.8 137.6-137.6V212.8h112c20.8 0 36.8-16 36.8-36.8 0-20.8-17.6-38.4-36.8-38.4zM512 822.4c20.8 0 36.8-16 36.8-36.8V387.2c0-12.8-6.4-25.6-19.2-32-11.2-6.4-25.6-6.4-36.8 0-11.2 6.4-19.2 19.2-19.2 32v398.4c0 20.8 17.6 36.8 38.4 36.8m-174.4 0c9.6 0 19.2-3.2 27.2-11.2 6.4-6.4 11.2-16 11.2-27.2V387.2c0-12.8-6.4-25.6-19.2-32-11.2-6.4-25.6-6.4-36.8 0-11.2 6.4-19.2 19.2-19.2 32v398.4c-1.6 20.8 16 36.8 36.8 36.8m348.8 0c20.8 0 36.8-16 36.8-36.8V387.2c0-12.8-6.4-25.6-19.2-32-11.2-6.4-25.6-6.4-36.8 0-11.2 6.4-19.2 19.2-19.2 32v398.4c0 20.8 17.6 36.8 38.4 36.8" fill="" p-id="6155"></path></svg>`,
        avatar: `<svg t="1657536982283" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3627" width="200" height="200"><path d="M510.77050482 2.21923328c281.4240859 0 509.56537287 228.14128697 509.56537173 509.56653682 0 281.42757888-228.14128697 509.56653682-509.56537173 509.56653681-281.42757888 0-509.56886585-228.14012302-509.56886585-509.56653681 0-281.4240859 228.14128697-509.56653682 509.56886585-509.56653682z" fill="#EEEEEE" p-id="3628"></path><path d="M510.77050482 516.51164387c90.0558939 0 163.05952199-73.30168832 163.05952199-163.72549973 0-90.42264633-73.00362809-163.72433465-163.05952199-163.72433465-90.05705785 0-163.06301497 73.30168832-163.06301497 163.72433465-0.00116395 90.42497536 73.00479317 163.72549859 163.06301497 163.72549973z m251.51800206 200.09807531l1.21552441-0.45756757c-39.85964146-100.90130205-137.98992099-172.25861689-252.73352647-172.25861689-113.31967317 0-210.42537358 69.60155875-251.2141221 168.51890176l0.56235463 0.22820181a39.9609344 39.9609344 0 0 0-2.9188881 15.01940622c0 22.15886393 17.97555086 40.12510094 40.15420757 40.12509981 16.79146325 0 31.16701469-10.30401138 37.16196921-24.92522837l0.65433486 0.26545948c28.69987328-68.84360192 96.50958109-117.22355485 175.60014393-117.22355484 79.76934741 0 148.05874461 49.21940878 176.32433493 119.00725475l0.2875813-0.10828003c6.4338944 13.58499499 20.27037696 22.98434901 36.30970538 22.98434901 22.17516373 0 40.15187968-17.96507307 40.15187968-40.12509981a40.14256469 40.14256469 0 0 0-1.55549923-11.05032533z" fill="#CCCCCC" p-id="3629"></path></svg>`,
      },
      // 类型
      type: {
        video: "视频",
        note: "笔记",
        barrage: "弹幕",
        comment: "评论",
      },
      // 回复的文本类型
      replyText: {
        video: "评论了我的视频",
        note: "评论了我的笔记",
        comment: "评论了我的评论",
      }
    }
  },
  methods: {
    // 根据不同的类型来设置展示的内容
    likeMeOriginContent(item) {
      if (item.type !== "video") {
        return item[item.type].abstract.length > 16 ? item[item.type].abstract.substring(0, 16) : item[item.type].abstract;
      }
    },
    // 处理 title 属性
    handlerOriginTitleAttribute(item) {
      if (item.type !== "video") {
        return item[item.type].abstract;
      } else {
        return item[item.type].title;
      }
    },
    // 点击查看更多点赞用户
    lookOverMoreUser() {
      this.$router.push({
        path: `/like/${this.index}`,
      });
    },
    // 前往点击的 url 地址
    proceedPage(url) {
      window.open(url);
    },
    // 删除喜欢或回复我的消息
    deleteLikeOrReplyMessage() {
      let popWindow = {
        tip: this.messageType === 'like' ? "确认删除该通知消息吗?删除后该通知下的所有点赞消息都会删除!" : "确认删除该通知消息吗?删除后不可恢复!",
      };
      this.huadiaoPopupWindow("warning", "confirmOrCancel", popWindow.tip, () => {
        this.$store.commit(this.messageType === 'like' ? "deleteLikeMessage" : "deleteReplyMessage", {messageIndex: this.index});
      });
    },
  },
  beforeDestroy() {
  }
}
</script>

<style scoped>

.message-item {
  display: flex;
  align-items: center;
  padding: 10px 0;
}

.message-item:nth-child(n + 2) {
  border-top: 1px solid #c7c7c7;
}

.user-avatar-container {
  position: relative;
  width: 40px;
  height: 40px;
}

.user-avatar-box {
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-shadow: var(--box-shadow-min);
}

.default-user-avatar /deep/ svg {
  width: 40px;
  height: 40px;
}

.user-avatar {
  position: absolute;
  top: 0px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
}

.message-info {
  flex: 1;
  margin-left: 10px;
}

.message-content {
  margin: 7px 0 7px 0;
  font-size: 14px;
  color: #4d4d4d;
}

.message-date {
  color: #8d8d8d;
  font-size: 12px;
}

.message-abstract a {
  font-size: 14px;
  font-weight: 700;
  color: var(--message-text-color);
}

.message-abstract a:hover {
  color: #df2a2a;
}

.user-number,
.reply-text {
  font-size: 14px;
  margin-left: 10px;
  cursor: pointer;
}

.user-number:hover {
  color: #df2a2a;
}

/* 多个用户喜欢会有前两位的头像 */
.more-liker {
  position: relative;
}

.more-liker .user-avatar-box:last-child {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 30px;
  height: 30px;
}

.more-liker .user-avatar-box:first-child {
  position: absolute;
  z-index: 1;
  bottom: 0px;
  right: 0px;
  width: 30px;
  height: 30px;
}

.more-liker .user-avatar,
.more-liker .default-user-avatar /deep/ svg {
  width: 30px;
  height: 30px;
}

.message-fields {
  display: flex;
}

.message-fields > div {
  margin-right: 20px;
}

.delete-message {
  display: none;
  font-size: 12px;
  color: #8d8d8d;
  cursor: pointer;
}

.message-info:hover .delete-message {
  display: block;
}

.delete-message /deep/ svg {
  width: 15px;
  height: 15px;
  vertical-align: -3px;
  fill: #8d8d8d;
}

.delete-message:hover {
  color: #d64f4f;
}

.delete-message:hover /deep/ svg {
  fill: #d64f4f;
}

.delete-icon {
  margin-right: 4px;
}

.message-origin {
  width: 60px;
  height: 60px;
  font-size: 14px;
  line-height: 14px;
  color: #8e8e8e;
  background: center/cover no-repeat;
  cursor: pointer;
}
</style>