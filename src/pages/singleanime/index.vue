<template>
  <div class="huadiao-anime-container">
    <huadiao-header/>
    <div class="video-container">
      <video src=""></video>
    </div>
  </div>
</template>

<script>
import HuadiaoHeader from "@/pages/components/HuadiaoHeader";

export default {
  name: "HuadiaoSingleFanju",
  data() {
    return {}
  },
  computed: {
  },
  beforeMount() {
  },
  methods: {

  },
  beforeDestroy() {
  },
  components: {
    HuadiaoHeader
  },
}
</script>

<style scoped>
.video-container {
  width: 700px;
  height: 500px;
  margin: 100px auto;
  background-color: #5374de;
}
</style>