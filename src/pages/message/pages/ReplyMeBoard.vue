<template>
  <div class="reply-me-board">
    <div class="reply-me-list">
      <reply-message-item v-for="(item, index) in message"
                          :key="getReplyKey(item)"
                          :item="item"
                          :index="index"
      />
      <div class="no-reply-item" ref="noReplyItem">没有更多消息了...</div>
    </div>
  </div>
</template>

<script>
import ReplyMessageItem from "@/pages/message/components/ReplyMessageItem";
import {apis} from "@/assets/js/constants/request-path";
import {statusCode} from "@/assets/js/constants/status-code";

export default {
  name: "ReplyMeBoard",
  components: {ReplyMessageItem},
  data() {
    return {
      offset: 0,
      row: 10,
      hasNext: true,
      accessing: false,
      observer: null,
    }
  },
  computed: {
    message() {
      return this.$store.state.message.replyMeMessage;
    }
  },
  mounted() {
    this.initial();
  },
  methods: {
    initial() {
      this.getIntersectionObserver(this.getReplyMessage);
      this.observer.observe(this.$refs.noReplyItem);
    },
    getReplyMessage() {
      if (!this.hasNext || this.accessing) return;
      this.accessing = true;
      this.sendRequest({
        path: apis.message.replyGet,
        params: {
          offset: this.offset,
          row: this.row,
        }
      }).then((response) => {
        let res = response.data;
        console.log(res);
        if (res.code === statusCode.SUCCEED) {
          let maxLength = Math.max(res.data.replyMessageList.length);
          this.$store.dispatch("addReplyMessage", {listArray: [res.data.replyMessageList]});
          this.offset += maxLength;
          if(maxLength < this.row) {
            this.hasNext = false;
            this.observer.unobserve(this.$refs.noReplyItem);
          }
        }
        else if(res.code === statusCode.NOT_EXIST) {
          this.hasNext = false;
          this.observer.unobserve(this.$refs.noReplyItem);
        }
        this.accessing = false;
      }).catch((error) => {
        console.log(error);
        this.accessing = false;
      });
    },
    getReplyKey(item) {
      return this.getKey([item.noteId, item.authorUid, item.rootCommentId, item.subCommentId, item.uid]);
    }
  },
  beforeDestroy() {
  }
}
</script>

<style scoped>
.reply-me-board {
  height: 100%;
  overflow-y: auto;
}

.reply-me-list {
  padding: 0 10px;
}

.no-reply-item {
  text-align: center;
  font-size: 14px;
  margin-top: 20px;
  color: #929292;
}
</style>