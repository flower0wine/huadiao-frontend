<template>
  <div class="huadiao-note-container" v-if="getDataCompleted">
    <huadiao-header/>
    <left-slider-board :authorInfo="authorInfo"/>
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
import {statusCode} from "@/assets/js/constants/status-code";

export default {
  name: "HuadiaoNotes",
  data() {
    return {}
  },
  computed: {
    viewedUid() {
      return this.$route.params.viewedUid;
    },
    ...mapState({
      authorInfo(state) {
        return state.author.authorInfo;
      }
    })
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
          authorUid: this.viewedUid,
        },
        thenCallback: (response) => {
          let res = response.data;
          console.log(res);

          if(res.code === statusCode.succeed) {
            this.$store.commit("initialNoteAndAuthor", {author: res.data});
            this.getDataCompleted = true;
          }
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