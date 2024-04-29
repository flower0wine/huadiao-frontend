<template>
  <div class="error-404">
    <div class="error-container">
      <span class="four"><span class="screen-reader-text">4</span></span>
      <span class="zero"><span class="screen-reader-text">0</span></span>
      <span class="four"><span class="screen-reader-text">4</span></span>
    </div>
    <div class="tip">很抱歉，您请求的页面并不存在或被删除</div>
  </div>
</template>

<script>
export default {
  name: "ClientError404",
  data() {
    return {}
  },
  methods: {},
  beforeDestroy() {
  }
}
</script>

<style scoped>
.error-404 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.tip {
  font-family: "幼圆", "sans-serif";
  font-size: 20px;
  text-align: center;
  margin-top: 60px;
}

.error-container {
  text-align: center;
  font-size: 106px;
  font-weight: 800;
}
.error-container > span {
  display: inline-block;
  position: relative;
  margin-inline: 10px;
}
.error-container > span.four {
  width: 136px;
  height: 43px;
  border-radius: 999px;
  background:
      linear-gradient(140deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.07) 43%, transparent 44%, transparent 100%),
      linear-gradient(105deg, transparent 0%, transparent 40%, rgba(0, 0, 0, 0.06) 41%, rgba(0, 0, 0, 0.07) 76%, transparent 77%, transparent 100%),
      linear-gradient(to right, #d89ca4, #e27b7e);
}
.error-container > span.four:before,
.error-container > span.four:after {
  content: '';
  display: block;
  position: absolute;
  border-radius: 999px;
}
.error-container > span.four:before {
  width: 43px;
  height: 156px;
  left: 60px;
  bottom: -43px;
  background:
      linear-gradient(128deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.07) 40%, transparent 41%, transparent 100%),
      linear-gradient(116deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.07) 50%, transparent 51%, transparent 100%),
      linear-gradient(to top, #99749D, #B895AB, #CC9AA6, #D7969E, #E0787F);
}
.error-container > span.four:after {
  width: 137px;
  height: 43px;
  transform: rotate(-49.5deg);
  left: -18px;
  bottom: 36px;
  background: linear-gradient(to right, #99749D, #B895AB, #CC9AA6, #D7969E, #E0787F);
}

.error-container > span.zero {
  vertical-align: text-top;
  width: 156px;
  height: 156px;
  border-radius: 999px;
  background: linear-gradient(-45deg, transparent 0%, rgba(0, 0, 0, 0.06) 50%,  transparent 51%, transparent 100%),
  linear-gradient(to top right, #99749D, #99749D, #B895AB, #CC9AA6, #D7969E, #ED8687, #ED8687);
  overflow: hidden;
  animation: bgshadow 5s infinite;
}
.error-container > span.zero:before {
  content: '';
  display: block;
  position: absolute;
  transform: rotate(45deg);
  width: 90px;
  height: 90px;
  left: 0px;
  bottom: 0px;
  background:
      linear-gradient(95deg, transparent 0%, transparent 8%, rgba(0, 0, 0, 0.07) 9%, transparent 50%, transparent 100%),
      linear-gradient(85deg, transparent 0%, transparent 19%, rgba(0, 0, 0, 0.05) 20%, rgba(0, 0, 0, 0.07) 91%, transparent 92%, transparent 100%);
}
.error-container > span.zero:after {
  content: '';
  display: block;
  position: absolute;
  border-radius: 999px;
  width: 70px;
  height: 70px;
  left: 43px;
  bottom: 43px;
  background: #FDFAF5;
  box-shadow: -2px 2px 2px 0px rgba(0, 0, 0, 0.1);
}

.screen-reader-text {
  position: absolute;
  top: -9999px;
  left: -9999px;
}

@keyframes bgshadow {
  0% {
    box-shadow: inset -160px 160px 0px 5px rgba(0, 0, 0, 0.4);
  }
  45% {
    box-shadow: inset 0px 0px 0px 0px rgba(0, 0, 0, 0.1);
  }
  55% {
    box-shadow: inset 0px 0px 0px 0px rgba(0, 0, 0, 0.1);
  }
  100% {
    box-shadow: inset 160px -160px 0px 5px rgba(0, 0, 0, 0.4);
  }
}
</style>