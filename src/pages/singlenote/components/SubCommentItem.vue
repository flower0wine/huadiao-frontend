<template>
  <div class="sub-comment-item">
    <user-avatar-box :options="userAvatarOptions"/>
    <comment-infer :item="subCommentItem"
                   :rootIndex="rootIndex"
                   :subIndex="subIndex"
                   :rootCommentId="rootCommentId"
                   :subCommentId="subCommentItem.commentId"/>
  </div>
</template>

<script>
import CommentInfer from "@/pages/singlenote/components/CommentInfer";
import {svg} from "@/assets/js/constants/svgs";
import UserAvatarBox from "@/pages/components/UserAvatarBox";

export default {
  name: "SubCommentItem",
  props: ["rootCommentId", "subCommentItem", "rootIndex", "subIndex"],
  data() {
    return {
      svg,
      userAvatarOptions: {
        href: `/homepage/${this.subCommentItem.uid}`,
        userAvatar: this.subCommentItem.userAvatar,
        transitionTime: "500ms",
        scale: "30px",
        hover: true,
      },
    }
  },
  mounted() {
  },
  methods: {
  },
  beforeDestroy() {
  },
  components: {UserAvatarBox, CommentInfer},
}
</script>

<style scoped>
.sub-comment-item {
  display: flex;
  padding-left: 63px;
}
</style>