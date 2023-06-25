<template>
  <div class="note-content-catalogue-board"></div>
</template>

<script>
export default {
  name: "NoteCatalogue",
  data() {
    return {}
  },
  methods: {},
  beforeDestroy() {
  }
}
</script>

<style scoped>
.note-content-catalogue-board {
  position: sticky;
  top: 90px;
  width: 0px;
  height: 600px;
  opacity: 0;
  border-radius: 6px;
  box-shadow: var(--box-shadow);
  transition: var(--transition-500ms);
}
</style>