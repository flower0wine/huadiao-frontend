<template>
  <div class="huadiao-house-slide">
    <div class="swiper-slide-background"></div>
    <swiper ref="swiper" :options="swiperOption">
      <swiper-slide v-for="(item, index) of slides"
                    :key="item.animeId">
        <div class="slide-content" :style="nativeUrlReject(item.cover)">{{item.word}}</div>
      </swiper-slide>
      <swiper-slide v-if="slides.length === 0">
        <div class="slide-content">快把你喜欢的番剧记录下来吧！打造属于你的番剧馆！</div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import 'swiper/css/swiper.css';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import {mapState} from "vuex";

export default {
  name: "AnimeHouseSlide",
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      swiperOption: {
        loop: true,
        speed: 2500,
        slidesPerView: 1.5,
        spaceBetween: 0,
        centeredSlides: true,
        watchSlidesProgress: true,
        autoplay: {
          delay: 3000,
          // 用户操作轮播图后是否停止自动播放，默认为 true
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true
        },
        on: {
          resize: this.resize,
          touchEnd: this.changeSlideBackground,
          setTranslate: this.setTranslate,
          slideChangeTransitionStart: this.changeSlideBackground,
        }
      },
    }
  },
  computed: {
    ...mapState({
      slides(state) {
        return state.huadiaoHouseInfo.animeList;
      }
    }),
  },
  created() {
    this.initialSwiper();
  },
  methods: {
    initialSwiper() {
      let $ = this.$;
      if(this.slides.length === 1) {
        this.swiperOption.loop = false;
        this.$nextTick(() => {
          $(".swiper-slide-background").css('background-image', $('.swiper-slide-active div').css('background-image'));
        });
      }
      else if(this.slides.length === 0) {
        this.swiperOption.loop = false;
      }
    },
    changeSlideBackground() {
      let $ = this.$;
      $(".swiper-slide-background").stop().animate({
        opacity: 0.3
      }, 1250, function () {
        // 页面背景换成正中间的 slide 的背景
        $(this).css('background-image', $('.swiper-slide-active div').css('background-image')).stop().animate({
          opacity: 1
        }, 1250);
      });
    },
    setTranslate() {
      let slides = this.$refs.swiper.$el.swiper.slides;
      for (let i = 0; i < slides.length; i++) {
        let slide = slides.eq(i);
        let progress = slides[i].progress;
        slide.transform('');

        if (Math.abs(progress.toFixed(2)) === 0.00) {
          slide[0].style.transition = "all 1250ms";
          slide.transform('scale(' + 1 + ')');
        } else {
          // 如果是其他位置的图片就缩小
          slide.transform('scale(' + 0.8 + ')');
        }

        if (Math.abs(progress.toFixed(2)) === 0.00) {
          // 这里添加和删除类名来实现 transform 缩放动画
          this.$(slide).addClass('expand').removeClass('zoom');
        } else {
          this.$(slide).addClass('zoom').removeClass('expand');
        }
      }
    },
    resize() {
      let slides = this.$refs.swiper.$el.swiper.slides;
      for (let i = 0; i < slides.length; i++) {
        let slide = slides.eq(i);
        slide[0].style.transition = "";
      }
    }
  },
  beforeDestroy() {
  }
}
</script>

<style>
.swiper-container.swiper-container {
  width: 100%;
  height: 100%;
  padding: 85px 80px 0;
}

.swiper-slide {
  width: 88%;
  height: 90%;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 14px 14px rgba(0, 0, 0, 0.096);
  overflow: hidden;
}
</style>

<style scoped>
.huadiao-house-slide {
  width: 100%;
  height: max(100vh, 600px);
  background-color: #000;
}

.swiper-slide-background {
  position: absolute;
  width: 100vw;
  height: max(100vh, 600px);
  background: -webkit-linear-gradient(bottom, #44a7fd, #00f2fe) no-repeat center/cover;
}

.slide-content {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 25px;
  font-family: STKaiti,serif;
  background: no-repeat center/cover;
}

/* 扩大 */
.expand {
  animation: expand 2.5s;
}

/* 缩放 */
.zoom {
  animation: zoom 2.5s;
}

@keyframes expand {
  0% {
    transform: scale(0.8);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes zoom {
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(0.8);
  }
}


</style>