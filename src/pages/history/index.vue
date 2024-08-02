<template>
  <div class="huadiao-build-note">
    <huadiao-header :huadiao-header-style="huadiaoHeaderStyle"/>
    <div class="history-header" ref="historyHeader">
      <img :src="historyBackground" alt="">
    </div>
    <div class="history-history-board">
      <img :src="history" alt="">
    </div>
    <div class="history-guidepost">
      <img :src="indicator" alt="">
      <router-link to="/history/note"
                   tag="div"
                   active-class="history-link"
                   class="note-history-link"
      >笔记
      </router-link>
      <router-link to="/history/anime"
                   tag="div"
                   active-class="history-link"
                   class="fanju-history-link"
      >番剧
      </router-link>
    </div>
    <history-tools ref="historyTools"/>
    <transition name="fade" mode="out-in">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
    <huadiao-warning-top-container/>
    <huadiao-middle-tip/>
    <huadiao-popup-window/>
  </div>
</template>

<script>
import HuadiaoHeader from "@/pages/components/HuadiaoHeader";
import HistoryTools from "@/pages/history/components/HistoryTools";
import HuadiaoWarningTopContainer from "@/pages/components/HuadiaoWarningTopContainer";
import HuadiaoMiddleTip from "@/pages/components/HuadiaoMiddleTip";
import HuadiaoPopupWindow from "@/pages/components/HuadiaoPopupWindow";
import {Timer} from "@/assets/js/utils";
import HistoryBackground from "@/assets/img/history/historyBackground.webp";
import History from "@/assets/img/history/history.webp";
import Indicator from "@/assets/img/history/indicator.webp";

export default {
  name: "HuadiaoHistory",
  data() {
    return {
      timer: new Timer(),
      observer: null,
      huadiaoHeaderStyle: {
        backgroundColor: null,
      },
    }
  },
  mounted() {
    this.initial();
  },
  computed: {
    historyBackground() {
      return HistoryBackground;
    },
    history() {
      return History;
    },
    indicator() {
      return Indicator;
    }
  },
  methods: {
    initial() {
      this.observeHistoryHeader();
    },
    observeHistoryHeader() {
      this.observer = new IntersectionObserver((entries) => {
        let entry = entries[0];
        if(entry.isIntersecting) {
          this.$bus.$emit("modifyHuadiaoHeaderStyle", {
            backgroundColor: "transparent",
            entryColor: "#fff",
            shadow: false,
          });
        } else {
          this.$bus.$emit("modifyHuadiaoHeaderStyle", {
            backgroundColor: "#ffffff",
            entryColor: "#e17474",
            shadow: true,
          });
        }
      });
      this.observer.observe(this.$refs.historyHeader);
    },
  },
  beforeDestroy() {
  },
  components: {
    HuadiaoPopupWindow,
    HuadiaoMiddleTip,
    HuadiaoWarningTopContainer,
    HistoryTools,
    HuadiaoHeader
  },
}
</script>

<style>
/* 加载完成文字 */
.simple-loading .loaded-text {
  font-size: 14px;
  text-align: center;
  letter-spacing: 1px;
  color: #a9a9a9;
}
</style>

<style scoped>
.huadiao-build-note {
  min-height: 600px;
}

.note-history-link,
.fanju-history-link {
  position: absolute;
  width: 120px;
  text-align: center;
  font-size: 14px;
  color: #737171;
  cursor: pointer;
}

.note-history-link:hover,
.fanju-history-link:hover {
  color: #919090;
}

.note-history-link {
  top: -170px;
  left: 41px;
  transform: rotate(-3deg);
}

.fanju-history-link {
  top: -140px;
  left: 37px;
}

.history-link {
  font-weight: 700;
}

.history-header {
  display: flex;
  justify-content: center;
  min-width: 1200px;
  height: 147px;
  /* 该元素覆盖父元素 */
  object-fit: cover;
}

.history-header img {
  display: block;
  width: 100%;
  height: 100%;
  /* 继承 */
  object-fit: inherit;
}

.history-history-board {
  position: absolute;
  z-index: 1;
  top: 200px;
  left: 0px;
}

.history-guidepost {
  position: fixed;
  z-index: 1;
  left: -20px;
  bottom: -10px;
  width: 208px;
}

.history-guidepost img {
  position: absolute;
  left: 0px;
  bottom: 0px;
  width: 208px;
}

@media screen and (max-width: 1400px) {
  .history-guidepost,
  .history-history-board {
    display: none;
  }
}
</style>