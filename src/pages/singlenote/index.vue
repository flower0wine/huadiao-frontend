<template>
  <div class="huadiao-single-note-container">
    <huadiao-header :huadiaoHeaderStyle="huadiaoHeaderStyle">
      <template v-slot:right>
        <div class="catalogue-icon"
             :title="visible.catalogue ? '关闭目录' : '打开目录'"
             @click="clickCatalogueIcon"
             ref="catalogueIcon"
        >
          <div class="catalogue-icon-top"></div>
          <div class="catalogue-icon-middle"></div>
          <div class="catalogue-icon-bottom"></div>
        </div>
      </template>
    </huadiao-header>
    <template v-if="visible.note">
      <left-slider-board/>
      <note-content-board :showCatalogue="visible.catalogue"/>
      <sun-light-theme :change-theme-callback="changeTheme"/>
    </template>
    <huadiao-warning-top-container/>
    <huadiao-middle-tip/>
    <huadiao-popup-window/>
  </div>
</template>

<script>
import {mapState} from "vuex";
import HuadiaoHeader from "@/pages/components/header/HuadiaoHeader";
import NoteContentBoard from "@/pages/singlenote/components/NoteContentBoard";
import SunLightTheme from "@/pages/notes/components/SunLightTheme";
import LeftSliderBoard from "@/pages/components/NoteLeftSliderBoard";
import HuadiaoWarningTopContainer from "@/pages/components/HuadiaoWarningTopContainer";
import HuadiaoMiddleTip from "@/pages/components/HuadiaoMiddleTip";
import HuadiaoPopupWindow from "@/pages/components/HuadiaoPopupWindow";
import {statusCode} from "@/assets/js/constants/status-code";
import {singleNoteHuadiaoHeaderStyle} from "@/assets/js/constants/style/huadiao_header_style/singlenote";
import {apis} from "@/assets/js/constants/request-path";

export default {
  name: "HuadiaoSingleNote",
  data() {
    return {
      visible: {
        note: false,
        catalogue: false
      },
    }
  },
  computed: {
    huadiaoHeaderStyle() {
      return singleNoteHuadiaoHeaderStyle;
    },
    ...mapState(["noteInfo"]),
  },
  watch: {
    "$store.state.noteInfo": {
      deep: true,
      handler() {
        this.visible.note = true;
      }
    }
  },
  created() {
    this.setLightTheme();
    this.searchNote();
  },
  methods: {
    changeTheme(theme) {
      if(theme === "dark") {
        this.huadiaoHeaderStyle.backgroundColor = "#4a4a4a";
        this.huadiaoHeaderStyle.entryColor = "#b0b0b0";
        this.huadiaoHeaderStyle.customShadow = "2px 2px 3px 1px #0000006E";
        this.$bus.$emit("modifyHuadiaoHeaderStyle");
      }
      else {
        this.huadiaoHeaderStyle.backgroundColor = "#e3e3e3";
        this.huadiaoHeaderStyle.entryColor = "#414141";
        this.huadiaoHeaderStyle.customShadow = "1px 1px 3px 1px #5b5b5b94";
        this.$bus.$emit("modifyHuadiaoHeaderStyle");
      }
    },
    setLightTheme() {
      let classList = document.body.classList;
      let light = "light";
      let dark = "dark";
      if(classList.contains(light)) {
        classList.remove(light);
        classList.add(dark);
      }
      else {
        classList.remove(dark);
        classList.add(light);
      }
    },
    // 获取笔记
    searchNote() {
      let noteId = this.noteId;
      let uid = this.authorUid;
      let reg = /\d+/;
      if(!reg.test(uid) || !reg.test(noteId)) {
        return;
      }
      this.sendRequest({
        path: apis.note.get,
        params: {
          noteId,
          uid,
        },
        thenCallback: (response) => {
          let res = response.data;
          console.log(res);
          if(res.code === statusCode.SUCCEED) {
            this.$store.commit("initialNoteInfo", {noteInfo: res.data});
          }
        },
        errorCallback: (error) => {
          console.log(error);
        }
      });
    },
    // 点击目录图标
    clickCatalogueIcon() {
      this.visible.catalogue = !this.visible.catalogue;
      if (this.visible.catalogue) {
        this.$refs.catalogueIcon.classList.add("click-catalogue-icon");
      } else {
        this.$refs.catalogueIcon.classList.remove("click-catalogue-icon");
      }
    },
  },
  beforeDestroy() {
  },
  components: {
    HuadiaoPopupWindow,
    HuadiaoMiddleTip,
    HuadiaoWarningTopContainer,
    LeftSliderBoard,
    SunLightTheme,
    NoteContentBoard,
    HuadiaoHeader
  },
}
</script>

<style>
@import "~@/assets/css/theme/singlenote/light.css";
@import "~@/assets/css/theme/singlenote/dark.css";
html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--single-note-bg-color);
}
</style>

<style scoped>
.huadiao-single-note-container {
  min-width: 1400px;
  padding-top: 90px;
  scroll-behavior: smooth;
}

.catalogue-icon {
  width: 39px;
  height: 36px;
  padding: 1px 0px 0px 3px;
  cursor: pointer;
}

.catalogue-icon-top,
.catalogue-icon-middle,
.catalogue-icon-bottom {
  width: 30px;
  height: 4px;
  margin-top: 4px;
  border-radius: 2px;
}

.catalogue-icon-top {
  background-color: var(--catalogue-icon-color);
  box-shadow: var(--catalogue-box-shadow);
  transform-origin: 28px 7px;
  transition: var(--transition-500ms);
}

.catalogue-icon-middle {
  background-color: var(--catalogue-icon-color);
  box-shadow: var(--catalogue-box-shadow);
}

.catalogue-icon-bottom {
  background-color: var(--catalogue-icon-color);
  box-shadow: var(--catalogue-box-shadow);
  transform-origin: 24px 2px;
  transition: var(--transition-500ms);
}

.click-catalogue-icon .catalogue-icon-top {
  transform: rotate(-45deg);
}

.click-catalogue-icon .catalogue-icon-middle {
  visibility: hidden;
}

.click-catalogue-icon .catalogue-icon-bottom {
  transform: rotate(45deg);
}
</style>
