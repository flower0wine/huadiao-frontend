<template>
  <div class="huadiao-search-container">
    <transition name="width-change">
      <input type="search"
             :class="isShow.searchInput ? classList.longInputClass : classList.shortInputClass"
             :style="'background-color: ' + inputTheme.inputBackgroundColor + '; color: ' + inputTheme.textColor"
             autocomplete="off"
             maxlength="50"
             ref="searchInput"
             v-show="isShow.searchInput"
      >
    </transition>
    <span :class="isShow.searchInput ? classList.smallSearchClass : classList.bigSearchClass"
          @click="clickToSearch"
          :style="'background-color: ' + inputTheme.searchBackgroundColor"
          ref="searchContainer"
    >
      <span v-html="svg.searchIcon" class="search-icon" :style="'fill: ' + inputTheme.searchIconColor"></span>
    </span>
  </div>
</template>

<script>
export default {
  name: "HuadiaoSearch",
  props: ["inputTheme"],
  data() {
    return {
      isShow: {
        // 输入框
        searchInput: false,
      },
      svg: {
        searchIcon: `<svg t="1678007890020" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4976" width="200" height="200"><path d="M465.454545 868.848485C226.521212 868.848485 31.030303 673.357576 31.030303 434.424242S226.521212 0 465.454545 0s434.424242 195.490909 434.424243 434.424242-195.490909 434.424242-434.424243 434.424243z m0-806.787879C260.654545 62.060606 93.090909 229.624242 93.090909 434.424242s167.563636 372.363636 372.363636 372.363637 372.363636-167.563636 372.363637-372.363637S670.254545 62.060606 465.454545 62.060606z" p-id="4977"></path><path d="M766.448485 806.787879c6.206061-6.206061 15.515152-6.206061 21.721212 0l183.078788 167.563636c6.206061 6.206061 6.206061 15.515152 0 21.721212-6.206061 6.206061-15.515152 6.206061-21.721212 0l-183.078788-167.563636c-6.206061-6.206061-6.206061-15.515152 0-21.721212z" p-id="4978"></path><path d="M961.939394 1014.690909c-6.206061 0-15.515152-3.10303-21.721212-9.309091L757.139394 837.818182c-6.206061-6.206061-9.309091-12.412121-9.309091-21.721212 0-9.309091 3.10303-15.515152 9.309091-21.721212 6.206061-6.206061 12.412121-9.309091 21.721212-9.309091 9.309091 0 15.515152 3.10303 21.721212 9.309091l183.078788 167.563636c6.206061 6.206061 9.309091 12.412121 9.309091 21.721212 0 9.309091-3.10303 15.515152-9.309091 21.721212-6.206061 3.10303-12.412121 9.309091-21.721212 9.309091z m-186.181818-198.593939l183.078788 167.563636-192.387879-176.872727 9.309091 9.309091z" p-id="4979"></path></svg>`,
      },
      classList: {
        smallSearchClass: ["search-icon-box", "search-icon-scale-small"],
        bigSearchClass: ["search-icon-box"],
        longInputClass: ["search", "long-input"],
        shortInputClass: ["search"]
      },
    }
  },
  mounted() {
  },
  methods: {
    // 点击搜索
    clickToSearch() {
      this.isShow.searchInput = !this.isShow.searchInput;
      // 如果展示了输入框, 就让输入框获取焦点
      if(this.isShow.searchInput) {
        this.$nextTick(() => {
          this.$refs.searchInput.focus();
        });
      }
    },
  },
  beforeDestroy() {
    this.clearAllRefsEvents();
  }
}
</script>

<style scoped>
.huadiao-search-container {
  position: relative;
  width: 400px;
  height: 36px;
  margin-left: auto;
}

/* 搜索框 */
.search {
  float: right;
  height: 36px;
  padding-left: 15px;
  font-size: 14px;
  border-radius: 15px;
  box-shadow: var(--box-shadow-min);
  transition: var(--transition-500ms);
}

.search-icon-box {
  position: absolute;
  top: 0px;
  right: 0px;
  width: 36px;
  height: 36px;
  display: inline-block;
  border-radius: 50%;
  box-shadow: var(--box-shadow-min);
  transition: var(--transition-500ms);
}

.search-icon-box:hover {
  filter: brightness(85%);
}

.search-icon-scale-small {
  transform: var(--scale-80-percent);
}

.width-change-enter,
.width-change-leave-to {
  width: 36px;
}

.width-change-enter-to,
.width-change-leave {
  width: 400px;
}

/* 这里的动画是为了保持过渡后输入框的长度 */
.long-input {
  animation: width-change 0.5s forwards;
}

@keyframes width-change {
  from {
    width: 36px;
  }
  to {
    width: 400px;
  }
}

.search-icon /deep/ svg {
  width: 20px;
  height: 20px;
  margin: 7px;
}
</style>