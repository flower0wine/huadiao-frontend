<template>
  <div class="huadiao-header"
       ref="huadiaoHeader"
       v-show="getDataCompleted"
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
    <div class="huadiao-header-right">
      <slot name="right"></slot>
    </div>
    <!-- 右侧图标 -->
    <ul class="right-entry">
      <li v-for="(rightEntry, index) in huadiaoIndexHeaderConfig.rightEntry"
          :key="index">
        <a :href="rightEntry.url" class="right-icon">
          <span v-html="rightEntry.svg" :style="`fill: ${boardConfig.entryColor}`"></span>
          <span :style="`color: ${boardConfig.entryColor}`">{{ rightEntry.description }}</span>
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
                 :style="login ? 'border: 2px solid ' + boardConfig.loggedBoardStyle.borderColor : ''"
                 :class="login ? '' : 'no-logged'"
                 alt=""
            >
            <div v-if="login && user.userAvatar"
                 :style="`border: 2px solid ${boardConfig.loggedBoardStyle.borderColor}; background-image: url('${userAvatarImagePath}${user.userAvatar}')`"
                 class="user-avatar-box logged-avatar"
                 ref="avatar"
            ></div>
        </a>
        <!--未登录组件-->
        <template v-if="!login">
          <div class="login-box">登录</div>
          <transition name="fade">
            <no-login-board v-show="isShow.noLoggedOrLoggedBoard.show"
                            v-if="isShow.noLoggedOrLoggedBoard.render"
                            :noLogin="huadiaoIndexHeaderConfig.noLogin"
                            :boardStyle="boardConfig.noLoggedBoardStyle"
            />
          </transition>
        </template>
        <!--已登录组件-->
        <template v-if="login">
          <transition name="fade">
            <logged-board v-show="isShow.noLoggedOrLoggedBoard.show"
                          v-if="isShow.noLoggedOrLoggedBoard.render"
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
import {mapState} from "vuex";
import {svg} from "@/assets/js/constants/svgs";

export default {
  name: "HuadiaoHeader",
  props: ["huadiaoHeaderStyle", "mouseenterAvatarCallback", "mouseleaveAvatarCallback"],
  data() {
    return {
      svg,
      isShow: {
        // 登录或未登录面板
        noLoggedOrLoggedBoard: {
          render: false,
          show: false,
        },
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
        },
        // 未登录面板
        noLoggedBoardStyle: {
          boardTextColor: "#cecaca",
          background: "-webkit-linear-gradient(left bottom, #454440b4, #84041bb9)",
          ImmediatelyBtnBackgroundColor: "#4c829e",
          registerTextColor: "#4c829e",
        },
      },
    };
  },
  computed: {
    login: {
      get() {
        return this.$store.state.user?.login || false;
      },
      set() {
      }
    },
    ...mapState(["user"]),
    // 首页头部配置
    huadiaoIndexHeaderConfig() {
      return {
        // logo 路径
        logoPath: "/img/authority.png",
        // 头像配置
        avatar: {
          title: this.login ? INDEX_TIPS.LOGGED : INDEX_TIPS.NOT_LOGGED,
          src: this.login ? '/homepage/' + this.user.uid : constants.wrongLink,
        },
        // 头部右侧配置
        rightEntry: [{
          description: "历史",
          svg: svg.history,
          url: this.login ? "/history" : constants.wrongLink,
        }, {
          description: "消息",
          svg: svg.message,
          url: this.login ? "/message" : constants.wrongLink,
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
      }
    },
    // 附加样式
    huadiaoHeaderAttachStyle() {
      let blur = this.boardConfig.blur ? 'backdrop-filter: blur(3px);' : '';
      let shadow = this.boardConfig.shadow ? 'box-shadow: var(--box-shadow-min);' : '';
      let background = "background-color: " + this.boardConfig.backgroundColor + ";";
      return blur + shadow + background;
    }
  },
  created() {
    this.getHuadiaoHeaderUserinfo();
  },
  mounted() {
    // 修改默认配置
    this.modifySrcObject(this.boardConfig, this.huadiaoHeaderStyle);
    // 修改默认样式
    this.$bus.$on("modifyHuadiaoHeaderStyle", this.modifyHuadiaoHeaderStyle);
  },
  methods: {
    // 获取花凋头部数据
    getHuadiaoHeaderUserinfo() {
      this.sendRequest({
        path: "huadiaoHeader",
        thenCallback: (response) => {
          let res = response.data;
          console.log(res)
          this.$store.commit("initialUser", {user: res});
          this.getDataCompleted = true;
        },
        errorCallback: (error) => {
          console.log(error);
          this.login = false;
        },
      });
    },
    // 渲染之后再次修改头部样式
    modifyHuadiaoHeaderStyle(style) {
      this.modifySrcObject(this.boardConfig, style);
    },
    // 鼠标进入头像
    mouseEnterAvatar() {
      this.isShow.noLoggedOrLoggedBoard.render = true;
      this.isShow.noLoggedOrLoggedBoard.show = true;
      if (this.login && this.$refs.avatarBox) {
        this.$refs.avatarBox.classList.add("mouse-enter-logged-avatar");
      }
      this.mouseenterAvatarCallback && this.mouseenterAvatarCallback();
    },
    // 鼠标离开头像
    mouseLeaveAvatar() {
      this.isShow.noLoggedOrLoggedBoard.show = false;
      if (this.login && this.$refs.avatarBox) {
        this.$refs.avatarBox.classList.remove("mouse-enter-logged-avatar");
      }
      this.mouseleaveAvatarCallback && this.mouseleaveAvatarCallback();
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
  z-index: 30;
  top: 0;
  left: 0;
  transition: all 500ms;
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

.huadiao-header-right {
  margin-left: 50px;
}

</style>