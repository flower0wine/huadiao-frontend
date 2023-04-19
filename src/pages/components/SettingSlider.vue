<template>
  <div class="setting-track"
       :style="trackBackground"
       :class="settings[settingName + 'Status'] ? 'click-setting-track' : ''"
       @click="!transitioning && clickSettingSlider(settingName)"
       ref="settingTrack"
  >
    <div class="setting-slider"
         :style="`background-color: ${config.defaultStyle.settingSliderBackground}`"
         @transitionstart="transitioning = true"
         @transitionend="transitioning = false"
         ref="settingSlider"
    ></div>
  </div>
</template>

<script>
export default {
  name: "SettingSlider",
  props: ["settingName", "settings", "clickSettingSlider"],
  data() {
    return {
      // 节流
      transitioning: false,
      config: {
        defaultStyle: {
          settingTrackBackground: "#A2A2A28E",
          settingSliderBackground: "#FFFFFFC4",
          clickSettingTrackBackground: "#FA29298E",
        }
      }
    }
  },
  computed: {
    // 轨道背景
    trackBackground() {
      return `--setting-track-background: ${this.config.defaultStyle.settingTrackBackground};
       --click-setting-track-background: ${this.config.defaultStyle.clickSettingTrackBackground}`;
    }
  },
  methods: {},
  beforeDestroy() {
    this.clearAllRefsEvents();
  }
}
</script>

<style scoped>

/* 滑块轨道 */
.setting-track {
  width: 30px;
  height: 16px;
  padding: 2px 0 0 2px;
  border-radius: 8px;
  cursor: pointer;
  background-color: var(--setting-track-background);
  --setting-track-background: "";
  --click-setting-track-background: "";
}

.setting-slider {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  transition: var(--transition-500ms);
}

/* 点击滑块后 */
.click-setting-track .setting-slider {
  transform: translateX(14px);
}

.click-setting-track {
  background-color: var(--click-setting-track-background);
}

</style>