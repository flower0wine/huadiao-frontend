<template>
  <div class="like-me-info">
    <div class="like-me-message-list">
      <like-message-item v-for="(item, index) in message"
                         :item="item"
                         :index="index"
                         :key="getLikeKey(item)"/>
      <div class="no-like-item" ref="noLikeItem">没有更多消息了...</div>
    </div>
  </div>
</template>

<script>
import LikeMessageItem from "@/pages/message/components/LikeMessageItem";
import {apis} from "@/assets/js/constants/request-path";
import {statusCode} from "@/assets/js/constants/status-code";

export default {
  name: "LikeMeBoard",
  components: {LikeMessageItem},
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
      return this.$store.state.message.likeMessage;
    },
  },
  mounted() {
    this.initial();
  },
  methods: {
    initial() {
      this.getIntersectionObserver(this.getLikeMessage);
      this.observer.observe(this.$refs.noLikeItem);
    },
    getLikeKey(item) {
      return this.getKey([item.likeMessageItem.noteId, item.likeMessageItem.authorUid,
        item.likeMessageItem.rootCommentId, item.likeMessageItem.subCommentId]);
    },
    // 获取点赞消息
    getLikeMessage() {
      if(!this.hasNext || this.accessing) return;
      this.accessing = true;
      this.sendRequest({
        path: apis.message.likeGet,
        params: {
          offset: this.offset,
          row: this.row,
        }
      }).then((response) => {
        let res = response.data;
        console.log(res);
        if (res.code === statusCode.SUCCEED) {
          let maxLength = Math.max(res.data.likeNoteMessageList.length, res.data.likeCommentMessageList.length);
          this.offset += maxLength;
          this.$store.dispatch("addLikeMessage", {
            listArray: [res.data.likeCommentMessageList, res.data.likeNoteMessageList]
          });
          if(maxLength < this.row) {
            this.hasNext = false;
            this.observer.unobserve(this.$refs.noLikeItem);
          }
        }
        else if(res.code === statusCode.NOT_EXIST) {
          this.hasNext = false;
          this.observer.unobserve(this.$refs.noLikeItem);
        }
        this.accessing = false;
      }).catch((error) => {
        console.log(error);
        this.accessing = false;
      })
    },
  },
  beforeDestroy() {
  }
}
</script>

<style scoped>
.like-me-info {
  height: 100%;
  overflow-y: auto;
}

.like-me-message-list {
  padding: 0 10px;
}

.no-like-item {
  text-align: center;
  font-size: 14px;
  margin-top: 20px;
  color: #929292;
}
</style>