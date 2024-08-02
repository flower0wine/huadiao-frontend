<template>
  <transition name="fade">
    <div class="huadiao-mark-tip-container"
         ref="huadiaoMarkTipContainer"
         :style="`color: ${defaultTipStyle.color}; background-color: ${defaultTipStyle.backgroundColor};`"
         v-show="visible.show"
         v-if="visible.render"
    >
      <span>{{ tip }}</span>
    </div>
  </transition>
</template>

<script>
import {Timer} from "@/assets/js/utils";
import Vue from "vue";

const EVENT_NAME = "huadiaoMiddleTip";

export const eventBus = new Vue();

export function huadiaoMiddleTip(message) {
  eventBus.$emit(EVENT_NAME, message);
}

export default {
  name: "HuadiaoMiddleTip",
  props: ["tipStyle"],
  data() {
    return {
      tip: "屏中提示组件",
      visible: {
        render: false,
        show: false
      },
      timer: new Timer(),
      // 默认样式
      defaultTipStyle: {
        color: "#fff",
        backgroundColor: "#C73636AA",
      }
    }
  },
  beforeMount() {
    // 添加操作提示, 屏中展示
    this.$bus.$on(EVENT_NAME, this.addHuadiaoMiddleTip);
    eventBus.$on(EVENT_NAME, this.addHuadiaoMiddleTip);
    this.modifyDefaultStyle();
  },
  methods: {
    // 修改默认样式
    modifyDefaultStyle() {
      this.modifySrcObject(this.defaultTipStyle, this.tipStyle);
    },
    // 花凋中间弹窗提示
    addHuadiaoMiddleTip(middleTip = "") {
      // 6 个字读 1 秒
      let time = middleTip.length / 12 * 1000;
      time = time > 2000 ? time : 2000;
      this.tip = middleTip;
      this.visible.show = true;
      this.visible.render = true;
      this.timer.timeout(() => {
        this.visible.show = false;
      }, time);
    },
  },
  beforeDestroy() {
  }
}
</script>

<style scoped>
.huadiao-mark-tip-container {
  position: fixed;
  z-index: 999;
  top: 50vh;
  left: 50%;
  padding: 10px 30px;
  font-size: 20px;
  font-weight: 700;
  border-radius: 7px;
  box-shadow: 1px 1px 5px 5px rgba(0, 0, 0, 0.10);
  transform: translate(-50%, -50%);
  transition: var(--transition-1000ms);
  pointer-events: none;
}
</style>