<template>
  <div class="huadiao-account">
    <huadiao-header :isLogin="isLogin" :user="user"/>
    <huadiao-account-options/>
    <transition name="fade" mode="out-in">
      <keep-alive>
        <router-view name="mainBoard"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import HuadiaoHeader from "@/pages/components/HuadiaoHeader";
import HuadiaoAccountOptions from "@/pages/account/components/HuadiaoAccountOptions";
import {mapState} from "vuex";

export default {
  name: "HuadiaoAccount",
  data() {
    return {
    }
  },
  computed: {
    ...mapState(["isLogin", "user"]),
  },
  mounted() {
  },
  methods: {
  },
  beforeDestroy() {
    this.clearAllRefsEvents();
  },
  components: {
    HuadiaoAccountOptions,
    HuadiaoHeader
  },
}
</script>

<style scoped>
.huadiao-account {
  width: 100%;
  min-height: 100vh;
  padding: 60px 150px;
  background: -webkit-linear-gradient(left, #3494E6, #EC6EAD);
}
html {
  color-scheme: dark;
}
</style>