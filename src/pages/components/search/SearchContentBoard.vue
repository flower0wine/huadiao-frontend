<template>
  <div class="search-content-board" :style="searchContentBordStyle">
    <div v-show="visible.beforeSearch">
      <div class="search-history">
        <div class="search-history-header">
          <div class="left">
            <div class="title">{{ searchTypeMapping[currentSearchType] }}搜索历史</div>
            <div class="description">最多保存十条, 当前保存 {{searchHistoryList.length}}/10</div>
          </div>
          <div class="right">
            <span class="delete-icon" v-html="svg.delete" title="点击删除当前所有的搜索历史" @click="clearAllSearchHistory"></span>
          </div>
        </div>
        <div class="search-history-item"
             v-for="(item, index) in searchHistoryList"
             :title="`点击搜索${item.content}`"
             @click="modifySearchContent(index)"
             :key="item.time">
          <div class="left">
            <div class="content">{{ item.content }}</div>
            <div class="time">{{ huadiaoDateFormat(item.time) }}</div>
          </div>
          <div class="right">
            <span class="delete-icon"
                  title="点击删除"
                  v-html="svg.delete"
                  @click.stop="deleteSearchHistory(index)"></span>
          </div>
        </div>
        <div class="no-search-history" v-if="searchHistoryList.length === 0">暂无搜索历史</div>
      </div>
    </div>
    <div v-show="!visible.beforeSearch">
      <div v-show="visible.searching">
        <div class="loading">
          <div v-html="svg.loading"></div>
          <div>加载中...</div>
        </div>
      </div>
      <div v-show="!visible.searching">
        <user-list :change-search-status="changeSearchStatus"/>
        <note-list :change-search-status="changeSearchStatus"/>
      </div>
    </div>
  </div>
</template>

<script>
import {svg} from "@/assets/js/constants/svgs";
import {apis} from "@/assets/js/constants/request-path";
import UserList from "@/pages/components/search/UserList";
import NoteList from "@/pages/components/search/NoteList";
import searchHistory from "@/assets/js/localforge/search-history";
import {searchTypeMapping} from "@/assets/js/constants/search/search-header";

export default {
  name: "SearchContentBoard",
  components: {NoteList, UserList},
  props: ["searchContent", "currentSearchType", "setSearchContent", "searchContentBoardTheme"],
  data() {
    return {
      searchTypeMapping,
      pageLinkStart: apis.pageLinkStart,
      searchHistoryList: [],
      svg: {
        delete: svg.deleteTrashcan,
        loading: svg.circleLoading,
      },
      visible: {
        beforeSearch: true,
        searching: false,
      }
    }
  },
  computed: {
    searchContentBordStyle() {
      return `background: ${this.searchContentBoardTheme.background}`;
    }
  },
  watch: {
    searchContent: {
      handler() {
        this.searchContentChange();
      },
    },
    currentSearchType: {
      handler(val) {
        this.searchTypeChange(val);
      }
    }
  },
  created() {
    this.getSearchHistory(this.currentSearchType);
  },
  methods: {
    changeSearchStatus() {
      this.setBeforeSearch(false);
      this.setSearching(false);
    },
    searchContentChange() {
      if (this.searchContent !== "") {
        this.setBeforeSearch(false);
        this.setSearching(true);
      } else {
        this.setSearching(false);
        this.setBeforeSearch(true);
      }
      this.getSearchHistory(this.currentSearchType);
    },
    searchTypeChange() {
      this.setBeforeSearch(true);
      this.setSearching(false);
      this.getSearchHistory(this.currentSearchType);
    },
    getSearchHistory(searchType) {
      if (!searchType) return;
      searchHistory.getSearchHistory(searchType).then((data) => {
        if (Array.isArray(data))
          this.searchHistoryList = data;
        else
          this.searchHistoryList = [];
      });
    },
    modifySearchContent(index) {
      this.setSearchContent(this.searchHistoryList[index].content);
    },
    deleteSearchHistory(index) {
      searchHistory.removeSearchHistory(this.currentSearchType, index).then(() => {
        this.searchHistoryList.splice(index, 1);
      });
    },
    clearAllSearchHistory() {
      this.searchHistoryList = [];
      searchHistory.clearSearchHistory(this.currentSearchType);
    },
    setBeforeSearch(bool) {
      this.visible.beforeSearch = bool;
    },
    setSearching(bool) {
      this.visible.searching = bool;
    }
  },
  beforeDestroy() {
  }
}
</script>

<style>
.simple-loading .loaded-text {
  font-size: 14px;
  color: #aaa;
}

.no-content {
  line-height: 70px;
  text-align: center;
  color: #e8e8e8;
}

.search-item {
  margin-bottom: 10px;
}

.link {
  display: block;
  width: 100%;
  height: 100%;
}

.no-more {
  text-align: center;
  font-size: 14px;
  color: #e8e8e8;
}
</style>
<style scoped>

.search-content-board {
  position: absolute;
  top: 50px;
  right: 0px;
  min-width: 300px;
  min-height: 300px;
  max-height: 500px;
  padding: 10px;
  border-radius: 6px;
  backdrop-filter: blur(3px);
  background: -webkit-linear-gradient(top, #f06161cf, #252525cf);
  box-shadow: 3px 3px 5px 2px #00000030;
  overflow-y: auto;
  transition: opacity 500ms;
}

.loading {
  margin: 40px 0;
  text-align: center;
  font-size: 14px;
  color: #fff;
}

.loading /deep/ svg {
  width: 20px;
  height: 20px;
  fill: #fff;
  animation: circleRotate 3s linear infinite;
}

.search-history {
  color: #333333;
  cursor: default;
}

.search-history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 8px 15px;
  border-radius: 6px;
  letter-spacing: 1px;
  font-size: 14px;
  background-color: #fff;
}

.search-history-header .description {
  margin-top: 4px;
  font-size: 12px;
  color: #aaa;
}

.search-history-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  border-radius: 6px;
  background-color: #fff;
}

.delete-icon {
  padding: 4px;
  border-radius: 4px;
}

.delete-icon:hover {
  background-color: #f6cfcf;
}

.delete-icon /deep/ svg {
  width: 18px;
  height: 18px;
  fill: #c4c4c4;
  vertical-align: -3px;
}

.delete-icon:hover /deep/ svg {
  fill: #d05252;
}

.search-history-item {
  margin-top: 10px;
}

.search-history-item:hover {
  background-color: #f6f5f5;
}

.search-history-item .time {
  text-align: left;
  margin-top: 6px;
  font-size: 12px;
  color: #aaa;
}

.no-search-history {
  text-align: center;
  font-size: 14px;
  padding: 6px;
  border-radius: 6px;
  background-color: #fff;
}
</style>