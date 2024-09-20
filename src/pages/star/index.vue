<template>
  <div class="huadiao-star" :style="packageBackgroundUrl(starBackground)">
    <huadiao-header/>
    <template v-if="visible">
      <star-img-animation/>
      <router-link class="note-star-btn" :to="`/star/${viewedUid}/note/-1`" title="打开笔记收藏" tag="div">
        <span v-html="svg.access"></span>
      </router-link>
      <router-link class="fanju-star-btn" :to="`/star/${viewedUid}/anime/-1`" title="打开番剧收藏" tag="div">
        <span v-html="svg.access"></span>
      </router-link>
      <div class="star-container">
        <!--目录-->
        <transition name="right-dash" mode="out-in">
          <keep-alive>
            <router-view name="catalogue"></router-view>
          </keep-alive>
        </transition>
        <!--内容-->
        <transition name="left-dash" mode="out-in">
          <keep-alive>
            <router-view name="starBoard"></router-view>
          </keep-alive>
        </transition>
      </div>
      <add-new-favorite-board/>
      <transfer-note-favorite/>
    </template>
    <huadiao-popup-window/>
    <huadiao-warning-top-container/>
    <huadiao-middle-tip/>
  </div>
</template>

<script>
import HuadiaoHeader from "@/pages/components/header/HuadiaoHeader";
import StarImgAnimation from "@/pages/star/components/StarImgAnimation";
import AddNewFavoriteBoard from "@/pages/star/components/AddNewFavoriteBoard";
import HuadiaoPopupWindow from "@/pages/components/popwindow/HuadiaoPopupWindow";
import HuadiaoWarningTopContainer from "@/pages/components/HuadiaoWarningTopContainer";
import HuadiaoMiddleTip from "@/pages/components/HuadiaoMiddleTip";
import TransferNoteFavorite from "@/pages/star/components/TransferNoteFavorite";
import {mapState} from "vuex";
import {svg} from "@/assets/js/constants/svgs";
import StarBackground from "@/assets/img/star/starBackground.webp";

export default {
  name: "HuadiaoStar",
  data() {
    return {
      svg: {
        access: svg.access,
      },
      visible: false,
    }
  },
  computed: {
    ...mapState(["viewedUid"]),
    starBackground() {
      return StarBackground;
    }
  },
  watch: {
    "$store.state.user": {
      deep: true,
      handler(newValue) {
        this.setMe(newValue.uid);
        this.visible = true;
      }
    }
  },
  created() {
    this.getViewedUid();
  },
  mounted() {
  },
  methods: {
    setMe(uid) {
      this.$store.commit("initialMe", {me: this.viewedUid === uid});
    },
    getViewedUid() {
      let viewedUid = +window.location.href.split(/\//)[4];
      this.$store.commit("initialViewedUid", {viewedUid});
    }
  },
  beforeDestroy() {
  },
  components: {
    TransferNoteFavorite,
    HuadiaoMiddleTip,
    HuadiaoWarningTopContainer,
    HuadiaoPopupWindow,
    AddNewFavoriteBoard,
    StarImgAnimation,
    HuadiaoHeader
  },
}
</script>

<style>
.note-star-btn svg,
.fanju-star-btn svg {
  width: 20px;
  height: 20px;
  fill: #fff;
}

.note-star-btn svg {
  transform: rotate(-90deg);
  margin: 14px 4px 0px 0px;
}

.fanju-star-btn svg {
  transform: rotate(90deg);
  margin: 0px 0px -20px 4px;
}
</style>

<style scoped>
.huadiao-star {
  position: relative;
  min-width: 1100px;
  min-height: 100vh;
  background: no-repeat center center fixed;
  background-size: cover;
  overflow: hidden;
  /* 华文楷体 */
  font-family: STKaiti, serif;
  --note-star-color: #4943d8;
}

.star-container {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 70px 0;
}

.note-star-btn,
.fanju-star-btn {
  position: fixed;
  z-index: 3;
  top: 50%;
  width: 100px;
  height: 50px;
  border-radius: 25px;
  box-shadow: var(--box-shadow-min);
  cursor: pointer;
}

.note-star-btn {
  left: 0px;
  transform: translate(-75px, -50%);
  background-color: #673AADFA;
  text-align: right;
}

.fanju-star-btn {
  right: 0px;
  text-align: left;
  transform: translate(75px, -50%);
  background-color: rgba(173, 58, 102, 0.98);
}

.note-star-btn:hover {
  animation: leftAndRight 0.5s;
  background-color: rgba(93, 52, 155, 0.98);
}

.fanju-star-btn:hover {
  animation: rightAndLeft 0.5s;
  background-color: rgba(154, 51, 91, 0.98);
}

/* 左右横跳一次 */
@keyframes leftAndRight {
  0% {
    transform: translate(-75px, -50%);
  }
  50% {
    transform: translate(-65px, -50%);
  }
  100% {
    transform: translate(-75px, -50%);
  }
}

/* 左右横跳一次 */
@keyframes rightAndLeft {
  0% {
    transform: translate(75px, -50%);
  }
  50% {
    transform: translate(65px, -50%);
  }
  100% {
    transform: translate(75px, -50%);
  }
}

.right-dash-enter-active {
  animation: rightDash 0.5s linear;
}

.right-dash-leave-active {
  transform: translateX(-200%);
  transition: var(--transition-500ms);
}

.left-dash-enter-active {
  animation: leftDash 0.5s linear;
}

.left-dash-leave-active {
  transform: translateX(200%);
  transition: var(--transition-500ms);
}

@keyframes rightDash {
  0% {
    transform: translateX(-200%);
  }
  60% {
    transform: translateX(0);
  }
  80% {
    transform: translateX(-10%);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes leftDash {
  0% {
    transform: translateX(200%);
  }
  60% {
    transform: translateX(0);
  }
  80% {
    transform: translateX(10%);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
