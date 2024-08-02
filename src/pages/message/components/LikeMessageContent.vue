<template>
  <div class="message-info">
    <div class="message-abstract-box">
            <span class="message-abstract">
                <a :href="homepageLink(item.uid)">{{ huadiaoNickname(item.nickname, item.userId) }}</a>
            </span>
      <span class="user-number"
            @click="lookOverMoreUser"
            ref="userNumber"
      >赞了我的{{ messageType }}</span>
    </div>
    <div class="message-fields">
      <div class="message-date">{{ huadiaoDateFormat(item.likeTime) }}</div>
      <div class="delete-message" @click="removeLikeMessage">
        <span class="delete-icon" v-html="deleteTrashcan"></span>
        <span>删除该通知</span>
      </div>
    </div>
  </div>
</template>

<script>
import {svg} from "@/assets/js/constants/svgs";
import {homepageLink, huadiaoNickname} from "@/util/huadiao-tool";
import {getNoteMessageType, LIKE_MESSAGE_TYPE_NAME} from "@/assets/js/constants/message/like";
import {ResponseHandler} from "@/assets/js/utils";
import {apis} from "@/assets/js/constants/request-path";
import {mapMutations} from "vuex";

export default {
  props: ["item", "index"],
  name: "LikeMessageContent",
  data() {
    return {
    }
  },
  computed: {
    deleteTrashcan() {
      return svg.deleteTrashcan;
    },

    messageType() {
      return LIKE_MESSAGE_TYPE_NAME[getNoteMessageType(this.item)];
    },
  },
  methods: {
    homepageLink,
    huadiaoNickname,

    ...mapMutations(["deleteLikeMessage"]),

    // 请求删除点赞消息
    removeLikeMessage() {
      this.sendRequest({
        path: apis.message.likeDelete,
        params: {
          uid: this.item.uid,
          authorUid: this.item.authorUid,
          noteId: this.item.noteId,
          replyUid: this.item.replyUid,
          repliedUid: this.item.repliedUid,
          rootCommentId: this.item.rootCommentId,
          subCommentId: this.item.subCommentId,
        },
      }).then((response) => {
        let res = response.data;
        console.log(res);

        new ResponseHandler(response.data).succeed(() => {
          this.deleteLikeMessage({
            messageIndex: this.index,
          });
        });
      }).catch((error) => {
        console.log(error);
      });
    },
    // 点击查看更多点赞用户
    lookOverMoreUser() {
      this.$router.push({
        name: "likeMeDetails",
        params: {
          messageIndex: this.index,
          path: apis.message.likeGet,
          params: {},
        }
      });
    },
  },
}
</script>

<style scoped>
.user-number {
  font-size: 14px;
  margin-left: 10px;
  cursor: pointer;
}

.user-number:hover {
  color: #df2a2a;
}

.message-abstract a {
  font-size: 14px;
  font-weight: 700;
  color: var(--message-text-color);
}

.message-abstract a:hover {
  color: #df2a2a;
}

.message-info {
  flex: 1;
  margin-left: 10px;
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