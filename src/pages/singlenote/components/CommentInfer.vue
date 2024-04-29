<template>
  <div class="comment-infer" @mouseleave="hiddenMoreBoard">
    <div class="user-nickname">{{item.nickname ? item.nickname : item.userId}}</div>
    <div class="comment-content" v-html="item.commentContent"></div>
    <div class="comment-details">
      <div class="comment-send-date">{{sendDate}}</div>
      <div class="like-comment"
           @click="clickToLikeComment"
      >
        <span v-html="svg.like"
              class="like-icon"
              :class="item.myLike ? 'active-icon' : ''"
        ></span>
        <span>{{item.likeCount}}</span>
      </div>
      <div class="unlike-comment"
           @click="clickToUnlikeComment"
      >
        <span v-html="svg.like"
              class="unlike-icon"
              :class="item.myUnlike ? 'active-icon' : ''"
        ></span>
      </div>
      <div class="reply-comment-user"
           @click="replyCommentUser">回复</div>
      <div class="comment-operations">
        <span v-html="svg.more"
              class="more-btn"
              @click="clickShowMoreBoard"></span>
        <transition name="fade">
          <div class="comment-more-board"
               v-show="visible.more.show"
               v-if="visible.more.render"
               @mouseleave="hiddenMoreBoard">
            <div v-if="commentDeletable"
                 @click="clickDeleteComment"
                 class="more-element">删除</div>
            <div v-if="myUid !== item.uid"
                 @click="clickReportComment"
                 class="more-element">举报</div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import {apis} from "@/assets/js/constants/request-path";
import {statusCode} from "@/assets/js/constants/status-code";
import {huadiaoPopupWindowOptions} from "@/pages/components/HuadiaoPopupWindow";
import {svg} from "@/assets/js/constants/svgs";

const ADD = "add";
const DELETE = "delete";

export default {
  name: "CommentInfer",
  props: ["item", "rootIndex", "subIndex", "rootCommentId", "subCommentId"],
  data() {
    return {
      visible: {
        more: {
          render: false,
          show: false,
        }
      },
      // 请求中
      requesting: {
        likeComment: false,
        unlikeComment: false
      },
    }
  },
  computed: {
    svg() {
      return {
        like: svg.like,
      };
    },
    sendDate() {
      return this.huadiaoDateFormat(this.item.commentDate);
    },
    ...mapState({
      /*三种情况可删除评论
        1. 自己发布的评论可删除
        2. 作者可删除
        3. 自己发布的根评论下的子评论可删除
        */
      commentDeletable(state) {
        return this.myUid === this.item.uid ||
            this.myUid === this.authorUid ||
            state.noteInfo.commentList[this.rootIndex].uid === this.myUid;
      },
      // 当为子评论时 subIndex 不为 null, 否则为 null
      myLike(state) {
        if(Number.isInteger(this.subIndex)) {
          return state.noteInfo.commentList[this.rootIndex].commentList[this.subIndex].myLike;
        }
        return state.noteInfo.commentList[this.rootIndex].myLike
      },
      myUnlike(state) {
        if(Number.isInteger(this.subIndex)) {
          return state.noteInfo.commentList[this.rootIndex].commentList[this.subIndex].myUnlike;
        }
        return state.noteInfo.commentList[this.rootIndex].myUnlike
      },
      myUid(state) {
        return state.user.uid;
      },
    })
  },
  methods: {
    // 点击显示更多操作面板
    clickShowMoreBoard() {
      this.visible.more.render= true;
      this.visible.more.show = !this.visible.more.show;
    },
    // 鼠标移出更多操作面板
    hiddenMoreBoard() {
      this.visible.more.show = false;
    },
    // 点击举报评论
    clickReportComment() {
      this.sendRequest({
        path: apis.note.comment.report,
        params: {
          uid: this.item.uid, // 被举报者
          authorUid: this.authorUid,
          noteId: this.$route.params.noteId,
          rootCommentId: this.rootCommentId,
          subCommentId: this.subCommentId
        },
        thenCallback: (response) => {
          let res = response.data;
          console.log(res);
          if(res.code === statusCode.SUCCEED) {
            this.huadiaoMiddleTip("举报成功！我们将会尽快审核！");
          }
          else {
            // 举报失败
          }
        },
        errorCallback: (error) => {
          console.log(error);
        }
      })
    },
    // 点击删除评论
    clickDeleteComment() {
      if(!this.subCommentId) {
        // 删除根评论弹窗提醒
        this.huadiaoPopupWindow(huadiaoPopupWindowOptions.iconType.warning,
            huadiaoPopupWindowOptions.operate.confirmOrCancel,
            "确认删除吗？该评论下的所有评论都会被删除！",
            this.deleteCommentRequest
        );
      }
      else {
        this.deleteCommentRequest();
      }
    },
    // 删除评论请求
    deleteCommentRequest() {
      this.sendRequest({
        path: apis.note.comment.delete,
        params: {
          uid: this.authorUid,
          noteId: this.$route.params.noteId,
          rootCommentId: this.rootCommentId,
          subCommentId: this.subCommentId,
        },
        thenCallback: (response) => {
          let res = response.data;
          console.log(res);
          if(res.code === statusCode.SUCCEED) {
            let commit = this.subCommentId ? "deleteSubCommit" : "deleteRootComment"
            this.$store.commit(commit, {rootIndex: this.rootIndex, subIndex: this.subIndex});
          }
          else {
            this.huadiaoMiddleTip("评论删除失败");
          }
        },
        errorCallback: (error) => {
          console.log(error);
        }
      })
    },
    // 回复评论者
    replyCommentUser(e) {
      // 隐藏其他根评论的输入框, 打开该回复按钮的根评论对应的输入框
      this.$bus.$emit("judgeClickObject", {
        pointerEvent: e,
        rootIndex: this.rootIndex,
        subIndex: this.subIndex,
      });
    },
    // 点击喜欢评论
    clickToLikeComment() {
      if(this.requesting.likeComment) {
        return;
      }
      this.requesting.likeComment = true;

      const like = apis.note.comment.like;
      let path = this.myLike ? like[DELETE] : like[ADD];

      this.sendCommentStatus({
        add: this.myLike,
        path,
        dispatch: "clickToLikeComment",
        failCallback: () => {
          this.huadiaoMiddleTip("点赞失败!");
        },
        cancelFailCallback: () => {
          this.huadiaoMiddleTip("取消点赞失败!");
        },
      });
    },
    // 点击不喜欢评论
    clickToUnlikeComment() {
      if(this.requesting.unlikeComment) {
        return;
      }
      this.requesting.unlikeComment = true;

      const unlike = apis.note.comment.unlike;
      let path = this.myUnlike ? unlike[DELETE] : unlike[ADD];

      this.sendCommentStatus({
        add: this.myUnlike,
        path,
        dispatch: "clickToUnlikeComment",
        failCallback: () => {
          this.huadiaoMiddleTip("不喜欢失败!");
        },
        cancelFailCallback: () => {
          this.huadiaoMiddleTip("取消不喜欢失败!");
        },
      });
    },
    sendCommentStatus({
                        add,
                        dispatch,
                        path,
                        failCallback,
                        cancelFailCallback,
                      }) {
      this.sendRequest({
        path,
        params: {
          uid: this.authorUid,
          noteId: this.$route.params.noteId,
          rootCommentId: this.rootCommentId,
          subCommentId: this.subCommentId,
        },
        thenCallback: (response) => {
          let res = response.data;
          console.log(res);

          if(res.code === 1000) {
            // 请求成功
            this.$store.commit(dispatch, {rootIndex: this.rootIndex, subIndex: this.subIndex, incr: add ? -1 : 1});
          } else {
            // 请求失败
            !add ? failCallback() : cancelFailCallback();
          }
          this.requesting.likeComment = this.requesting.unlikeComment = false;
        },
        errorCallback: (error) => {
          console.log(error);
          // 请求失败
          !add ? failCallback() : cancelFailCallback();
          this.requesting.likeComment = this.requesting.unlikeComment = false;
        }
      });
    },
  },
  beforeDestroy() {
  }
}
</script>

<style scoped>

.comment-infer {
  max-width: 100%;
  padding: 0 0 10px 20px;
  color: var(--comment-color);
}

.user-nickname {
  font-size: 14px;
}

.comment-content {
  word-break: break-all;
  padding: 10px 50px 10px 0;
}

.comment-content /deep/ a {
  margin: 0 3px;
  padding: 0 3px;
  color: #d00101!important;
  border-radius: 4px;
}

.comment-content /deep/ a:hover {
  background-color: #e7e7e7;
}

.comment-details {
  display: flex;
  color: #858585;
  font-size: 13px;
}

.comment-details>div {
  margin-right: 20px;
}

.comment-details /deep/ svg {
  width: 13px;
  height: 13px;
  fill: #858585;
  vertical-align: -1px;
}

.like-icon,
.unlike-icon {
  display: inline-block;
  width: 22px;
  height: 22px;
  text-align: center;
  line-height: 22px;
  margin-right: 3px;
  border-radius: 4px;
  cursor: pointer;
}

.comment-operations {
  width: 18px;
  height: 21px;
  text-align: center;
  line-height: 21px;
  border-radius: 4px;
  cursor: pointer;
}

.comment-operations span {
  border-radius: 4px;
}

.reply-comment-user {
  text-align: center;
  line-height: 22px;
  margin-right: 3px;
  padding: 0 3px;
  border-radius: 4px;
  cursor: pointer;
}

.like-icon:hover,
.unlike-icon:hover,
.reply-comment-user:hover,
.comment-operations span:hover {
  background-color: var(--comment-icon-hover-bg-color);
}

.unlike-icon {
  transform: rotateX(-180deg);
}

.like-comment:hover /deep/ svg,
.unlike-comment:hover /deep/ svg,
.comment-operations span:hover /deep/ svg,
.reply-comment-user:hover,
.active-icon /deep/ svg {
  fill: #e74444;
  color: #e74444;
}

.comment-operations /deep/ svg {
  vertical-align: -2px;
}

.comment-operations {
  position: relative;
}

.comment-more-board {
  position: absolute;
  z-index: 9;
  top: 26px;
  left: -13px;
  border-radius: 4px;
  color: var(--comment-more-coard-color);
  background-color: var(--comment-more-board-bg-color);
  box-shadow: var(--box-shadow-min);
  overflow: hidden;
}

.more-element {
  white-space: nowrap;
  padding: 4px 10px;
}

.more-element:hover {
  background-color: var(--comment-more-board-hover-bg-color);
}
</style>