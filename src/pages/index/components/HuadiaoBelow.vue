<template>
  <div class="huadiao-below">
    <div v-html="svg.add"
           class="add-note-icon"
           title="好记性不如烂笔头"
           ref="addNote"
           @click="clickToCreateNewNote">
    </div>
    <div v-html="svg.menu"
         class="menu-icon"
         title="这个好像可以点"
         ref="menu"
         @click="openMenu">
    </div>
  </div>
</template>

<script>
import {svg} from "@/assets/js/constants/svgs";

export default {
  name: "HuadiaoBelow",
  props: ["openMenu", "login"],
  data() {
    return {
      svg,
    }
  },
  methods: {
    // 点击添加笔记
    clickToCreateNewNote() {
      if(this.login) {
        window.location.href = "/buildnote";
      } else {
        this.huadiaoMiddleTip("登录后体验更多功能!");
      }
    },
  },
  beforeDestroy() {
    // 移除事件
    this.clearAllRefsEvents();
  }
}
</script>

<style scoped>

.huadiao-below {
  position: fixed;
  z-index: 1;
  bottom: 0;
  left: 0;
  padding: 0 0 10px 20px;
}

.menu-icon /deep/ svg,
.add-note-icon /deep/ svg {
  width: 20px;
  height: 20px;
  margin-bottom: 20px;
  fill: #fff;
  cursor: pointer;
}
</style>