<template>
  <div class="huadiao-follow-fan" :style="`background-image: url(${background})`">
    <huadiao-header/>
    <div class="follow-fan-container">
      <HuadiaoFollowFanBoard />
    </div>
    <div class="follow-fan-foreground"
         :class="{
           'foreground-animation': !mouseenterForeground
         }"
         ref="followFanForeground"
         :style="`background-image: url(${foreground})`"
         @mouseenter="mouseenterForeground = true"
         @mouseleave="mouseenterForeground = false"></div>
    <transfer-follow-group/>
    <huadiao-middle-tip/>
    <huadiao-warning-top-container/>
    <huadiao-popup-window/>
    <add-new-group-board/>
  </div>
</template>

<script>
import HuadiaoHeader from "@/pages/components/header/HuadiaoHeader";
import HuadiaoMiddleTip from "@/pages/components/HuadiaoMiddleTip";
import HuadiaoWarningTopContainer from "@/pages/components/HuadiaoWarningTopContainer";
import AddNewGroupBoard from "@/pages/followfan/components/AddNewGroupBoard";
import HuadiaoPopupWindow from "@/pages/components/popwindow/HuadiaoPopupWindow";
import TransferFollowGroup from "@/pages/followfan/components/TransferFollowGroup";
import FollowFanForeground from "@/assets/img/followfan/followFanForeground.webp";
import FollowFanBackground from "@/assets/img/followfan/followFanBackground.webp";
import {validateUser} from "@/common/apis";
import {flatPromise} from "@/util";
import {responseHandler} from "@/assets/js/constants/status-code";
import HuadiaoFollowFanBoard from "@/pages/followfan/pages/HuadiaoFollowFanBoard";

export default {
  name: "HuadiaoFollowFan",

  data() {
    return {
      mouseenterForeground: false,
      visible: false,
    };
  },

  computed: {
    foreground() {
      return FollowFanForeground;
    },
    background() {
      return FollowFanBackground;
    }
  },

  methods: {
    async validate() {
      const [err, res] = await flatPromise(validateUser());

      if (err) {
        console.error(err);
        return;
      }

      responseHandler(res).notAuthoritative(() => {});
    },
  },

  components: {
    HuadiaoFollowFanBoard,
    TransferFollowGroup,
    HuadiaoPopupWindow,
    AddNewGroupBoard,
    HuadiaoWarningTopContainer,
    HuadiaoMiddleTip,
    HuadiaoHeader,
  },
}
</script>

<style lang="scss">
.huadiao-follow-fan {
  display: flex;
  justify-content: center;
  min-height: 100vh;
  color: #646464;
  font-family: "宋体", serif;
  background: no-repeat center/cover;
  overflow: auto;

  .follow-fan-container {
    flex: 1;
    padding: 70px 6% 50px 6%;
  }
}

.follow-fan-foreground {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  width: 300px;
  height: 100vh;
  background: no-repeat center/cover;
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
