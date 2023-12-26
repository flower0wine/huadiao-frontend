<template>
  <div class="user-list"
       v-show="visibleUserList">
    <user-item v-for="(item, index) in userList"
               :key="index"
               :item="item"/>
    <div class="no-content"
         v-show="userList.length === 0">没有检索到任何用户...
    </div>
    <simple-loading v-show="userList.length !== 0"
                    :observe-callback="observeCallback"
                    :get-hooks="getHooks"
                    :option="{loadedText: `没有更多匹配的用户了...`}"/>
  </div>
</template>

<script>
import {apis} from "@/assets/js/constants/request-path";
import UserItem from "@/pages/components/search/UserItem";
import {overallSearchType, overallType, searchType} from "@/assets/js/constants/search/search-header";
import searchHistory from "@/assets/js/utils/search-history";
import SimpleLoading from "@/pages/components/loading/SimpleLoading";
import RequestPager from "@/assets/js/utils/request-pager";

let pager = new RequestPager();

export default {
  name: "UserList",
  components: {SimpleLoading, UserItem},
  props: ["changeSearchStatus"],
  data() {
    return {
      userList: [],
      currentSearchType: "",
      searchContent: "",
      requestSearch: null,
    }
  },
  computed: {
    visibleUserList() {
      return overallSearchType[this.currentSearchType] === overallType.user;
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
      if (this.currentSearchType === searchType.nickname) {
        this.requestSearch = this.requestSearchUserByNickname;
        this.requestSearchUserByNickname();
      } else if (this.currentSearchType === searchType.userId) {
        this.requestSearch = this.requestSearchUserByUserId;
        this.requestSearchUserByUserId();
      }
    },
    reset() {
      this.userList = [];
      pager.reset();
    },
    requestSearchUserByNickname() {
      pager.requestModel((params) => {
        this.sendRequest({
          path: apis.search.user.nickname,
          params: {
            nickname: this.searchContent,
            ...params,
          },
        }).then((response) => {
          let res = response.data;
          console.log(res);
          pager.requestCallback(res).succeed((data) => {
            if (Array.isArray(data))
              this.userList = [...data];
          });
          this.changeSearchStatus && this.changeSearchStatus();
          this.saveSearchHistoryByNickname();
        }).catch((error) => {
          pager.errorCallback(error);
          this.changeSearchStatus && this.changeSearchStatus();
        });
      });
    },
    requestSearchUserByUserId() {
      pager.requestModel((params) => {
        this.sendRequest({
          path: apis.search.user.userId,
          params: {
            userId: this.searchContent,
            ...params,
          }
        }).then((response) => {
          let res = response.data;
          console.log(res);
          pager.requestCallback(res).succeed((data) => {
            if (Array.isArray(data))
              this.userList = [...data];
          });
          this.changeSearchStatus && this.changeSearchStatus();
          this.saveSearchHistoryByUserId();
        }).catch((error) => {
          pager.errorCallback(error);
          this.changeSearchStatus && this.changeSearchStatus();
        });
      });
    },
    saveSearchHistoryByNickname() {
      searchHistory.saveSearchHistory(searchType.nickname, this.searchContent);
    },
    saveSearchHistoryByUserId() {
      searchHistory.saveSearchHistory(searchType.userId, this.searchContent);
    },
  },
  beforeDestroy() {
  }
}
</script>

<style scoped>

</style>