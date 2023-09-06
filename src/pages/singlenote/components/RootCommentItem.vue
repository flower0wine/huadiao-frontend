<template>
  <div class="root-comment-item">
    <div class="root-comment-box">
      <user-avatar-box :options="userAvatarOptions"/>
      <comment-infer :item="rootCommentItem"
                     :rootIndex="rootIndex"
                     :rootCommentId="rootCommentItem.commentId"/>
    </div>
    <div class="sub-comment-list">
      <sub-comment-item v-for="(item, index) in rootCommentItem.commentList"
                        :key="item.commentId"
                        :rootCommentId="rootCommentItem.commentId"
                        :subCommentItem="item"
                        :rootIndex="rootIndex"
                        :subIndex="index"
                        :data-sub-id="item.commentId"
      />
    </div>
    <div class="reply-box" ref="replyBox" v-if="visible.replyBox">
      <current-user-comment-board :publishComment="publishSubComment"
                                  :commentInputBoard="config.commentInputBoard"/>
    </div>
  </div>
</template>

<script>
import SubCommentItem from "@/pages/singlenote/components/SubCommentItem";
import CommentInfer from "@/pages/singlenote/components/CommentInfer";
import CurrentUserCommentBoard from "@/pages/singlenote/components/CurrentUserCommentBoard";
import {svg} from "@/assets/js/constants/svgs";
import UserAvatarBox from "@/pages/components/UserAvatarBox";

export default {
  name: "RootCommentItem",
  props: ["rootCommentItem", "rootIndex"],
  data() {
    return {
      userAvatarOptions: {
        href: `/homepage/${this.rootCommentItem.uid}`,
        userAvatar: this.rootCommentItem.userAvatar,
        scale: "44px",
        hover: true,
      },
      svg,
      // 发布评论中
      publishing: false,
      visible: {
        replyBox: false,
      },
      config: {
        commentInputBoard: {
          defaultPlaceholder: null,
        }
      },
    }
  },
  mounted() {
  },
  methods: {
    // 发布子评论
    publishSubComment(commentContent) {
      if(this.publishing || commentContent == null || commentContent.trim() === "") {
        return null;
      }
      this.publishing = true;
      let root = false;
      let comment = this.packageComment(commentContent);
      comment.commentId = this.rootCommentItem.commentId;

      this.addComment( {
        comment,
        root,
        rootCommentIndex: this.rootIndex,
        succeedCallback: () => {
          this.publishing = false;
        },
        failCallback: () => {
          this.huadiaoMiddleTip("回复失败!");
          this.publishing = false;
        },
      });
    },
  },
  beforeDestroy() {
  },
  components: {
    UserAvatarBox,
    CurrentUserCommentBoard,
    CommentInfer,
    SubCommentItem
  },
}
</script>

<style scoped>

.root-comment-item {
  position: relative;
  padding: 10px 0;
  border-bottom: 1px solid #d1d1d1;
}

.root-comment-box {
  display: flex;
}

.reply-box {
  width: 60%;
  padding-left: 63px;
}
</style>