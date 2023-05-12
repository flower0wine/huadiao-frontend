<template>
  <div class="homepage-user-infer-board">
    <div class="follow-or-chat"
         v-if="!viewedUserinfo.me"
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
          <span class="active-number">{{ numberGreaterThenTenThousand(viewedUserinfo.likeCount) }}</span>
          <span class="active-name">获赞数</span>
        </div>
      </div>
      <a href="/settings/information"
         v-if="viewedUserinfo.me"
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

export default {
  name: "HomepageUserInferBoard",
  props: ["viewedUserinfo", "uid"],
  data() {
    return {
      // 称呼
      name: null,
      // 关注
      follow: false,
      fan: false,
      svg: {
        follow: `<svg t="1677682035095" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6004" width="200" height="200"><path d="M512 26.54814777c147.456 0 266.9985189 119.5425189 266.9985189 266.9985189 0 95.86460445-50.51126557 179.92059221-126.37525333 227.00942222a483.87413333 483.87413333 0 0 1 173.91312554 94.9665189 36.40888889 36.40888889 0 1 1-47.21019221 55.45073778A410.78935666 410.78935666 0 0 0 512 572.6814811c-214.66680889 0-393.02181888 164.60458667-411.12917333 377.07472669a36.40888889 36.40888889 0 0 1-72.55077888-6.17737558c17.19713223-201.75379001 157.06794667-366.75887445 343.09309554-423.01060664C295.54915555 473.50366777 245.0014811 389.42340779 245.0014811 293.54666667c0-147.456 119.5425189-266.9985189 266.9985189-266.9985189z m473.25487445 713.82054002l1.21362888 1.15294776a33.93308445 33.93308445 0 0 1 0 49.39472555l-184.61733888 174.03448889a36.32393443 36.32393443 0 0 1-25.89885668 9.90321778 36.32393443 36.32393443 0 0 1-25.91099222-9.90321778l-106.02268444-99.9424a33.93308445 33.93308445 0 0 1 0-49.39472554l1.22576555-1.15294778a36.40888889 36.40888889 0 0 1 49.95299555 0l80.75491556 76.11885 159.34957113-150.21093888a36.40888889 36.40888889 0 0 1 49.95299555 0zM512 99.36592555c-107.24844999 0-194.18074112 86.93228999-194.18074112 194.18074112s86.93228999 194.18074112 194.18074112 194.18074112 194.18074112-86.93228999 194.18074112-194.18074112-86.93228999-194.18074112-194.18074112-194.18074112z" p-id="6005"></path></svg>`,
        access: `<svg t="1677592459291" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5060" width="200" height="200"><path d="M513.21756878 785.69417819c-13.51330625 0-26.4624144-5.43961969-35.92172863-15.09271676L41.38539915 325.82677141c-19.4450986-19.83780742-19.12269919-51.68325041 0.7168226-71.12663463 19.83780742-19.44166817 51.68496646-19.12269919 71.12663463 0.71682258l399.9887124 408.12242048L913.20628287 255.41695936c19.44166817-19.84123785 51.28539682-20.16535161 71.12663462-0.71682258 19.84123785 19.4450986 20.16192118 51.28882723 0.71682258 71.12663463L549.13929741 770.60146143C539.6799832 780.25455851 526.73259109 785.69417819 513.21756878 785.69417819z" p-id="5061"></path></svg>`,
      },
    }
  },
  computed: {
    // 面板头部
    userActiveConfig() {
      return [{
        name: "关注",
        number: this.numberGreaterThenTenThousand(this.viewedUserinfo.followCount),
        href: "/" + this.uid + "/followfan/follow"
      }, {
        name: "粉丝",
        number: this.numberGreaterThenTenThousand(this.viewedUserinfo.fanCount),
        href: "/" + this.uid + "/followfan/fan"
      }, {
        name: "收藏",
        number: this.numberGreaterThenTenThousand(this.viewedUserinfo.starCount),
        href: "/star/" + this.uid
      }];
    },
    // 面板下部
    otherConfig() {
      return [{
        href: "/huadiaohouse/" + this.uid,
        name: this.name + "番剧馆",
        count: 0,
      }, {
        name: this.name + "笔记",
        href: "/" + this.uid + "/notes",
        count: 0,
      }];
    },
    // 关注状态
    followStatus() {
      return !this.follow ? "关注" : this.fan ? "已互粉" : "已关注";
    },
  },
  created() {
    this.name = this.accordingSexToSetName(this.viewedUserinfo.me, this.viewedUserinfo.userInfo.sex);
  },
  mounted() {
    this.initialFollowStatus();
  },
  methods: {
    // 改变关注状态
    clickToChangeFollow() {
      let followStatus = this.follow ? "modify" : "newFriend";
      this.sendRequest({
        path: `relation/${followStatus}`,
        params: {
          uid: this.uid,
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
      if (!this.viewedUserinfo.me) {
        this.judgeMeAndOtherRelation(this.viewedUserinfo.relation);
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