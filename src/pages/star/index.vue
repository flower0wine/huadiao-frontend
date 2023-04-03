<template>
  <div class="huadiao-star">
    <huadiao-header :isLogin="isLogin" :user="user"/>
    <star-img-animation/>
    <router-link class="note-star-btn" to="/star/note" title="打开笔记收藏" tag="div">
      <img src="/svg/access.svg" alt="">
    </router-link>
    <router-link class="fanju-star-btn" to="/star/fanju" title="打开番剧收藏" tag="div">
      <img src="/svg/access.svg" alt="">
    </router-link>
    <div class="star-container">
      <!--目录-->
      <transition name="right-dash" mode="out-in">
        <router-view name="catalogue"></router-view>
      </transition>
      <!--内容-->
      <transition name="left-dash" mode="out-in">
        <router-view name="starBoard"></router-view>
      </transition>
    </div>
    <add-new-favorite-board/>
    <transfer-note-favorite/>
    <huadiao-popup-window/>
    <huadiao-warning-top-container/>
    <huadiao-middle-tip/>
  </div>
</template>

<script>
import HuadiaoHeader from "@/pages/components/HuadiaoHeader";
import {mapState} from "vuex";
import StarImgAnimation from "@/pages/star/components/StarImgAnimation";
import AddNewFavoriteBoard from "@/pages/star/components/AddNewFavoriteBoard";
import HuadiaoPopupWindow from "@/pages/components/HuadiaoPopupWindow";
import HuadiaoWarningTopContainer from "@/pages/components/HuadiaoWarningTopContainer";
import HuadiaoMiddleTip from "@/pages/components/HuadiaoMiddleTip";
import TransferNoteFavorite from "@/pages/star/components/TransferNoteFavorite";
export default {
  name: "HuadiaoStar",
  data() {
    return {}
  },
  computed: {
    ...mapState(["isLogin", "user"]),
  },
  beforeMount() {
    this.$store.dispatch("accordingFavoriteIdDivide");
  },
  methods: {

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
.huadiao-star {
  position: relative;
  min-height: 100vh;
  background: url("~/public/img/star/starBackground.png") no-repeat center center fixed;
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

.note-star-btn img {
  width: 20px;
  transform: rotate(-90deg);
  margin: 14px 4px 0px 0px;
}

.fanju-star-btn img {
  width: 20px;
  transform: rotate(90deg);
  margin: 0px 0px -20px 4px;
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