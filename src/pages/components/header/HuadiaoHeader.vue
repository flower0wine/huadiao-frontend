<template>
  <div class="huadiao-header"
       ref="huadiaoHeader"
       v-show="fetched"
       :style="huadiaoHeaderAttachStyle"
  >
    <!-- 左侧图标 -->
    <ul class="left-entry">
      <li class="huadiao-index">
        <a href="/" title="花凋--不一样的世界">
          <img class="huadiao-logo" :src="authorityImg" alt="">
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
        <div ref="avatarBox"
             :style="login ? `--border: 2px solid ${boardConfig.loggedBoardStyle.borderColor}` : ''"
             :title="huadiaoIndexHeaderConfig.avatar.title"
             class="avatar-box">
          <user-avatar-box :options="{
                        userAvatar: user.userAvatar,
                        scale: userAvatarScale,
                        href: huadiaoIndexHeaderConfig.avatar.src,
                        transitionTime: '500ms',
                    }"/>
        </div>
        <!--已登录组件-->
        <template v-if="login">
          <transition name="fade">
            <logged-board v-show="visible.loggedBoard.show"
                          v-if="visible.loggedBoard.render"
                          :user="user"
                          :boardStyle="boardConfig.loggedBoardStyle"
            />
          </transition>
        </template>
        <template v-else>
          <div class="login-box">登录</div>
          <slot name="noLoggedBoard"/>
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
import LoggedBoard from "@/pages/components/LoggedBoard";
import {INDEX_TIPS} from "@/assets/js/tips";
import HuadiaoSearch from "@/pages/components/search/HuadiaoSearch";
import constants from "@/assets/js/constants";
import {mapState} from "vuex";
import {svg} from "@/assets/js/constants/svgs";
import defaultHuadiaoHeaderStyle from "@/assets/js/constants/style/huadiao_header_style/default";
import UserAvatarBox from "@/pages/components/UserAvatarBox";
import AuthorityImg from "@/assets/img/authority.webp";
import {responseHandler} from "@/assets/js/constants/status-code";
import {flatPromise} from "@/util";
import {getHeader} from "@/pages/components/header/apis";
import {modifySrcObject} from "@/util/tool";
import {homepageLink} from "@/util/huadiao-tool";

let smallUserAvatarScale = "41px";
let bigUserAvatarScale = "71px";

export default {
  name: "HuadiaoHeader",

  props: ["huadiaoHeaderStyle", "mouseenterAvatarCallback", "mouseleaveAvatarCallback"],

  data() {
    return {
      svg,
      fetched: false,
      visible: {
        // 已登录面板
        loggedBoard: {
          render: false,
          show: false,
        },
      },
      boardConfig: defaultHuadiaoHeaderStyle,
      userAvatarScale: smallUserAvatarScale,
    };
  },
  computed: {
    authorityImg() {
      return AuthorityImg;
    },
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
        // 头像配置
        avatar: {
          title: this.login ? INDEX_TIPS.LOGGED : INDEX_TIPS.NOT_LOGGED,
          src: this.login ? homepageLink(this.user.uid) : "/",
        },
        // 头部右侧配置
        rightEntry: [{
          description: "历史",
          svg: svg.history,
          // 由于后端使用 nginx 代理(/ 结尾代表一个文件夹), nginx 配置中以 /history/ 来匹配
          url: this.login ? "/history/" : constants.wrongLink,
        }, {
          description: "消息",
          svg: svg.message,
          url: this.login ? "/message" : constants.wrongLink,
        }],
      }
    },
    // 附加样式
    huadiaoHeaderAttachStyle() {
      let blur = this.boardConfig.blur ? ';backdrop-filter: blur(3px)' : '';
      let shadow = this.boardConfig.shadow ? ';box-shadow: ' + (this.boardConfig.customShadow || 'var(--box-shadow-min)') : '';
      let background = ";background-color: " + this.boardConfig.backgroundColor;
      return blur + shadow + background;
    }
  },
  created() {
    this.getHuadiaoHeaderUserinfo();
  },
  mounted() {
    // 修改默认配置
    modifySrcObject(this.boardConfig, this.huadiaoHeaderStyle);
    // 修改默认样式
    this.$bus.$on("modifyHuadiaoHeaderStyle", this.modifyHuadiaoHeaderStyle);
  },
  methods: {
    // 获取花凋头部数据
    async getHuadiaoHeaderUserinfo() {
      const [err, res] = await flatPromise(getHeader());

      if (err) {
        console.log(err);
        this.login = false;
        return;
      }

      responseHandler(res)
        .succeed((res) => {
          let data = res.data;

          this.$store.commit("initialUser", {user: data});
        });

      this.fetched = true;
    },
    // 渲染之后再次修改头部样式
    modifyHuadiaoHeaderStyle(style) {
      if (style) {
        modifySrcObject(this.boardConfig, style);
      } else {
        modifySrcObject(this.boardConfig, this.huadiaoHeaderStyle);
      }
    },
    // 鼠标进入头像
    mouseEnterAvatar() {
      this.visible.loggedBoard.render = true;
      this.visible.loggedBoard.show = true;
      this.$bus.$emit("openNoLoggedBoard");
      if (this.login && this.$refs.avatarBox) {
        this.$refs.avatarBox.classList.add("mouse-enter-logged-avatar");
        this.userAvatarScale = bigUserAvatarScale;
      }
      this.mouseenterAvatarCallback && this.mouseenterAvatarCallback();
    },
    // 鼠标离开头像
    mouseLeaveAvatar() {
      this.visible.loggedBoard.show = false;
      this.$bus.$emit("closeNoLoggedBoard");
      if (this.login && this.$refs.avatarBox) {
        this.$refs.avatarBox.classList.remove("mouse-enter-logged-avatar");
        this.userAvatarScale = smallUserAvatarScale;
      }
      this.mouseleaveAvatarCallback && this.mouseleaveAvatarCallback();
    },
  },
  components: {
    UserAvatarBox,
    HuadiaoSearch,
    LoggedBoard
  },
  beforeDestroy() {
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
  height: 61px;
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
  --border: '';
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
.user-avatar-box /deep/ svg {
  width: 41px;
  height: 41px;
  border: var(--border);
  border-radius: 50%;
  transition: var(--transition-500ms);
}

/* 登录后头像 */
.logged-avatar {
  position: absolute;
  top: 0;
  width: 41px;
  height: 41px;
  border-radius: 50%;
  border: var(--border);
  background: no-repeat center/cover;
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
.mouse-enter-logged-avatar /deep/ svg {
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
