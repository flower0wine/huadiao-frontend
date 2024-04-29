<template>
  <div class="down-slide" @click="downSlide">
    <DownSlideSvg width="25" height="25" fill="#fff"/>
  </div>
</template>

<script>
import DownSlideSvg from "@/pages/components/svg/DownSlide.vue";
export default {
  name: "DownSlide",
  components: {DownSlideSvg},
  data() {
    return {}
  },
  methods: {
    downSlide() {
      window.scrollTo({
        top: document.documentElement.clientHeight,
        left: 0,
        behavior: "smooth"
      });
    }
  },
}
</script>

<style scoped lang="scss">
.down-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50px;
  background: -webkit-linear-gradient(bottom, #000000bf, transparent);
}

.down-slide ::v-deep {
  svg {
    path:nth-child(1) {
      animation: fade 2s linear infinite;
    }
    path:nth-child(2) {
      animation: fade 2s linear infinite 0.7s;
    }
  }
}

@keyframes fade {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>