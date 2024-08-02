<template>
  <div class="huadiao-anime-container">
    <HuadiaoMiddleTip/>
    <main class="main-container"
          :style="mainContainerStyle">
      <KeepAlive>
        <RouterView/>
      </KeepAlive>
    </main>
  </div>
</template>

<script>
import HuadiaoMiddleTip from "@/pages/components/HuadiaoMiddleTip";
import {mapState} from "vuex";

export default {
  name: "HuadiaoSingleFanju",

  components: {
    HuadiaoMiddleTip,
  },

  computed: {
    ...mapState("pageLayout", [
      "margin",
      "padding"
    ]),

    mainContainerStyle() {
      return {
        margin: `${this.margin}px`,
        padding: `${this.padding}px`,
      };
    },
  }
}
</script>

<style scoped lang="scss">

.huadiao-anime-container {
  // position: relative; 改变子元素 height: 100% 的相对元素
  //position: relative;

  // BFC 解决父子元素的 margin 重叠
  overflow: auto;
}

.client-area {
  height: 100%;
  // 改变子元素的 fixed 定位对象
  //transform: translateZ(0);
}


</style>