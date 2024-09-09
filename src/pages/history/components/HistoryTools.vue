<template>
  <div class="history-tool-container">
    <div class="history-title-container"
         @click="visible.choiceHistoryBoard = !visible.choiceHistoryBoard"
         ref="historyTitleContainer"
    >
      <div v-html="routeFullPath === searchType.note ? svg.noteHistory : svg.fanjuHistory"
           class="history-title-icon"
      ></div>
      <div class="history-title">{{ routeFullPath === searchType.note ? "笔记" : "番剧" }}历史记录</div>
      <div class="drop-down">
        <div></div>
      </div>
      <transition name="fade">
        <div class="choice-history-board"
             v-show="visible.choiceHistoryBoard"
        >
          <router-link :to="searchType.note"
                       tag="div"
                       class="choice-history-board-link"
          >笔记历史记录
          </router-link>
          <router-link :to="searchType.anime"
                       tag="div"
                       class="choice-history-board-link"
          >番剧历史记录
          </router-link>
        </div>
      </transition>
    </div>
    <div class="history-search-container" ref="historySearchContainer">
      <div class="history-search-icon" v-html="svg.search"></div>
      <input type="text"
             maxlength="20"
             class="search-input"
             placeholder="搜索历史记录"
             @keyup.enter="searchHistory"
             @focusin="focusinSearchInput"
             @focusout="focusoutSearchInput"
             v-model.trim="searchContent"
      >
      <div class="clear-search-icon"
           v-html="svg.close"
           v-show="visible.clearIcon"
           @click="clearSearchContent"
      ></div>
    </div>
    <div class="other-tools-container">
      <div class="pause-record">暂停记录历史</div>
      <div class="clear-history" @click="clearAllHistory">清空历史记录</div>
    </div>
  </div>
</template>

<script>
import {apis} from "@/assets/js/constants/request-path";
import {statusCode} from "@/assets/js/constants/status-code";

/**
 * 搜索类型
 * @type {{note: string, anime: string}}
 */
let searchType = {
  note: "/history/note",
  anime: "/history/anime",
}

/**
 * 根据查询类型暂存调用的函数
 * @type {{request: function, clear: function}}
 */
let functionCollection = {
  request: null,
  clear: null,
};

export default {
  name: "HistoryTools",
  data() {
    return {
      searchType,
      searchContent: "",
      visible: {
        choiceHistoryBoard: false,
        clearIcon: false,
      },
      svg: {
        fanjuHistory: `<svg t="1679384498387" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5464" width="200" height="200"><path d="M596.6 356l-13.2-8.1 166.5-229c11.1-15.3 7.7-37-7.6-48.1-15.3-11.1-37-7.7-48.1 7.6L524.6 311.6 255.6 146c-16.1-9.9-37.4-4.9-47.4 11.3-9.9 16.1-4.9 37.4 11.3 47.4L484 367.5l-25.3 34.8c-11.1 15.3-7.7 37 7.6 48.1 15.3 11.1 37 7.7 48.1-7.6l28.4-39.1 17.7 10.9c16.1 9.9 37.4 4.9 47.4-11.3 9.9-16.1 4.9-37.4-11.3-47.3z" fill="#FB813A" p-id="5465"></path><path d="M790.6 900.4m-59.2 0a59.2 59.2 0 1 0 118.4 0 59.2 59.2 0 1 0-118.4 0Z" fill="#FB813A" p-id="5466"></path><path d="M233.4 900.4m-59.2 0a59.2 59.2 0 1 0 118.4 0 59.2 59.2 0 1 0-118.4 0Z" fill="#FB813A" p-id="5467"></path><path d="M851.9 911.9H172.1c-39.3 0-71.4-32.1-71.4-71.4V377.4c0-39.3 32.1-71.4 71.4-71.4h679.7c39.3 0 71.4 32.1 71.4 71.4v463.1c0.1 39.3-32 71.4-71.3 71.4z" fill="#FDDE80" p-id="5468"></path><path d="M520.8 595.1m-142.3 0a142.3 142.3 0 1 0 284.6 0 142.3 142.3 0 1 0-284.6 0Z" fill="#FFFFFF" p-id="5469"></path><path d="M472.7 511.1c0-1 0.7-1.5 1.7-1L619.8 594c0.9 0.5 0.9 1.4 0 1.9l-145.4 83.9c-0.9 0.5-1.7 0.1-1.7-1V511.1z" fill="#FB813A" p-id="5470"></path></svg>`,
        noteHistory: `<svg t="1679376273630" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13491" width="200" height="200"><path d="M310 742.4c-3.5 0-6.9-2.1-8.3-5.6-1.9-4.6 0.3-9.9 4.9-11.7 0.6-0.2 56.5-23.1 131.4-44.1 100.9-28.3 186.3-39.9 254-34.5 158.7 12.7 186.2 31.3 188.8 33.4L869.6 694l0.3 0.3c-1.1-0.7-28-17.7-179.3-29.8-81.6-6.5-179.7 14.8-247.7 33.9-73.9 20.7-128.9 43.2-129.4 43.4-1.2 0.3-2.4 0.6-3.5 0.6z m0-304.8c-3.5 0-6.9-2.1-8.3-5.6-1.9-4.6 0.3-9.9 4.9-11.7 0.6-0.2 56.5-23.1 131.4-44.1 100.9-28.3 186.3-39.9 254-34.5 158.7 12.7 186.2 31.3 188.8 33.4l-11.2 14.1 0.3 0.3c-1.1-0.7-28-17.7-179.3-29.8-81.6-6.5-179.6 14.8-247.5 33.8-73.9 20.7-129.1 43.3-129.6 43.5-1.2 0.4-2.4 0.6-3.5 0.6z" fill="#FC6B79" p-id="13492"></path><path d="M174.6 242c-4.6 0-8.6-3.6-9-8.3-0.2-3.1-5.6-76.5 32.5-101.6 19.2-12.7 45-10.7 76.7 5.9 43.6 22.9 64.3 14 92.9 1.6 20.8-8.9 44.3-19.1 80.4-19.1 5 0 9 4 9 9s-4 9-9 9c-32.4 0-53.2 9-73.3 17.6-29.4 12.7-57.2 24.6-108.4-2.2-25.4-13.3-45.1-15.6-58.4-6.8-24.3 16-25.9 66.9-24.4 85.1 0.4 5-3.3 9.3-8.3 9.7-0.2 0.1-0.5 0.1-0.7 0.1z" fill="#ffffff" p-id="13493"></path><path d="M310 855.4c-3.6 0-6.9-2.1-8.3-5.5-0.9-2-16.6-33.4-80.3-33.4-34.7 0-55 9.6-65.9 17.6-10.7 7.9-14.3 15.6-14.3 15.7-1.4 3.4-4.7 5.5-8.3 5.5-0.6 0-1.2-0.1-1.8-0.2-4.2-0.9-7.2-4.5-7.2-8.8V254.4c0-0.5 0-0.9 0.1-1.4 2.4-35.3 44.9-62.8 97.4-62.8 52.5 0 95 27.5 97.4 62.8 0.1 0.5 0.1 0.9 0.1 1.4v591.9c0 4.3-3 8.1-7.3 8.9-0.5 0.2-1.1 0.2-1.6 0.2z" fill="#FFE08A" p-id="13494"></path><path d="M221.4 199.3c48 0 87.1 24.5 88.5 55.1v591.9s-16.5-38.8-88.5-38.8-88.5 38.8-88.5 38.8V254.4c1.5-30.6 40.6-55.1 88.5-55.1m0-18c-26.5 0-51.8 6.7-71.2 18.8-21.2 13.3-33.7 31.7-35.1 52-0.1 0.8-0.2 1.5-0.2 2.3v591.9c0 8.7 6.1 16.6 14.7 18.1 1.1 0.2 2.3 0.3 3.4 0.3 7.2 0 13.8-4.2 16.4-11.2 1.5-2.8 16.4-28.1 72-28.1 57.5 0 71.8 27.6 72 27.9 2.9 6.7 9.5 10.9 16.6 10.9 1.2 0 2.4-0.1 3.6-0.4 8.4-1.7 14.4-9.1 14.4-17.6V254.4c0-0.8-0.1-1.6-0.2-2.3-1.5-20.3-13.9-38.7-35.1-52-19.5-12.1-44.7-18.8-71.3-18.8z" p-id="13495"></path><path d="M221.4 923.3c-25.3 0-49.3-6.4-67.5-18.1-19.4-12.5-30.1-29.4-30.1-47.8s10.7-35.3 30.1-47.8c18.2-11.7 42.1-18.1 67.5-18.1s49.3 6.4 67.5 18.1c19.4 12.5 30.1 29.4 30.1 47.8s-10.7 35.3-30.1 47.8c-18.1 11.7-42.1 18.1-67.5 18.1z" fill="#EAB236" p-id="13496"></path><path d="M221.4 800.6c48.9 0 88.5 25.5 88.5 56.9s-39.6 56.9-88.5 56.9-88.5-25.5-88.5-56.9 39.7-56.9 88.5-56.9m0-18c-27.1 0-52.7 6.9-72.3 19.5-10.3 6.6-18.4 14.4-24.3 23.3-6.6 10-9.9 20.8-9.9 32s3.3 22 9.9 32c5.9 8.9 14 16.7 24.3 23.3 19.6 12.6 45.3 19.5 72.3 19.5s52.7-6.9 72.3-19.5c10.3-6.6 18.4-14.4 24.3-23.3 6.6-10 9.9-20.8 9.9-32s-3.3-22-9.9-32c-5.9-8.9-14-16.7-24.3-23.3-19.5-12.6-45.2-19.5-72.3-19.5z" p-id="13497"></path><path d="M383.1 893.2c-12.6 0-22.9-10.3-22.9-22.9v-587c0-12.6 10.3-22.9 22.9-22.9h57.4c12.6 0 22.9 10.3 22.9 22.9v587c0 12.6-10.3 22.9-22.9 22.9h-57.4z" fill="#FFE08A" p-id="13498"></path><path d="M440.5 263.5c11 0 19.9 8.9 19.9 19.9v587c0 11-8.9 19.9-19.9 19.9h-57.4c-11 0-19.9-8.9-19.9-19.9v-587c0-11 8.9-19.9 19.9-19.9h57.4m0-6h-57.4c-14.3 0-25.9 11.6-25.9 25.9v587c0 14.3 11.6 25.9 25.9 25.9h57.4c14.3 0 25.9-11.6 25.9-25.9v-587c0-14.3-11.6-25.9-25.9-25.9z" p-id="13499"></path><path d="M527.3 843.1c-12.6 0-22.9-10.3-22.9-22.9v-587c0-12.6 10.3-22.9 22.9-22.9h57.4c12.6 0 22.9 10.3 22.9 22.9v587c0 12.6-10.3 22.9-22.9 22.9h-57.4z" fill="#FFE08A" p-id="13500"></path><path d="M584.7 213.4c11 0 19.9 8.9 19.9 19.9v587c0 11-8.9 19.9-19.9 19.9h-57.4c-11 0-19.9-8.9-19.9-19.9v-587c0-11 8.9-19.9 19.9-19.9h57.4m0-6h-57.4c-14.3 0-25.9 11.6-25.9 25.9v587c0 14.3 11.6 25.9 25.9 25.9h57.4c14.3 0 25.9-11.6 25.9-25.9v-587c0-14.3-11.6-25.9-25.9-25.9z" p-id="13501"></path><path d="M815.8 855.6c-12.6 0-22.9-10.3-22.9-22.9v-587c0-12.6 10.3-22.9 22.9-22.9h57.4c12.6 0 22.9 10.3 22.9 22.9v587c0 12.6-10.3 22.9-22.9 22.9h-57.4z" fill="#FFE08A" p-id="13502"></path><path d="M873.2 225.8c11 0 19.9 8.9 19.9 19.9v587c0 11-8.9 19.9-19.9 19.9h-57.4c-11 0-19.9-8.9-19.9-19.9v-587c0-11 8.9-19.9 19.9-19.9h57.4m0-6h-57.4c-14.3 0-25.9 11.6-25.9 25.9v587c0 14.3 11.6 25.9 25.9 25.9h57.4c14.3 0 25.9-11.6 25.9-25.9v-587c0-14.3-11.6-25.9-25.9-25.9z" p-id="13503"></path><path d="M671.6 798.2c-12.6 0-22.9-10.3-22.9-22.9v-587c0-12.6 10.3-22.9 22.9-22.9H729c12.6 0 22.9 10.3 22.9 22.9v587c0 12.6-10.3 22.9-22.9 22.9h-57.4z" fill="#FFE08A" p-id="13504"></path><path d="M729 168.4c11 0 19.9 8.9 19.9 19.9v587c0 11-8.9 19.9-19.9 19.9h-57.4c-11 0-19.9-8.9-19.9-19.9v-587c0-11 8.9-19.9 19.9-19.9H729m0-6h-57.4c-14.3 0-25.9 11.6-25.9 25.9v587c0 14.3 11.6 25.9 25.9 25.9H729c14.3 0 25.9-11.6 25.9-25.9v-587c-0.1-14.3-11.7-25.9-25.9-25.9z" p-id="13505"></path><path d="M370.4 136.3a27 27 0 1 0 54 0 27 27 0 1 0-54 0z" fill="#ffffff" p-id="13506"></path><path d="M397.4 166.2c-16.5 0-30-13.4-30-30s13.4-30 30-30 30 13.4 30 30-13.5 30-30 30z m0-53.9c-13.2 0-24 10.8-24 24s10.8 24 24 24 24-10.8 24-24-10.8-24-24-24z" fill="#330867" p-id="13507"></path></svg>`,
        close: `<svg t="1677680621221" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4916" width="200" height="200"><path d="M644.30990222 512l363.7248 363.7248c18.27726222 18.27726222 18.27726222 47.84128 0 66.11854222l-66.11854222 66.11854223c-18.27726222 18.27726222-47.84128 18.27726222-66.11854222 0L512 644.30990222l-363.7248 363.7248c-18.27726222 18.27726222-47.84128 18.27726222-66.11854222 0l-66.11854223-66.11854222c-18.27726222-18.27726222-18.27726222-47.91409778 0-66.11854222L379.69009778 512 15.96529778 148.2752c-18.27726222-18.27726222-18.27726222-47.84128 0-66.11854222l66.11854222-66.11854223c18.27726222-18.27726222 47.91409778-18.27726222 66.11854222 0L512 379.69009778l363.7248-363.7248c18.27726222-18.27726222 47.91409778-18.27726222 66.11854222 0l66.11854223 66.11854222c18.27726222 18.27726222 18.27726222 47.91409778 0 66.11854222L644.30990222 512z" p-id="4917"></path></svg>`,
        search: `<svg fill="#fff" t="1678007890020" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4976" width="200" height="200"><path d="M465.454545 868.848485C226.521212 868.848485 31.030303 673.357576 31.030303 434.424242S226.521212 0 465.454545 0s434.424242 195.490909 434.424243 434.424242-195.490909 434.424242-434.424243 434.424243z m0-806.787879C260.654545 62.060606 93.090909 229.624242 93.090909 434.424242s167.563636 372.363636 372.363636 372.363637 372.363636-167.563636 372.363637-372.363637S670.254545 62.060606 465.454545 62.060606z" p-id="4977"></path><path d="M766.448485 806.787879c6.206061-6.206061 15.515152-6.206061 21.721212 0l183.078788 167.563636c6.206061 6.206061 6.206061 15.515152 0 21.721212-6.206061 6.206061-15.515152 6.206061-21.721212 0l-183.078788-167.563636c-6.206061-6.206061-6.206061-15.515152 0-21.721212z" p-id="4978"></path><path d="M961.939394 1014.690909c-6.206061 0-15.515152-3.10303-21.721212-9.309091L757.139394 837.818182c-6.206061-6.206061-9.309091-12.412121-9.309091-21.721212 0-9.309091 3.10303-15.515152 9.309091-21.721212 6.206061-6.206061 12.412121-9.309091 21.721212-9.309091 9.309091 0 15.515152 3.10303 21.721212 9.309091l183.078788 167.563636c6.206061 6.206061 9.309091 12.412121 9.309091 21.721212 0 9.309091-3.10303 15.515152-9.309091 21.721212-6.206061 3.10303-12.412121 9.309091-21.721212 9.309091z m-186.181818-198.593939l183.078788 167.563636-192.387879-176.872727 9.309091 9.309091z" p-id="4979"></path></svg>`,
      }
    }
  },
  computed: {
    routeFullPath() {
      return this.$route.fullPath;
    }
  },
  watch: {
    searchContent: {
      immediate: true,
      handler(newValue) {
        this.visible.clearIcon = newValue.length !== 0;
      },
    },
    "$route.fullPath": {
      immediate: true,
      deep: true,
      handler(type) {
        if (type === searchType.note) {
          functionCollection.request = this.requestNoteHistoryByTitle;
          functionCollection.clear = this.clearNoteHistory;
        } else if (type === searchType.anime) {
          functionCollection.request = this.requestAnimeHistoryByTitle;
          functionCollection.clear = this.clearAnimeHistory;
        }
      }
    }
  },
  methods: {
    focusinSearchInput() {
      if (this.searchContent !== "") {
        this.visible.clearIcon = true;
      }
      this.$refs.historySearchContainer.classList.add("focus-history-search");
    },
    focusoutSearchInput() {
      this.$refs.historySearchContainer.classList.remove("focus-history-search");
    },
    clearSearchContent() {
      this.searchContent = "";
      this.visible.clearIcon = false;
      this.searchHistory();
    },
    searchHistory() {
      functionCollection.request();
    },
    // 获取笔记
    requestNoteHistoryByTitle() {
      this.$bus.$emit("searchNoteHistory", this.searchContent);
    },
    // 获取番剧
    requestAnimeHistoryByTitle() {
      this.$bus.$emit("searchAnimeHistory", this.searchContent);
    },
    // 清空历史记录
    clearAllHistory() {
      this.huadiaoPopupWindow("warning", "confirmOrCancel", "清空后就什么都没有了哦!").then(() => {
        functionCollection.clear();
      });
    },
    // 清空笔记历史记录
    clearNoteHistory() {
      this.sendRequest({
        path: apis.history.noteDelete,
        thenCallback: (response) => {
          let res = response.data;
          console.log(res);
          if (res.code === statusCode.SUCCEED) {
            this.$store.commit("clearNoteHistory");
          }
        },
        errorCallback: (error) => {
          console.log(error);
        }
      });
    },
    // 清空番剧馆历史记录
    clearAnimeHistory() {
      this.sendRequest({
        path: apis.history.animeDelete,
        thenCallback: (response) => {
          let res = response.data;
          console.log(res);
          if (res.code === statusCode.SUCCEED) {
            this.$store.commit("clearAnimeHistory");
          }
        },
        errorCallback: (error) => {
          console.log(error)
        },
      })
    },
  },
  beforeDestroy() {
  }
}
</script>

<style scoped>

.history-tool-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 1200px;
  height: 40px;
  margin: 15px auto;
}

.history-title-icon /deep/ svg {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}

.history-title-container {
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.drop-down {
  width: 22px;
  height: 18px;
  border-radius: 4px;
  margin-left: 8px;
  transition: var(--transition-500ms);
}

.drop-down:hover {
  background-color: #e3e1e1;
}

.drop-down div {
  width: 0;
  height: 0;
  margin: 6px 0px 0px 3px;
  border-top: 8px solid #9f9e9e;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 8px solid transparent;
  transition: var(--transition-500ms);
}

.drop-down:hover div {
  border-top: 8px solid #e0943d;
}

.choice-history-board {
  position: absolute;
  z-index: 1;
  top: 0px;
  left: 35px;
  border-radius: 4px;
  color: #fff;
  background-color: #e0943d;
  transition: var(--transition-200ms);
  overflow: hidden;
}

.choice-history-board-link {
  padding: 5px;
}

.choice-history-board-link:hover {
  background-color: #d78f3c;
}

.history-search-container {
  position: relative;
  width: 300px;
  height: 30px;
  margin-left: auto;
  border-radius: 15px;
  border: 1px solid #9a9898;
}

/* 聚焦输入框 */
.focus-history-search {
  border: 1px solid #e34040;
}

.history-search-container div {
  position: absolute;
}

.history-search-icon {
  top: 1px;
  left: 6px;
}

.clear-search-icon {
  top: 1px;
  right: 8px;
}

.search-input {
  width: 240px;
  height: 100%;
  margin-left: 35px;
  color: #737373;
  background-color: transparent;
}

.search-input::-webkit-input-placeholder {
  color: #c2c2c2;
}

.history-search-icon /deep/ svg,
.clear-search-icon /deep/ svg {
  width: 20px;
  height: 20px;
  fill: #9a9898;
}

/* 搜索图标 */
.focus-history-search .history-search-icon /deep/ svg,
.focus-history-search .clear-search-icon /deep/ svg {
  fill: #e34040;
}

/* 清空图标 */
.clear-search-icon /deep/ svg {
  width: 12px;
  height: 12px;
}

.other-tools-container {
  display: flex;
}

.pause-record,
.clear-history {
  padding: 0 10px;
  height: 30px;
  line-height: 26px;
  margin-left: 20px;
  border-radius: 15px;
  font-size: 14px;
  color: #e34040;
  border: 1px solid #e34040;
  cursor: pointer;
  transition: var(--transition-300ms);
}

.pause-record:hover,
.clear-history:hover {
  color: #fff;
  background-color: #e34040;
}
</style>