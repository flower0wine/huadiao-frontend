<template>
  <div class="huadiao-login-register">
    <div class="huadiao-account-container">
      <!--介绍-->
      <div class="huadiao-description">
        <div class="login-origin">
          <div class="huadiao-name">花凋</div>
          <div>世界是什么样子的？</div>
          <div>一定是美好的吧？</div>
          <div class="dump-word"
               @click="clickToDumpLogin"
               ref="loginBtn"
          >没有登录？点击登录
          </div>
        </div>
        <div class="register-origin">
          <div class="huadiao-name">花凋</div>
          <div>欢迎体验</div>
          <div>破败不堪的世界!</div>
          <div class="dump-word"
               @click="clickToDumpRegister"
               ref="registerBtn"
          >没有注册？点击注册
          </div>
        </div>
      </div>
      <!--登录-->
      <form ref="loginForm">
        <transition name="login-card"
                    @after-enter="transitioned = true"
        >
          <div class="login-container"
               v-if="visible.loginCard.render"
               v-show="visible.loginCard.show"
          >
            <transition name="fade">
            <span v-html="loginSvg"
                  class="reveal"
                  v-show="visible.loginEye"
                  ref="loginEye"
                  @click="changeLoginPasswordVisible"></span>
            </transition>
            <label for="loginUsername">用户名</label>
            <input type="text"
                   id="loginUsername"
                   maxlength="20"
                   minlength="8"
                   autocomplete="off"
                   v-model="login.username"
                   @focusout="checkUsername(login.username)"
                   ref="loginUsername"
            >
            <label for="loginPassword">密码</label>
            <input :type="visible.loginPasswordVisible ? 'text' : 'password'"
                   id="loginPassword"
                   minlength="8"
                   maxlength="32"
                   v-model="login.password"
                   @mousemove="loginPasswordInputMouseOver"
                   @focusout="checkPassword(login.password)"
                   ref="loginPassword"
            >
            <button type="button"
                    class="login-btn"
                    @click="clickToLoginHuadiao">登录</button>
            <button style="display: none"></button>
          </div>
        </transition>
      </form>
      <!--注册-->
      <form ref="registerForm">
        <transition name="register-card"
                    @after-enter="transitioned = true"
        >
          <div class="register-container"
               v-if="visible.registerCard.render"
               v-show="visible.registerCard.show"
          >
            <transition name="fade">
            <span v-html="registerSvg"
                  v-show="visible.registerEye"
                  class="reveal"
                  ref="registerEye"
                  @click="changeRegisterPasswordVisible"></span>
            </transition>
            <label for="registerUsername">用户名</label>
            <input type="text"
                   id="registerUsername"
                   maxlength="20"
                   minlength="8"
                   autocomplete="off"
                   v-model="register.username"
                   @focusout="checkUsername(register.username)"
                   ref="registerUsername"
            >
            <transition name="replace-fade" mode="out-in">
              <div v-if="!visible.confirmPassword"
                   key="registerPassword"
                   class="register-password"
              >
                <label for="registerPassword">密码</label>
                <input :type="visible.registerPasswordVisible ? 'text' : 'password'"
                       id="registerPassword"
                       minlength="8"
                       maxlength="32"
                       v-model="register.password"
                       @mousemove="registerPasswordInputMouseOver"
                       @focusout="registerCheckPassword"
                       ref="registerPassword"
                >
              </div>
              <div v-else
                   key="confirmRegisterPassword"
                   class="register-password"
              >
                <label for="registerPassword">请确认密码</label>
                <input :type="visible.registerPasswordVisible ? 'text' : 'password'"
                       id="confirmRegisterPassword"
                       minlength="8"
                       maxlength="32"
                       v-model="register.confirmPassword"
                       @mousemove="registerPasswordInputMouseOver"
                       @focusout="sameRegisterPassword"
                       ref="confirmRegisterPassword"
                >
              </div>
            </transition>
            <label for="registerCode">验证码</label>
            <div>
              <input type="text"
                     id="registerCode"
                     autocomplete="off"
                     v-model="register.checkCode"
                     @focusout="checkCheckCode"
              >
              <img :src="checkCodeImgSrc"
                   class="check-code-img"
                   @click="changeCheckCodeImg"
                   ref="checkCodeImg"
                   alt>
            </div>
            <button type="button"
                    class="register-btn"
                    @click="clickToRegisterHuadiao"
                    ref="registerBtn"
            >注册
            </button>
            <button style="display: none"></button>
          </div>
        </transition>
      </form>
    </div>
  </div>
</template>

<script>
import {ResponseHandler, Timer} from "@/assets/js/utils";
import {statusCode} from "@/assets/js/constants/status-code.js";
import {apis} from "@/assets/js/constants/request-path";
import {svg} from "@/assets/js/constants/svgs";
import {indexResponseMessage} from "@/assets/js/constants/response_message";
import constants from "@/assets/js/constants";
import OperationThrottle from "@/assets/js/utils/operation-throttle";

let usernameReg = constants.usernameReg;
let passwordReg = constants.passwordReg;

export default {
  name: "HuadiaoLoginRegister",
  data() {
    return {
      svg: {
        visible: svg.eye,
        invisible: svg.invisible,
      },
      // 是否点击眼睛
      isClickPasswordEye: false,
      loginSvg: svg.invisible,
      registerSvg: svg.invisible,
      // 用户输入
      login: {
        username: "",
        password: "",
      },
      register: {
        username: "",
        password: "",
        confirmPassword: "",
        checkCode: "",
      },
      checkCodeImgSrc: `${apis.huadiaoHost}${apis.common.registerCode}`,
      visible: {
        loginCard: {
          render: false,
          show: false,
        },
        registerCard: {
          render: false,
          show: false,
        },
        loginEye: false,
        // 小眼睛是否可见
        registerEye: false,
        // 密码是否可见
        loginPasswordVisible: false,
        registerPasswordVisible: false,
        // 再次输入密码
        confirmPassword: false,
      },
      // 过渡完成
      transitioned: true,
      // 定时器
      timer: {
        loginReveal: new Timer(),
        registerReveal: new Timer(),
      },
      requestThrottle: new OperationThrottle(),
    }
  },
  mounted() {
    // 打开登录面板
    this.$bus.$on("openLoginBoard", this.clickToDumpLogin);
    // 打开注册面板
    this.$bus.$on("openRegisterBoard", this.clickToDumpRegister);
    this.submitForm();
  },
  methods: {
    // 表单提交
    submitForm() {
      let type = "submit";
      this.$refs.registerForm.addEventListener(type, (e) => {
        e.preventDefault();
        if (this.registerVerify()) {
          this.requestRegisterHuadiao();
        }
      });
      this.$refs.loginForm.addEventListener(type, (e) => {
        e.preventDefault();
        if (this.loginVerify()) {
          this.requestLoginHuadiao();
        }
      });
    },
    // 返回重新输入密码
    returnToModifyPassword() {
      window.addEventListener("keydown", this.keyDownToReturn);
    },
    // ctrl + alt 返回重新输入密码
    keyDownToReturn(e) {
      if (e.ctrlKey && e.altKey) {
        // 移除 window keydown 事件
        window.removeEventListener("keydown", this.keyDownToReturn);
        this.visible.confirmPassword = false;
      }
    },
    // 注册校验
    registerVerify() {
      return this.checkUsername(this.register.username) &&
          this.checkPassword(this.register.password) &&
          this.sameRegisterPassword() &&
          this.checkCheckCode();
    },
    // 点击注册按钮
    clickToRegisterHuadiao() {
      if (this.registerVerify()) {
        this.requestRegisterHuadiao();
      }
    },
    requestRegisterHuadiao() {
      if(!this.requestThrottle.access()) return;
      this.sendRequest({
        path: apis.common.register,
        method: "post",
        data: {
          username: this.register.username,
          password: this.register.password,
          confirmPassword: this.register.confirmPassword,
          checkCode: this.register.checkCode
        },
        thenCallback: (response) => {
          console.log(response.data);
          let res = response.data;
          new ResponseHandler(res).succeed((data) => {
            this.$refs.loginBtn.click();
            this.register.username = this.register.password = this.register.confirmPassword = this.register.checkCode = "";
            this.huadiaoWarningTip("注册成功!");
          }).errorParam((data) => {
            if (data === indexResponseMessage.sameUsername) {
              this.huadiaoWarningTip("该用户名已被注册!");
            } else if (data === indexResponseMessage.wrongCode) {
              this.huadiaoWarningTip("您填写的验证码错误!");
            }
          });
        },
        errorCallback: () => {
          this.huadiaoWarningTip("可能由于服务器的原因导致注册失败");
        }
      });
    },
    // 登录校验
    loginVerify() {
      return this.checkUsername(this.login.username) && this.checkPassword(this.login.password);
    },
    // 点击登录按钮
    clickToLoginHuadiao() {
      if (this.loginVerify()) {
        this.requestLoginHuadiao();
      }
    },
    requestLoginHuadiao() {
      if(!this.requestThrottle.access()) return;
      this.sendRequest({
        path: apis.common.login,
        method: "post",
        data: {
          username: this.login.username,
          password: this.login.password
        },
        thenCallback: (response) => {
          let res = response.data;
          console.log(res);
          if (res.code === statusCode.succeed) {
            // 刷新网页
            window.location.reload();
          } else if (res.code === statusCode.notExist) {
            this.huadiaoMiddleTip("用户名或密码输入错误!");
          }
        },
        errorCallback: (error) => {
          console.log(error);
        }
      });
    },
    // 检查用户名是否符合标准
    checkUsername(username) {
      if (!username) {
        this.huadiaoWarningTip("请填写您的用户名!");
        return false;
      }
      if (!(8 <= username.length && username.length <= 20)) {
        this.huadiaoWarningTip("您的用户名长度应在8-20之间!");
        return false;
      }
      if (usernameReg.test(username)) {
        return true;
      }
      this.huadiaoWarningTip("您的用户名应仅包含数字、字母、下划线!");
      return false;
    },
    // 注册时检查密码
    registerCheckPassword() {
      if (this.checkPassword(this.register.password)) {
        this.returnToModifyPassword();
        this.visible.confirmPassword = true;
        this.huadiaoWarningTip("按下 ctrl + alt 可以返回重新输入!");
      }
    },
    // 是否是相同的密码
    sameRegisterPassword() {
      if (this.register.password === this.register.confirmPassword) {
        return true;
      }
      this.huadiaoWarningTip("您两次输入的密码不一致!\n按下 ctrl + alt 可以返回重新输入!");
      return false;
    },
    // 检查密码是否符合标准
    checkPassword(password) {
      if (!password) {
        this.huadiaoWarningTip("您未填写密码!");
        return false;
      }
      if (!(8 <= password.length && password.length <= 32)) {
        this.huadiaoWarningTip("您的密码长度应在8-32之间!");
        return false;
      }
      if (passwordReg.test(password)) {
        return true;
      }
      this.huadiaoWarningTip("您的密码应至少包含数字, 大小写字母!");
      return false;
    },
    // 检查验证码
    checkCheckCode() {
      if (!this.register.checkCode) {
        this.huadiaoWarningTip("您未填写验证码!");
        return false;
      }
      return true;
    },
    // 鼠标在密码框移动显示小眼睛
    loginPasswordInputMouseOver() {
      this.visible.loginEye = true;
      this.timer.loginReveal.timeout(() => {
        this.visible.loginEye = false;
      }, 1000);
    },
    registerPasswordInputMouseOver() {
      this.visible.registerEye = true;
      this.timer.registerReveal.timeout(() => {
        this.visible.registerEye = false;
      }, 1000);
    },
    // 改变验证码图片
    changeCheckCodeImg() {
      this.$refs.checkCodeImg.src = this.checkCodeImgSrc + "?" + new Date().getMilliseconds();
    },
    // 改变密码可见性
    changeLoginPasswordVisible() {
      // 点击后不隐藏
      this.timer.loginReveal.destroy();
      this.visible.loginPasswordVisible = !this.visible.loginPasswordVisible;
      // 密码可见？
      this.loginSvg = this.visible.loginPasswordVisible ? this.svg.visible : this.svg.invisible;
      this.isClickPasswordEye = true;
    },
    changeRegisterPasswordVisible() {
      // 点击后不隐藏
      this.timer.registerReveal.destroy();
      this.visible.registerPasswordVisible = !this.visible.registerPasswordVisible;
      // 密码可见？
      this.registerSvg = this.visible.registerPasswordVisible ? this.svg.visible : this.svg.invisible;
      this.isClickPasswordEye = true;
    },
    // 点击跳转登录
    clickToDumpLogin() {
      // 打开注册登录面板
      this.$bus.$emit("openLoginRegisterBoard");
      // 过度完成并且登录面板未展示
      if (this.transitioned && !this.visible.loginCard.show) {
        this.transitioned = false;
        this.visible.loginCard.render = true;
        this.visible.loginCard.show = true;
        this.visible.registerCard.show = false;
      }
    },
    // 点击跳转注册
    clickToDumpRegister() {
      // 打开登录注册面板
      this.$bus.$emit("openLoginRegisterBoard");
      // 过度完成并且注册面板未展示
      if (this.transitioned && !this.visible.registerCard.show) {
        this.transitioned = false;
        this.visible.loginCard.show = false;
        this.visible.registerCard.render = true;
        this.visible.registerCard.show = true;
      }
    }
  },
  beforeDestroy() {
  }
}
</script>

<style scoped>
.huadiao-login-register {
  position: fixed;
  z-index: 99;
  top: 50vh;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: STXingkai, serif;
  transition: var(--transition-500ms);
}

/* 背景 */
.huadiao-account-container {
  position: relative;
  width: 750px;
  height: 375px;
  border-radius: 8px;
  box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.20);
  background: url('~@/../public/img/index/loginRegisterBackground.png') no-repeat;
  background-size: cover;
}

.login-container {
  left: 25px;
  background: url('~@/../public/img/index/login.png') no-repeat;
}

.register-container {
  right: 25px;
  background: url('~@/../public/img/index/register.png') no-repeat;
}

.login-container,
.register-container {
  position: absolute;
  width: 355px;
  height: 500px;
  top: -63px;
  border-radius: 8px;
  background-size: cover;
  transition: var(--transition-1000ms);
}

/* 介绍 */
.huadiao-description {
  display: flex;
  width: 100%;
  height: 100%;
}

/* 背景文字区域 */
.login-origin,
.register-origin {
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 30px;
  font-size: 20px;
  color: #910000;
}

.huadiao-description .huadiao-name {
  font-size: 30px;
  margin-bottom: 20px;
}

/*跳转的提示词*/
.huadiao-description .dump-word {
  margin-top: auto;
  margin-bottom: 15px;
  color: #fff;
  cursor: pointer;
}

.login-container,
.register-container {
  display: flex;
  flex-direction: column;
  padding: 110px 40px 0 40px;
}

.login-container label,
.register-container label {
  font-size: 24px;
  margin: 15px 0;
}

.register-container input,
.login-container input {
  height: 30px;
  padding-left: 10px;
  border-radius: 5px;
  font-size: 16px;
  color: #FCFCFCB5;
  background-color: rgba(255, 255, 255, 0.144);
}

.register-password {
  display: flex;
  flex-direction: column;
  transition: var(--transition-500ms);
}

.login-btn,
.register-btn {
  width: 120px;
  height: 40px;
  margin: auto;
  text-align: center;
  line-height: 40px;
  border: 1px solid #CCBABA6F;
  border-radius: 8px;
  color: #E7E7E7C5;
  background-color: transparent;
  font-family: STXingkai, serif;
  font-size: 20px;
  transition: var(--transition-500ms);
  cursor: pointer;
}

.login-btn:hover,
.register-btn:hover {
  transform: translateY(-3px);
  box-shadow: 2px 2px 3px 3px rgba(0, 0, 0, 0.10);
}

/* 设置密码框的小眼睛 */
.reveal {
  position: absolute;
  top: 257px;
  right: 50px;
  transition: var(--transition-400ms);
}

.reveal /deep/ svg {
  width: 20px;
  height: 20px;
  fill: #fff;
}

/* 验证码的输入框 */
#registerCode {
  width: 100px;
}

.check-code-img {
  width: 100px;
  margin-left: 38px;
}

.login-card-enter-to {
  transform: translate(0, -4px);
}

.register-card-enter-to {
  transform: translate(0, -4px);
}

.login-card-enter {
  transform: translate(100%, -4px);
}

.register-card-enter {
  transform: translate(-100%, -4px);
}

.login-card-enter-active,
.register-card-enter-active {
  box-shadow: 0px 0px 4px 4px rgba(0, 0, 0, 0.20);
}

.login-card-leave-active,
.register-card-leave-active {
  display: none;
}

</style>