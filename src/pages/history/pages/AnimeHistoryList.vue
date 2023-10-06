<template>
  <div class="anime-history-list">
    <transition-group name="right-slide">
      <anime-history-item v-for="(item, index) in animeHistory"
                          :key="`${item.uid}/${item.animeId}`"
                          :animeItem="item"/>
    </transition-group>
    <div class="no-anime" ref="noAnime">你到了世界的尽头...</div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import AnimeHistoryItem from "@/pages/history/components/AnimeHistoryItem";
import {apis} from "@/assets/js/constants/request-path";
import {statusCode} from "@/assets/js/constants/status-code";

export default {
  name: "AnimeHistoryList",
  components: {AnimeHistoryItem},
  data() {
    return {
      offset: 0,
      row: 10,
      requesting: false,
      observer: null,
    }
  },
  computed: {
    ...mapState(["animeHistory"]),
  },
  created() {
    this.initial();
  },
  methods: {
    initial() {
      this.observer = new IntersectionObserver((entries) => {
        let observerInfo = entries[0];
        if(observerInfo.isIntersecting) {
          this.getAnimeHistory();
        }
      }, {
        threshold: 0.1
      });
      this.$nextTick(() => {
        this.observer.observe(this.$refs.noAnime);
      });
    },
    // 获取番剧馆历史记录
    getAnimeHistory() {
      if(this.requesting) return;
      this.requesting = true;
      this.sendRequest({
        path: apis.history.anime,
        params: {
          row: this.row,
          offset: this.offset,
        },
        thenCallback: (response) => {
          let res = response.data;
          console.log(res);
          if(res.code === statusCode.succeed) {
            let length = res.data.length;
            this.$store.commit("addAnimeHistory", {animeHistory: res.data});
            this.offset += length;
          }
          else if(res.code === statusCode.notExist) {
            this.$nextTick(() => {
              this.observer.unobserve(this.$refs.noAnime);
            });
          }
          this.requesting = false;
        },
        errorCallback: (error) => {
          console.log(error);
          this.requesting = false;
        }
      })
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

.no-anime {
  text-align: center;
  font-size: 14px;
  margin-top: 40px;
  color: #adadad;
}
</style>