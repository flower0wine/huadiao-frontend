<template>
  <div class="note-list"
       v-show="visibleNoteList">
    <note-item v-for="(item, index) in noteList"
               :key="index"
               :item="item"/>
    <div class="no-content"
         v-show="noteList.length === 0">没有检索到任何笔记...
    </div>
    <simple-loading v-show="noteList.length !== 0"
                    :observe-callback="observeCallback"
                    :get-hooks="getHooks"
                    :option="{loadedText: `没有更多匹配的笔记了...`}"/>
  </div>
</template>

<script>
import {apis} from "@/assets/js/constants/request-path";
import NoteItem from "@/pages/components/search/NoteItem";
import {overallSearchType, overallType, searchType} from "@/assets/js/constants/search/search-header";
import searchHistory from "@/assets/js/localforge/search-history";
import SimpleLoading from "@/pages/components/loading/SimpleLoading";
import RequestPager from "@/assets/js/utils/request-pager";

let pager = new RequestPager();

export default {
  name: "NoteList",
  components: {SimpleLoading, NoteItem},
  props: ["changeSearchStatus"],
  data() {
    return {
      currentSearchType: "",
      searchContent: "",
      noteList: [],
      requestSearch: null,
    }
  },
  computed: {
    visibleNoteList() {
      return overallSearchType[this.currentSearchType] === overallType.note;
    }
  },
  created() {
    pager = new RequestPager();
    this.initial();
  },
  methods: {
    initial() {
      this.$bus.$on("search", this.chooseRequestType);
    },
    getHooks({unobserve}) {
      pager.setCompleteCallback(unobserve);
    },
    // 向下滚动时触发
    observeCallback() {
      this.requestSearch && this.requestSearch();
    },
    // 选择请求类型
    chooseRequestType(currentSearchType, searchContent) {
      this.currentSearchType = currentSearchType;
      this.searchContent = searchContent;
      this.reset();
      if (this.currentSearchType === searchType.noteTitle) {
        this.requestSearch = this.requestSearchNoteByTitle;
        this.requestSearchNoteByTitle();
      } else if (this.currentSearchType === searchType.noteSummary) {
        this.requestSearch = this.requestSearchNoteBySummary;
        this.requestSearchNoteBySummary();
      }
    },
    reset() {
      this.noteList = [];
      pager.reset();
    },
    requestSearchNoteByTitle() {
      pager.requestModel((params) => {
        this.sendRequest({
          path: apis.search.note.title,
          params: {
            noteTitle: this.searchContent,
            ...params,
          },
        }).then((response) => {
          let res = response.data;
          console.log(res);
          pager.requestCallback(res).succeed((data) => {
            if (Array.isArray(data))
              this.noteList = [...data];
          });
          this.changeSearchStatus && this.changeSearchStatus();
          this.saveSearchHistoryByTitle();
        }).catch((error) => {
          pager.errorCallback(error);
          this.changeSearchStatus && this.changeSearchStatus();
        });
      });
    },
    requestSearchNoteBySummary() {
      pager.requestModel((params) => {
        this.sendRequest({
          path: apis.search.note.summary,
          params: {
            noteSummary: this.searchContent,
            ...params,
          },
        }).then((response) => {
          let res = response.data;
          console.log(res);
          pager.requestCallback(res).succeed((data) => {
            if (Array.isArray(data))
              this.noteList = [...data];
          });
          this.changeSearchStatus && this.changeSearchStatus();
          this.saveSearchHistoryBySummary();
        }).catch((error) => {
          pager.errorCallback(error);
          this.changeSearchStatus && this.changeSearchStatus();
        });
      });
    },
    saveSearchHistoryByTitle() {
      searchHistory.saveSearchHistory(searchType.noteTitle, this.searchContent);
    },
    saveSearchHistoryBySummary() {
      searchHistory.saveSearchHistory(searchType.noteSummary, this.searchContent);
    }
  },
  beforeDestroy() {
  }
}
</script>

<style scoped>

</style>