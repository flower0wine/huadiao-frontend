<template>
  <div class="huadiao-build-note">
    <huadiao-header :user="user" :isLogin="isLogin"/>
  </div>
</template>

<script>
import {mapState} from "vuex";
import HuadiaoHeader from "@/pages/components/HuadiaoHeader";

export default {
  name: "HuadiaoSingleFanju",
  data() {
    return {}
  },
  computed: {
    ...mapState(["isLogin", "user"]),
  },
  beforeMount() {
  },
  methods: {

  },
  beforeDestroy() {
  },
  components: {
    HuadiaoHeader
  },
}
</script>

<style scoped>

</style>