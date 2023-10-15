<template>
  <div class="message-item">
    <div class="user-avatar-container" :class="userList.length > 1 && 'more-liker'">
      <user-avatar-box v-for="(item, index) in userList"
                       :key="index"
                       :options="{
        href: homepage(item.uid),
        userAvatar: item.avatar,
        shadow: true,
        scale: userList.length === 1 ? `40px` : `30px`,
      }"/>
    </div>
    <like-message-content :item="item" :index="index"/>
    <div class="message-origin"
         v-text="handleFunction.contentHandle()"
         @click="handleFunction.proceedPage"
         :style="item.type === 'video' ? `background-image: ${addBackground(item.video.cover)}` : ''"
    >
    </div>
  </div>
</template>

<script>
import LikeMessageContent from "@/pages/message/components/LikeMessageContent";
import UserAvatarBox from "@/pages/components/UserAvatarBox";
import {likeConstants} from "@/assets/js/constants/message/like";

export default {
  name: "LikeMessageItem",
  components: {UserAvatarBox, LikeMessageContent},
  props: ["item", "index"],
  data() {
    return {
      // 处理函数
      handleFunction: {
        contentHandle: null,
        proceedPage: null,
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
    this.initial();
  },
  methods: {
    initial() {
      if(this.item.type === likeConstants.note) {
        this.handleFunction.contentHandle = this.noteTitleHandle;
        this.handleFunction.proceedPage = this.proceedNotePage;
      }
      else if(this.item.type === likeConstants.comment) {
        this.handleFunction.contentHandle = this.commentHandle;
        this.handleFunction.proceedPage = this.proceedNotePage;
      }
    },
    commentHandle() {
      return this.likeItem.commentContent;
    },
    noteTitleHandle() {
      return this.likeItem.noteTitle;
    },
    proceedNotePage() {
      let url = this.noteLink(this.likeItem.authorUid, this.likeItem.noteId);
      this.openNewWindow(url);
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