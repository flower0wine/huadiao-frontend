<template>
  <div class="message-info">
    <div class="message-abstract-box">
      <span class="message-abstract">
        <a :href="homepage(item.uid)">{{ getNickname(item) }}</a>
      </span>
    </div>
    <div class="message-content"
         v-text="item.commentContent"></div>
    <div class="message-fields">
      <div class="message-date">{{ huadiaoDateFormat(item.time) }}</div>
      <div class="delete-message" @click="deleteReplyNoteMessage">
        <span class="delete-icon" v-html="svg.deleteTrashcan"></span>
        <span>删除该通知</span>
      </div>
    </div>
  </div>
</template>

<script>
import {svg} from "@/assets/js/constants/svgs";
import {apis} from "@/assets/js/constants/request-path";
import {statusCode} from "@/assets/js/constants/status-code";
import {huadiaoPopupWindowOptions} from "@/pages/components/popwindow/HuadiaoPopupWindow";

export default {
  props: ["item", "index"],
  name: "ReplyMessageContent",
  data() {
    return {
      svg,
    }
  },
  methods: {
    deleteReplyNoteMessage() {
      this.huadiaoPopupWindow(huadiaoPopupWindowOptions.iconType.warning, huadiaoPopupWindowOptions.operate.confirmOrCancel, "确认删除吗?").then(() => {
        this.sendRequest({
          path: apis.message.replyDelete,
          params: {
            uid: this.item.uid,
            noteId: this.item.noteId,
            rootCommentId: this.item.rootCommentId,
            subCommentId: this.item.subCommentId,
          },
        }).then((response) => {
          let res = response.data;
          console.log(res);
          if (res.code === statusCode.SUCCEED) {
            this.$store.commit("deleteReplyMessage", {messageIndex: this.index});
          }
        });
      }).catch(() => {});
    },
  },
  beforeDestroy() {
  }
}
</script>

<style scoped>
.message-info {
  flex: 1;
  margin-left: 10px;
}

.message-abstract a {
  font-size: 14px;
  font-weight: 700;
  color: var(--message-text-color);
}

.message-abstract a:hover {
  color: #df2a2a;
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

.message-fields {
  display: flex;
  margin-top: 16px;
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

</style>
