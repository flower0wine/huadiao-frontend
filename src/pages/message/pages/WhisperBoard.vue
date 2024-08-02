<template>
  <div class="whisper-board">
    <whisper-person-board />
    <router-view name="whisperChatBoard"></router-view>
  </div>
</template>

<script>
import WhisperPersonBoard from "@/pages/message/pages/WhisperPersonBoard";

export default {
  name: "WhisperBoard",
  components: {
    WhisperPersonBoard
  },
}
</script>

<style scoped>
.whisper-board {
  display: flex;
  width: 100%;
  height: 100%;
}
</style>