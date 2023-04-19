<template>
  <div class="message-settings-board">
    <div v-for="(item, index) in config.messageSettings"
         class="settings"
         :key="index">
      <div class="setting-item" v-for="(messageSetting, messageIndex) in item" :key="messageIndex">
        <div class="setting-header">
          <span class="setting-title">{{ messageSetting.description }}</span>
          <span class="setting-tip">{{ messageSetting.tip }}</span>
        </div>
        <div class="setting-btn">
          <setting-slider :settingName="messageSetting.name"
                          :settings="messageSettings"
                          :clickSettingSlider="clickSettingItem"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SettingSlider from "@/pages/components/SettingSlider";

export default {
  name: "MessageSettingsBoard",
  components: {SettingSlider},
  data() {
    return {
      config: {
        messageSettings: [[{
          name: "messageRemind",
          description: "消息提醒",
          tip: "(关闭后将不接收任何消息)",
        }], [{
          name: "messageReply",
          description: "回复消息提醒",
          tip: "(关闭后不再接收他人回复)",
        }, {
          name: "messageLike",
          description: "点赞消息提醒",
          tip: "(关闭后不再接收点赞提醒)",
        }], [{
          name: "unfollowFold",
          description: "未关注的人消息折叠",
          tip: "(关闭后将与关注的人消息展示在一起)",
        }]],
      },
    }
  },
  computed: {
    messageSettings() {
      return this.$store.state.message.messageSettings;
    },
  },
  methods: {
    // 点击滑块
    clickSettingItem(settingName) {
      this.messageSettings[settingName + "Status"] = !this.messageSettings[settingName + "Status"];
    }
  },
  beforeDestroy() {
  }
}
</script>

<style scoped>
.message-settings-board {
  padding: 0 10px;
}

.message-settings-board > div {
  width: 100%;
  padding: 15px;
  border-radius: 6px;
  background-color: #fff;
}

.settings {
  margin: 10px 0;
}

.setting-item:nth-child(n + 2) {
  margin-top: 20px;
}

.setting-header {
  margin-bottom: 6px;
}

.setting-title {
  font-size: 14px;
}

.setting-tip {
  margin-left: 10px;
  font-size: 14px;
  color: #969696;
}

.setting-btn {
  margin-left: 10px;
}
</style>