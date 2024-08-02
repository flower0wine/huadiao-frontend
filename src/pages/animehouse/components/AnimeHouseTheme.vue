<template>
  <div class="anime-house-theme-board">
    <div class="theme-board-header">更换主题</div>
    <div class="theme-board-list">
      <div class="theme-board-item"
           v-for="(item, index) in themeBoardList"
           :style="`--color: ${item.color}`"
           @click="item.clickEvent"
           :key="index">
        <label :for="item.labelFor">
          <span class="theme-board-item-title">{{ item.title }}</span>
          <span v-html="svg.access"></span>
        </label>
      </div>
    </div>
    <transition-group name="fade">
      <multiply-color v-if="visible.multipleColor.render"
                      v-show="visible.multipleColor.show"
                      :realTimeCallback="multiplyColorRealTimeCallback"
                      :confirmCallback="multiplyColorBoardConfirmCallback"
                      :background="modifyingBackground"
                      :options="multiplyColorOptions"
                      key="multiplyColor"/>
      <border-image-board v-if="visible.borderImage.render"
                          v-show="visible.borderImage.show"
                          :realTimeCallback="borderImageRealTimeCallback"
                          key="borderImage"/>
    </transition-group>
    <input type="color" name="colorBoard" id="colorBoard" @input="colorBoardChange" v-model="colorInputValue" ref="colorInput">
  </div>
</template>

<script>
import {svg} from "@/assets/js/constants/svgs";
import MultiplyColor from "@/pages/animehouse/components/MultiplyColorBoard";
import {mapState} from "vuex";
import BorderImageBoard from "@/pages/animehouse/components/BorderImageBoard";
import {apis} from "@/assets/js/constants/request-path";
import {statusCode} from "@/assets/js/constants/status-code";

export default {
  name: "AnimeHouseTheme",
  components: {BorderImageBoard, MultiplyColor},
  data() {
    return {
      svg,
      // 颜色选择器值
      colorInputValue: "",
      // 颜色选择器状态改变回调
      colorInputChangeCallback: null,
      // 渐变色板实时改变回调
      multiplyColorRealTimeCallback: null,
      // 渐变色板成功回调
      multiplyColorBoardConfirmCallback: null,
      // 图片边框实时1改变回调
      borderImageRealTimeCallback: null,
      // 渐变色板正在修改的背景
      modifyingBackground: "",
      visible: {
        multipleColor: {
          render: false,
          show: false
        },
        borderImage: {
          render: false,
          show: false,
        }
      },
      multiplyColorOptions: {
        moreOperate: false,
        title: "",
      },
      themeBoardList: [{
        title: "标题颜色",
        color: "#ff4e00",
        labelFor: "colorBoard",
        clickEvent: this.modifyTitleColor,
      }, {
        title: "标题背景",
        color: "#302b63",
        clickEvent: this.modifyTitleBackground,
      }, {
        title: "页面背景",
        color: "#00befc",
        clickEvent: this.modifyPageBackground,
      }, {
        title: "页面前景",
        color: "#c80506",
        clickEvent: this.modifyPageForeground,
      }, {
        title: "番剧边框",
        color: "#20bb2b",
        clickEvent: this.modifyAnimeBorder,
      }, {
        title: "卡片背景",
        color: "#bb9c20",
        clickEvent: this.modifyCardBackground,
      }]
    }
  },
  computed: {
    ...mapState({
      titleBackground(state) {
        return state.huadiaoHouseInfo.titleBackground;
      },
      pageBackground(state) {
        return state.huadiaoHouseInfo.pageBackground;
      },
      pageForeground(state) {
        return state.huadiaoHouseInfo.pageForeground;
      },
      cardBackground(state) {
        return state.huadiaoHouseInfo.cardBackground;
      },
    }),
  },
  created() {
    this.initial();
  },
  methods: {
    initial() {
      this.$bus.$on("modifyColorChangeCallback", (fn) => {
        this.colorInputChangeCallback = fn;
      });
      this.$bus.$on("closeAnimeHouseBoard", () => {
        this.visible.multipleColor.show = false;
      });
      this.$bus.$on("closeBorderImageBoard", () => {
        this.visible.borderImage.show = false;
      });
      this.$bus.$on("closeMultiplyColorBoard", () => {
        this.hiddenMultipleColor();
      });
    },
    // 显示渐变色板
    showMultipleColor() {
      this.visible.multipleColor.render = this.visible.multipleColor.show = true;
    },
    hiddenMultipleColor() {
      this.visible.multipleColor.show = false;
    },
    // 显示图片边框选择面板
    showBorderImageBoard() {
      this.visible.borderImage.render = this.visible.borderImage.show = true;
    },
    hiddenBorderImageBoard() {
      this.visible.borderImage.show = false;
    },
    hiddenAll() {
      this.hiddenMultipleColor();
      this.hiddenBorderImageBoard();
    },
    modifyTitleColor() {
      this.hiddenAll();
      this.colorInputChangeCallback = this.confirmModifyTitleColor;
    },
    modifyTitleBackground() {
      this.hiddenAll();
      this.modifyingBackground = this.titleBackground;
      this.multiplyColorOptions = {
        title: "标题背景",
        moreOperate: false,
      };
      this.multiplyColorRealTimeCallback = (value) => {
        this.$bus.$emit("modifyAnimeHouseHeaderBackground", value);
      };
      this.multiplyColorBoardConfirmCallback = this.confirmModifyTitleBackground;
      this.showMultipleColor();
    },
    modifyPageBackground() {
      this.hiddenAll();
      this.modifyingBackground = this.pageBackground;
      this.multiplyColorOptions = {
        title: "页面背景",
        moreOperate: true,
      };
      this.multiplyColorRealTimeCallback = (value) => {
        this.$bus.$emit("modifyAnimeHousePageBackground", value);
      };
      this.multiplyColorBoardConfirmCallback = this.confirmModifyPageBackground;
      this.showMultipleColor();
    },
    modifyPageForeground() {
      this.hiddenAll();
      this.modifyingBackground = this.pageForeground;
      this.multiplyColorOptions = {
        title: "页面前景",
        moreOperate: true,
      };
      this.multiplyColorRealTimeCallback = (value) => {
        this.$bus.$emit("modifyAnimeHousePageForeground", value);
      };
      this.multiplyColorBoardConfirmCallback = this.confirmModifyPageForeground;
      this.showMultipleColor();
    },
    modifyAnimeBorder() {
      this.hiddenAll();
      this.borderImageRealTimeCallback = this.confirmModifyCardBorderImage;
      this.showBorderImageBoard();
    },
    modifyCardBackground() {
      this.hiddenAll();
      this.modifyingBackground = this.cardBackground;
      this.multiplyColorOptions = {
        title: "卡片背景",
        moreOperate: true,
      };
      this.multiplyColorRealTimeCallback = (value) => {
        this.$store.commit("modifyCardBackground", {background: value});
      };
      this.multiplyColorBoardConfirmCallback = this.confirmModifyCardBackground;
      this.showMultipleColor();
    },
    // 调色板状态变化
    colorBoardChange() {
      this.colorInputChangeCallback && this.colorInputChangeCallback(this.colorInputValue);
    },
    confirmModifyTitleColor() {
      let data = {
        titleColor: this.colorInputValue,
      };
      let succeedCallback = () => {
        this.$bus.$emit("modifyAnimeHouseHeaderColor", this.colorInputValue);
      }
      this.modifyHuadiaoHouseInfoRequest(data, succeedCallback);
    },
    confirmModifyTitleBackground(background) {
      let data = {
        titleBackground: background,
      };
      this.modifyHuadiaoHouseInfoRequest(data);
    },
    confirmModifyPageBackground(background) {
      let data = {
        pageBackground: background,
      };
      this.gradientColorOrPicture(data);
    },
    confirmModifyPageForeground(background) {
      let data = {
        pageForeground: background,
      };
      this.gradientColorOrPicture(data);
    },
    confirmModifyCardBorderImage(borderImageIndex) {
      let data = {
        cardBorder: borderImageIndex,
      };
      let succeedCallback = () => {
        this.$store.commit("modifyCardBorderImage", {borderImageIndex});
      };
      this.modifyHuadiaoHouseInfoRequest(data, succeedCallback);
    },
    confirmModifyCardBackground(background) {
      let data = {
        cardBackground: background,
      };
      this.gradientColorOrPicture(data);
    },
    gradientColorOrPicture(data, succeedCallback) {
      let headers = {};
      let path;
      for(let key in data) {
        // 上传图片
        if(data[key] instanceof File) {
          if(!this.checkBackgroundPicture(data[key])) {
            return;
          }
          let formData = new FormData();
          formData.append("background", data[key]);
          formData.append("field", key);
          data = formData;
          headers = {
            "Content-Type": "multipart/form-data",
          };
          path = apis.huadiaoHouse.infoPictureModify;
        }
      }
      this.modifyHuadiaoHouseInfoRequest(data, succeedCallback, headers, path);
    },
    checkBackgroundPicture(file) {
      let size = file.size;
      // 2 << 20 为 2M 的字节数
      if(size > 2 << 20) {
        this.huadiaoMiddleTip("图片大小不能超过 2 M");
        return false;
      }
      return true;
    },
    modifyHuadiaoHouseInfoRequest(data, succeedCallback, headers, path = apis.huadiaoHouse.infoModify) {
      this.sendRequest({
        path,
        method: "post",
        headers,
        data,
        thenCallback: (response) => {
          let res = response.data;
          console.log(res);
          if(res.code === statusCode.SUCCEED) {
            succeedCallback && succeedCallback();
          }
        },
        errorCallback: (error) => {
          console.log(error);
        }
      })
    }
  },
  beforeDestroy() {
  }
}
</script>

<style scoped>
.anime-house-theme-board {
  position: absolute;
  z-index: 33;
  top: 0px;
  left: 0px;
  width: 250px;
  height: 100%;
  border-bottom-right-radius: 8px;
  border-top-right-radius: 8px;
  background-color: #fff;
  -webkit-user-select: none;
  transition: var(--transition-500ms);
}

.theme-board-header {
  width: 100%;
  height: 68px;
  line-height: 68px;
  text-align: center;
  border-bottom: 1px solid #47a8c4;
  font-weight: 600;
  font-size: 25px;
  letter-spacing: 5px;

  background-image: -webkit-linear-gradient(right, #f35626, #feab3a);
  /* 文字透明 */
  -webkit-text-fill-color: transparent;
  /* 文字外部裁剪 */
  -webkit-background-clip: text;
  animation: background 20s infinite;
}

@keyframes background {
  0% {
    -webkit-filter: hue-rotate(0deg);
  }

  100% {
    -webkit-filter: hue-rotate(-360deg);
  }
}

.theme-board-item:hover {
  background-color: rgb(243, 243, 243);
}

.theme-board-item {
  position: relative;
  height: 60px;
  --color: "";
}

.theme-board-item label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 20px 0 50px;
}

.theme-board-item .theme-board-item-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--color);
}

.theme-board-item span /deep/ svg {
  width: 20px;
  height: 20px;
  fill: var(--color);
  transform: rotate(-90deg);
}

#colorBoard {
  visibility: hidden;
  position: absolute;
  bottom: 0px;
  left: 7px;
  width: 0;
}
</style>