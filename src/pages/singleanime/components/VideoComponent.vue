<template>
  <div>
    <video controls>
      Your browser does not support the video tag.
    </video>
  </div>
</template>

<script>
import {VIDEO_COMPONENT_NAME} from "@/pages/singleanime/edit/content/anime-component-config";

export default {
  name: VIDEO_COMPONENT_NAME,
}
</script>

<style scoped lang="scss">
video {
  width: 100%;
}
</style>