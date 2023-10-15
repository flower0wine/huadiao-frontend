<template>
  <div class="message-info">
    <div class="message-abstract-box">
            <span class="message-abstract">
                <a :href="homepage(userList[0].uid)" v-if="userList[0]">{{ getNickname(userList[0]) }}</a>
                <template v-if="userList[1]">
                  <span>、</span>
                  <a :href="homepage(userList[1].uid)">{{ getNickname(userList[1]) }}</a>
                </template>
            </span>
      <span class="user-number"
            @click="lookOverMoreUser"
            ref="userNumber"
      >等 {{ `${item.count} 人赞了我的 ${likeText[item.type]}` }}</span>
    </div>
    <div class="message-fields">
      <div class="message-date">{{ huadiaoDateFormat(item.time) }}</div>
      <div class="delete-message" @click="deleteLikeNoteMessage">
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
import {likeConstants} from "@/assets/js/constants/message/like";

let type = likeConstants.type;
let likeText = likeConstants.likeText;

export default {
  props: ["item", "index"],
  name: "LikeMessageContent",
  data() {
    return {
      svg,
      type,
      likeText,
      // 删除点赞消息请求配置
      deleteLikeRequestOption: {
        path: null,
        params: null,
      },
      likeUserRequestOption: {
        path: null,
        params: null,
      }
    }
  },
  computed: {
    userList() {
      return this.item.userList;
    },
    likeItem() {
      return this.item.likeMessageItem;
    }
  },
  created() {
    this.deleteLikeRequestOption = this.getDeleteLikeRequestOption();
    this.likeUserRequestOption = this.getLikeUserRequestOption();
  },
  methods: {
    // 删除点赞笔记消息
    deleteLikeNoteMessage() {
      let tip = "确认删除该通知消息吗?删除后该通知下的所有点赞消息都会删除!";
      this.huadiaoPopupWindow("warning", "confirmOrCancel", tip).then(this.requestDeleteLikeMessage).catch(() => {});
    },
    // 请求删除点赞消息
    requestDeleteLikeMessage() {
      this.sendRequest({
        path: this.deleteLikeRequestOption.path,
        params: this.deleteLikeRequestOption.params,
      }).then((response) => {
        let res = response.data;
        console.log(res);
        if (res.code === statusCode.succeed) {
          this.$store.commit("deleteLikeMessage", {messageIndex: this.index});
        }
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
          path: this.likeUserRequestOption.path,
          params: this.likeUserRequestOption.params,
        }
      });
    },
    // 获取请求配置
    getDeleteLikeRequestOption() {
      let option = {
        1: {
          path: apis.message.likeNoteDelete,
        },
        2: {
          path: apis.message.likeCommentDelete,
        }
      };
      option = option[this.item.type];
      return this.getRequestParams(option);
    },
    getLikeUserRequestOption() {
      let option = {
        1: {
          path: apis.message.likeNoteUserGet,
        },
        2: {
          path: apis.message.likeCommentUserGet,
        }
      }
      option = option[this.item.type];
      return this.getRequestParams(option);
    },
    getRequestParams(option) {
      let params = {
        1: {
          noteId: this.likeItem.noteId,
        },
        2: {
          noteId: this.likeItem.noteId,
          rootCommentId: this.likeItem.rootCommentId,
          subCommentId: this.likeItem.subCommentId,
        }
      }
      option.params = params[this.item.type];
      return option;
    }
  },
  beforeDestroy() {
  }
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