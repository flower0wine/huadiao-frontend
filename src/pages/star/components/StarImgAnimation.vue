<template>
  <div class="star-img-container">
    <img :src="giftBox"
         id="gift-box"
         ref="giftBox"
         alt="">
    <img :src="juanDai"
         id="juan-dai"
         ref="juanDai"
         alt=""
    >
    <img :src="leftStar"
         id="left-star"
         ref="leftStar"
         alt="">
    <img :src="rightStar"
         ref="rightStar"
         id="right-star"
         alt="">
  </div>
</template>

<script>
import {Timer} from "@/assets/js/utils";
import RightStar from "@/assets/img/star/rightStar.webp";
import LeftStar from "@/assets/img/star/leftStar.webp";
import JuanDai from "@/assets/img/star/juandai.webp";
import GiftBox from "@/assets/img/star/giftbox.webp";

export default {
  name: "StarImgAnimation",
  data() {
    return {
      timer: {
        leftStar: new Timer(),
        rightStar: new Timer(),
        juanDai: new Timer(),
        giftBox: new Timer(),
      }
    }
  },
  computed: {
    leftStar() {
      return LeftStar;
    },
    rightStar() {
      return RightStar;
    },
    juanDai() {
      return JuanDai;
    },
    giftBox() {
      return GiftBox;
    },
  },
  mounted() {
    this.addAnimationOnImg();
  },
  methods: {
    // 给页面元素添加动画
    addAnimationOnImg() {
      this.timer.juanDai.timeout(() => {
        this.$refs.juanDai.classList.add("fall-down-animation");
      }, 2000);
      this.timer.leftStar.timeout(() => {
        this.$refs.leftStar.classList.add("fall-down-animation");
      }, 2200);
      this.timer.rightStar.timeout(() => {
        this.$refs.rightStar.classList.add("fall-down-animation");
      }, 2400);
      this.timer.giftBox.timeout(() => {
        this.$refs.giftBox.classList.add("gift-box-animation");
      }, 2800);
    },
  },
  beforeDestroy() {
  }
}
</script>

<style scoped>
img {
  position: absolute;
}

#gift-box {
  right: 37px;
  bottom: -180px;
}

#juan-dai {
  right: 120px;
  top: -100px;
}

#left-star {
  right: 183px;
  top: -110px;
}

#right-star {
  right: 60px;
  top: -180px;
}


.gift-box-animation {
  animation: giftBox 2s forwards;
}

.fall-down-animation {
  animation: fallDown 1s forwards;
}

@keyframes giftBox {
  0% {
    transform: translateY(0);
  }
  70% {
    transform: translateY(-150px);
  }
  100% {
    transform: translateY(-240px);
  }
}

@keyframes fallDown {
  0% {
    transform: translateY(0);
  }
  10% {
    transform: translateY(100%);
  }
  20% {
    transform: translateY(65%);
  }
  30% {
    transform: translateY(100%);
  }
  40% {
    transform: translateY(75%);
  }
  50% {
    transform: translateY(100%);
  }
  60% {
    transform: translateY(83%);
  }
  70% {
    transform: translateY(100%);
  }
  80% {
    transform: translateY(92%);
  }
  90% {
    transform: translateY(100%);
  }
  95% {
    transform: translateY(98%);
  }
  100% {
    transform: translateY(99%);
  }
}
</style>