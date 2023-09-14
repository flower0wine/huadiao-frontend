<template>
  <div class="huadiao-house-anime" @click="clickEvent">
    <div class="anime-background" :style="pageBackground"></div>
    <template v-if="me">
      <div class="theme-entry"
           v-html="svg.theme"
           ref="themeEntry"
           @click="openThemeBoard"></div>
      <transition name="left-slide">
        <anime-house-theme v-if="visible.themeBoard.render"
                           ref="themeBoard"
                           v-show="visible.themeBoard.show"/>
      </transition>
    </template>
    <anime-house/>
  </div>
</template>

<script>
import AnimeHouseTheme from "@/pages/animehouse/components/AnimeHouseTheme";
import {svg} from "@/assets/js/constants/svgs";
import AnimeHouse from "@/pages/animehouse/components/AnimeHouse";
import {mapState} from "vuex";

export default {
  name: "HuadiaoHouseAnime",
  components: {AnimeHouse, AnimeHouseTheme},
  data() {
    return {
      svg,
      visible: {
        themeBoard: {
          render: false,
          show: false,
        }
      }
    }
  },
  computed: {
    ...mapState({
      pageBackground(state) {
        return this.backgroundTransform(state.huadiaoHouseInfo.pageBackground);
      },
    }),
  },
  mounted() {
    this.initial();
  },
  methods: {
    initial() {
      this.$bus.$on("modifyAnimeHousePageBackground", (value) => {
        this.$store.commit("modifyPageBackground", {background: value});
      });
    },
    clickEvent(e) {
      let themeEntryContain = this.$refs.themeEntry.contains(e.target);
      let themeBoardContain = this.$refs.themeBoard?.$el.contains(e.target);
      if(!themeBoardContain && !themeEntryContain) {
        this.closeThemeBoard();
      }
    },
    openThemeBoard() {
      this.visible.themeBoard.render = this.visible.themeBoard.show = true;
    },
    closeThemeBoard() {
      this.visible.themeBoard.show = false;
      this.$bus.$emit("closeAnimeHouseBoard");
    }
  },
  beforeDestroy() {
  }
}
</script>

<style scoped>
.huadiao-house-anime {
  position: relative;
  height: max(100vh, 600px);
  padding-top: max(10vh, 80px);
}

.anime-background {
  position: absolute;
  z-index: -1;
  top: 0px;
  width: 100%;
  height: max(100vh, 600px);
  background: no-repeat center/cover;
}

.theme-entry {
  position: absolute;
  bottom: 15px;
  left: 15px;
}

.theme-entry /deep/ svg {
  width: 30px;
  height: 30px;
  fill: #717171;
}
</style>