<template>
  <div class="huadiao-follow-fan">
    <huadiao-header/>
    <huadiao-follow-fan-board/>
    <div class="follow-fan-foreground foreground-animation"
         ref="followFanForeground"
         @mouseenter="$refs.followFanForeground.classList.remove('foreground-animation')"
         @mouseleave="$refs.followFanForeground.classList.add('foreground-animation')"></div>
    <huadiao-middle-tip/>
    <huadiao-warning-top-container/>
    <huadiao-popup-window/>
    <add-new-group-board/>
  </div>
</template>

<script>
import {mapState} from "vuex";
import HuadiaoHeader from "@/pages/components/HuadiaoHeader";
import HuadiaoFollowFanBoard from "@/pages/followfan/components/HuadiaoFollowFanBoard";
import HuadiaoMiddleTip from "@/pages/components/HuadiaoMiddleTip";
import HuadiaoWarningTopContainer from "@/pages/components/HuadiaoWarningTopContainer";
import AddNewGroupBoard from "@/pages/followfan/components/AddNewGroupBoard";
import HuadiaoPopupWindow from "@/pages/components/HuadiaoPopupWindow";

export default {
  name: "HuadiaoFollowFan",
  data() {
    return {
      viewedUid: null,
    }
  },
  computed: {
  },
  beforeMount() {
    this.getViewedUid();
    this.getUserAccountInfer();
    this.getUserFollowInfer();
  },
  methods: {
    // 获取被观察的用户 uid
    getViewedUid() {
      if (!this.viewedUid) {
        // let url = window.location.href;
        let url = "http://localhost:9090/huadiao/9/follow/follow";
        this.viewedUid = url.split(/\//)[4];
      }
      return this.viewedUid;
    },
    // 获取用户账号信息
    getUserAccountInfer() {
      let params = {
        requestType: "ordinary",
        operation: "status",
      };
      this.sendRequest(params, {}, {}, (response) => {
        let res = response.data;
        console.log(res)
        // 对象
        if (typeof res === "object") {
          if (this.messageResponse(res)) {
            // no things
          }
          // 如果是用户信息
          else if (Object.hasOwnProperty.call(res, "uid")) {
            this.$store.commit("setUserAccountInfer", res);
          }
        }
      }, this.serverNoResponseError);
    },
    // 获取该用户关注信息
    getUserFollowInfer() {
      let params = {
        requestType: "followsFans",
        operation: "getFollowsFans",
        viewedUid: this.getViewedUid(),
      };
      this.sendRequest(params, {}, {}, (response) => {
        let res = response.data;
        console.log(res);
        if (typeof res === "object") {
          if (Object.hasOwnProperty.call(res, "code")) {
            if (res.code === 0) {
              this.huadiaoWarningTip("不可识别的的请求!");
            }
          }
          // 如果是用户信息
          else if (Object.hasOwnProperty.call(res, "me")) {
            // 存储数据到 vuex
            this.$store.commit("setUserAccountInfer", res);
            // 分析关注和粉丝是否是同一个人, 判断是否互粉
            this.$store.dispatch("searchSameUser");
          }
        }
      }, this.serverNoResponseError);
    },
  },
  beforeDestroy() {
  },
  components: {
    HuadiaoPopupWindow,
    AddNewGroupBoard,
    HuadiaoWarningTopContainer,
    HuadiaoMiddleTip,
    HuadiaoFollowFanBoard,
    HuadiaoHeader
  },
}
</script>

<style >
body {
  background: url("~@/../public/img/followfan/followFanBackground.png") no-repeat center center fixed;
  background-size: cover;
}

.huadiao-follow-fan {
  width: 100%;
  min-height: 100vh;
  padding: 60px 0 100px 0;
  color: #646464;
  font-family: "宋体", serif;
}

.follow-fan-foreground {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  width: 300px;
  height: 100vh;
  background: url("~@/../public/img/followfan/followFanForeground.png") no-repeat center center;
  background-size: cover;
  transform: translateX(-98%);
  transition: var(--transition-1000ms);
}

.foreground-animation {
  animation: followFanForegroundAnimation 3s infinite;
}

.follow-fan-foreground:hover {
  transform: translateX(0%);
}

@keyframes followFanForegroundAnimation {
  0% {
    left: 0px;
  }
  50% {
    left: 30px;
  }
  100% {
    left: 0px;
  }
}
</style>