<template>
  <div class="border-image-container">
    <div class="border-image-header">
      <div class="border-image-title">选择你喜欢的边框</div>
      <span v-html="svg.fork" class="close-icon" @click="closeBorderImageBoard"></span>
    </div>
    <div class="border-image-content">
      <div class="border-image-example border-image-item"
           v-for="(item, index) in borderImageList"
           :key="index"
           :style="item"
           @click="setBorderImage(index)"></div>
      <div class="no-border-image border-image-item" @click="clearBorderImage">无</div>
    </div>
  </div>
</template>

<script>
import {svg} from "@/assets/js/constants/svgs";
import {mapState} from "vuex";
import {getHuadiaoHouseCardBorderImageStyle} from "@/pages/animehouse/tool";

export default {
  name: "BorderImageBoard",
  props: ["realTimeCallback"],
  data() {
    return {
      svg,
      refPro: [],
    }
  },
  computed: {
    ...mapState({
      borderImageList(state) {
        let cardBorderImageList = [];
        for(let cardBorderImage of state.cardBorderImage) {
          let eleStyle = getHuadiaoHouseCardBorderImageStyle(cardBorderImage);
          cardBorderImageList.push(eleStyle);
        }
        return cardBorderImageList;
      }
    }),
  },
  mounted() {
  },
  methods: {
    setBorderImage(index) {
      this.realTimeCallback && this.realTimeCallback(index);
    },
    clearBorderImage() {
      this.realTimeCallback && this.realTimeCallback(-1);
    },
    closeBorderImageBoard() {
      this.$bus.$emit("closeBorderImageBoard");
    },
  },
  beforeDestroy() {
  }
}
</script>

<style scoped>
.border-image-container {
  position: absolute;
  top: 50%;
  left: max(300px, 30vw);
  transform: translateY(-50%);
  width: 650px;
  height: max(70vh, 500px);
  border-radius: 8px;
  background-image: -webkit-linear-gradient(top, rgb(46, 202, 250), rgb(255, 44, 220),rgb(165, 0, 0));
  transition: opacity 500ms;
}

.border-image-header {
  width: 100%;
  height: 60px;
  font-size: 25px;
  text-align: center;
  line-height: 60px;
  color: #fff;
}

.close-icon /deep/ svg {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 20px;
  height: 20px;
  fill: #fff;
}

.close-icon:hover /deep/ svg {
  fill: #e7e7e7;
}

.border-image-content {
  width: 610px;
  height: calc(100% - 90px);
  margin: 0 auto;
  padding: 60px 35px 0;
  background-color: #fff;
  overflow-y: auto;
}

.border-image-content::-webkit-scrollbar {
  display: none;
}

.border-image-example {
  border: 1px solid;
  border-image-repeat: round;
}

.border-image-item {
  float: left;
  width: 226px;
  height: 130px;
  margin-bottom: 80px;
  transition: all 500ms;
}

.border-image-example:hover {
  transform: translateY(-2px);
  filter: drop-shadow(2px 3px 3px #00000040);
}

.border-image-item:nth-child(even) {
  margin-left: 80px;
}

.no-border-image {
  font-size: 24px;
  text-align: center;
  line-height: 130px;
}

.no-border-image:hover {
  transform: translateY(-2px);
  box-shadow: 2px 2px 3px 2px #00000020;
}
</style>