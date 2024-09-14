<template>
  <div class="huadiao-account-info">
    <transition name="fade" mode="out-in">
      <request-fail v-if="visible.loadingFail" :failCallback="getUserInfo"/>
      <circle-loading v-else-if="visible.loading"/>
      <div v-else>
        <div class="account-info-header">我的信息</div>
        <div class="account-infer">
          <div class="account-nickname account-infer-item">
            <label for="nickname">昵称</label>
            <input type="text"
                   id="nickname"
                   autocomplete="off"
                   minlength="8"
                   maxlength="20"
                   placeholder="填写你喜欢的昵称"
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
                      placeholder="把自己介绍一下吧!!"
                      v-model="tempUser.canvases"></textarea>
          </div>
          <div class="account-sex account-infer-item">
            <label>性别</label>
            <div class="sex-buttons">
            <span class="man-button button"
                  :class="tempUser.sex === 1 ? 'choice-button-sex' : ''"
                  @click="tempUser.sex = 1"
                  ref="man"
            >
              <span>男</span>
            </span>
              <span class="women-button button"
                    :class="tempUser.sex === 2 ? 'choice-button-sex' : ''"
                    @click="tempUser.sex = 2"
                    ref="women"
              >
            <span>女</span>
            </span>
              <span class="no-known-button button"
                    :class="tempUser.sex === 0 ? 'choice-button-sex' : ''"
                    @click="tempUser.sex = 0"
                    ref="noKnown"
              >
            <span>保密</span>
          </span>
              <transition name="no-known-icon"
                          @after-enter="$refs.noKnowImg.classList.add('no-known-icon-enter-to')"
                          @after-leave="$refs.noKnowImg.classList.remove('no-known-icon-enter-to')"
                          appear>
                <img :src="noKnownImg"
                     class="no-known-icon"
                     v-show="tempUser.sex === 0"
                     ref="noKnowImg"
                     alt>
              </transition>
              <transition name="man-icon"
                          @after-enter="$refs.manImg.classList.add('man-icon-enter-to')"
                          @after-leave="$refs.manImg.classList.remove('man-icon-enter-to')"
                          appear>
                <img :src="manImg"
                     class="man-icon"
                     v-show="tempUser.sex === 1"
                     ref="manImg"
                     alt>
              </transition>
              <transition name="women-icon"
                          @after-enter="$refs.womenImg.classList.add('women-icon-enter-to')"
                          @after-leave="$refs.womenImg.classList.remove('women-icon-enter-to')"
                          appear>
                <img :src="womenImg"
                     class="women-icon"
                     v-show="tempUser.sex === 2"
                     ref="womenImg"
                     alt>
              </transition>
            </div>
          </div>
          <div class="account-born-date account-infer-item">
            <label for="bornDate">出生日期</label>
            <el-date-picker
                v-model="tempUser.bornDate"
                align="right"
                type="date"
                placeholder="选择你的出生日期"
                popper-class="date-picker-panel"
                prefix-icon="date-picker-prefix-icon"
                :picker-options="pickerOptions">
            </el-date-picker>
          </div>
          <div class="account-school account-infer-item">
            <label for="school">学校</label>
            <input type="text"
                   id="school"
                   autocomplete="off"
                   placeholder="就读学校"
                   v-model="tempUser.school">
          </div>
          <div class="warning-tip account-infer-item">
            <label></label>
            <span>备注: 更换头像请前往个人主页, 单击头像即可更换</span>
          </div>
        </div>
        <div class="account-infer-save" @click="clickToUpdateUserInfo">保存</div>
      </div>
    </transition>
  </div>
</template>

<script>
import CircleLoading from "@/pages/components/loading/CircleLoading";
import RequestFail from "@/pages/components/RequestFail";
import {apis} from "@/assets/js/constants/request-path";
import {statusCode} from "@/assets/js/constants/status-code";
import {accountResponseMessage} from "@/assets/js/constants/response_message/account";
import {ResponseHandler} from "@/assets/js/utils";
import WomenImg from "@/assets/img/account/women.webp";
import ManImg from "@/assets/img/account/man.webp";
import NoKnownImg from "@/assets/img/account/noknown.webp";
import {flatPromise} from "@/util";
import {getAccountInfo} from "@/pages/account/pages/info/apis";

export default {
  name: "HuadiaoAccountInfo",
  components: {RequestFail, CircleLoading},
  data() {
    return {
      curSex: null,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      visible: {
        loading: true,
        loadingFail: false,
      },
      tempUser: {
        userId: null,
        nickname: null,
        canvases: "这个人十分神秘...",
        bornDate: null,
        school: null,
        sex: 0,
      },
      userInfo: null,
    }
  },
  created() {
    this.getUserInfo();
  },
  computed: {
    womenImg() {
      return WomenImg;
    },
    manImg() {
      return ManImg;
    },
    noKnownImg() {
      return NoKnownImg;
    }
  },
  methods: {
    async getUserInfo() {
      this.visible.loadingFail = false;

      const [err, res] = await flatPromise(getAccountInfo());

      if (err) {
        console.log(err);
        this.visible.loadingFail = true;
        return;
      }

      console.log(res);

      new ResponseHandler(res).succeed((userInfo) => {
        this.userInfo = userInfo;
        for (let key in userInfo) {
          if (userInfo[key]) {
            this.tempUser[key] = userInfo[key];
          }
        }
        if (!userInfo.nickname) {
          this.tempUser.nickname = userInfo.userId;
        }
        this.visible.loading = false;
      }).error((err) => {
        this.visible.loadingFail = true;
        console.log(err.message);
      });
    },
    // 点击修改用户信息
    clickToUpdateUserInfo() {
      // 检查昵称
      let tempUserNickname = this.tempUser.nickname;
      let nickname = tempUserNickname ? tempUserNickname.trim() : '';
      if (nickname === '') {
        this.huadiaoMiddleTip("昵称不能为空或只包含空格");
        return;
      } else if (!(0 < nickname.length && nickname.length <= 20)) {
        this.huadiaoMiddleTip("昵称长度最大为 20 个字符");
        return;
      }
      // 检查 bornDate
      let bornDate = new Date(this.userInfo.bornDate);
      // 用户没有设置出生日期时 bornDate 可能为 null
      let tempUserBornDate = this.tempUser.bornDate;
      if (tempUserBornDate && tempUserBornDate !== bornDate) {
        if (tempUserBornDate > bornDate) {
          this.huadiaoMiddleTip("出生日期大于当前时间");
          return;
        }
        bornDate = new Date(tempUserBornDate);
      }
      // 检查 canvases
      let canvases = this.userInfo.canvases;
      let tempUserCanvases = this.tempUser.canvases;
      tempUserCanvases = tempUserCanvases ? tempUserCanvases.trim() : '';
      if (canvases !== tempUserCanvases) {
        // 检查个人简介
        canvases = tempUserCanvases;
        if (canvases.length > 50) {
          this.huadiaoMiddleTip("个人简介长度最长为 50 个字符");
          return;
        }
        if (canvases.length === 0) {
          canvases = null;
        }
      }
      // 检查学校
      let school = this.userInfo.school;
      let tempUserSchool = this.tempUser.school;
      tempUserSchool = tempUserSchool ? tempUserSchool.trim() : '';
      if (tempUserSchool !== school) {
        school = tempUserSchool;
        if (school.length > 30) {
          this.huadiaoMiddleTip("学校长度最长为 30 个字符");
          return;
        }
        if (school.length === 0) {
          school = null;
        }
      }
      this.sendRequest({
        path: apis.account.info,
        method: "post",
        data: {
          nickname,
          canvases,
          sex: this.tempUser.sex,
          bornDate: bornDate.getTime(),
          school
        },
        thenCallback: (response) => {
          let res = response.data;
          console.log(res);
          new ResponseHandler(res).succeed(() => {
            this.huadiaoMiddleTip("修改用户信息成功");
          }).errorParam((data) => {
            if (data === accountResponseMessage.wrongBornDate) {
              this.huadiaoMiddleTip("出生日期有误");
            } else {
              this.huadiaoMiddleTip("修改信息失败");
            }
          });
        },
        errorCallback: (error) => {
          console.log(error);
          this.huadiaoMiddleTip("修改信息失败")
        },
      });
    },
  },
  beforeDestroy() {
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
.account-infer textarea,
/deep/ .el-input__inner {
  padding: 5px 10px;
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid #9a9a9a;
  color: #676767;
  background-color: transparent;
  transition: var(--transition-500ms);
}

.account-infer input:hover,
.account-infer textarea:hover,
/deep/ .el-input__inner:hover {
  transform: translateY(-3px);
  box-shadow: var(--box-shadow-min);
  background-color: rgba(253, 253, 253, 0.15);
}

/deep/ .el-input__inner {
  width: 140px;
  height: unset;
  line-height: initial;
}

/deep/ .el-input__inner::-webkit-input-placeholder,
#nickname::-webkit-input-placeholder,
#canvases::-webkit-input-placeholder,
#school::-webkit-input-placeholder {
  font-size: 14px;
  color: #a8a8a8;
}

#nickname {
  width: 300px;
}

#school {
  width: 350px;
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

.date-picker-panel {
  background-color: transparent;
}

.date-picker-prefix-icon {
  display: none;
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