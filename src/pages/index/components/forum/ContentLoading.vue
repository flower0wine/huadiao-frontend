<template>
  <div class="note-loading-container" ref="loading">
    <div class="note-loading" v-if="!visible.loaded">
      <div class="text-content">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
      </div>
      <div class="image-content"></div>
    </div>
    <div class="no-more" v-else>本站就这么点内容, 呜呜呜~~~</div>
  </div>
</template>

<script>
export default {
  name: "ContentLoading",
  props: ["observeCallback", "getHooks"],
  data() {
    return {
      observer: null,
      observerOptions: {
        threshold: 0.1
      },
      visible: {
        loaded: false,
      },
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

<style scoped lang="scss">
@import "../../scss/forum/variables/index";

@mixin streamLightLoading() {
  background-size: 400% 100%;
  background-image: linear-gradient(-45deg, #252a3596 25%, #4f576796 45%, #252a3596 65%);
  animation: skeleton-loading 1.2s ease-in-out infinite;
}

.note-loading {
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
  background-color: #252a3596;
  @include streamLightLoading;

  &:nth-child(n + 2) {
    margin-top: 10px;
  }

  &:nth-child(1) {
    width: 60%;
    height: 14px;
  }

  &:nth-child(2) {
    width: 100%;
    height: 30px;
  }

  &:nth-child(3) {
    width: 50%;
    height: 14px;
  }

  &:nth-child(4) {
    width: 65%;
    height: 14px;
  }
}

.image-content {
  position: relative;
  flex-grow: 1;
  align-self: stretch;
  height: 100px;
  border-radius: 6px;
  background-color: $imageBackgroundColor;
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