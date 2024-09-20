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
import HuadiaoHeader from "@/pages/components/header/HuadiaoHeader";
import HuadiaoMiddleTip from "@/pages/components/HuadiaoMiddleTip";
import HuadiaoPopupWindow from "@/pages/components/popwindow/HuadiaoPopupWindow";
import HuadiaoWarningTopContainer from "@/pages/components/HuadiaoWarningTopContainer";
import SunLightTheme from "@/pages/notes/components/SunLightTheme";
import LeftSliderBoard from "@/pages/components/NoteLeftSliderBoard";
import NoteListBoard from "@/pages/notes/components/NoteListBoard";

export default {
  name: "HuadiaoNotes",
  data() {
    return {
    }
  },
  created() {
    this.setLightTheme();
  },
  methods: {
    setLightTheme() {
      document.body.classList.add("light");
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
@import "~@/assets/css/theme/notes/light.css";
@import "~@/assets/css/theme/notes/dark.css";
body {
  background-color: var(--body-background-color);
}
</style>

<style scoped>
.huadiao-note-container {
  min-width: 1000px;
  overflow-x: hidden;
}
</style>
