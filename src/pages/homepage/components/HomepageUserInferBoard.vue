<template>
  <div class="homepage-user-infer-board">
    <div class="follow-or-chat"
         v-if="!userInfer.me"
    >
      <div class="chat-container">
        <img src="/svg/chat.svg"
             class="chat-icon"
             alt>
        <span>私信</span>
      </div>
      <div class="follow-container"
           @click="clickToChangeFollow"
           ref="followContainer">
        <img src="/svg/follow.svg"
             class="followed-icon"
             v-if="following"
             alt>
        <span ref="followWord"></span>
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
          <span class="active-number">{{ numberGreaterThenTenThousand(userInfer.likeNumber) }}</span>
          <span class="active-name">获赞数</span>
        </div>
      </div>
      <a href="/settings/information"
         v-if="!userInfer.me"
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
            <img src="/svg/blackAccess.svg"
                 alt>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomepageUserInferBoard",
  props: ["userInfer"],
  data() {
    return {
      following: this.userInfer.following,
      // 称呼
      name: this.accordingSexToSetName(),
      // 面板头部
      userActiveConfig: [{
        name: "关注",
        number: this.numberGreaterThenTenThousand(this.userInfer.followNumber),
        href: "/" + this.userInfer.uid + "/follow/follow"
      }, {
        name: "粉丝",
        number: this.numberGreaterThenTenThousand(this.userInfer.fansNumber),
        href: "/" + this.userInfer.uid + "/follow/fan"
      }, {
        name: "收藏",
        number: this.numberGreaterThenTenThousand(this.userInfer.starNumber),
        href: "/star/" + this.userInfer.uid
      }],
    }
  },
  computed: {
    // 面板下部
    otherConfig() {
      return [{
        href: "/huadiaohouse/" + this.userInfer.uid,
        name: this.name + "番剧馆",
      }, {
        name: this.name + "笔记",
        href: "/" + this.userInfer.uid + "/notes"
      }]
    }
  },
  mounted() {
    this.initialUserInferBoard();
  },
  methods: {
    // 根据性别以及是否是我来更新称呼, 他, 她, 我
    accordingSexToSetName() {
      if (this.userInfer.me) {
        return "我的";
      } else {
        let sex = this.userInfer.sex;
        // 陌生人
        if (sex === "0") {
          return "";
        } else if (sex === "1") {
          return "他的";
        } else if (sex === "2") {
          return "她的";
        }
      }
    },
    // 如果数字大于一万
    numberGreaterThenTenThousand(number) {
      return number > 10000 ? number.toFixed(1) + "万" : number;
    },
    // 改变关注状态
    clickToChangeFollow() {
      if (!this.userInfer.me) {
        this.following = !this.following;
        if (this.following) {
          this.$refs.followContainer.classList.replace("unfollow", "following");
        } else {
          this.$refs.followContainer.classList.replace("following", "unfollow");
        }
        this.changeFollowWord();
      }
    },
    // 初始化
    initialUserInferBoard() {
      if (!this.userInfer.me) {
        let className = this.following ? "following" : "unfollow";
        this.$refs.followContainer.classList.add(className);
        this.changeFollowWord();
      }
    },
    // 改变关注信息
    changeFollowWord() {
      this.$refs.followWord.innerText = !this.following ? "关注" : this.userInfer.followed ? "已互粉" : "已关注";
    }
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

.chat-icon {
  width: 20px;
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

.followed-icon {
  width: 20px;
  margin-right: 4px;
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
.other-user-infer-item:hover {
  color: #CE5050;
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
  margin-top: 8px;
  font-size: 16px;
  letter-spacing: 1px;
  color: #534f4f;
  cursor: pointer;
}

.other-user-infer img {
  float: right;
  height: 15px;
  transform: rotate(-90deg);
}
</style>