<template>
  <div class="no-login-board" :style="`background: ${boardStyle.background}; --no-login-board-color: ${boardStyle.boardTextColor}`">
    <h6>登陆后你可以:</h6>
    <div class="huadiao-introduce">
      <span v-for="(intro, index) in noLogin"
           :key="index"
           class="introduce-item"
      >
        <span v-html="intro.svg"></span>
        <span>{{intro.description}}</span>
      </span>
    </div>
    <div class="immediately-login"
         :style="`background-color: ${boardStyle.ImmediatelyBtnBackgroundColor}`"
         @click="openLoginBoard"
         ref="immediatelyLogin"
    >立即登录</div>
    <div class="no-login-board-lower">
      <i>首次使用？</i>
      <span class="click-register"
            :style="`color: ${boardStyle.registerTextColor}`"
            @click="openRegisterBoard"
            ref="immediatelyRegister"
      >点我注册</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "NoLoginBoard",
  props: ["noLogin", "boardStyle"],
  data() {
    return {
    }
  },
  mounted() {
    if(this.$store.state.refs) {
      this.$store.state.refs.immediatelyLogin = this.$refs.immediatelyLogin;
      this.$store.state.refs.immediatelyRegister = this.$refs.immediatelyRegister;
    }
  },
  methods: {
    // 打开登录面板
    openLoginBoard() {
      this.$bus.$emit("openLoginRegisterBoard", () => {
        this.$bus.$emit("openLoginBoard");
      });
    },
    // 打开注册面板
    openRegisterBoard() {
      this.$bus.$emit("openLoginRegisterBoard", () => {
        this.$bus.$emit("openRegisterBoard");
      });
    }
  },
  beforeDestroy() {
  }
}
</script>

<style scoped>

/* 未登录用户面板 */
.no-login-board {
  position: absolute;
  border-radius: 17px;
  top: 57px;
  right: -74px;
  width: 230px;
  height: 180px;
  transition: var(--transition-400ms);
  --no-login-board-color: "";
}

/* 共同样式 */
.no-login-board h6,
.no-login-board div span,
.immediately-login {
  color: var(--no-login-board-color);
  font-size: 14px;
}

.no-login-board h6 {
  padding: 21px 0 0 18px;
}

/* 单条介绍 */
.introduce-item {
  display: inline-block;
  margin-top: 8px;
}

/* 图标 */
.introduce-item > span:nth-child(1) /deep/ svg {
  width: 20px;
  height: 20px;
  margin: 0 4px 0 6px;
}

.introduce-item span:nth-child(2) {
  margin-right: 20px;
}

/* 每个介绍 */
.no-login-board .huadiao-introduce {
  height: 50px;
  padding-left: 18px;
}

/* 每一个单元 */
.no-login-board .introduce div {
  float: left;
}

/* 立即登录框 */
.immediately-login {
  width: 163px;
  height: 30px;
  margin: 27px auto 0;
  border-radius: 15px;
  text-align: center;
  line-height: 30px;
}

/* 框尾部 */
.no-login-board-lower {
  margin-top: 7px;
  text-align: center;
  color: var(--no-login-board-color);
  font-size: 12px;
}

</style>