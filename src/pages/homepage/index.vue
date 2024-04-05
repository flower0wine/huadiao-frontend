<template>
  <div class="huadiao-homepage-container" :style="`background-image: url('${homepageBackground}');`">
    <div class="homepage-mark">
      <div v-if="getDataCompleted">
        <huadiao-homepage-header/>
        <homepage-user-infer-top/>
        <homepage-user-infer-board/>
      </div>
    </div>
    <huadiao-middle-tip/>
    <huadiao-popup-window/>
    <huadiao-warning-top-container/>
  </div>
</template>

<script>
import {apis} from "@/assets/js/constants/request-path";
import {statusCode} from "@/assets/js/constants/status-code";
import HuadiaoPopupWindow, {huadiaoPopupWindowOptions} from "@/pages/components/HuadiaoPopupWindow";
import HomepageUserInferTop from "@/pages/homepage/components/HomepageUserInferTop";
import HuadiaoHomepageHeader from "@/pages/homepage/components/HuadiaoHomepageHeader";
import HomepageUserInferBoard from "@/pages/homepage/components/HomepageUserInferBoard";
import HuadiaoMiddleTip from "@/pages/components/HuadiaoMiddleTip";
import HuadiaoWarningTopContainer from "@/pages/components/HuadiaoWarningTopContainer";
import {mapState} from "vuex";
import HomepageBackground from "@/assets/img/homepage/homepageDefaultBackground.webp";

export default {
  name: "HuadiaoHomepage",
  data() {
    return {
    }
  },
  beforeMount() {
    this.getUid();
    this.getHomepageInfo();
  },
  computed: {
    ...mapState({
      homepageBackground(state) {
        let homepageBackground = state.allInfo.homepageInfo.pageBackground;
        if(!homepageBackground) {
          return HomepageBackground;
        }
        if(homepageBackground.startsWith("blob:http://")) {
          return homepageBackground;
        }
        return `${this.homepageBackgroundImagePath}${homepageBackground}`;
      },
    }),
  },
  methods: {
    // 获取个人主页 uid
    getUid() {
      let viewedUid = parseInt(window.location.pathname.split(/[/]/)[2]);
      this.$store.commit("initialViewedUid", {viewedUid});
    },
    getHomepageInfo() {
      this.sendRequest({
        path: apis.homepage.info,
        params: {
          viewedUid: this.viewedUid,
        },
        thenCallback: (response) => {
          let res = response.data;
          console.log(res);
          if(statusCode.succeed === res.code) {
            this.getDataCompleted = true;
            this.$store.commit("initialAllInfo", {allInfo: res.data});
          } else if(statusCode.notAllowed === res.code) {
            this.huadiaoPopupWindow(huadiaoPopupWindowOptions.iconType.error, huadiaoPopupWindowOptions.operate.hasRead, "用户不公开个人主页");
          }
        },
        errorCallback: (error) => {
          console.log(error);
        },
      });
    },
  },
  beforeDestroy() {
  },
  components: {
    HuadiaoWarningTopContainer,
    HuadiaoMiddleTip,
    HuadiaoPopupWindow,
    HomepageUserInferBoard,
    HomepageUserInferTop,
    HuadiaoHomepageHeader
  },
}
</script>

<style>
.huadiao-homepage-container {
  width: 100%;
  min-width: 1200px;
  height: 100vh;
  min-height: 600px;
  background: no-repeat fixed center/cover;
}

.homepage-mark {
  width: 100%;
  height: 100%;
  background-color: #00000030;
}
</style>