<template>
  <div class="huadiao-build-note">
    <huadiao-header :user="user" :isLogin="isLogin"/>
    <note-content-board/>
  </div>
</template>

<script>
import {mapState} from "vuex";
import HuadiaoHeader from "@/pages/components/HuadiaoHeader";
import NoteContentBoard from "@/pages/singlenote/components/NoteContentBoard";

export default {
  name: "HuadiaoSingleNote",
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
    NoteContentBoard,
    HuadiaoHeader
  },
}
</script>

<style scoped>
.huadiao-build-note {
  min-width: 1000px;
}
</style>