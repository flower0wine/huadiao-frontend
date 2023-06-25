<template>
  <div class="like-me-details">
    <div class="like-message-info"
         v-for="(item, index) in likeMeMessage.likerList"
         :key="likeMeMessage.messageId + index"
    >
      <div class="user-avatar-box">
        <div class="default-user-avatar" v-html="svg.avatar"></div>
        <div class="user-avatar" :style="`background-image: ${addBackground(item.userAvatar)}`"></div>
      </div>
      <div class="details-info">
        <div class="user-info">
          <span class="nickname">
            <a href="#">{{item.nickname}}</a>
          </span>
          <span>赞了我</span>
        </div>
        <div class="like-date">{{changeDateFormat(item.likeDate)}}</div>
      </div>
      <div class="follow-user" @click="clickToChangeRelation(index)" ref="changeRelationBtn">{{judgeRelation(item.followed, item.following)}}</div>
    </div>
  </div>
</template>

<script>

export default {
  name: "LikeMeDetails",
  data() {
    return {
      svg: {
        avatar: `<svg t="1657536982283" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3627" width="200" height="200"><path d="M510.77050482 2.21923328c281.4240859 0 509.56537287 228.14128697 509.56537173 509.56653682 0 281.42757888-228.14128697 509.56653682-509.56537173 509.56653681-281.42757888 0-509.56886585-228.14012302-509.56886585-509.56653681 0-281.4240859 228.14128697-509.56653682 509.56886585-509.56653682z" fill="#EEEEEE" p-id="3628"></path><path d="M510.77050482 516.51164387c90.0558939 0 163.05952199-73.30168832 163.05952199-163.72549973 0-90.42264633-73.00362809-163.72433465-163.05952199-163.72433465-90.05705785 0-163.06301497 73.30168832-163.06301497 163.72433465-0.00116395 90.42497536 73.00479317 163.72549859 163.06301497 163.72549973z m251.51800206 200.09807531l1.21552441-0.45756757c-39.85964146-100.90130205-137.98992099-172.25861689-252.73352647-172.25861689-113.31967317 0-210.42537358 69.60155875-251.2141221 168.51890176l0.56235463 0.22820181a39.9609344 39.9609344 0 0 0-2.9188881 15.01940622c0 22.15886393 17.97555086 40.12510094 40.15420757 40.12509981 16.79146325 0 31.16701469-10.30401138 37.16196921-24.92522837l0.65433486 0.26545948c28.69987328-68.84360192 96.50958109-117.22355485 175.60014393-117.22355484 79.76934741 0 148.05874461 49.21940878 176.32433493 119.00725475l0.2875813-0.10828003c6.4338944 13.58499499 20.27037696 22.98434901 36.30970538 22.98434901 22.17516373 0 40.15187968-17.96507307 40.15187968-40.12509981a40.14256469 40.14256469 0 0 0-1.55549923-11.05032533z" fill="#CCCCCC" p-id="3629"></path></svg>`,
      }
    }
  },
  computed: {
    likeMeMessage() {
      let index = parseInt(this.$route.params.messageIndex);
      return this.$store.state.message.likeMeMessage[index];
    }
  },
  updated() {
  },
  methods: {
    // 改变日期格式
    changeDateFormat(date) {
      date = date.split(/[\s.:-]/);
      return `${date[0]}年${date[1]}月${date[2]}日 ${date[3]}:${date[4]}`;
    },
    // 点击改变关系, 关注或取消关注
    clickToChangeRelation(index) {
      this.$store.commit("clickToChangeRelation", {
        messageIndex: parseInt(this.$route.params.messageIndex),
        likerIndex: index
      });
    },
  },
  beforeDestroy() {
    this.clearAllRefsEvents();
  }
}
</script>

<style scoped>
.like-me-details {
  padding: 10px;
}

.like-message-info {
  height: 70px;
}

.user-avatar-box {
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-shadow: var(--box-shadow-min);
}

.default-user-avatar /deep/ svg {
  width: 40px;
  height: 40px;
}

.user-avatar {
  position: absolute;
  top: 0px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: center/cover no-repeat;
}

.like-message-info {
  display: flex;
  align-items: center;
}

.details-info {
  flex: 1;
  margin-left: 10px;
}

.user-info {
  font-size: 14px;
  margin-bottom: 10px;
}

.nickname {
  font-weight: 700;
  margin-right: 10px;
}

.nickname a {
  color: var(--message-text-color);
}

.like-date {
  font-size: 12px;
  color: #898989;
}

.follow-user {
  width: 70px;
  text-align: center;
  line-height: 24px;
  font-size: 14px;
  border-radius: 4px;
  border: 1px solid #a33636;
  color: #a33636;
  cursor: pointer;
}

.follow-user:hover {
  color: #fff;
  background-color: #a33636;
}
</style>