<template>
  <div class="anime-star-catalogue-container">
    <div class="anime-star-catalogue"></div>
  </div>
</template>

<script>
import {apis} from "@/assets/js/constants/request-path";
import {statusCode} from "@/assets/js/constants/status-code";

export default {
  name: "FanjuStarCatalogue",
  data() {
    return {}
  },
  methods: {
    // 获取番剧收藏目录
    getNoteAnimeCatalogue() {
      this.sendRequest({
        path: apis.star.animeGroupGet,
        params: {
          uid: this.$route.params.viewedUid,
        },
        thenCallback: (response) => {
          let res = response.data;
          console.log(res);
          if(res.code === statusCode.succeed) {
            this.$store.commit("initialNoteStarCatalogue", {catalogues: res.data});
          }
        },
        errorCallback: (error) => {
          console.log(error);
        }
      })
    },
  },
  beforeDestroy() {
  }
}
</script>

<style scoped>
.anime-star-catalogue-container {
  width: 250px;
  height: 600px;
  margin-right: 10px;
  color: #4943d8;
  font-size: 18px;
}

.anime-star-catalogue {
  position: fixed;
  z-index: 1;
  width: 250px;
  height: 600px;
  border-radius: 6px;
  background-color: #FFFFFFB7;
  box-shadow: var(--box-shadow-min);
  backdrop-filter: blur(3px);
}
</style>