<template>
  <div class="reply-me-board">
    <div class="reply-me-list">
      <like-reply-message-item v-for="(item, index) in message"
                               :key="item.messageId"
                               :item="item"
                               :index="index"
                               :messageType="'reply'"
      />
    </div>
  </div>
</template>

<script>
import LikeReplyMessageItem from "@/pages/message/components/LikeReplyMessageItem";
export default {
  name: "ReplyMeBoard",
  components: {LikeReplyMessageItem},
  data() {
    return {

    }
  },
  computed: {
    message() {
      return this.$store.state.message.replyMeMessage;
    }
  },
  methods: {},
  beforeDestroy() {
  }
}
</script>

<style scoped>
.reply-me-board {
  padding: 0 10px;
}
</style>