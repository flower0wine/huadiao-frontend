<template>
  <div class="anime-history-list">
    <transition-group name="right-slide">
      <anime-history-item v-for="(item) in animeHistory"
                          :key="`${item.uid}/${item.animeId}`"
                          :animeItem="item"/>
    </transition-group>
    <simple-loading :option="{loadedText: `你到了世界的尽头...`}"
                    :observe-callback="observeCallback"
                    :get-hooks="getHooks"/>
  </div>
</template>

<script>
import {mapState} from "vuex";
import AnimeHistoryItem from "@/pages/history/components/AnimeHistoryItem";
import {apis} from "@/assets/js/constants/request-path";
import OperationThrottle from "@/assets/js/utils/operation-throttle";
import SimpleLoading from "@/pages/components/loading/SimpleLoading";
import RequestPager from "@/assets/js/utils/request-pager";

export default {
  name: "AnimeHistoryList",
  components: {SimpleLoading, AnimeHistoryItem},
  data() {
    return {
      pager: null,
      operationThrottle: new OperationThrottle(),
    }
  },
  computed: {
    ...mapState(["animeHistory"]),
  },
  created() {
    this.initial();
  },
  mounted() {
    this.getAnimeHistory();
  },
  methods: {
    initial() {
      this.pager = new RequestPager();
      this.$bus.$on("searchAnimeHistory", this.getAnimeHistory);
    },
    getHooks({unobserve}) {
      this.pager.setCompleteCallback(unobserve);
    },
    observeCallback() {
      this.getAnimeHistory();``      ``
    },
    // 获取番剧馆历史记录
    getAnimeHistory() {
      if (!this.operationThrottle.access()) return;
      this.pager.requestModel((params, requestCallback, errorCallback) => {
        this.sendRequest({
          path: apis.history.anime,
          params,
        }).then((response) => {
          let res = response.data;
          console.log(res);
          requestCallback(res).succeed((data) => {
            this.$store.commit("addAnimeHistory", {animeHistory: data});
          });
        }).catch(errorCallback);
      });
    },
  },
  beforeDestroy() {
  }
}
</script>

<style scoped>
.anime-history-list {
  width: 1200px;
  margin: 0 auto 100px;
  transition: var(--transition-500ms);
}


</style>