<template>
  <div class="huadiao-header"
       ref="huadiaoHeader"
       :style="huadiaoHeaderAttachStyle"
  >
    <!-- 左侧图标 -->
    <ul class="left-entry">
      <li class="huadiao-index">
        <a href="/" title="花凋--不一样的世界">
          <img class="huadiao-logo" :src="huadiaoIndexHeaderConfig.logoPath" alt="">
        </a>
      </li>
    </ul>
    <huadiao-search :inputTheme="boardConfig.inputTheme"/>
    <div class="vue-slot">
      <slot></slot>
    </div>
    <!-- 右侧图标 -->
    <ul class="right-entry">
      <li v-for="(rightEntry, index) in huadiaoIndexHeaderConfig.rightEntry"
          :key="index">
        <a :href="rightEntry.url" class="right-icon"
           :style="'color: ' + boardConfig.entryColor + '; fill: ' + boardConfig.entryColor">
          <span v-html="rightEntry.svg"></span>
          <span>{{ rightEntry.description }}</span>
        </a>
      </li>
      <!--头像-->
      <li class="index-head-user-avatar"
          @mouseenter="mouseEnterAvatar"
          @mouseleave="mouseLeaveAvatar"
          ref="indexUserAvatar"
      >
        <a :href="huadiaoIndexHeaderConfig.avatar.src"
           :title="huadiaoIndexHeaderConfig.avatar.title"
           class="avatar-box"
           target="_blank"
           ref="avatarBox"
        >
          <img src="/svg/noLoginAvatar.svg"
               class="user-avatar-box"
               :class="isLogin ? '' : 'no-logged'"
               alt=""
          >
          <div v-if="isLogin && userConfig.hasAvatar"
               class="user-avatar-box logged-avatar"
               :style="'border: 2px solid ' + boardConfig.loggedBoardStyle.borderColor"
               ref="avatar"
          ></div>
        </a>
        <!--未登录组件-->
        <template v-if="!isLogin">
          <div class="login-box">登录</div>
          <transition name="fade">
            <no-login-board v-show="isMouseEnter.enterAvatar"
                            :noLogin="huadiaoIndexHeaderConfig.noLogin"
            />
          </transition>
        </template>
        <!--已登录组件-->
        <template v-if="isLogin">
          <transition name="fade">
            <logged-board v-show="isMouseEnter.enterAvatar"
                          :user="user"
                          :boardStyle="boardConfig.loggedBoardStyle"
            />
          </transition>
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
import NoLoginBoard from "@/pages/components/NoLoginBoard";
import LoggedBoard from "@/pages/components/LoggedBoard";
import {INDEX_TIPS} from "@/assets/js/tips";
import HuadiaoSearch from "@/pages/components/HuadiaoSearch";
import constants from "@/assets/js/constants";

export default {
  name: "HuadiaoHeader",
  props: ["isLogin", "user", "huadiaoHeaderStyle"],
  data() {
    return {
      // 鼠标是否进入
      isMouseEnter: {
        // 进入头像框
        enterAvatar: false
      },
      // 用户配置
      userConfig: {
        // 是否上传了头像
        hasAvatar: false,
      },
      // 首页头部配置
      huadiaoIndexHeaderConfig: {
        // logo 路径
        logoPath: "/img/authority.png",
        // 头像配置
        avatar: {
          title: this.isLogin ? INDEX_TIPS.LOGGED : INDEX_TIPS.NOT_LOGGED,
          src: this.isLogin ? '/homepage/' + this.user.uid : constants.wrongLink,
        },
        // 头部右侧配置
        rightEntry: [{
          description: "历史",
          svg: `<svg t="1677554746272" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4761" width="200" height="200"><path d="M511.99772445 2.27555555C230.48419555 2.27555555 2.27555555 230.48419555 2.27555555 511.99772445S230.48419555 1021.72444445 511.99772445 1021.72444445 1021.72444445 793.51125333 1021.72444445 511.99772445 793.51125333 2.27555555 511.99772445 2.27555555z m402.60380444 679.75168c-93.5424 221.46616889-348.90752 325.17006222-570.37482667 231.62766223S19.05664 564.74737778 112.59904 343.28007111 461.50656 18.11000889 682.97386667 111.65240889c191.15690667 80.74012445 298.74631111 285.18627555 257.05358222 488.46279111a436.90097778 436.90097778 0 0 1-25.42592 81.91203555z" p-id="4762"></path><path d="M547.62496 496.79815111V220.86656c0-20.08974222-16.28615111-36.37475555-36.37475555-36.37475555s-36.37475555 16.28615111-36.37475556 36.37475555v306.06791111l229.24060444 229.24060444c14.20515555 14.20515555 37.23719111 14.20515555 51.44234667 0s14.20515555-37.23719111 0-51.44234666L547.62496 496.79815111z" p-id="4763"></path></svg>`,
          url: this.isLogin ? "/history" : constants.wrongLink,
        }, {
          description: "消息",
          svg: `<svg t="1677554846449" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4906" width="200" height="200"><path d="M948.90666667 75.09333333H75.09333333a72.81777778 72.81777778 0 0 0-72.81777778 72.81777778v764.58666667a72.81777778 72.81777778 0 0 0 72.81777778 72.81777777h873.81333334a72.81777778 72.81777778 0 0 0 72.81777778-72.81777777V147.91111111a72.81777778 72.81777778 0 0 0-72.81777778-72.81777778z m0 72.81777778v133.87548444l-429.44284445 290.47011556L75.09333333 271.66492445V147.91111111h873.81333334zM75.09333333 912.49777778V359.59239111l423.98151112 286.75640889a36.37248 36.37248 0 0 0 40.77795555 0L948.90666667 369.67765333V912.49777778H75.09333333z" p-id="4907"></path></svg>`,
          url: this.isLogin ? "/message" : constants.wrongLink,
        }],
        // 未登录面板配置
        noLogin: [{
          description: "发布博客",
          svg: "/svg/blog.svg"
        }, {
          description: "发布视频",
          svg: "/svg/fanju.svg"
        }, {
          description: "标记喜欢的番剧",
          svg: "/svg/fanju.svg"
        }],
      },
      boardConfig: {
        blur: false,
        shadow: false,
        backgroundColor: "transparent",
        // 右侧入口颜色
        entryColor: "#fff",
        // 输入框颜色
        inputTheme: {
          searchIconColor: "#fff",
          textColor: "#fff",
          inputBackgroundColor: "#E06969A2",
          searchBackgroundColor: "#E314148A",
        },
        // 登录面板
        loggedBoardStyle: {
          shadow: false,
          borderColor: "#7C0628C1",
          textColor: "#dad5d5",
          accessColor: "#fff",
          background: "-webkit-linear-gradient(left bottom, #454440b9, #84041bb6)",
        }
      }
    }
  },
  computed: {
    huadiaoHeaderAttachStyle() {
      let blur = this.boardConfig.blur ? 'backdrop-filter: blur(3px);' : '';
      let shadow = this.boardConfig.shadow ? 'box-shadow: var(--box-shadow-min);' : '';
      let background = "background-color: " + this.boardConfig.backgroundColor + ";";
      return blur + shadow + background;
    }
  },
  beforeMount() {
    // 判断用户是否具有头像
    this.checkHasAvatar();
  },
  mounted() {
    // 设置用户信息
    this.initialUserInfer();
    // 修改默认配置
    this.modifySrcObject(this.boardConfig, this.huadiaoHeaderStyle);
  },
  methods: {
    // 判断用户头像是否存在, 存在则在 v-if 渲染前设置 hasAvatar, 否则 $refs 中获取不到标签
    checkHasAvatar() {
      if (this.user.userAvatar) {
        this.userConfig.hasAvatar = true;
      }
    },
    // 初始化用户信息
    initialUserInfer() {
      // 如果登录并且上传了头像
      if (this.isLogin && this.userConfig.hasAvatar) {
        this.$refs.avatar.style.backgroundImage = "url('" + this.user.userAvatar + "')";
      }
    },
    // 鼠标进入头像
    mouseEnterAvatar() {
      this.isMouseEnter.enterAvatar = true;
      if (this.isLogin && this.$refs.avatarBox) {
        this.$refs.avatarBox.classList.add("mouse-enter-logged-avatar");
      }
    },
    // 鼠标离开头像
    mouseLeaveAvatar() {
      this.isMouseEnter.enterAvatar = false;
      if (this.isLogin && this.$refs.avatarBox) {
        this.$refs.avatarBox.classList.remove("mouse-enter-logged-avatar");
      }
    },
  },
  components: {
    HuadiaoSearch,
    NoLoginBoard,
    LoggedBoard
  },
  beforeDestroy() {
    this.clearAllRefsEvents();
  }
}
</script>

<style scoped>
.huadiao-logo {
  width: 35px;
}

/* 头部固定定位 */
.huadiao-header {
  position: fixed;
  width: 100%;
  z-index: 9;
  top: 0;
  left: 0;
}

.huadiao-header {
  display: flex;
  /* 盒子两端对齐, 中间留空 */
  justify-content: space-between;
  align-items: center;
  padding: 10px 30px 10px 3px;
  font-family: "微软雅黑", serif;
}

.huadiao-header .right-entry {
  display: flex;
  /* 行反向, 从右往左排 */
  flex-direction: row-reverse;
}

/* 图标文字调整 */
.right-entry .right-icon span {
  white-space: nowrap;
  font-size: 13px;
}

/*图标*/
.right-icon /deep/ svg {
  width: 25px;
  height: 22px;
}

.right-entry li {
  margin-left: 13px;
}

/* 图标与文字上下排列 */
.right-entry li .right-icon {
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

/*图标鼠标悬停动画*/
.right-icon:hover /deep/ svg {
  animation: upAndDown 0.5s;
}

/* 用户头像区域 */
.index-head-user-avatar {
  position: relative;
  width: 91px;
  cursor: pointer;
}

/* a 标签, 头像盒子 */
.avatar-box {
  position: absolute;
  z-index: 2;
  display: inline-block;
  width: 41px;
  height: 41px;
  top: 0;
  left: 0;
  float: left;
  transition: var(--transition-500ms);
}

/* 未登录头像 */
.user-avatar-box {
  width: 41px;
  height: 41px;
  border-radius: 50%;
  background-size: cover;
  background-position: center center;
  transition: var(--transition-500ms);
}

/* 登录后头像 */
.logged-avatar {
  position: absolute;
  top: 0;
  transition: var(--transition-500ms);
}

/* 鼠标进入已登录头像 */
.mouse-enter-logged-avatar {
  top: 30px;
  left: -48px;
  width: 71px;
  height: 71px;
}

.mouse-enter-logged-avatar .logged-avatar,
.mouse-enter-logged-avatar img {
  width: 71px;
  height: 71px;
}

/* 为了好看增加的 */
.login-box {
  position: relative;
  z-index: 1;
  width: 72px;
  height: 28px;
  margin: 7px 0 0 19px;
  line-height: 28px;
  padding-left: 29px;
  font-size: 16px;
  border-radius: 0 15px 15px 0;
  color: #ffffff;
  background-color: #bebec5;
}

.vue-slot {
  margin-left: 50px;
}

</style>