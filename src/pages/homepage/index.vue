<template>
  <div class="huadiao-homepage">
    <div v-if="getDataCompleted">
      <huadiao-homepage-header :me="allInfo.me"/>
      <homepage-user-infer-top :homepageInfo="allInfo.homepageInfo"
                               :userInfo="allInfo.userInfo"
                               :me="allInfo.me"/>
      <homepage-user-infer-board :viewedUserinfo="allInfo"
                                 :uid="allInfo.homepageInfo.uid"/>
    </div>
    <huadiao-middle-tip/>
    <huadiao-popup-window/>
    <huadiao-warning-top-container/>
  </div>
</template>

<script>
import {mapState} from "vuex";
import {apis} from "@/assets/js/constants/request-path";
import {statusCode} from "@/assets/js/constants/status-code";
import HuadiaoPopupWindow, {huadiaoPopupWindowOptions} from "@/pages/components/HuadiaoPopupWindow";
import HomepageUserInferTop from "@/pages/homepage/components/HomepageUserInferTop";
import HuadiaoHomepageHeader from "@/pages/homepage/components/HuadiaoHomepageHeader";
import HomepageUserInferBoard from "@/pages/homepage/components/HomepageUserInferBoard";
import HuadiaoMiddleTip from "@/pages/components/HuadiaoMiddleTip";
import HuadiaoWarningTopContainer from "@/pages/components/HuadiaoWarningTopContainer";

export default {
  name: "HuadiaoHomepage",
  data() {
    return {
      viewedUid: -1,
    }
  },
  computed: {
    ...mapState(["allInfo"]),
  },
  created() {
    this.getUid();
    this.getHomepageInfo();
  },
  methods: {
    // 获取个人主页 uid
    getUid() {
      this.viewedUid = parseInt(window.location.pathname.split(/[/]/)[2]);
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
  beforeMount() {
  },
  beforeDestroy() {
    this.clearAllRefsEvents();
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
body {
  width: 100%;
  height: 100%;
  --homepage-background: url('~@/../public/img/homepage/homepageDefaultBackground.jpg');
  background: var(--homepage-background) no-repeat fixed center;
}

.huadiao-homepage {
  width: 100%;
  height: 100vh;
  background-color: #00000030;
}
</style>