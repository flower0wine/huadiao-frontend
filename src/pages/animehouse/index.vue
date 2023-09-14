<template>
  <div class="huadiao-house-container"
       @wheel="mousewheelEvent" v-if="getDataCompleted">
    <div v-huadiao-full-page class="scroller">
      <anime-house-slide/>
      <huadiao-house-anime v-if="visible.animeHouse.render"/>
      <div class="huadiao-house-header" :style="huadiaoHouseStyle">
        <transition-group :name="transitionName">
          <huadiao-header :huadiaoHeaderStyle="huadiaoHeaderConfig"
                          key="indexHeader"
                          :mouseenterAvatarCallback="mouseenterAvatar"
                          v-show="visible.header.show"/>
          <div class="anime-header"
               key="animeHeader"
               :style="animeHeaderStyle"
               v-show="!visible.header.show">番剧收藏馆</div>
        </transition-group>
      </div>
    </div>
    <huadiao-middle-tip/>
    <huadiao-popup-window/>
    <huadiao-warning-top-container/>
  </div>
</template>

<script>
import {mapState} from "vuex";
import HuadiaoHeader from "@/pages/components/HuadiaoHeader";
import AnimeHouseSlide from "@/pages/animehouse/components/AnimeHouseSlide";
import HuadiaoHouseAnime from "@/pages/animehouse/components/HuadiaoHouseAnime";
import HuadiaoWarningTopContainer from "@/pages/components/HuadiaoWarningTopContainer";
import HuadiaoMiddleTip from "@/pages/components/HuadiaoMiddleTip";
import HuadiaoPopupWindow from "@/pages/components/HuadiaoPopupWindow";
import {apis} from "@/assets/js/constants/request-path";
import {statusCode} from "@/assets/js/constants/status-code";

export default {
  name: "HuadiaoHouse",
  data() {
    return {
      transitionName: "top-slide",
      huadiaoHouseStyle: "",
      visible: {
        header: {
          show: true,
        },
        animeHouse: {
          render: false,
        }
      },
      huadiaoHeaderConfig: {
        blur: true
      },
    }
  },
  computed: {
    ...mapState({
      animeHeaderStyle(state) {
        let background = this.backgroundTransform(state.huadiaoHouseInfo.titleBackground);
        return `color: ${state.huadiaoHouseInfo.titleColor};
              ${background}`;
      }
    }),
  },
  beforeCreate() {
    // 刷新后滚动条回到顶部, 不记录位置
    if (history.scrollRestoration) {
      history.scrollRestoration = 'manual';
    }
  },
  created() {
    this.getHuadiaoHouseInfo();
    this.getCardBorderImage();
  },
  mounted() {
  },
  methods: {
    initial() {
      // 修改标题颜色
      this.$bus.$on("modifyAnimeHouseHeaderColor", (value) => {
        this.$store.commit("modifyTitleColor", {color: value});
      });
      // 修改标题背景
      this.$bus.$on("modifyAnimeHouseHeaderBackground", (value) => {
        this.$store.commit("modifyTitleBackground", {background: value});
      });
    },
    // 获取番剧页面信息
    getHuadiaoHouseInfo() {
      this.sendRequest({
        path: apis.huadiaoHouse.info,
        params: {
          uid: this.$route.params.viewedUid,
        },
        thenCallback: (response) => {
          let res = response.data;
          console.log(res);
          if(res.code === statusCode.succeed) {
            this.$store.commit("initialHuadiaoHouseInfo", {huadiaoHouseInfo: res.data});
            this.getDataCompleted = true;
            this.initial();
          }
        },
        errorCallback: (error) => {
          console.log(error);
        }
      })
    },
    // 获取边框信息
    getCardBorderImage() {
      this.sendRequest({
        path: apis.huadiaoHouse.cardBorderImage,
        thenCallback: (response) => {
          let res = response.data;
          console.log(res);
          if(res.code === statusCode.succeed) {
            this.$store.commit("initialCardBorderImage", {cardBorderImage: res.data});
            this.visible.animeHouse.render = true;
          }
        },
        errorCallback: (error) => {
          console.log(error);
        }
      })
    },
    mousewheelEvent(e) {
      this.huadiaoHouseStyle = "overflow: hidden";
      if (e.wheelDelta > 0) {
        this.visible.header.show = true;
        this.transitionName = "bottom-slide";
      } else {
        this.visible.header.show = false;
        this.transitionName = "top-slide";
      }
    },
    mouseenterAvatar() {
      this.huadiaoHouseStyle = `overflow: visible`;
    },
  },
  beforeDestroy() {
  },
  components: {
    HuadiaoPopupWindow,
    HuadiaoMiddleTip,
    HuadiaoWarningTopContainer,
    HuadiaoHouseAnime,
    AnimeHouseSlide,
    HuadiaoHeader
  },
}
</script>
<style>
html {
  overflow-x: hidden;
}

.huadiao-house-header .huadiao-header {
  position: relative;
}
</style>
<style scoped>
.huadiao-house-header {
  position: fixed;
  top: 0px;
  z-index: 10;
  width: 100%;
  height: 61px;
  box-shadow: var(--box-shadow-min);
}

.swiper-container {
  position: relative;
  width: 100%;
  padding: 1.77vh 2.5rem 5.903vh;
  margin: 0 auto;
  --swiper-theme-color: #dfdfdfa2;
}

.anime-header {
  width: 100%;
  height: 100%;
  font-size: 24px;
  text-align: center;
  line-height: 62px;
}

/*元素本体上滑*/
.top-slide-enter {
  margin-top: 62px;
}

.top-slide-enter-to,
.top-slide-leave {
  margin-top: 0;
}

.top-slide-leave-to {
  margin-top: -62px;
}

.top-slide-enter-active,
.top-slide-leave-active {
  transition: var(--transition-500ms);
}

/*元素本体上滑*/
.bottom-slide-enter {
  margin-top: -62px;
}

.bottom-slide-enter-to,
.bottom-slide-leave {
  margin-top: 0;
}

.bottom-slide-leave-to {
  margin-top: 62px;
}

.bottom-slide-enter-active,
.bottom-slide-leave-active {
  transition: var(--transition-500ms);
}
</style>