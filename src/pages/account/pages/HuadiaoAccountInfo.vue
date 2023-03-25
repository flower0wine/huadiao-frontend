<template>
  <div class="huadiao-account-info">
    <div class="account-info-header">我的信息</div>
    <div class="account-infer">
      <div class="account-nickname account-infer-item">
        <label for="nickname">昵称</label>
        <input type="text"
               id="nickname"
               autocomplete="off"
               minlength="8"
               maxlength="20"
               v-model="tempUser.nickname">
      </div>
      <div class="account-user-id account-infer-item">
        <label>用户ID</label>
        <span>{{ tempUser.userId }}</span>
      </div>
      <div class="account-canvases account-infer-item">
        <label for="canvases">个性签名</label>
        <textarea id="canvases"
                  autocomplete="off"
                  minlength="0"
                  maxlength="200"
                  cols="60"
                  rows="10"
                  v-model="tempUser.canvases"></textarea>
      </div>
      <div class="account-sex account-infer-item">
        <label>性别</label>
        <div class="sex-buttons">
          <span class="man-button button"
                :class="tempUser.sex === '1' ? 'choice-button-sex' : ''"
                @click="tempUser.sex = '1'"
                ref="man"
          >
            <span>男</span>
          </span>
          <span class="women-button button"
                :class="tempUser.sex === '2' ? 'choice-button-sex' : ''"
                @click="tempUser.sex = '2'"
                ref="women"
          >
            <span>女</span>
          </span>
          <span class="no-known-button button"
                :class="tempUser.sex === '0' ? 'choice-button-sex' : ''"
                @click="tempUser.sex = '0'"
                ref="noKnown"
          >
            <span>保密</span>
          </span>
          <transition name="no-known-icon"
                      @after-enter="$refs.noKnowImg.classList.add('no-known-icon-enter-to')"
                      @after-leave="$refs.noKnowImg.classList.remove('no-known-icon-enter-to')"
                      appear>
            <img src="/img/account/noknown.png"
                 class="no-known-icon"
                 v-show="tempUser.sex === '0'"
                 ref="noKnowImg"
                 alt>
          </transition>
          <transition name="man-icon"
                      @after-enter="$refs.manImg.classList.add('man-icon-enter-to')"
                      @after-leave="$refs.manImg.classList.remove('man-icon-enter-to')"
                      appear>
            <img src="/img/account/man.png"
                 class="man-icon"
                 v-show="tempUser.sex === '1'"
                 ref="manImg"
                 alt>
          </transition>
          <transition name="women-icon"
                      @after-enter="$refs.womenImg.classList.add('women-icon-enter-to')"
                      @after-leave="$refs.womenImg.classList.remove('women-icon-enter-to')"
                      appear>
            <img src="/img/account/women.png"
                 class="women-icon"
                 v-show="tempUser.sex === '2'"
                 ref="womenImg"
                 alt>
          </transition>
        </div>
      </div>
      <div class="account-born-date account-infer-item">
        <label for="bornDate">出生日期</label>
        <input type="text"
               v-model="tempUser.bornDate"
               id="bornDate"
               readonly>
      </div>
      <div class="account-school account-infer-item">
        <label for="school">学校</label>
        <input type="text"
               id="school"
               autocomplete="off"
               v-model="tempUser.school">
      </div>
      <div class="warning-tip account-infer-item">
        <label></label>
        <span>备注: 更换头像请前往个人主页, 单击头像即可更换</span>
      </div>
    </div>
    <div class="account-infer-save">保存</div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "HuadiaoAccountInfo",
  data() {
    return {
      tempUser: {
        isLogin: null,
        nickname: null,
        canvases: null,
        school: null,
        userId: null,
        bornDate: null,
        sex: null,
        uid: null,
      },
    }
  },
  computed: {
    ...mapState(["isLogin", "user"]),
  },
  mounted() {
    this.tempUser = this.user;
  },
  methods: {
  },
  beforeDestroy() {
    this.clearAllRefsEvents();
  }
}
</script>

<style scoped>
.huadiao-account-info {
  width: 1000px;
  height: 800px;
  background-color: #FFFFFF94;
  margin: 0 auto;
  padding: 40px 80px;
  border-radius: 8px;
  backdrop-filter: blur(1px);
  box-shadow: var(--box-shadow-min);
  transition: var(--transition-500ms);
}

.account-info-header {
  font-size: 20px;
  font-weight: 700;
  color: #676767;
}

.account-infer {
  padding: 20px 40px;
  color: #676767;
}

.account-infer-item {
  margin-top: 20px;
}

.account-infer label {
  display: inline-block;
  width: 150px;
  text-align: right;
  margin-right: 100px;
}

.account-canvases label {
  vertical-align: top;
}

.account-infer input,
.account-infer textarea {
  padding: 5px 10px;
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid #9a9a9a;
  color: #676767;
  background-color: transparent;
  transition: var(--transition-500ms);
}

.account-infer input:hover,
.account-infer textarea:hover {
  transform: translateY(-3px);
  box-shadow: var(--box-shadow-min);
  background-color: rgba(253, 253, 253, 0.15);
}

.account-infer textarea {
  font-size: 12px;
}

.sex-buttons .button {
  display: inline-block;
  width: 56px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  margin-right: 30px;
  border-radius: 6px;
  color: rgb(134, 132, 132);
  background-color: rgba(192, 190, 213);
  cursor: pointer;
}

.sex-buttons {
  position: relative;
}

.choice-button-sex {
  color: #e0e0e0 !important;
  background-color: #D73A3AFF !important;
}

/* 人物 */
.sex-buttons img {
  position: absolute;
  z-index: -1;
  top: 0px;
  transition: var(--transition-500ms);
}

.sex-buttons img.man-icon {
  left: 10px;
}

.sex-buttons img.man-icon-enter-to {
  top: -44px;
}

.sex-buttons img.man-icon-leave-to {
  top: -19px;
}

.sex-buttons img.women-icon {
  left: 90px;
}

.sex-buttons img.women-icon-enter-to {
  top: -48px;
}

.sex-buttons img.women-icon-leave-to {
  top: -24px;
}

.sex-buttons img.no-known-icon {
  left: 180px;
}

.sex-buttons img.no-known-icon-enter-to {
  top: -47px;
}

.sex-buttons img.no-known-icon-leave-to {
  top: -24px;
}

.account-sex {
  display: flex;
  margin-top: 70px;
}

.warning-tip {
  color: #676767;
  font-size: 12px;
}

.account-infer-save {
  width: 80px;
  height: 36px;
  text-align: center;
  line-height: 36px;
  border-radius: 8px;
  margin: 30px auto 0;
  color: #e0e0e0;
  background-color: rgba(215, 5, 5, 0.62);
  cursor: pointer;
  transition: var(--transition-500ms);
}

.account-infer-save:hover {
  transform: translateY(-3px);
  box-shadow: var(--box-shadow-min);
  background-color: rgba(194, 3, 3, 0.62);
}
</style>