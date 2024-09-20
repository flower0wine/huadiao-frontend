<template>
  <div class="simple-loading" :style="simpleLoadingStyle" ref="loading">
    <template v-if="visible.loaded">
      <span class="loaded-text">{{ defaultOptions.loadedText }}</span>
    </template>
    <template v-else>
      <span class="loading-icon" v-html="svg.loading"></span>
      <span class="loading-text" v-if="visible.loadingTextVisible">{{ defaultOptions.loadingText }}</span>
    </template>
  </div>
</template>

<script>
import {svg} from "@/assets/js/constants/svgs";
import {modifySrcObject} from "@/util/tool";

export default {
  name: "SimpleLoading",
  props: ["option", "observeCallback", "getHooks"],
  data() {
    return {
      observer: null,
      observerOptions: {
        threshold: 0.1
      },
      svg: {
        loading: svg.circleLoading,
      },
      visible: {
        loaded: false,
      },
      defaultOptions: {
        loadingText: "正在加载...",
        loadedText: "",
        loadingTextVisible: false,
        svgScale: 30,
        svgFill: '#aaa',
      },
    }
  },
  computed: {
    simpleLoadingStyle() {
      let option = this.defaultOptions;
      return `--simple-loading-scale: ${option.svgScale}px; --simple-loading-fill: ${option.svgFill}`;
    },
  },
  created() {
    modifySrcObject(this.defaultOptions, this.option);
    this.initialCreated();
  },
  mounted() {
    this.initialMounted();
  },
  methods: {
    initialCreated() {
      this.observer = new IntersectionObserver(this.intersectionObserverCallback, this.observerOptions);
    },
    initialMounted() {
      this.observe();

      let hooks = {
        unobserve: this.unobserve,
        reset: this.reset,
      };
      this.getHooks && this.getHooks(hooks);
    },
    intersectionObserverCallback(entries) {
      let entry = entries[0];
      let observeCallback = this.observeCallback;
      if (entry.isIntersecting) {
        observeCallback && observeCallback(entry);
      }
    },
    observe() {
      if (this.$refs.loading) {
        this.observer.observe(this.$refs.loading);
      }
    },
    // 加载完毕
    loaded() {
      this.visible.loaded = true;
    },
    unobserve() {
      this.loaded();
      if (this.$refs.loading) {
        this.observer.unobserve(this.$refs.loading);
      }
    },
    reset() {
      this.visible.loaded = false;
    }
  },
  beforeDestroy() {
  }
}
</script>

<style scoped>
.simple-loading {
  padding: 30px 0;
  text-align: center;
  --simple-loading-scale: "";
  --simple-loading-fill: "";
}

.loading-icon /deep/ svg {
  width: var(--simple-loading-scale);
  height: var(--simple-loading-scale);
  fill: var(--simple-loading-fill);
  animation: circleRotate 3s linear infinite;
}

</style>
