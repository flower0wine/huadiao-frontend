<template>
  <div class="anime-list">
    <anime-item-container/>
    <content-loading v-show="animeList.length !== 0"/>
  </div>
</template>

<script>
import AnimeItemContainer from "@/pages/index/components/forum/anime/AnimeItemContainer";
import ContentLoading from "@/pages/components/ContentLoading";
export default {
  name: "AnimeList",
  components: {ContentLoading, AnimeItemContainer},
  data() {
    return {
      animeList: [{

      }],
    }
  },
  methods: {},
  beforeDestroy() {
  }
}
</script>

<style scoped>

</style>