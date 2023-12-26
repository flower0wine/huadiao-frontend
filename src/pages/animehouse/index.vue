<template>
  <div class="huadiao-house-container"
       @wheel="mousewheelEvent">
    <div class="scroller" v-if="getDataCompleted">
      <anime-house-slide/>
      <huadiao-house-anime v-if="visible.animeHouse.render"/>
      <div class="huadiao-house-header">
        <div class="header-transform" ref="headerTransform">
          <huadiao-header :huadiaoHeaderStyle="huadiaoHeaderConfig"
                          :mouseenterAvatarCallback="mouseenterAvatar"/>
          <div class="anime-header"
               :style="animeHeaderStyle">番剧收藏馆</div>
        </div>
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
import HuadiaoPopupWindow, {huadiaoPopupWindowOptions} from "@/pages/components/HuadiaoPopupWindow";
import {apis} from "@/assets/js/constants/request-path";
import {statusCode} from "@/assets/js/constants/status-code";

let wheelUpClassName = "wheel-up";
let wheelDownClassName = "wheel-down";

export default {
  name: "HuadiaoHouse",
  data() {
    return {
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
          else if(res.code === statusCode.notAllowed) {
            this.huadiaoPopupWindow(huadiaoPopupWindowOptions.iconType.error, huadiaoPopupWindowOptions.operate.hasRead, "用户不公开番剧馆");
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
      let headerTransform = this.$refs.headerTransform;
      if (e.wheelDelta > 0) {
        headerTransform.classList.add(wheelUpClassName);
        headerTransform.classList.remove(wheelDownClassName);
      } else {
        headerTransform.classList.add(wheelDownClassName);
        headerTransform.classList.remove(wheelUpClassName);
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
  scroll-snap-type: y mandatory;
}

.huadiao-house-header .huadiao-header {
  position: relative;
}
</style>
<style scoped lang="scss">
$headerHeight: 61px;

.huadiao-house-header {
  position: fixed;
  top: 0px;
  z-index: 10;
  width: 100%;
  height: $headerHeight;
  box-shadow: var(--box-shadow-min);
  overflow: hidden;
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
  line-height: $headerHeight + 1;
}

.header-transform {
  height: $headerHeight;
  transition: transform 500ms;
}

.wheel-up {
  transform: translateY(0);
}

.wheel-down {
  transform: translateY(-$headerHeight);
}
</style>