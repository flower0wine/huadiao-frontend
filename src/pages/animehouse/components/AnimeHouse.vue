<template>
  <div class="anime-container" :style="pageForeground" ref="animeContainer">
    <div class="anime-list" ref="animeList">
      <div class="anime-item"
           v-for="(item, index) in animeList"
           :key="item.animeId"
           ref="animeItem">
        <div class="anime-cover"
             :style="`${nativeUrlReject(item.cover)}; ${cardBorder}`"
             :class="cardBorder ? `has-border-image` : ``"></div>
        <div class="anime-info">
          <div class="anime-title">{{item.title}}</div>
          <div class="anime-add-time">{{dateFormat(item.addTime)}}</div>
          <div class="delete-anime" @click="deleteAnime(index)" v-if="me">
            <span v-html="svg.deleteTrashcan"></span>
            <span>删除该番剧</span>
          </div>
        </div>
      </div>
      <div class="add-anime-item" v-if="me">
        <div class="add-anime-cover" :style="cardBackground" @click="openAddAnimeBoard">
          <span v-html="svg.add"></span>
        </div>
        <div class="add-word">点击添加番剧</div>
      </div>
    </div>
    <transition name="fade">
      <add-anime-board v-if="visible.addAnimeBoard.render"
                       v-show="visible.addAnimeBoard.show"/>
    </transition>
  </div>
</template>

<script>
import {mapState} from "vuex";
import {svg} from "@/assets/js/constants/svgs";
import AddAnimeBoard from "@/pages/animehouse/components/AddAnimeBoard";
import {huadiaoPopupWindowOptions} from "@/pages/components/HuadiaoPopupWindow";
import {apis} from "@/assets/js/constants/request-path";
import {statusCode} from "@/assets/js/constants/status-code";

export default {
  name: "AnimeHouse",
  components: {AddAnimeBoard},
  data() {
    return {
      svg,
      minSpaceBetween: 20,
      visible: {
        addAnimeBoard: {
          render: false,
          show: false,
        }
      }
    }
  },
  computed: {
    ...mapState({
      pageForeground(state) {
        return this.backgroundTransform(state.huadiaoHouseInfo.pageForeground);
      },
      cardBackground(state) {
        return this.backgroundTransform(state.huadiaoHouseInfo.cardBackground);
      },
      cardBorder(state) {
        let cardBorderIndex = state.huadiaoHouseInfo.cardBorderImage;
        if(cardBorderIndex !== -1) {
          let cardBorderImage = state.cardBorderImage[cardBorderIndex];
          return this.generateBorderImage(cardBorderImage);
        }
        return "";
      },
      animeList(state) {
        return state.huadiaoHouseInfo.animeList;
      }
    })
  },
  watch: {
    animeList: {
      handler() {
        this.$nextTick(() => {
          this.reLayout();
        })
      }
    }
  },
  mounted() {
    this.initial();
  },
  methods: {
    initial() {
      this.reLayout();
      window.addEventListener("resize", () => {
        this.reLayout();
      });
      this.$bus.$on("closeAddAnimeBoard", () => {
        this.visible.addAnimeBoard.show = false;
      });
      this.$bus.$on("modifyAnimeHousePageForeground", (value) => {
        this.$store.commit("modifyPageForeground", {background: value});
      });
    },
    // 重新布局
    reLayout() {
      if(!this.$refs.animeItem) return;
      let animeListPadding = window.getComputedStyle(this.$refs.animeList).paddingLeft.split("px")[0] * 2;
      let animeContainerInnerWidth = this.$refs.animeContainer.clientWidth - animeListPadding - 1;
      let animeItemWidth = this.$refs.animeItem[0].clientWidth;
      let animeItemCountInLine = +(animeContainerInnerWidth / animeItemWidth).toFixed(0);

      for(let index = animeItemCountInLine; index > 0; index--) {
        let minWidth = index * animeItemWidth + (index - 1) * this.minSpaceBetween;
        if(minWidth <= animeContainerInnerWidth && index !== 1) {
          // 减一是因为小数会四舍五入, 所以减一, 也不影响观感
          let spaceBetween = ((animeContainerInnerWidth - animeItemWidth * index) / (index - 1)).toFixed(0) - 1;
          this.setSpaceBetween(index, spaceBetween);
          return;
        }
      }
    },
    // 设置间距
    setSpaceBetween(rowCount, spaceBetween) {
      for(let index = 0, length = this.$refs.animeItem.length; index < length; index++) {
        this.$refs.animeItem[index].style.marginRight = `0px`;
      }
      for(let index = 0, length = this.$refs.animeItem.length; index < length; ) {
        for(let rowIndex = 0; rowIndex < rowCount - 1 && index + rowIndex < length; rowIndex++) {
          this.$refs.animeItem[index + rowIndex].style.marginRight = `${spaceBetween}px`;
        }
        index += rowCount;
      }
    },
    openAddAnimeBoard() {
      this.visible.addAnimeBoard.show = this.visible.addAnimeBoard.render = true;
    },
    deleteAnime(index) {
      this.huadiaoPopupWindow(huadiaoPopupWindowOptions.iconType.warning, huadiaoPopupWindowOptions.operate.confirmOrCancel, "确认删除吗?", () => {
        this.requestDeleteAnime(index);
      });
    },
    // 发送请求, 删除番剧
    requestDeleteAnime(index) {
      this.sendRequest({
        path: apis.huadiaoHouse.deleteAnime,
        params: {
          animeId: this.animeList[index].animeId,
        },
        thenCallback: (response) => {
          let res = response.data;
          console.log(res);
          if(res.code === statusCode.succeed) {
            this.$store.commit("deleteAnime", {index});
            this.reLayout();
          }
        },
        errorCallback: (error) => {
          console.log(error);
        }
      });
    },
  },
  beforeDestroy() {
  }
}
</script>

<style scoped>
.anime-container {
  width: 80%;
  height: max(80vh, 500px);
  margin: 0 auto;
  border-radius: 8px;
  box-shadow: 2px 2px 5px 5px #00000030;
  background: no-repeat center/cover;
  overflow-y: auto;
}

.anime-list {
  width: 100%;
  height: 100%;
  padding: 35px 60px;
}

.anime-item,
.add-anime-item {
  float: left;
  width: 226px;
  height: 250px;
}

.has-border-image {
  border: 1px solid transparent;
  border-image-repeat: round;
}

.anime-cover,
.add-anime-cover {
  width: 100%;
  height: 130px;
  border-radius: 12px;
  background: no-repeat center/cover;
  transition: var(--transition-500ms);
}

.anime-cover:hover,
.add-anime-cover:hover {
  transform: translateY(-3px);
  box-shadow: 3px 3px 3px 3px #00000030;
}

.add-anime-cover {
  display: flex;
  justify-content: center;
  align-items: center;
}

.add-anime-cover /deep/ svg {
  width: 47px;
  height: 47px;
  fill: #727272;
}

.add-word {
  margin-top: 10px;
  text-align: center;
  font-size: 12px;
  color: #6f6f6f;
}

.anime-container::-webkit-scrollbar {
  display: none;
}

.anime-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  color: #727272;
}

.anime-title {
  width: 80%;
  text-align: center;
  font-size: 15px;
  letter-spacing: 1px;
}

.anime-add-time {
  font-size: 12px;
  margin: 5px 0;
}

.delete-anime {
  font-size: 12px;
  cursor: pointer;
}

.delete-anime /deep/ svg {
  width: 14px;
  height: 14px;
  fill: #727272;
  margin-right: 5px;
  vertical-align: -2px;
}

.delete-anime:hover /deep/ svg {
  fill: #a1a1a1;
}

.delete-anime:hover {
  color: #a1a1a1;
}
</style>