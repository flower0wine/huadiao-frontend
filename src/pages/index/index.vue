<template>
  <div class="huadiao-pages">
    <index-page ref="indexPage"/>
    <index-forum/>
  </div>
</template>

<script>

import {indexPageOne, indexPageTwo} from "@/assets/js/constants/huadiao_header_style/index";
import {menuPageOne, menuPageTwo} from "@/assets/js/constants/huadiao_menu_style";
import IndexPage from "@/pages/index/components/IndexPage";
import IndexForum from "@/pages/index/components/IndexForum";

export default {
  name: "HuadiaoIndex",
  components: {IndexForum, IndexPage},
  data() {
    return {
      observer: null,
    }
  },
  mounted() {
    this.unSamePageThemeChange();
  },
  methods: {
    unSamePageThemeChange() {
      this.observer = new IntersectionObserver((entries) => {
        let entry = entries[0];
        if(entry.isIntersecting) {
          // 修改头部样式
          this.$bus.$emit("modifyHuadiaoHeaderStyle", indexPageOne);
          // 修改菜单样式
          this.$bus.$emit("modifyHuadiaoMenuStyle", menuPageOne)
        } else {
          this.$bus.$emit("modifyHuadiaoHeaderStyle", indexPageTwo);
          this.$bus.$emit("modifyHuadiaoMenuStyle", menuPageTwo);
        }
      }, {
        threshold: 0.1,
      });
      this.observer.observe(this.$refs.indexPage.$el);
    }
  },
  beforeDestroy() {
  },
}
</script>

<style>
html {
  scroll-snap-type: y mandatory;
}
</style>
<style scoped>
.huadiao-pages {

}
</style>