<template>
  <div class="huadiao-note-container">
    <huadiao-header/>
    <left-slider-board/>
    <note-list-board/>
    <sun-light-theme/>
    <huadiao-middle-tip/>
    <huadiao-warning-top-container/>
    <huadiao-popup-window/>
  </div>
</template>

<script>
import {mapState} from "vuex";
import HuadiaoHeader from "@/pages/components/HuadiaoHeader";
import HuadiaoMiddleTip from "@/pages/components/HuadiaoMiddleTip";
import HuadiaoPopupWindow from "@/pages/components/HuadiaoPopupWindow";
import HuadiaoWarningTopContainer from "@/pages/components/HuadiaoWarningTopContainer";
import SunLightTheme from "@/pages/notes/components/SunLightTheme";
import LeftSliderBoard from "@/pages/components/NoteLeftSliderBoard";
import NoteListBoard from "@/pages/notes/components/NoteListBoard";

export default {
  name: "HuadiaoNotes",
  data() {
    return {}
  },
  computed: {
    ...mapState(["isLogin", "user"]),
  },
  created() {
    this.getUserNotesByUid();
  },
  methods: {
    // 获取用户所有笔记
    getUserNotesByUid() {
      this.sendRequest({
        path: "note/all",
        params: {
          authorUid: 1,
        },
        thenCallback: (response) => {
          let res = response.data;
          console.log(res);
          this.$store.commit("initialNoteAndAuthor", {author: res});
        },
        errorCallback: (error) => {
          console.log(error);
        }
      })
    },
  },
  beforeDestroy() {
  },
  components: {
    NoteListBoard,
    LeftSliderBoard,
    SunLightTheme,
    HuadiaoWarningTopContainer,
    HuadiaoPopupWindow,
    HuadiaoMiddleTip,
    HuadiaoHeader
  },
}
</script>

<style>
body {
  background-color: #ececec;
}
</style>

<style scoped>
.huadiao-note-container {
  min-width: 1000px;
  overflow-x: hidden;
}
</style>