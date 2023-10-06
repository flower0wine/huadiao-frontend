<template>
  <div class="huadiao-below">
    <div v-for="(belowConfig, index) in huadiaoBelowConfig"
         :key="index"
    >
      <img :src="belowConfig.svg"
           :class="belowConfig.className"
           :title="belowConfig.title"
           :ref="belowConfig.name"
           @click="belowConfig.clickCallback"
           alt
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "HuadiaoBelow",
  props: ["openMenu", "login"],
  data() {
    return {
      huadiaoBelowConfig: [{
        name: "addNote",
        className: "add-note-icon",
        title: "好记性不如烂笔头",
        svg: "/svg/newAdd.svg",
        clickCallback: this.clickToCreateNewNote
      }, {
        name: "menu",
        className: "menu-icon",
        title: "这个好像可以点",
        svg: "/svg/menu.svg",
        clickCallback: this.openMenu
      }]
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

.menu-icon,
.add-note-icon {
  width: 20px;
  height: 20px;
  margin-bottom: 20px;
  cursor: pointer;
}
</style>