<template>
  <div class="like-me-details">
    <div class="like-message-info-list">
      <div class="like-message-info"
           v-for="(item, index) in userList"
           :key="item.uid"
      >
        <div class="user-avatar-box">
          <div class="default-user-avatar" v-html="svg.avatar"></div>
          <div class="user-avatar" :style="generateUserAvatar(item.avatar)"></div>
        </div>
        <div class="details-info">
          <div class="user-info">
          <span class="nickname">
            <a :href="homepage(item.uid)">{{ getNickname(item) }}</a>
          </span>
            <span>{{myUid === item.uid ? '本人点赞' : '赞了我'}}</span>
          </div>
          <div class="like-date">{{ huadiaoDateFormat(item.likeTime) }}</div>
        </div>
        <div class="follow-user"
             v-if="myUid !== item.uid"
             @click="clickToChangeRelation(index)"
             ref="changeRelationBtn">
          {{ judgeRelation(item.fan, item.follow) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {svg} from "@/assets/js/constants/svgs";
import {statusCode} from "@/assets/js/constants/status-code";
import {apis} from "@/assets/js/constants/request-path";

export default {
  name: "LikeMeDetails",
  data() {
    return {
      svg,
      offset: 0,
      row: 10,
      hasNext: true,
      accessing: false,
      oldMessageIndex: null,
      userList: [],
      observer: null,
    }
  },
  watch: {
    "$route.params.messageIndex": {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        if (Number.isSafeInteger(oldValue)) {
          this.oldMessageIndex = oldValue;
        }
        if (Number.isSafeInteger(newValue) && newValue !== oldValue) {
          this.reset();
          this.getLikeUser();
        }
      }
    }
  },
  computed: {
    myUid() {
      return this.$store.state.user.uid;
    },
    noteId() {
      return this.$route.params.noteId;
    },
    path() {
      return this.$route.params.path;
    },
    params() {
      return this.$route.params.params;
    }
  },
  created() {
    this.jumpToLikeBoard();
  },
  mounted() {
    this.initial();
  },
  methods: {
    initial() {
      this.getIntersectionObserver(this.getLikeUser);
    },
    reset() {
      this.offset = 0;
      this.row = 10;
      this.hasNext = true;
      this.accessing = false;
      this.userList = [];
    },
    // 当通过链接直接跳转至该组件, 由于数据不齐全, 这里跳转点赞页面
    jumpToLikeBoard() {
      if (!this.path) {
        this.$router.replace({
          name: "likeMeBoard"
        })
      }
    },
    // 获取用户
    getLikeUser() {
      if (!this.hasNext || this.accessing) return;
      this.accessing = true;
      this.sendRequest({
        path: this.path,
        params: {
          ...this.params,
          offset: this.offset,
          row: this.row,
        },
      }).then((response) => {
        let res = response.data;
        console.log(res);
        if (res.code === statusCode.succeed) {
          this.addLikeUser(res.data);
          if(res.data.length < this.row) {
            this.hasNext = false;
          }
        }
        else if(res.code === statusCode.notExist) {
          this.hasNext = false;
        }
        this.accessing = false;
      }).catch((error) => {
        console.log(error);
        this.accessing = false;
      });
    },
    addLikeUser(userList) {
      this.userList.push(...userList);
    },
    // 点击改变关系, 关注或取消关注
    clickToChangeRelation(index) {
      let path = this.userList[index].follow ? apis.followFan.deleteFollow : apis.followFan.newFollow;
      this.sendRequest({
        path,
        params: {
          uid: this.userList[index].uid,
        },
      }).then((response) => {
        let res = response.data;
        console.log(res);
        if (res.code === statusCode.succeed) {
          this.changeFollowStatus(index);
        }
      });
    },
    // 改变关注状态
    changeFollowStatus(index) {
      this.userList[index].follow = !this.userList[index].follow;
    }
  },
  beforeDestroy() {
  }
}
</script>

<style scoped>
.like-me-details {
  height: 100%;
  overflow-y: auto;
}

.like-message-info-list {
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