<template>
  <div class="homepage-user-infer">
    <label for="userAvatar"
           :title="me ? '更换头像' : ''"
    >
      <user-avatar-box :options="userAvatarOptions" :user-avatar-url="userAvatar"></user-avatar-box>
      <input type="file"
             v-if="me"
             @change="userAvatarChange"
             ref="userAvatarInput"
             id="userAvatar"
             class="hidden-input">
    </label>
    <div class="homepage-nickname">{{userInfo.nickname}}</div>
    <div class="homepage-sex" v-if="sexSvg">
      <span v-html="sexSvg" class="sex-icon"></span>
    </div>
    <div class="born-date-school">
      <span class="born-date info-item"
            v-if="userInfo.bornDate">{{huadiaoDateFormat(userInfo.bornDate, "date")}}</span>
      <a :href="baiduSearch + userInfo.school"
         class="info-item"
         v-if="userInfo.school"
         target="_blank">
        <span class="school">{{userInfo.school}}</span>
      </a>
    </div>
    <div class="homepage-canvases"
         :title="userInfo.canvases"
         v-if="userInfo.canvases">
      {{userInfo.canvases.length < 200 ? userInfo.canvases : userInfo.canvases.slice(0, 200) + "..."}}
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import {svg} from "@/assets/js/constants/svgs";
import {apis} from "@/assets/js/constants/request-path";
import {statusCode} from "@/assets/js/constants/status-code";
import UserAvatarBox from "@/pages/components/UserAvatarBox";

export default {
  name: "HomepageUserInferTop",
  components: {UserAvatarBox},
  data() {
    return {
      svg,
      baiduSearch: "https://www.baidu.com/s?tn=68018901_39_oem_dg&ie=utf-8&word=",
      userAvatarOptions: {
        scale: '80px',
        borderColor: "#fff",
      },
    }
  },
  computed: {
    ...mapState({
      userInfo(state) {
        return state.allInfo.userInfo;
      },
      sexSvg(state) {
        let sex = parseInt(state.allInfo.userInfo.sex);
        let sexSvgArr = [svg.noKnownSex, svg.manSex, svg.womenSex];
        return sexSvgArr[sex];
      },
      userAvatar(state) {
        return `${state.allInfo.homepageInfo.userAvatar}`;
      }
    }),
  },
  methods: {
    userAvatarChange() {
      let formDate = new FormData();
      let userAvatar = this.$refs.userAvatarInput;
      this.commitUserAvatar(this.getImgPath(userAvatar));
      formDate.append("userAvatar", userAvatar.files[0]);

      this.sendRequest({
        path: apis.homepage.modifyAvatar,
        method: "post",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formDate,
        thenCallback: (response) => {
          let res = response.data;
          console.log(res);
          if(res.code === statusCode.succeed) {
            this.huadiaoMiddleTip("头像修改成功");
          }
        },
        errorCallback: (error) => {
          console.log(error);
        }
      })
    },
    commitUserAvatar(userAvatar) {
      this.$store.commit("modifyUserAvatar", {userAvatar})
    }
  },
  beforeDestroy() {
  }
}
</script>

<style scoped>
.homepage-user-infer {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
}

.user-avatar-container {
  position: relative;
  display: inline-block;
  border-radius: 50%;
  box-shadow: var(--box-shadow);
}

.user-avatar {
  position: absolute;
  top: 0;
  left: 0;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 2px solid #fff;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  transition: var(--transition-500ms);
}

.user-avatar-container,
/deep/ .user-avatar-box {
  transition: all linear 600s;
}

.user-avatar-container:hover,
/deep/ .user-avatar-box:hover {
  transform: rotate(36000deg);
}

.user-default-avatar {
  width: 80px;
}

.homepage-nickname {
  font-size: 20px;
  font-weight: 700;
  margin: 20px 0 3px 0;
  color: #fff;
  text-shadow: 4px 4px 5px #0000009B;
}

.homepage-nickname:hover {
  background-image: -webkit-linear-gradient(right, #f35626,#feab3a);
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  animation: background 10s infinite;
}

.sex-icon /deep/ svg {
  width: 20px;
  height: 20px;
}

.born-date-school {
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  font-size: 14px;
  color: #EEEEEEFF;
}

.info-item:nth-child(2) {
  margin-left: 40px;
}

.born-date-school a {
  color: #EEEEEEFF;
}

.homepage-canvases {
  width: 700px;
  margin: 10px 0 20px 0;
  text-align: center;
  letter-spacing: 1px;
  color: #EEEEEEFF;
}
</style>