<template>
  <div class="huadiao-account">
    <huadiao-header/>
    <huadiao-account-options/>
    <transition name="fade" mode="out-in">
      <keep-alive>
        <router-view name="mainBoard"></router-view>
      </keep-alive>
    </transition>
    <huadiao-warning-top-container/>
    <huadiao-middle-tip/>
    <huadiao-popup-window/>
  </div>
</template>

<script>
import HuadiaoHeader from "@/pages/components/header/HuadiaoHeader";
import HuadiaoAccountOptions from "@/pages/account/components/HuadiaoAccountOptions";
import {mapState} from "vuex";
import HuadiaoWarningTopContainer from "@/pages/components/HuadiaoWarningTopContainer";
import HuadiaoMiddleTip from "@/pages/components/HuadiaoMiddleTip";
import HuadiaoPopupWindow from "@/pages/components/popwindow/HuadiaoPopupWindow";

export default {
  name: "HuadiaoAccount",
  data() {
    return {
    }
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
  },
  beforeDestroy() {
  },
  components: {
    HuadiaoPopupWindow,
    HuadiaoMiddleTip,
    HuadiaoWarningTopContainer,
    HuadiaoAccountOptions,
    HuadiaoHeader
  },
}
</script>

<style scoped>
.huadiao-account {
  width: 100%;
  min-width: 1000px;
  min-height: 100vh;
  padding: 60px 150px;
  background: -webkit-linear-gradient(left, #3494E6, #EC6EAD);
}
html {
  color-scheme: dark;
}
</style>
