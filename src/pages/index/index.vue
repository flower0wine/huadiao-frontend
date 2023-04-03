<template>
  <div class="huadiao-pages" v-huadiao-full-page>
    <div class="huadiao-index-page" ref="indexPage">
      <!--头部-->
      <huadiao-header :user="user"
                      :isLogin="isLogin"
      />
      <!--右下角-->
      <huadiao-below :openMenu="clickIconToOpenMenu" ref="huadiaoBelow"/>
      <!--菜单-->
      <transition name="left-slide">
        <huadiao-menu v-show="isShow.huadiaoMenu"
                      :user="user"
                      :isLogin="isLogin"
                      ref="menu"
        />
      </transition>
      <!--诗句-->
      <huadiao-poem/>
      <!--屏中提示组件-->
      <huadiao-middle-tip/>
      <!--注册登录面板-->
      <transition name="fade">
        <huadiao-login-register v-show="isShow.huadiaoLoginRegister"
                                ref="loginRegisterBoard"
                                :openLoginRegisterBoard="openLoginRegisterBoard"
        />
      </transition>
      <!--右下警告提示组件-->
      <huadiao-warning-top-container/>
    </div>
    <div class="huadiao-forum-page">
      <div class="huadiao-forum-page-background"></div>
      <h1 v-for="i in 100" :key="i">12</h1>
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
      isLogin: false,
      // 是否显示
      isShow: {
        // 菜单
        huadiaoMenu: false,
        // 注册登录面板
        huadiaoLoginRegister: false,
      },
      // 用户信息
      user: {
        isLogin: null,
        fans: 8,
        follows: 8,
        nickname: "花凋大总管",
        uid: 1,
        userAvatar: "https://img0.baidu.com/it/u=981218435,2998857702&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1677690000&t=d8a591b46edf38a8a1d31e5193e384a9"
      },
    }
  },
  computed: {
    ...mapState(["refs", "isOnLine", "isConnectServer"]),
  },
  beforeMount() {
    this.clickToHidden();
    this.checkOnline(() => {
      // 修改网络连接状态为 true
      this.$store.commit("modifyOnLineState", true);
      this.$store.commit("modifyConnectServerState", true);

      this.getUserStatus();
    }, () => {
      // 未连上服务器
      this.$store.commit("modifyConnectServerState", false);
    }, () => {
      // 未联网
      this.$store.commit("modifyOnLineState", false);
    });
    this.scrollToChangeInputColor();
  },
  mounted() {
  },
  methods: {
    // 滚动不同的文档位置时改变输入框颜色
    scrollToChangeInputColor() {
      window.addEventListener("scroll", () => {
        if(window.scrollY < this.$refs.indexPage.clientHeight) {
          this.$bus.$emit("modifyHuadiaoConfig", {
            inputTheme: {
              inputBackgroundColor: "#E06969A2",
              searchBackgroundColor: "#E314148A",
            },
          });
        } else {
          this.$bus.$emit("modifyHuadiaoConfig", {
            inputTheme: {
              inputBackgroundColor: "#a2a9b7a2",
              searchBackgroundColor: "#17a6988a",
            },
          });
        }
      })
    },
    // 获取用户状态
    getUserStatus() {
      let params = {
        requestType: "ordinary",
        operation: "status"
      };
      this.sendRequest(params, {}, {}, (response) => {
        console.log(response.data);
        if (typeof response.data === "object") {
          this.user = response.data;
          // 检查用户是否持有登录状态
          this.checkUserLogged();
        }
      });
    },
    // 判断用户是否持有登录状态
    checkUserLogged() {
      if (Object.hasOwnProperty.call(this.user, "message")) {
        // 有 message 属性说明是错误信息, 0 是错误代码, 1 是正常代码
        if (this.user.code === 0) {
          this.isLogin = false;
        }
      } else if (Object.hasOwnProperty.call(this.user, "isLogin")) {
        // 已经登录
        this.isLogin = this.user.isLogin;
        this.initialUserInfer();
      }
    },
    // 初始化用户信息
    initialUserInfer() {

    },
    // 点击菜单按钮显示菜单
    clickIconToOpenMenu() {
      this.isShow.huadiaoMenu = true;
      if(!this.isLogin) {
        this.huadiaoMiddleTip("登录后体验更多功能!");
      }
    },
    // 打开登录注册面板
    openLoginRegisterBoard() {
      this.isShow.huadiaoLoginRegister = true;
    },
    // window 点击隐藏组件
    clickToHidden() {
      this.$(window).click((e) => {
        // 隐藏菜单, 点击非菜单区域并且点击元素不是菜单图标
        if(!this.$refs.menu.$el.contains(e.target) && !(this.$refs.huadiaoBelow.$refs.menu[0].contains(e.target))) {
          this.isShow.huadiaoMenu = false;
        }
        // 隐藏登录注册页面
        if(!this.$refs.loginRegisterBoard.$el.contains(e.target) &&
            !(this.refs.immediatelyRegister.contains(e.target)) &&
            !(this.refs.immediatelyLogin.contains(e.target))) {
          this.isShow.huadiaoLoginRegister = false;
          // 再次输入密码关闭
          this.$refs.loginRegisterBoard.isShow.confirmPassword = false;
          // 移除 window keydown 事件
          window.removeEventListener("keydown", this.$refs.loginRegisterBoard.keyDownToReturn);
        }
      })
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