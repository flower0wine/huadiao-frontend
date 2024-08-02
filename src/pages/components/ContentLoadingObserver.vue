<template>
  <div class="loading-container" ref="loading">
    <div class="loading" v-if="!visible.loaded">
      <div class="text-content">
        <div class="line"
             v-for="(item, index) in defaultOptions.line"
             :style="getLineStyle(item)"
             :key="index"></div>
      </div>
      <div class="image-content"
           :style="`background-color: ${defaultOptions.itemBackground};`"
           v-if="defaultOptions.useImage"></div>
    </div>
    <div class="no-more" v-else>{{ defaultOptions.noMoreText }}</div>
  </div>
</template>

<script>
export default {
  name: "ContentLoading",
  props: {
    observeCallback: {
      type: Function,
      require: true,
    },
    getHooks: {
      type: Function,
    },
    options: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      observer: null,
      observerOptions: {
        threshold: 0.1
      },
      visible: {
        loaded: false,
      },
      defaultOptions: {
        useImage: false,
        noMoreText: "没有更多内容了~",
        itemBackground: "#252a3596",
        line: [{
          width: "60%",
          height: "14px"
        }, {
          width: "100%",
          height: "30px"
        }, {
          width: "50%",
          height: "14px"
        }, {
          width: "65%",
          height: "14px"
        }]
      }
    }
  },
  created() {
    this.initialCreated();
  },
  mounted() {
    this.initialMounted();
  },
  methods: {
    initialCreated() {
      this.observer = new IntersectionObserver(this.intersectionObserverCallback, this.observerOptions);
      this.modifySrcObject(this.defaultOptions, this.options);
    },
    initialMounted() {
      this.observe();

      let hooks = {
        unobserve: this.unobserve,
        reset: this.reset,
      };
      this.getHooks && this.getHooks(hooks);
    },
    getLineStyle(item) {
      return `width: ${item.width}; height: ${item.height}; background-color: ${item.background ?? this.defaultOptions.itemBackground}`;
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

<style scoped lang="scss">
@mixin streamLightLoading() {
  background-size: 400% 100%;
  background-image: linear-gradient(-45deg, #252a3596 25%, #4f576796 45%, #252a3596 65%);
  animation: skeleton-loading 1.2s ease-in-out infinite;
}

.loading {
  display: flex;
  align-items: center;
  padding: 20px;
}

.text-content {
  flex-grow: 3;
  height: 100%;
  margin-right: 20px;
}

.line {
  border-radius: 6px;
  @include streamLightLoading;

  &:nth-child(n + 2) {
    margin-top: 10px;
  }
}

.image-content {
  position: relative;
  flex-grow: 1;
  align-self: stretch;
  height: 100px;
  border-radius: 6px;
  @include streamLightLoading;
}

@keyframes skeleton-loading {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}

.no-more {
  padding: 30px 0;
  color: #aaa;
}
</style>