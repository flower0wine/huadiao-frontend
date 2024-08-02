<template>
  <div class="message-item">
    <div class="user-avatar-container">
      <user-avatar-box :options="{
        href: homepage(item.uid),
        userAvatar: item.avatar,
        shadow: true,
        scale: '40px',
      }"/>
    </div>
    <like-message-content :item="item" :index="index"/>
    <div class="message-origin"
         v-text="content"
         @click="jumpLink"
    >
    </div>
  </div>
</template>

<script>
import LikeMessageContent from "@/pages/message/components/LikeMessageContent";
import UserAvatarBox from "@/pages/components/UserAvatarBox";
import {noteLink} from "@/util/huadiao-tool";
import {getNoteMessageType, isCommentType, isNoteType} from "@/assets/js/constants/message/like";

export default {
  name: "LikeMessageItem",
  components: {UserAvatarBox, LikeMessageContent},
  props: ["item", "index"],
  data() {
    return {
    }
  },
  computed: {
    content() {
      let type = getNoteMessageType(this.item);
      if (isCommentType(type)) {
        return this.item.comment;
      } else if (isNoteType(type)) {
        return this.item.noteTitle;
      } else {
        return "";
      }
    },
  },
  created() {
  },
  methods: {
    jumpLink() {
      // 评论和笔记均跳转到笔记
      window.open(noteLink(this.item.authorUid, this.item.noteId), "_blank");
    },
  },
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