<template>
  <div class="huadiao-homepage"
       v-if="getDataCompleted">
    <huadiao-homepage-header :me="viewedUser.me"/>
    <homepage-user-infer-top :homepageInfo="viewedUser.homepageInfo"
                             :userInfo="viewedUser.userInfo"
                             :me="viewedUser.me"/>
    <homepage-user-infer-board :viewedUserinfo="viewedUser"
                               :uid="viewedUser.homepageInfo.uid"/>
  </div>
</template>

<script>
import HuadiaoHomepageHeader from "@/pages/homepage/components/HuadiaoHomepageHeader";
import HomepageUserInferTop from "@/pages/homepage/components/HomepageUserInferTop";
import HomepageUserInferBoard from "@/pages/homepage/components/HomepageUserInferBoard";
import {mapState} from "vuex";

export default {
  name: "HuadiaoHomepage",
  data() {
    return {
      currentUid: 1,
      viewedUid: 2,
      viewedUser: {
        me: null,
        relation: null,
        fanCount: null,
        followCount: null,
        homepageInfo: {
          uid: null,
          pageBackground: null,
          userAvatar: null,
          visitCount: null,
        },
        userInfo: {
          bornDate: null,
          canvases: null,
          nickname: null,
          school: null,
          sex: null,
        },
      }
    }
  },
  created() {
    this.sendRequest({
      path: "homepage/info",
      params: {
        viewedUid: this.viewedUid,
      },
      thenCallback: (response) => {
        let res = response.data;
        console.log(res);
        this.getDataCompleted = true;
        this.viewedUser = res;
      },
      errorCallback: (error) => {
        console.log(error);
      },
    });
  },
  methods: {},
  computed: {
    ...mapState(["user"]),
  },
  beforeMount() {
  },
  beforeDestroy() {
    this.clearAllRefsEvents();
  },
  components: {
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