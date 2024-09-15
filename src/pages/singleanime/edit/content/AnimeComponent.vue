<template>
  <div class="anime-component" :style="styleObj">
    <div class="mask"></div>
    <component :is="mapping"></component>
  </div>
</template>

<script>
import PictureComponent from "@/pages/singleanime/components/PictureComponent";
import NavigationComponent from "@/pages/singleanime/components/NavigationComponent";
import VideoComponent from "@/pages/singleanime/components/VideoComponent";

export default {
  name: "AnimeComponent",

  emits: ["beforeDestroy"],

  props: {
    mapping: {
      type: String,
      required: true
    },

    styleObj: {
      type: Object,
      default: () => ({}),
    }
  },

  beforeDestroy() {
    this.$emit("beforeDestroy");
  },

  components: {
    PictureComponent,
    NavigationComponent,
    VideoComponent
  }
}
</script>

<style scoped lang="scss">

.anime-component {
  position: relative;

  .mask {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    height: 100%;
    opacity: 0;
  }

  &.active .mask {
    opacity: 1;
    background-color: #559aea9c;
  }
}

</style>