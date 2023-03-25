<template>
  <div class="note-star-catalogue-container">
    <div class="note-star-catalogue"></div>
  </div>
</template>

<script>
export default {
  name: "FanjuStarCatalogue",
  data() {
    return {}
  },
  methods: {},
  beforeDestroy() {
  }
}
</script>

<style scoped>
.note-star-catalogue-container {
  width: 250px;
  height: 600px;
  margin-right: 10px;
  color: #4943d8;
  font-size: 18px;
}

.note-star-catalogue {
  position: fixed;
  z-index: 1;
  width: 250px;
  height: 600px;
  border-radius: 6px;
  background-color: #FFFFFFB7;
  box-shadow: var(--box-shadow-min);
  backdrop-filter: blur(3px);
}
</style>