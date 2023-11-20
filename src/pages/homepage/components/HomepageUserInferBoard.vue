<template>
  <div class="homepage-user-infer-board">
    <div class="follow-or-chat"
         v-if="!me"
    >
      <div class="chat-container">
        <span v-html="svg.chat"
              class="chat-icon"></span>
        <span>私信</span>
      </div>
      <div class="follow-container"
           @click="clickToChangeFollow"
           ref="followContainer">
        <span v-html="svg.follow"
              class="followed-icon"
              v-if="follow"></span>
        <span>{{ followStatus }}</span>
      </div>
    </div>
    <div class="user-infer-board-container">
      <div class="user-active">
        <a v-for="(item, index) in userActiveConfig"
           :href="item.href"
           :key="index"
           target="_blank"
        >
          <div class="user-active-item">
            <span class="active-number">{{ item.number }}</span>
            <span class="active-name">{{ item.name }}</span>
          </div>
        </a>
        <div class="user-active-item">
          <span class="active-number">{{ numberGreaterThenTenThousand(viewedUserInfo.noteLikeCount) }}</span>
          <span class="active-name">获赞数</span>
        </div>
      </div>
      <a href="/account/info"
         v-if="me"
      >
        <div class="modify-user-infer">
          <span>修改用户信息</span>
        </div>
      </a>
      <div class="other-user-infer">
        <a v-for="(item, index) in otherConfig"
           :key="index"
           :href="item.href"
           target="_blank"
        >
          <div class="other-user-infer-item">
            <span>{{ item.name }}</span>
            <span>{{ item.count }}</span>
            <span class="access-icon" v-html="svg.access"></span>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import {svg} from "@/assets/js/constants/svgs";
import {mapState} from "vuex";
import {apis} from "@/assets/js/constants/request-path";

export default {
  name: "HomepageUserInferBoard",
  data() {
    return {
      // 称呼
      name: null,
      // 关注
      follow: false,
      fan: false,
      svg: {
        chat: svg.chat,
        access: svg.access,
        follow:  svg.follow,
      },
    }
  },
  computed: {
    ...mapState({
      viewedUserInfo(state) {
        return state.allInfo;
      }
    }),
    // 面板头部
    userActiveConfig() {
      return [{
        name: "关注",
        number: this.numberGreaterThenTenThousand(this.viewedUserInfo.followCount),
        href: `/followfan/${this.viewedUid}/follow`
      }, {
        name: "粉丝",
        number: this.numberGreaterThenTenThousand(this.viewedUserInfo.fanCount),
        href: `/followfan/${this.viewedUid}/fan`
      }, {
        name: "收藏",
        number: this.numberGreaterThenTenThousand(this.viewedUserInfo.noteStarCount),
        href: "/star/" + this.viewedUid
      }];
    },
    // 面板下部
    otherConfig() {
      return [{
        href: "/animehouse/" + this.viewedUid,
        name: this.name + "番剧馆",
        count: this.viewedUserInfo.animeCount,
      }, {
        name: this.name + "笔记",
        href: `/notes/${this.viewedUid}`,
        count: this.viewedUserInfo.noteCount,
      }];
    },
    // 关注状态
    followStatus() {
      return !this.follow ? "关注" : this.fan ? "已互粉" : "已关注";
    },
  },
  created() {
    this.name = this.accordingSexToSetName(this.me, this.viewedUserInfo.userInfo.sex);
  },
  mounted() {
    this.initialFollowStatus();
  },
  methods: {
    // 改变关注状态
    clickToChangeFollow() {
      let path = this.follow ? apis.followFan.deleteFollow : apis.followFan.newFollow;
      this.sendRequest({
        path,
        params: {
          uid: this.viewedUid,
        },
        thenCallback: (response) => {
          let res = response.data;
          console.log(res);
          this.follow = !this.follow;
          if (this.follow) {
            this.$refs.followContainer.classList.replace("unfollow", "following");
          } else {
            this.$refs.followContainer.classList.replace("following", "unfollow");
          }
        },
        errorCallback: (error) => {
          console.log(error);
        }
      })
    },
    // 初始化关注状态
    initialFollowStatus() {
      // 如果不是本人
      if (!this.me) {
        this.judgeMeAndOtherRelation(this.viewedUserInfo.relation);
        let className = this.follow ? "following" : "unfollow";
        this.$refs.followContainer.classList.add(className);
      }
    },
  },
  beforeDestroy() {
    this.clearAllRefsEvents();
  }
}
</script>

<style scoped>
.user-infer-board-container {
  display: flex;
  justify-content: center;
}

.follow-or-chat {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 300px;
  color: #EEEEEEFF;
}

.chat-icon /deep/ svg {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}

.chat-container {
  cursor: pointer;
  transition: var(--transition-500ms);
}

.chat-container:hover {
  transform: translateY(-3px);
}

.follow-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 36px;
  padding: 10px 15px;
  border-radius: 18px;
  cursor: pointer;
  /* 不换行 */
  white-space: nowrap;
  overflow: hidden;
  transition: var(--transition-500ms);
}

.followed-icon /deep/ svg {
  width: 20px;
  height: 20px;
  margin-right: 4px;
  fill: #fff;
}

.following {
  width: 102px;
  background-color: #B9B9B9;
}

.unfollow {
  width: 62px;
  background-color: #DF7233;
}

.following:hover {
  background-color: #A1A1A1;
}

.unfollow:hover {
  background-color: #C4642D;
}

.user-infer-board-container {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 1000px;
  height: 200px;
  margin: 10px auto 0;
  padding: 10px 15px;
  border-radius: 8px;
  background-color: #FFFFFFBC;
}

.user-active {
  display: flex;
  width: 100%;
  padding: 10px 300px;
  justify-content: space-between;
  border-bottom: 1px solid #877e7e;
}

.user-active-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.active-number {
  color: #6d6666;
}

.active-name {
  color: #857e7e;
}

.user-active-item:hover .active-name,
.user-active-item:hover .active-number,
.modify-user-infer:hover,
.other-user-infer-item:hover,
.other-user-infer-item:hover span:nth-child(2),
.other-user-infer-item:hover /deep/ svg {
  color: #CE5050;
  fill: #CE5050;
}

.modify-user-infer {
  position: absolute;
  top: 46px;
  right: 15px;
  color: #534e4e;
  font-size: 14px;
  cursor: pointer;
}

.other-user-infer {
  padding: 0 100px;
}

.other-user-infer-item {
  display: flex;
  align-items: center;
  padding: 7px;
  font-size: 16px;
  letter-spacing: 1px;
  color: #534f4f;
  cursor: pointer;
}

.other-user-infer-item span:nth-child(2) {
  margin: 0 15px 0 auto;
  color: #969696;
}

.other-user-infer /deep/ svg {
  float: right;
  width: 14px;
  height: 14px;
  fill: #969696;
  transform: rotate(-90deg);
}

</style>