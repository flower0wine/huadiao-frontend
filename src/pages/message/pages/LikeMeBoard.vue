<template>
  <div class="like-me-info">
    <div class="like-me-message-list">
      <like-reply-message-item v-for="(item, index) in message"
                               :item="item"
                               :index="index"
                               :messageType="'like'"
                               :key="item.messageId"/>
    </div>
  </div>
</template>

<script>
import LikeReplyMessageItem from "@/pages/message/components/LikeReplyMessageItem";
export default {
  name: "LikeMeBoard",
  components: {LikeReplyMessageItem},
  data() {
    return {

    }
  },
  computed: {
    message() {
      return this.$store.state.message.likeMeMessage;
    },
  },
  methods: {

  },
  beforeDestroy() {
    this.clearAllRefsEvents();
  }
}
</script>

<style scoped>
.like-me-info {
  padding: 0 10px;
}
</style>