<template>
  <div class="request-fail-container">
    <div class="request-fail-tip">加载失败, 请重试</div>
    <div class="reload-btn" @click="clickToReload" ref="reloadBtn">刷新一下</div>
  </div>
</template>

<script>
export default {
  name: "RequestFail",
  props: ["btnColor", "tipColor", "btnBackColor", "failCallback"],
  data() {
    return {

    }
  },
  methods: {
    // 点击刷新
    clickToReload() {
      this.failCallback();
    },
  },
  beforeDestroy() {
    this.clearAllRefsEvents();
  }
}
</script>

<style scoped>
.request-fail-container {
  position: absolute;
  z-index: 100;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  padding-top: 200px;
}

.request-fail-tip {
  font-size: 20px;
  text-align: center;
  color: #6e6e6e;
}

.reload-btn {
  width: 100px;
  height: 26px;
  font-size: 16px;
  margin: 30px auto;
  text-align: center;
  line-height: 26px;
  border-radius: 4px;
  color: #fff;
  background-color: #e13d3d;
  cursor: pointer;
}

.reload-btn:hover {
  background-color: #d03939;
}
</style>