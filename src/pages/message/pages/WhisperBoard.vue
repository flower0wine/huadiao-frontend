<template>
  <div class="whisper-board">
    <whisper-person-board/>
    <keep-alive>
      <!--keep-alive 使用组件缓存, :key 使得切换路径时加载一个新的组件-->
      <router-view name="whisperChatBoard" :key="$route.fullPath"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import WhisperPersonBoard from "@/pages/message/components/WhisperPersonBoard";
export default {
  name: "WhisperBoard",
  data() {
    return {}
  },
  methods: {},
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