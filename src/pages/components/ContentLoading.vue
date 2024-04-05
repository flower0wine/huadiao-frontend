<template>
  <div class="loading-container" ref="loading">
    <div class="loading">
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
  </div>
</template>

<script>
export default {
  name: "ContentLoading",
  props: {
    options: {
      type: Object
    }
  },
  data() {
    return {
      defaultOptions: {
        useImage: false,
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
    this.modifySrcObject(this.defaultOptions, this.options);
  },
  methods: {
    getLineStyle(item) {
      return `width: ${item.width}; height: ${item.height}; background-color: ${item.background ?? this.defaultOptions.itemBackground}`;
    },
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