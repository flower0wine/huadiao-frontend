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

    }
  },
  watch: {
  },
  mounted() {
  },
  methods: {

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