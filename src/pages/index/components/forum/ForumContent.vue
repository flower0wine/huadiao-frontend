<template>
  <div class="forum-content">
    <div class="content-display-container">
      <forum-content-header/>
      <component :is="info.component" v-bind="info" />
    </div>
  </div>
</template>

<script>
import ForumContentHeader from "@/pages/index/components/forum/ForumContentHeader";

export default {
  name: "ForumContent",

  inheritAttrs: false,

  components: {ForumContentHeader},

  props: {
    info: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped lang="scss">
@import "../../scss/forum/variables/index.scss";

.forum-content {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: start;
  width: 60%;
  min-height: 800px;
}

.content-display-container {
  width: 100%;
  min-height: 800px;
  border-radius: $forumBorderRadius;
  background-color: $forumBackgroundColor;
  box-shadow: $forumBoxShadow;
  backdrop-filter: $forumBackdropBlurFilter;
}
</style>
