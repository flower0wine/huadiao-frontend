<template>
  <div class="huadiao-index-page" :style="packageBackgroundUrl(indexPageBackground)">
    <huadiao-header>
      <!--未登录组件-->
      <template v-if="!login" v-slot:noLoggedBoard>
        <transition name="fade">
          <no-login-board v-show="visible.noLoggedBoard.show"
                          v-if="visible.noLoggedBoard.render"
                          :noLogin="huadiaoIndexHeaderConfig.noLogin"
                          :boardStyle="boardConfig.noLoggedBoardStyle"
          />
        </transition>
      </template>
    </huadiao-header>
    <huadiao-below :openMenu="clickIconToOpenMenu" :login="login" ref="huadiaoBelow"/>
    <transition name="left-slide">
      <huadiao-menu v-show="visible.huadiaoMenu.show"
                    :login="login"
                    ref="menu"/>
    </transition>
    <huadiao-poem/>
    <huadiao-middle-tip/>
    <!--注册登录面板-->
    <transition name="fade">
      <huadiao-login-register v-if="visible.huadiaoLoginRegister.render"
                              v-show="visible.huadiaoLoginRegister.show"
                              ref="loginRegisterBoard"/>
    </transition>
    <huadiao-warning-top-container/>
    <DownSlide/>
  </div>
</template>

<script>
import {mapState} from "vuex";
import HuadiaoHeader from "@/pages/components/HuadiaoHeader";
import HuadiaoBelow from "@/pages/index/components/HuadiaoBelow";
import HuadiaoMenu from "@/pages/index/components/HuadiaoMenu";
import HuadiaoPoem from "@/pages/index/components/index/HuadiaoPoem";
import HuadiaoLoginRegister from "@/pages/index/components/HuadiaoLoginRegister";
import HuadiaoWarningTopContainer from "@/pages/components/HuadiaoWarningTopContainer";
import HuadiaoMiddleTip from "@/pages/components/HuadiaoMiddleTip";
import NoLoginBoard from "@/pages/components/NoLoginBoard";
import {svg} from "@/assets/js/constants/svgs";
import IndexPageBackground from "@/assets/img/index/indexPageOneBackground2.webp";
import DownSlide from "@/pages/components/DownSlide";

let huadiaoIndexHeaderConfig = {
  // 未登录面板配置
  noLogin: [{
    description: "发布博客",
    svg: svg.blog,
  }, {
    description: "发布视频",
    svg: svg.video
  }, {
    description: "标记喜欢的番剧",
    svg: svg.fanju
  }],
}

export default {
  name: "IndexPage",
  data() {
    return {
      login: false,
      huadiaoIndexHeaderConfig,
      // 是否显示
      visible: {
        // 菜单
        huadiaoMenu: {
          show: false,
        },
        // 注册登录面板
        huadiaoLoginRegister: {
          show: false,
          render: false,
        },
        // 未登录面板
        noLoggedBoard: {
          render: false,
          show: false,
        },
      },
      boardConfig: {
        // 未登录面板
        noLoggedBoardStyle: {
          boardTextColor: "#cecaca",
          background: "-webkit-linear-gradient(left bottom, #454440b4, #84041bb9)",
          ImmediatelyBtnBackgroundColor: "#4c829e",
          registerTextColor: "#4c829e",
        },
      }
    }
  },
  computed: {
    ...mapState(["refs", "user"]),
    indexPageBackground() {
      return IndexPageBackground;
    }
  },
  created() {
  },
  beforeMount() {
    this.clickToHidden();
    // 打开登录注册面板并执行回调
    this.$bus.$on("openLoginRegisterBoard", this.openLoginRegisterBoard);
    this.$bus.$on("openNoLoggedBoard", this.openNoLoggedBoard);
    this.$bus.$on("closeNoLoggedBoard", this.closeNoLoggedBoard);
  },
  methods: {
    // 点击菜单按钮显示菜单
    clickIconToOpenMenu() {
      if (!this.login) {
        this.huadiaoMiddleTip("登录后体验更多功能!");
        return;
      }
      this.visible.huadiaoMenu.render = true;
      this.visible.huadiaoMenu.show = true;
    },
    // 打开登录注册面板
    openLoginRegisterBoard(callback) {
      this.visible.huadiaoLoginRegister.render = true;
      this.visible.huadiaoLoginRegister.show = true;
      this.$nextTick(() => {
        callback && callback();
      });
    },
    // 打开未登录面板
    openNoLoggedBoard() {
      this.visible.noLoggedBoard.render = this.visible.noLoggedBoard.show = true;
    },
    closeNoLoggedBoard() {
      this.visible.noLoggedBoard.show = false;
    },
    // window 点击隐藏组件
    clickToHidden() {
      window.addEventListener("click", (e) => {
        let refs = this.$refs;
        let target = e.target;
        // 隐藏菜单, 点击非菜单区域并且点击元素不是菜单图标
        if(this.visible.huadiaoMenu.show) {
          if (!refs.menu.$el.contains(e.target) && !(refs.huadiaoBelow.$refs.menu.contains(target))) {
            this.visible.huadiaoMenu.show = false;
          }
        }
        // 登录注册面板是否渲染
        if(this.visible.huadiaoLoginRegister.show) {
          // 隐藏登录注册页面
          let loginRegisterBoard = refs.loginRegisterBoard;
          if (!loginRegisterBoard.isClickPasswordEye &&
              !loginRegisterBoard.$el.contains(target) &&
              !(this.refs.immediatelyRegister.contains(target)) &&
              !(this.refs.immediatelyLogin.contains(target))) {
            this.visible.huadiaoLoginRegister.show = false;
            loginRegisterBoard.isClickPasswordEye = false;
            // 再次输入密码关闭
            loginRegisterBoard.visible.confirmPassword = false;
            // 移除 window keydown 事件
            window.removeEventListener("keydown", loginRegisterBoard.keyDownToReturn);
          }
          // 将点击眼睛设为 false, 因为会影响其他区域的点击
          loginRegisterBoard.isClickPasswordEye = false;
        }
      });
    },
  },
  components: {
    DownSlide,
    NoLoginBoard,
    HuadiaoMiddleTip,
    HuadiaoWarningTopContainer,
    HuadiaoLoginRegister,
    HuadiaoHeader,
    HuadiaoBelow,
    HuadiaoMenu,
    HuadiaoPoem,
  },
  beforeDestroy() {
  }
}
</script>

<style scoped>
.huadiao-index-page {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100vh;
  scroll-snap-align: start;
  background: no-repeat center center;
  background-size: cover;
  overflow: hidden;
}
</style>