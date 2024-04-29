<template>
  <div class="error-page">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {}
  },
  methods: {},
  beforeDestroy() {
  }
}
</script>

<style scoped>
.error-page {
  display: grid;
  width: 100%;
  min-height: 100vh;
}
</style>