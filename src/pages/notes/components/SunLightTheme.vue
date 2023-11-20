<template>
  <div class="mode-btn"
       :style="isShow.sun ? 'background-color: #D15F1D' : 'background-color: #166BEC'"
       @click="changeTheme"
  >
    <div class="sun-self"
         v-show="isShow.sun"
    >
      <div class="slider-sun">
        <div class="sun">
          <div class="solar-halo halo0" style="--halo:0"></div>
          <div class="solar-halo halo1" style="--halo:1"></div>
          <div class="solar-halo halo2" style="--halo:2"></div>
          <div class="solar-halo halo3" style="--halo:3"></div>
          <div class="solar-halo halo4" style="--halo:4"></div>
          <div class="solar-halo halo5" style="--halo:5"></div>
          <div class="solar-halo halo6" style="--halo:6"></div>
          <div class="solar-halo halo7" style="--halo:7"></div>
        </div>
      </div>
    </div>
    <div class="moon-self"
         v-show="!isShow.sun"
    >
      <div class="slider-moon">
        <div class="moon-eat"></div>
      </div>
      <div class="moon">
        <div class="lunar-halo" style="--lunar:0"></div>
        <div class="lunar-halo" style="--lunar:1"></div>
        <div class="lunar-halo" style="--lunar:2"></div>
      </div>
    </div>
    <transition :name="isShow.sun ? 'change-sun-theme' : 'change-light-theme'">
      <div class="change-theme-animation"
           :class="isShow.sun ? 'sun-change-theme-animation' : 'light-change-theme-animation'"
           v-show="isShow.changeAnimation"
      >
        <div class="white-cloud-one"></div>
        <div class="white-cloud-two"></div>
        <div class="white-cloud-three"></div>
        <div class="sky-element-container"
             :class="isShow.sun ? 'sun-sky-element-container' : 'light-sky-element-container'"
        >
          <div class="sun-moon-container"
               :class="isShow.sun ? 'light-moon-container-rotate' : 'sun-moon-container-rotate'"
          >
            <div class="sun-object"></div>
            <div class="moon-object">
              <div class="mark-moon"
                   :class="isShow.sun ? 'sun-mark-moon' : 'light-mark-moon'"
              ></div>
            </div>
          </div>
          <div class="wind-container">
            <div class="wind-one"></div>
            <div class="wind-two"></div>
            <div class="wind-three"></div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import {Timer} from "@/assets/js/utils";

export default {
  name: "SunLightTheme",
  props: ["changeThemeCallback"],
  data() {
    return {
      isShow: {
        // 默认为日光模式
        sun: true,
        changeAnimation: false,
      },
      timer: new Timer(),
    }
  },
  methods: {
    // 更换主题
    changeTheme() {
      this.isShow.sun = !this.isShow.sun;
      this.isShow.changeAnimation = true;
      this.modifyTheme();
      this.timer.timeout(() => {
        this.isShow.changeAnimation = false;
      }, 3000);
    },
    modifyTheme() {
      let classList = document.body.classList;
      let light = "light";
      let dark = "dark";
      if(classList.contains(light)) {
        classList.remove(light);
        classList.add(dark);
        this.changeThemeCallback && this.changeThemeCallback(dark);
      } else {
        classList.remove(dark);
        classList.add(light);
        this.changeThemeCallback && this.changeThemeCallback(light);
      }
    }
  },
  beforeDestroy() {
  }
}
</script>

<style scoped>

/* 模式更换按钮----轨道 */
.mode-btn {
  position: fixed;
  z-index: 30;
  bottom: 20px;
  right: 20px;
  width: 40px;
  height: 22px;
  border-radius: 11px;
  cursor: pointer;
}

/* 滑块 */
.slider-sun,
.slider-moon {
  position: absolute;
  top: 2px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: rgb(253, 234, 65);
}

/*太阳滑块*/
.slider-sun {
  left: 2px;
  animation: haloRotate 4s linear infinite;
}

/*月亮滑块*/
.slider-moon {
  left: 20px;
  overflow: hidden;
}

/* 太阳光晕 */
.solar-halo {
  position: absolute;
  width: 3px;
  height: 7px;
  background-color: rgb(235, 218, 67);
  transform: rotateZ(calc(45deg * (var(--halo))));
}

.halo0 {
  top: -9px;
  left: 7px;
}

.halo1 {
  top: -5px;
  left: 17px;
}

.halo2 {
  top: 5px;
  left: 22px;
}

.halo3 {
  top: 16px;
  left: 17px;
}

.halo4 {
  top: 20px;
  left: 7px;
}

.halo5 {
  top: 16px;
  left: -2px;
}

.halo6 {
  top: 5px;
  left: -7px;
}

.halo7 {
  top: -4px;
  left: -3px;
}

@keyframes haloRotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

/* 月食 */
.moon-eat {
  position: absolute;
  top: -3px;
  left: 7px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: rgb(22, 107, 236);
}

/* 月晕 */
.lunar-halo {
  position: absolute;
  top: 3px;
  right: 3px;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  box-shadow: 0 0 7px rgba(25, 116, 221, 0.69), 0 0 10px rgba(25, 116, 221, 0.562), 0 0 15px rgba(25, 117, 221, 0.432);
  filter: blur(2px);
  background-color: transparent;
  animation: lunarHalo 4.2s linear calc(2.1s * var(--lunar)) infinite;
}

/* 月晕动画 */
@keyframes lunarHalo {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(7);
    opacity: 0;
  }
}

.change-theme-animation {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100vh;
}

.sun-change-theme-animation {
  background-color: #faa23d;
}

.light-change-theme-animation {
  background-color: #3d56fa;
}

.change-sun-theme-enter {
  background-color: #3d56fa;
}

.change-sun-theme-enter-to,
.change-sun-theme-leave {
  background-color: #faa23d;
  opacity: 1;
}

.change-sun-theme-leave-to,
.change-light-theme-leave-to {
  opacity: 0;
}

.change-sun-theme-enter-active,
.change-light-theme-enter-active {
  transition: var(--transition-2000ms);
}

.change-sun-theme-leave-active,
.change-light-theme-leave-active {
  transition: var(--transition-1000ms);
}

.change-light-theme-enter {
  background-color: #faa23d;
}

.change-light-theme-enter-to,
.change-light-theme-leave {
  background-color: #3d56fa;
  opacity: 1;
}

.white-cloud-one {
  position: absolute;
  top: 200px;
  left: 200px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 0px 0px 3px 3px #fff, 45px -30px 3px 3px #fff, 65px 0px 3px 3px #fff, 99px -44px 3px 3px #fff, 129px -4px 3px 3px #fff;
}

.white-cloud-two {
  position: absolute;
  top: 110px;
  right: 530px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 0px 0px 3px 3px #fff, 45px -30px 3px 3px #fff, 65px 0px 3px 3px #fff, 99px -44px 3px 3px #fff, 129px -4px 3px 3px #fff;
}

.white-cloud-three {
  position: absolute;
  top: 280px;
  right: 230px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 0px 0px 3px 3px #fff, 45px -30px 3px 3px #fff, 65px 0px 3px 3px #fff, 99px -44px 3px 3px #fff, 129px -4px 3px 3px #fff;
}

.sky-element-container {
  position: absolute;
  top: 200px;
  left: 50%;
  transform: translateX(-50%);
  width: 700px;
  height: 300px;
  transition: var(--transition-3000ms);
  overflow: hidden;
}

.sun-sky-element-container {
  border-bottom: 2px solid #cc8532;
}

.light-sky-element-container {
  border-bottom: 2px solid #3146cc;
}

.change-sun-theme-enter .sky-element-container {
  border-bottom: 2px solid #3146cc;
}

.change-sun-theme-enter-to .sky-element-container {
  border-bottom: 2px solid #cc8532;
}

.change-light-theme-enter .sky-element-container {
  border-bottom: 2px solid #cc8532;
}

.change-light-theme-enter-to .sky-element-container {
  border-bottom: 2px solid #3146cc;
}

.sun-moon-container {
  position: absolute;
  top: 49px;
  left: 260px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 150px;
  height: 500px;
  transition: var(--transition-2000ms);
}

.light-moon-container-rotate {
  transform: rotate(0deg);
}

.change-sun-theme-enter .sun-moon-container {
  transform: rotate(-180deg);
}

.change-sun-theme-enter-to .sun-moon-container {
  transform: rotate(0deg);
}

.sun-moon-container-rotate {
  transform: rotate(180deg);
}

.change-light-theme-enter .sun-moon-container {
  transform: rotate(0deg);
}

.change-light-theme-enter-to .sun-moon-container {
  transform: rotate(180deg);
}

.sun-object {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: #fc3333;
  box-shadow: 0px 0px 3px 3px #fc3333;
}

.moon-object {
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: #fad742;
  box-shadow: 0px 0px 3px 3px #fad742;
}

.mark-moon {
  position: absolute;
  bottom: 7px;
  left: -5px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  transition: var(--transition-3000ms);
  animation: rotate 1s forwards;
}

.light-mark-moon {
  background-color: #3d56fa;
  box-shadow: 0px 0px 3px 3px #3d56fa;
}

.sun-mark-moon {
  background-color: #faa23d;
  box-shadow: 0px 0px 3px 3px #faa23d;
}

.change-sun-theme-enter .mark-moon {
  background-color: #3d56fa;
  box-shadow: 0px 0px 3px 3px #3d56fa;
}

.change-sun-theme-enter-to .mark-moon {
  background-color: #faa23d;
  box-shadow: 0px 0px 3px 3px #faa23d;
}

.wind-container {
  position: absolute;
  top: 82px;
  left: 40px;
  animation: windMove 2s forwards;
}

.wind-one,
.wind-two,
.wind-three {
  position: absolute;
  border: 3px solid #fff;
  border-top: 0;
  border-left: 0;
}

.wind-one {
  top: 24px;
  left: 29px;
  width: 100px;
  height: 40px;
  border-radius: 0px 40px 40px 0;
  animation: windQuake 2s 0.5s infinite;
}

.wind-two {
  top: 21px;
  left: 20px;
  width: 120px;
  height: 50px;
  border-radius: 0px 50px 50px 0;
  animation: windQuake 2s 0.6s infinite;
}

.wind-three {
  top: 17px;
  left: 11px;
  width: 140px;
  height: 60px;
  border-radius: 0px 60px 60px 0;
  animation: windQuake 2s 0.7s infinite;
}

@keyframes windQuake {
  0% {
    transform: translateX(0px);
  }
  50% {
    transform: translateX(20px);
  }
  100% {
    transform: translateX(0px);
  }
}

@keyframes windMove {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(250px);
  }
}
</style>