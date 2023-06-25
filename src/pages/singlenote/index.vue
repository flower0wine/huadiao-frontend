<template>
  <div class="huadiao-single-note-container">
    <huadiao-header :huadiaoHeaderStyle="huadiaoHeaderStyle">
      <template v-slot>
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
      <left-slider-board :authorInfo="authorInfo"/>
      <note-content-board :showCatalogue="visible.catalogue"/>
      <sun-light-theme/>
    </template>
    <huadiao-warning-top-container/>
    <huadiao-middle-tip/>
    <huadiao-popup-window/>
  </div>
</template>

<script>
import {mapState} from "vuex";
import HuadiaoHeader from "@/pages/components/HuadiaoHeader";
import NoteContentBoard from "@/pages/singlenote/components/NoteContentBoard";
import SunLightTheme from "@/pages/notes/components/SunLightTheme";
import LeftSliderBoard from "@/pages/components/NoteLeftSliderBoard";
import HuadiaoWarningTopContainer from "@/pages/components/HuadiaoWarningTopContainer";
import HuadiaoMiddleTip from "@/pages/components/HuadiaoMiddleTip";
import HuadiaoPopupWindow from "@/pages/components/HuadiaoPopupWindow";

export default {
  name: "HuadiaoSingleNote",
  data() {
    return {
      visible: {
        note: false,
        catalogue: false
      },
      // huadiaoHeader 样式
      huadiaoHeaderStyle: {
        backgroundColor: "#e3e3e3",
        shadow: true,
        entryColor: "#414141",
        inputTheme: {
          inputBackgroundColor: "#bebebe",
          searchBackgroundColor: "#797979",
        },
        loggedBoardStyle: {
          borderColor: "#9d9d9d",
          background: "-webkit-linear-gradient(left bottom, rgb(174 174 174), rgb(59 59 59))",
        }
      }
    }
  },
  computed: {
    ...mapState(["noteInfo"]),
    authorInfo() {
      return this.$store.state.noteInfo.authorInfo;
    }
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
    this.searchNote();
  },
  methods: {
    // 获取笔记
    searchNote() {
      let noteId = this.$route.params.noteId;
      let uid = this.$route.params.authorUid;
      let reg = /\d+/;
      if(!reg.test(uid) || !reg.test(noteId)) {
        return;
      }
      this.sendRequest({
        path: "note/search",
        params: {
          noteId,
          uid,
        },
        thenCallback: (response) => {
          let res = response.data;
          console.log(res);
          res.commentList = [];
          this.$store.commit("initialNoteInfo", {noteInfo: res});
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
html {
  scroll-behavior: smooth;
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
  background-color: #c2c2c2;
  box-shadow: 2px 2px 3px 1px #0000006E;
  transform-origin: 28px 7px;
  transition: var(--transition-500ms);
}

.catalogue-icon-middle {
  background-color: #c2c2c2;
  box-shadow: 2px 2px 3px 1px #0000006E;
}

.catalogue-icon-bottom {
  background-color: #c2c2c2;
  box-shadow: 2px 2px 3px 1px #0000006E;
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