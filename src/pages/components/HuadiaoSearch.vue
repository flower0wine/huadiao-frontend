<template>
  <div class="huadiao-search-container">
    <transition name="width-change">
      <input type="search"
             :class="isShow.searchInput ? classList.longInputClass : classList.shortInputClass"
             autocomplete="off"
             maxlength="50"
             ref="searchInput"
             v-show="isShow.searchInput"
      >
    </transition>
    <span :class="isShow.searchInput ? classList.smallSearchClass : classList.bigSearchClass"
          @click="clickToSearch"
          ref="searchContainer"
    >
      <img src="/svg/search.svg"
           class="search-icon"
           alt>
    </span>
  </div>
</template>

<script>
export default {
  name: "HuadiaoSearch",
  data() {
    return {
      isShow: {
        // 输入框
        searchInput: false,
      },
      classList: {
        smallSearchClass: ["search-icon-box", "search-icon-scale-small"],
        bigSearchClass: ["search-icon-box"],
        longInputClass: ["search", "long-input"],
        shortInputClass: ["search"]
      },
      inputTheme: {
        index: {
          inputBackgroundColor: "#E06969A2",
          searchBackgroundColor: "#E314148A",
        },
        forum: {
          inputBackgroundColor: "#a2a9b7a2",
          searchBackgroundColor: "#17a6988a",
        }
      }
    }
  },
  mounted() {
    // 更改输入框颜色
    this.$bus.$on("userIndexPageColor", this.userIndexPageColor);
    this.$bus.$on("userForumPageColor", this.userForumPageColor);
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
    // 输入框使用主题颜色, 当滚动到第一屏时
    userIndexPageColor() {
      this.$refs.searchInput.style.backgroundColor = this.inputTheme.index.inputBackgroundColor;
      this.$refs.searchContainer.style.backgroundColor = this.inputTheme.index.searchBackgroundColor;
    },
    // 输入框使用论坛颜色, 当滚动到第二屏时
    userForumPageColor() {
      this.$refs.searchInput.style.backgroundColor = this.inputTheme.forum.inputBackgroundColor;
      this.$refs.searchContainer.style.backgroundColor = this.inputTheme.forum.searchBackgroundColor;
    }
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
}

/* 搜索框 */
.search {
  float: right;
  height: 36px;
  padding-left: 15px;
  font-size: 16px;
  border-radius: 15px;
  color: #fff;
  background-color: #E89090A2;
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
  background-color: #E314148A;
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

.search-icon {
  width: 20px;
  height: 20px;
  margin: 7px;
}
</style>