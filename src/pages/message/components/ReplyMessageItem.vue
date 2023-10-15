<template>
  <div class="message-item">
    <div class="user-avatar-container">
      <user-avatar-box
          :options="{
        href: homepage(item.uid),
        userAvatar: item.avatar,
        shadow: true,
        scale: `40px`,
      }"/>
    </div>
    <reply-message-content :item="item" :index="index"/>
    <div class="message-origin"
         v-text="handleFunction.contentHandle()"
         @click="handleFunction.proceedPage"
         :style="item.type === 'video' ? `background-image: ${addBackground(item.video.cover)}` : ''"
    >
    </div>
  </div>
</template>

<script>
import UserAvatarBox from "@/pages/components/UserAvatarBox";
import ReplyMessageContent from "@/pages/message/components/ReplyMessageContent";

export default {
  props: ["item", "index"],
  name: "ReplyMessageItem",
  components: {ReplyMessageContent, UserAvatarBox},
  data() {
    return {
      // 处理函数
      handleFunction: {
        contentHandle: null,
        proceedPage: null,
      }
    }
  },
  created() {
    this.initial();
  },
  methods: {
    initial() {
      this.handleFunction.contentHandle = this.commentHandle;
      this.handleFunction.proceedPage = this.proceedNotePage;
    },
    commentHandle() {
      return this.item.noteTitle;
    },
    proceedNotePage() {
      let noteLink = this.noteLink(this.item.authorUid, this.item.noteId);
      this.openNewWindow(noteLink);
    },
    openNewWindow(url) {
      window.open(url, '_blank');
    }
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