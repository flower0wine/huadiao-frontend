<template>
  <div class="note-history-list">
    <note-history-item v-for="(item, index) in noteHistory"
                       :key="item.noteId"
                       :noteHistory="item"
    />
  </div>
</template>

<script>
import NoteHistoryItem from "@/pages/history/components/NoteHistoryItem";
import {mapState} from "vuex";
export default {
  name: "NoteHistoryList",
  data() {
    return {

    }
  },
  computed: {
    ...mapState(["noteHistory"]),
  },
  methods: {},
  beforeDestroy() {
  },
  components: {NoteHistoryItem},
}
</script>

<style scoped>
.note-history-list {
  width: 1200px;
  margin: 0 auto 100px;
  transition: var(--transition-500ms);
}

</style>