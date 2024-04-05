<template>
  <div class="huadiao-below">
    <div v-html="svg.add"
           class="add-note-icon item"
           title="好记性不如烂笔头"
           ref="addNote"
           @click="clickToCreateNewNote">
    </div>
    <div v-html="svg.menu"
         class="menu-icon item"
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
  }
}
</script>

<style>
.menu-icon svg,
.add-note-icon svg {
  width: 20px;
  height: 20px;
  fill: #fff;
  vertical-align: -2px;
}
</style>

<style scoped lang="scss">

.huadiao-below {
  position: fixed;
  z-index: 1;
  width: 34px;
  bottom: 10px;
  left: 8px;
  text-align: center;
}

.item {
  padding: 6px;
  cursor: pointer;
  border-radius: 6px;

  &:hover {
     background-color: #f5f5f533;
   }

  &:nth-child(n + 1) {
    margin-top: 10px;
  }
}

</style>