<template>
  <div class="huadiao-build-note">
    <huadiao-header :huadiaoHeaderStyle="huadiaoHeaderStyle"/>
    <router-view></router-view>
    <huadiao-middle-tip/>
    <huadiao-warning-top-container/>
    <huadiao-popup-window/>
  </div>
</template>

<script>
import HuadiaoHeader from "@/pages/components/HuadiaoHeader";
import HuadiaoMiddleTip from "@/pages/components/HuadiaoMiddleTip";
import HuadiaoWarningTopContainer from "@/pages/components/HuadiaoWarningTopContainer";
import HuadiaoPopupWindow from "@/pages/components/HuadiaoPopupWindow";

export default {
  name: "HuadiaoBuildNote",
  data() {
    return {
      huadiaoHeaderStyle: {
        blur: true,
        shadow: true,
        backgroundColor: "#fff",
        entryColor: "#4b4b4b",
      }
    }
  },
  methods: {
  },
  components: {
    HuadiaoPopupWindow,
    HuadiaoWarningTopContainer,
    HuadiaoMiddleTip,
    HuadiaoHeader,
  },
}
</script>

<style>
body {
  min-width: 1200px;
  margin: 0 !important;
  overflow: hidden;
}
</style>

<style scoped>
.huadiao-build-note {
  width: 100%;
  min-height: 100vh;
  background-color: #f6f6f6;
}
</style>