<template>
  <div class="huadiao-pages" v-huadiao-full-page>
    <div class="huadiao-index-page" ref="indexPage">
      <huadiao-header/>
      <huadiao-below :openMenu="clickIconToOpenMenu" :login="login" ref="huadiaoBelow"/>
      <transition name="left-slide">
        <huadiao-menu v-if="getDataCompleted && visible.huadiaoMenu.render"
                      v-show="visible.huadiaoMenu.show"
                      :user="user"
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
    </div>
    <div class="huadiao-forum-page">
      <div class="huadiao-forum-page-background"></div>
      <h1 v-for="i in 100" :key="i" style="color: #fff">12</h1>
    </div>
  </div>
</template>

<script>

import {mapState} from "vuex";
import HuadiaoHeader from "@/pages/components/HuadiaoHeader";
import HuadiaoBelow from "@/pages/index/components/HuadiaoBelow";
import HuadiaoMenu from "@/pages/index/components/HuadiaoMenu";
import HuadiaoPoem from "@/pages/index/components/HuadiaoPoem";
import HuadiaoLoginRegister from "@/pages/index/components/HuadiaoLoginRegister";
import HuadiaoWarningTopContainer from "@/pages/components/HuadiaoWarningTopContainer";
import HuadiaoMiddleTip from "@/pages/components/HuadiaoMiddleTip";

export default {
  name: "HuadiaoIndex",
  data() {
    return {
      login: false,
      // 是否显示
      visible: {
        // 菜单
        huadiaoMenu: {
          render: false,
          show: false,
        },
        // 注册登录面板
        huadiaoLoginRegister: {
          show: false,
          render: false,
        },
      },
    }
  },

  computed: {
    ...mapState(["refs", "user"]),
  },
  created() {
  },
  beforeMount() {
    this.clickToHidden();
    this.scrollToChangeInputColor();
    // 打开登录注册面板并执行回调
    this.$bus.$on("openLoginRegisterBoard", this.openLoginRegisterBoard);
  },
  methods: {
    // 滚动不同的文档位置时改变输入框颜色
    scrollToChangeInputColor() {
      window.addEventListener("scroll", () => {
        if (window.scrollY < this.$refs.indexPage.clientHeight) {
          // 修改头部样式
          this.$bus.$emit("modifyHuadiaoHeaderStyle", {
            inputTheme: {
              inputBackgroundColor: "#E06969A2",
              searchBackgroundColor: "#E314148A",
            },
            loggedBoardStyle: {
              borderColor: "#7C0628C1",
              background: "-webkit-linear-gradient(left bottom, #454440b9, #84041bb6)",
            },
            noLoggedBoardStyle: {
              background: "-webkit-linear-gradient(left bottom, #454440b4, #84041bb9)",
              ImmediatelyBtnBackgroundColor: "#4c829e",
              registerTextColor: "#4c829e",
            }
          });
          // 修改菜单样式
          this.$bus.$emit("modifyHuadiaoMenuStyle", {
            background: "-webkit-linear-gradient(top, #9005a97a, #fb424279)",
            menuBorderColor: "#9f4996",
          })
        } else {
          this.$bus.$emit("modifyHuadiaoHeaderStyle", {
            inputTheme: {
              inputBackgroundColor: "#a2a9b7a2",
              searchBackgroundColor: "#17a6988a",
            },
            loggedBoardStyle: {
              borderColor: "#067C6AC1",
              background: "-webkit-linear-gradient(left bottom, #454440b9, #046084B5)",
            },
            noLoggedBoardStyle: {
              background: "-webkit-linear-gradient(left bottom, #454440b9, #043A84BA)",
              ImmediatelyBtnBackgroundColor: "#156A96FF",
              registerTextColor: "#569BBEFF",
            }
          });
          this.$bus.$emit("modifyHuadiaoMenuStyle", {
            background: "-webkit-linear-gradient(top, #475DDF7A, #0000007A)",
            menuBorderColor: "#283ebb",
          });
        }
      })
    },
    // 点击菜单按钮显示菜单
    clickIconToOpenMenu() {
      this.visible.huadiaoMenu.render = true;
      this.visible.huadiaoMenu.show = true;
      if (!this.login) {
        this.huadiaoMiddleTip("登录后体验更多功能!");
      }
    },
    // 打开登录注册面板
    openLoginRegisterBoard(callback) {
      this.visible.huadiaoLoginRegister.render = true;
      this.visible.huadiaoLoginRegister.show = true;
      this.$nextTick(() => {
        callback && callback();
      });
    },
    // window 点击隐藏组件
    clickToHidden() {
      window.addEventListener("click", (e) => {
        // 隐藏菜单, 点击非菜单区域并且点击元素不是菜单图标
        if(this.visible.huadiaoMenu.render) {
          if (!this.$refs.menu.$el.contains(e.target) && !(this.$refs.huadiaoBelow.$refs.menu[0].contains(e.target))) {
            this.visible.huadiaoMenu.show = false;
          }
        }
        // 登录注册面板是否渲染
        if(this.visible.huadiaoLoginRegister.render) {
          // 隐藏登录注册页面
          if (!this.$refs.loginRegisterBoard.$el.contains(e.target) &&
              (!(this.refs.immediatelyRegister.contains(e.target))) &&
              (!(this.refs.immediatelyLogin.contains(e.target)))) {
            this.visible.huadiaoLoginRegister.show = false;
            // 再次输入密码关闭
            this.$refs.loginRegisterBoard.visible.confirmPassword = false;
            // 移除 window keydown 事件
            window.removeEventListener("keydown", this.$refs.loginRegisterBoard.keyDownToReturn);
          }
        }
      });
    },
  },
  components: {
    HuadiaoMiddleTip,
    HuadiaoWarningTopContainer,
    HuadiaoLoginRegister,
    HuadiaoHeader,
    HuadiaoBelow,
    HuadiaoMenu,
    HuadiaoPoem,
  },
  beforeDestroy() {
    // 清除事件
    this.$bus.$off();
  },
}
</script>

<style scoped>
.huadiao-index-page {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100vh;
  background: url("~@/../public/img/index/indexPageOneBackground.png") no-repeat center center;
  background-size: cover;
}

.huadiao-forum-page {
  width: 100%;
  height: 100vh;
}

/* 屏二背景, fixed */
.huadiao-forum-page-background {
  position: fixed;
  top: 0;
  z-index: -9;
  width: 100%;
  height: 100vh;
  background: url("~@/../public/img/index/indexPageTwoBackground.jpg") no-repeat center center;
  background-size: cover;
}
</style>