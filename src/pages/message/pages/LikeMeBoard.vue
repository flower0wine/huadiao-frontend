<template>
  <div class="like-me-info">
    <div class="like-me-message-list">
      <like-message-item v-for="(item, index) in message"
                         :item="item"
                         :index="index"
                         :key="index"/>
      <div class="no-like-item" ref="noLikeItem">没有更多消息了...</div>
    </div>
  </div>
</template>

<script>
import LikeMessageItem from "@/pages/message/components/LikeMessageItem";
import {apis} from "@/assets/js/constants/request-path";
import {ResponseHandler} from "@/assets/js/utils";
import {mapMutations} from "vuex";

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
    ...mapMutations(['addLikeMessage']),

    initial() {
      this.getIntersectionObserver(this.getLikeMessage);
      this.observer.observe(this.$refs.noLikeItem);
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

        new ResponseHandler(res).succeed((data) => {
          console.log(data)

          this.addLikeMessage({
            messageList: Array.isArray(data) ? data : [],
          });

          let length = data.length;
          if(length < this.row) {
            this.hasNext = false;
            this.observer.unobserve(this.$refs.noLikeItem);
          }
        }).notExist(() => {
          this.hasNext = false;
          this.observer.unobserve(this.$refs.noLikeItem);
        });
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