<template>
  <div class="huadiao-follow-fan" :style="background">
    <huadiao-header/>
    <template v-if="visible">
      <router-view></router-view>
    </template>
    <div class="follow-fan-foreground foreground-animation"
         ref="followFanForeground"
         :style="foreground"
         @mouseenter="$refs.followFanForeground.classList.remove('foreground-animation')"
         @mouseleave="$refs.followFanForeground.classList.add('foreground-animation')"></div>
    <transfer-follow-group/>
    <huadiao-middle-tip/>
    <huadiao-warning-top-container/>
    <huadiao-popup-window/>
    <add-new-group-board/>
  </div>
</template>

<script>
import HuadiaoHeader from "@/pages/components/HuadiaoHeader";
import HuadiaoMiddleTip from "@/pages/components/HuadiaoMiddleTip";
import HuadiaoWarningTopContainer from "@/pages/components/HuadiaoWarningTopContainer";
import AddNewGroupBoard from "@/pages/followfan/components/AddNewGroupBoard";
import HuadiaoPopupWindow from "@/pages/components/HuadiaoPopupWindow";
import TransferFollowGroup from "@/pages/followfan/components/TransferFollowGroup";
import FollowFanForeground from "@/assets/img/followfan/followFanForeground.webp";
import FollowFanBackground from "@/assets/img/followfan/followFanBackground.webp";

export default {
  name: "HuadiaoFollowFan",
  data() {
    return {
      visible: false
    }
  },
  watch: {
    "$store.state.user": {
      deep: true,
      handler(val) {
        this.visible = true;
      }
    }
  },
  computed: {
    foreground() {
      return this.packageBackgroundUrl(FollowFanForeground);
    },
    background() {
      return this.packageBackgroundUrl(FollowFanBackground);
    }
  },
  mounted() {
  },
  methods: {},
  beforeDestroy() {
  },
  components: {
    TransferFollowGroup,
    HuadiaoPopupWindow,
    AddNewGroupBoard,
    HuadiaoWarningTopContainer,
    HuadiaoMiddleTip,
    HuadiaoHeader
  },
}
</script>

<style>
body {
}

.huadiao-follow-fan {
  width: 100%;
  min-height: 100vh;
  padding: 60px 0 100px 0;
  color: #646464;
  font-family: "宋体", serif;
  background: no-repeat center/cover;
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