<template>
  <div class="sub-comment-item">
    <div class="user-avatar-box">
      <a href="#">
        <div class="default-user-avatar" v-html="svg.avatar"></div>
        <div class="user-avatar" :style="`back-ground-image: ${addBackground(subCommentItem.userAvatar)}`"></div>
      </a>
    </div>
    <comment-infer :item="subCommentItem"
                   :rootIndex="rootIndex"
                   :subIndex="subIndex"
                   :rootCommentId="rootCommentId"
                   :subCommentId="subCommentItem.commentId"/>
  </div>
</template>

<script>
import CommentInfer from "@/pages/singlenote/components/CommentInfer";
export default {
  name: "SubCommentItem",
  props: ["rootCommentId", "subCommentItem", "rootIndex", "subIndex"],
  data() {
    return {
      svg: {
        avatar: `<svg t="1657536982283" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3627" width="200" height="200"><path d="M510.77050482 2.21923328c281.4240859 0 509.56537287 228.14128697 509.56537173 509.56653682 0 281.42757888-228.14128697 509.56653682-509.56537173 509.56653681-281.42757888 0-509.56886585-228.14012302-509.56886585-509.56653681 0-281.4240859 228.14128697-509.56653682 509.56886585-509.56653682z" fill="#EEEEEE" p-id="3628"></path><path d="M510.77050482 516.51164387c90.0558939 0 163.05952199-73.30168832 163.05952199-163.72549973 0-90.42264633-73.00362809-163.72433465-163.05952199-163.72433465-90.05705785 0-163.06301497 73.30168832-163.06301497 163.72433465-0.00116395 90.42497536 73.00479317 163.72549859 163.06301497 163.72549973z m251.51800206 200.09807531l1.21552441-0.45756757c-39.85964146-100.90130205-137.98992099-172.25861689-252.73352647-172.25861689-113.31967317 0-210.42537358 69.60155875-251.2141221 168.51890176l0.56235463 0.22820181a39.9609344 39.9609344 0 0 0-2.9188881 15.01940622c0 22.15886393 17.97555086 40.12510094 40.15420757 40.12509981 16.79146325 0 31.16701469-10.30401138 37.16196921-24.92522837l0.65433486 0.26545948c28.69987328-68.84360192 96.50958109-117.22355485 175.60014393-117.22355484 79.76934741 0 148.05874461 49.21940878 176.32433493 119.00725475l0.2875813-0.10828003c6.4338944 13.58499499 20.27037696 22.98434901 36.30970538 22.98434901 22.17516373 0 40.15187968-17.96507307 40.15187968-40.12509981a40.14256469 40.14256469 0 0 0-1.55549923-11.05032533z" fill="#CCCCCC" p-id="3629"></path></svg>`,
      }
    }
  },
  mounted() {
  },
  methods: {
  },
  beforeDestroy() {
  },
  components: {CommentInfer},
}
</script>

<style scoped>
.sub-comment-item {
  display: flex;
  margin-top: 10px;
  padding-left: 63px;
}

.user-avatar-box {
  position: relative;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  transition: var(--transition-500ms);
}

.user-avatar-box:hover {
  transform: translateY(-3px);
  box-shadow: var(--box-shadow-min);
}

.default-user-avatar /deep/ svg {
  width: 30px;
  height: 30px;
}

.user-avatar {
  position: absolute;
  top: 0px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>