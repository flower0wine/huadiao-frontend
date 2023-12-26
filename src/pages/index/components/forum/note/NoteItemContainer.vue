<template>
  <note-display :note-item="noteItem"/>
</template>

<script>
import NoteDisplay from "@/pages/index/components/forum/note/NoteDisplay";

export default {
  name: "NoteItemContainer",
  props: ["index", "noteItem"],
  components: {NoteDisplay},
  data() {
    return {}
  },
  methods: {},
  beforeDestroy() {
  }
}
</script>

<style scoped>

</style>