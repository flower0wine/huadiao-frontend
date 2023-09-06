<template>
  <div class="logged-bar-container"
       ref="loggedBarContainer"
       :style="LoggedBoardAttachStyle"
  >
    <div class="logged-bar-nickname">{{ user.nickname }}</div>
    <div class="logged-bar">
      <a :href="`/followfan/${user.uid}/follow`" class="logged-bar-follows">
        <em>{{ user.follow }}</em>
        <span>关注</span>
      </a>
      <a :href="`/followfan/${user.uid}/fan`" class="logged-bar-fans">
        <em>{{ user.fan }}</em>
        <span>粉丝</span>
      </a>
    </div>
    <div class="logged-bar-links">
      <a :href="item.href"
         v-for="(item, index) in loggedBoardConfig"
         :key="index"
      >
        <span>{{ item.content }}</span>
        <span class="entry-icon" v-html="svg.access" :style="'fill: ' + boardStyle.accessColor"></span>
      </a>
    </div>
    <div class="logged-bar-logout" @click="clickToLogoutHuadiao">
      <div>退出登录</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoggedBoard",
  props: ["user", "boardStyle"],
  data() {
    return {
      loggedBoardConfig: [{
        href: '/homepage/' + this.user.uid,
        content: "个人主页",
      }, {
        href: '/' + this.user.uid + '/notes',
        content: "我的笔记",
      }, {
        href: '/huadiaohouse/' + this.user.uid,
        content: "我喜欢的番剧",
      }],
      svg: {
        access: `<svg t="1677592459291" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5060" width="200" height="200"><path d="M513.21756878 785.69417819c-13.51330625 0-26.4624144-5.43961969-35.92172863-15.09271676L41.38539915 325.82677141c-19.4450986-19.83780742-19.12269919-51.68325041 0.7168226-71.12663463 19.83780742-19.44166817 51.68496646-19.12269919 71.12663463 0.71682258l399.9887124 408.12242048L913.20628287 255.41695936c19.44166817-19.84123785 51.28539682-20.16535161 71.12663462-0.71682258 19.84123785 19.4450986 20.16192118 51.28882723 0.71682258 71.12663463L549.13929741 770.60146143C539.6799832 780.25455851 526.73259109 785.69417819 513.21756878 785.69417819z" p-id="5061"></path></svg>`,
      }
    }
  },
  computed: {
    LoggedBoardAttachStyle() {
      let color = "--textColor: " + this.boardStyle.textColor + ";";
      let backgroundImage = "background-image: " + this.boardStyle.background + ";";
      let shadow = this.boardStyle.shadow ? "box-shadow: var(--box-shadow-min)" : "";
      return color + backgroundImage + shadow;
    }
  },
  methods: {
    // 退出登录
    clickToLogoutHuadiao() {
      this.sendRequest({
        path: "logoutHuadiao",
        thenCallback: () => {
          window.location.href = "/";
        },
        errorCallback: (error) => {
          if (error.response.status === 500) {
            this.huadiaoMiddleTip("可能由于服务器的原因导致退出登录失败!");
          } else {
            this.huadiaoMiddleTip("退出登录失败");
          }
        }
      })
    }
  },
  beforeDestroy() {
  }
}
</script>

<style scoped>

/* 用户面板 */
.logged-bar-container {
  position: absolute;
  z-index: 1;
  top: 69px;
  right: -8px;
  width: 224px;
  padding-bottom: 12px;
  border-radius: 18px;
  --textColor: "";
  transition: var(--transition-400ms);
}

/* 用户昵称 */
.logged-bar-nickname {
  font-size: 18px;
  color: var(--textColor);
  font-weight: 700;
  text-align: center;
  margin-top: 37px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 用户关注及粉丝 */
.logged-bar {
  display: block;
  height: 70px;
  padding: 10px 0 10px 0;
  margin: 0 40px 0 40px;
  border-bottom: 1px solid var(--textColor);
}

/* 关注 */
.logged-bar a {
  display: flex;
  flex-direction: column;
}

.logged-bar .logged-bar-follows {
  float: left;
}

.logged-bar .logged-bar-fans {
  float: right;
}

/* 关注粉丝 */
.logged-bar-follows span,
.logged-bar-fans span {
  font-size: 14px;
}

/* 数量 */
.logged-bar-follows em,
.logged-bar-fans em {
  font-size: 18px;
  font-weight: 700;
}

/* 共同样式 */
.logged-bar-follows span,
.logged-bar-follows em,
.logged-bar-fans span,
.logged-bar-fans em {
  text-align: center;
  color: var(--textColor);
}

/* 下面是面板的各种链接 */
.logged-bar-links {
  margin: 10px 40px 0 40px;
  border-bottom: 1px solid var(--textColor);
}

/* 每个链接 */
.logged-bar-links a {
  display: block;
  color: var(--textColor);
  margin: 15px 0 15px 0;
}

.logged-bar-links a span {
  font-size: 16px;
}

.logged-bar-links .entry-icon {
  /* 旋转是有要求的 ，加浮动 或 display：inline-block*/
  float: right;
  transform: rotate(-90deg);
}

.entry-icon /deep/ svg {
  width: 15px;
  height: 15px;
}

.logged-bar-logout div {
  text-align: center;
  margin-top: 10px;
  color: var(--textColor);
}
</style>