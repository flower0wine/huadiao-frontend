<template>
  <div class="huadiao-search-container" ref="huadiaoSearch">
    <transition name="width-change"
                @before-enter="widthChangeStart"
                @after-enter="widthChangeEnd"
                @before-leave="widthChangeStart"
                @after-leave="widthChangeEnd">
      <div class="search-input-container"
           v-show="visible.searchInput"
           :class="visible.searchInput ? classList.longInputClass : classList.shortInputClass"
           :style="`background-color: ${inputTheme.inputBackgroundColor};`"
           ref="searchInputContainer">
        <transition name="bottom-slide">
          <div class="search-type-options"
               :style="searchOptionsStyle"
               v-if="visible.searchTypeOptions">
            <div class="search-type-option"
                 @click="chooseSearchType(item)"
                 v-for="(item, index) in searchTypeList"
                 :key="index">{{searchTypeMapping[item]}}</div>
          </div>
        </transition>
        <div class="search-type"
             title="修改搜索类型"
             @click="clickToChangeSearchType"
             ref="searchType">
          <span>{{searchTypeMapping[currentSearchType]}}</span>
          <span class="bottom-pull-icon" v-html="svg.bottomPull"></span>
        </div>
        <input type="search"
               class="search-input"
               :style="`color: ${inputTheme.textColor}`"
               autocomplete="off"
               maxlength="50"
               v-model.trim="searchContent"
               @focusin="visible.searchContentBoard = true"
               @input="searchInputting"
               @keyup.enter="immediatelySearch"
               ref="searchInput">
      </div>
    </transition>
    <span :class="visible.searchInput ? classList.smallSearchClass : classList.bigSearchClass"
          :style="'background-color: ' + inputTheme.searchBackgroundColor"
          @click="clickShowOrHiddenInput"
          ref="searchContainer">
      <span v-html="svg.search" class="search-icon" :style="'fill: ' + inputTheme.searchIconColor"></span>
    </span>
    <transition name="fade">
      <search-content-board v-if="visible.searchContentBoard"
                            :search-content-board-theme="inputTheme.searchContentBoard"
                            :search-content="searchContent"
                            :current-search-type="currentSearchType"
                            :set-search-content="setSearchContent"/>
    </transition>
  </div>
</template>

<script>
import SearchContentBoard from "@/pages/components/search/SearchContentBoard";
import {svg} from "@/assets/js/constants/svgs";
import {searchTypeList, searchTypeMapping} from "@/assets/js/constants/search/search-header";
import OperationThrottle from "@/assets/js/utils/operation-throttle";
import OperationDebounce from "@/assets/js/utils/operation-debounce";

let operationThrottle = new OperationThrottle();
let operationDebounce = new OperationDebounce(800);

export default {
  name: "HuadiaoSearch",
  components: {SearchContentBoard},
  props: ["inputTheme"],
  data() {
    return {
      searchTypeList,
      searchTypeMapping,
      searchContent: "",
      currentSearchType: "nickname",
      visible: {
        searchInput: false,
        searchContentBoard: false,
        searchTypeOptions: false,
      },
      svg: {
        bottomPull: svg.access,
        search: svg.search,
      },
      classList: {
        smallSearchClass: ["search-icon-box", "search-icon-scale-small"],
        bigSearchClass: ["search-icon-box"],
        longInputClass: ["search", "long-input"],
        shortInputClass: ["search"]
      },
    }
  },
  computed: {
    searchOptionsStyle() {
      return `background-color: ${this.inputTheme.searchOptionsBackgroundColor};
               --search-option-hover-bg: ${this.inputTheme.searchOptionHoverBackgroundColor}`
    },
  },

  methods: {
    clickToHidden(e) {
      let target = e.target;
      let visible = this.visible;
      let huadiaoSearch = this.$refs.huadiaoSearch;
      if(!huadiaoSearch.contains(target)) {
        visible.searchContentBoard = false;
      }
    },
    // 选择搜索类型
    chooseSearchType(type) {
      this.currentSearchType = type;
      this.searchContent = "";
      this.clickToChangeSearchType();
    },
    // 点击去修改搜索类型
    clickToChangeSearchType() {
      if(!operationThrottle.access()) return;
      this.visible.searchTypeOptions = !this.visible.searchTypeOptions;
      this.$refs.searchType.classList.toggle("search-type-changing");
    },
    setSearchContent(searchContent) {
      this.searchContent = searchContent;
      this.immediatelySearch();
    },
    // 点击展开搜索框
    clickShowOrHiddenInput() {
      let visible = this.visible;
      let searchInput;
      visible.searchInput = searchInput = !visible.searchInput;
      if(!searchInput) {
        visible.searchContentBoard = false;
      }
      // 如果展示了输入框, 就让输入框获取焦点
      if(searchInput) {
        window.addEventListener("click", this.clickToHidden);
        this.$nextTick(() => {
          this.$refs.searchInput.focus();
        });
      } else {
        window.removeEventListener("click", this.clickToHidden);
      }
    },
    // 搜索输入中
    searchInputting() {
      operationDebounce.debounce(this.immediatelySearch);
    },
    // 立即搜索
    immediatelySearch() {
      if(this.searchContent !== "") {
        this.$bus.$emit("search", this.currentSearchType, this.searchContent);
      }
    },
    widthChangeStart() {
      this.$refs.searchInputContainer.style.overflow = `hidden`;
    },
    widthChangeEnd() {
      this.$refs.searchInputContainer.style.overflow = `unset`;
    }
  },
  beforeDestroy() {
  }
}
</script>

<style>
.search-type svg {
  width: 12px;
  height: 12px;
  fill: #fff;
  transition: all 500ms;
}

.search-type-changing svg {
  transform: rotateZ(180deg);
}

:root {
  --long-width: 450px;
  --short-width: 36px;
}
</style>

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
  padding-right: 40px;
  font-size: 14px;
  border-radius: 15px;
  box-shadow: var(--box-shadow-min);
  transition: var(--transition-500ms);
}

.search-input-container {
  position: relative;
  display: flex;
}

.search-input {
  width: 100%;
  height: 100%;
  background-color: transparent;
}

.search-type-options {
  --search-option-hover-bg: "";
  position: absolute;
  z-index: 1;
  top: 45px;
  left: -23px;
  width: 120px;
  border-radius: 6px;
  color: #fff;
  overflow: hidden;
  transition: all 500ms;
  cursor: default;
}

.search-type-option {
  padding: 5px 10px;
  text-align: center;
}

.search-type-option:hover {
  background-color: var(--search-option-hover-bg);
}

.search-type {
  height: 36px;
  white-space: nowrap;
  padding: 0 10px 0 15px;
  border-radius: 6px;
  text-align: center;
  line-height: 36px;
  color: #fff;
  cursor: default;
}

.bottom-pull-icon {
  margin-left: 10px;
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
  width: var(--short-width);
}

.width-change-enter-to,
.width-change-leave {
  width: var(--long-width);
}

.bottom-slide-enter,
.bottom-slide-leave-to {
  transform: translateY(-30%);
  opacity: 0;
}

.bottom-slide-enter-to,
.bottom-slide-leave {
  transform: translateY(0);
  opacity: 1;
}

/* 这里的动画是为了保持过渡后输入框的长度 */
.long-input {
  animation: width-change 0.5s forwards;
}

@keyframes width-change {
  from {
    width: var(--short-width);
  }
  to {
    width: var(--long-width);
  }
}

.search-icon /deep/ svg {
  width: 20px;
  height: 20px;
  margin: 7px;
}

</style>
