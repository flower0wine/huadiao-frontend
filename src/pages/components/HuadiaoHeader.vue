<template>
  <div class="huadiao-header">
    <!-- 左侧图标 -->
    <ul class="left-entry">
      <li class="huadiao-index">
        <a href="/" title="花凋--不一样的世界">
          <img class="huadiao-logo" :src="huadiaoIndexHeaderConfig.logoPath" alt="">
        </a>
      </li>
    </ul>
    <huadiao-search/>
    <!-- 右侧图标 -->
    <ul class="right-entry">
      <li v-for="(rightEntry, index) in huadiaoIndexHeaderConfig.rightEntry"
          :key="index">
        <a :href="rightEntry.url" class="right-icon">
          <img :src="rightEntry.svg" alt="">
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
  props: ["isLogin", "user"],
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
          svg: "/svg/history.svg",
          url: this.isLogin ? "/history" : constants.wrongLink,
        }, {
          description: "消息",
          svg: "/svg/message.svg",
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
    }
  },
  beforeMount() {
    // 判断用户是否具有头像
    this.checkHasAvatar();
  },
  mounted() {
    // 设置用户信息
    this.initialUserInfer();
  },
  methods: {
    // 判断用户头像是否存在, 存在则在 v-if 渲染前设置 hasAvatar, 否则 $refs 中获取不到标签
    checkHasAvatar() {
      if(this.user.userAvatar) {
        this.userConfig.hasAvatar = true;
      }
    },
    // 初始化用户信息
    initialUserInfer() {
      if(this.isLogin && this.userConfig.hasAvatar) {
        // 设置背景
        this.$refs.avatar.style.backgroundImage = "url('" + this.user.userAvatar + "')";
      }
    },
    // 鼠标进入头像
    mouseEnterAvatar() {
      this.isMouseEnter.enterAvatar = true;
      if(this.isLogin && this.$refs.avatarBox) {
        this.$refs.avatarBox.classList.add("mouse-enter-logged-avatar");
      }
    },
    // 鼠标离开头像
    mouseLeaveAvatar() {
      this.isMouseEnter.enterAvatar = false;
      if(this.isLogin && this.$refs.avatarBox) {
        this.$refs.avatarBox.classList.remove("mouse-enter-logged-avatar");
      }
    }
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
  width: var(--logo-scale);
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
  padding: var(--header-padding);
  font-family: "微软雅黑", serif;
}

.huadiao-header .right-entry {
  display: flex;
  /* 行反向, 从右往左排 */
  flex-direction: row-reverse;
}

/* 图标文字调整 */
.right-entry .right-icon span {
  font-size: 13px;
  color: #fff;
}

/*图标*/
.right-icon img {
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
.right-icon:hover img {
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
  position: relative;
  z-index: 2;
  display: inline-block;
  width: 41px;
  height: 41px;
  top: 0;
  right: 0;
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
  border: 2px solid rgba(124, 6, 40, 0.76);
  transition: var(--transition-500ms);
}

/* 鼠标进入已登录头像 */
.mouse-enter-logged-avatar {
  top: 30px;
  right: 45px;
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

</style>