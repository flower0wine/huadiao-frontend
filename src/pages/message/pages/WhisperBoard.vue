<template>
  <div class="whisper-board">
    <whisper-person-board :loadOver="loadOver"/>
    <router-view name="whisperChatBoard"
                 v-if="visible"></router-view>
  </div>
</template>

<script>
import WhisperPersonBoard from "@/pages/message/pages/WhisperPersonBoard";

export default {
  name: "WhisperBoard",
  data() {
    return {
      visible: false,
    }
  },
  methods: {
    loadOver() {
      this.visible = true;
    },
  },
  beforeDestroy() {
  },
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