<template>
  <div class="huadiao-build-note">
    <huadiao-header :user="user" :isLogin="isLogin"/>
    <div class="history-header">
      <img src="/img/history/historyBackground.png" alt="">
    </div>
    <div class="history-history-board">
      <img src="/img/history/history.png" alt="">
    </div>
    <div class="history-guidepost">
      <img src="/img/history/indicator.png" alt="">
      <router-link to="/history/note"
                   tag="div"
                   active-class="history-link"
                   class="note-history-link"
      >笔记
      </router-link>
      <router-link to="/history/fanju"
                   tag="div"
                   active-class="history-link"
                   class="fanju-history-link"
      >番剧
      </router-link>
    </div>
    <history-tools ref="historyTools"/>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
    <huadiao-warning-top-container/>
    <huadiao-middle-tip/>
    <huadiao-popup-window/>
  </div>
</template>

<script>
import {mapState} from "vuex";
import HuadiaoHeader from "@/pages/components/HuadiaoHeader";
import HistoryTools from "@/pages/history/components/HistoryTools";
import HuadiaoWarningTopContainer from "@/pages/components/HuadiaoWarningTopContainer";
import HuadiaoMiddleTip from "@/pages/components/HuadiaoMiddleTip";
import HuadiaoPopupWindow from "@/pages/components/HuadiaoPopupWindow";

export default {
  name: "HuadiaoHistory",
  data() {
    return {

    }
  },
  computed: {
    ...mapState(["isLogin", "user"]),
  },
  mounted() {
    this.clickToHidden();
  },
  methods: {
    // 点击隐藏
    clickToHidden() {
      window.addEventListener("click", (e) => {
        if(!this.$refs.historyTools.$refs.historyTitleContainer.contains(e.target)) {
          this.$refs.historyTools.isShow.choiceHistoryBoard = false;
        }
      });
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