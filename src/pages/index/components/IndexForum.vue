<template>
  <div class="huadiao-forum-page">
    <div class="huadiao-forum-page-background"></div>
    <h1 v-for="i in 100" :key="i" style="color: #fff">内容...</h1>
  </div>
</template>

<script>
export default {
  name: "IndexForum",
  data() {
    return {}
  },
  methods: {},
  beforeDestroy() {
  }
}
</script>

<style scoped>

.huadiao-forum-page {
  width: 100%;
  scroll-snap-align: start;
}

/* 屏二背景, fixed */
.huadiao-forum-page-background {
  position: fixed;
  top: 0;
  z-index: -9;
  width: 100%;
  height: 100vh;
  background: url("~@/../public/img/index/indexPageTwoBackground.jpg") no-repeat center center;
  background-size: cover;
}
</style>