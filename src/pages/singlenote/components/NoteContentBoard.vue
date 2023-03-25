<template>
  <div class="note-content-board">
    <div class="note-content-catalogue-board"></div>
    <div class="note-details"></div>
  </div>
</template>

<script>
export default {
  name: "NoteContentBoard",
  data() {
    return {}
  },
  methods: {},
  beforeDestroy() {
  }
}
</script>

<style scoped>
.note-content-board {
  display: flex;
  justify-content: space-between;
  position: relative;
  width: 1000px;
  margin: 70px auto 200px;
}

.note-content-catalogue-board {
  position: sticky;
  top: 0px;
  width: 0px;
  border-radius: 6px;
  box-shadow: var(--box-shadow);
  min-height: 400px;
}

.note-details {
  width: 100%;
  min-height: 800px;
  border-radius: 6px;
  box-shadow: var(--box-shadow);
}
</style>