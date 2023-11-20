<template>
  <div class="huadiao-warning-tip-container"
       v-if="visible.render">
    <transition-group name="top-slide" tag="div">
      <div class="huadiao-warning-tip"
           v-for="(warningTip) in warningTip"
           :key="warningTip.warningIndex"
           :style="'color: ' + defaultTipStyle.color + ';background-color:' + defaultTipStyle.backgroundColor + ';'"
           ref="huadiaoWarningTip">
        <div class="warning-title">
          <span v-html="defaultTipStyle.svg"></span>
          <span>{{defaultTipStyle.title}}</span>
        </div>
        <div class="warning-tip-content">{{warningTip.warningTip}}</div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import {Timer} from "@/assets/js/utils";
import {svg} from "@/assets/js/constants/svgs";

export default {
  name: "HuadiaoWarningTopContainer",
  props: ["tipStyle"],
  data() {
    return {
      // 可见性
      visible: {
        render: false,
      },
      // 唯一标识
      warningIndex: 0,
      // 提示信息容器
      warningTip: [],
      // 默认的样式
      defaultTipStyle: {
        color: "#fff",
        backgroundColor: "#7A2727A6",
        svg: svg.colorWarning,
        title: "警告",
      }
    }
  },
  beforeMount() {
    // 添加警告提示, 右下角展示
    this.$bus.$on("huadiaoWarningTip", this.addHuadiaoWarningTip);
    this.modifyDefaultStyle();
  },
  methods: {
    // 修改默认样式
    modifyDefaultStyle() {
      this.modifySrcObject(this.defaultTipStyle, this.tipStyle);
    },
    // 花凋警告提示
    addHuadiaoWarningTip(warningTip) {
      let time = 3500;
      this.warningTip.push({
        warningTip,
        warningIndex: this.warningIndex++
      });
      this.visible.render = true;
      this.visible.show = true;
      new Timer().timeout(() => {
        this.warningTip.shift();
      }, time);
    },
  },
  beforeDestroy() {
  },
}
</script>

<style scoped>
/* 提示组件容器 */
.huadiao-warning-tip-container {
  position: fixed;
  z-index: 999;
  bottom: 0px;
  right: 0px;
}

.huadiao-warning-tip {
  width: 200px;
  margin: 0 20px 20px 0;
  padding: 10px 20px;
  font-size: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 4px 4px rgba(0, 0, 0, 0.20);
  transition: var(--transition-500ms);
}

.warning-title span:nth-child(1) /deep/ svg {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

.warning-title span:nth-child(2) {
  font-weight: 700;
}

.warning-tip-content {
  width: 100%;
  word-wrap: break-word;
  margin-top: 6px;
  text-indent: 1em;
  font-size: 16px;
  letter-spacing: 1px;
}
</style>