<template>
  <div class="huadiao-build-note">
    <huadiao-header :user="user" :isLogin="isLogin"/>
    <huadiao-middle-tip/>
    <huadiao-warning-top-container/>
    <huadiao-popup-window/>
  </div>
</template>

<script>
import {mapState} from "vuex";
import HuadiaoHeader from "@/pages/components/HuadiaoHeader";
import HuadiaoMiddleTip from "@/pages/components/HuadiaoMiddleTip";
import HuadiaoWarningTopContainer from "@/pages/components/HuadiaoWarningTopContainer";
import HuadiaoPopupWindow from "@/pages/components/HuadiaoPopupWindow";

export default {
  name: "HuadiaoBuildNote",
  data() {
    return {}
  },
  computed: {
    ...mapState(["isLogin", "user"]),
  },
  beforeMount() {
  },
  methods: {},
  beforeDestroy() {
  },
  components: {
    HuadiaoPopupWindow,
    HuadiaoWarningTopContainer,
    HuadiaoMiddleTip,
    HuadiaoHeader
  },
}
</script>

<style>
body {
  min-width: 1200px;
}
</style>

<style scoped>
.huadiao-build-note {
  width: 100%;
  min-height: 100vh;
  background: -webkit-linear-gradient(left, #12c2e9, #c471ed, #f64f59);
}
</style>