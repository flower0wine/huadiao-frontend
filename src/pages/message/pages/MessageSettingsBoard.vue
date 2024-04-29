<template>
  <div class="message-settings-board">
    <div v-for="(config, index) in config.messageSettings"
         class="settings"
         :key="index">
      <div class="setting-item" v-for="(setting, index) in config" :key="index">
        <div class="setting-header">
          <span class="setting-title">{{ setting.description }}</span>
          <span class="setting-tip">{{ setting.tip }}</span>
        </div>
        <div class="setting-btn">
          <setting-slider :settingName="setting.name"
                          :settings="messageSettings"
                          :clickSettingSlider="clickSettingItem"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SettingSlider from "@/pages/components/SettingSlider";
import {apis} from "@/assets/js/constants/request-path";
import {statusCode} from "@/assets/js/constants/status-code";

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
  created() {
    this.getMessageSettings();
  },
  methods: {
    getMessageSettings() {
      this.sendRequest({
        path: apis.setting.messageGet,
      }).then((response) => {
        let res = response.data;
        console.log(res);
        if (res.code === statusCode.SUCCEED) {
          this.$store.commit("initialMessageSetting", {messageSettings: res.data});
        }
      }).catch((error) => {
        console.log(error);
      })
    },
    // 点击滑块
    clickSettingItem(settingName) {
      let setting = settingName + "Status";
      this.requestChaneMessageSettings(setting);
    },
    // 请求改变设置
    requestChaneMessageSettings(setting) {
      this.sendRequest({
        path: apis.setting.modify,
        method: "post",
        data: {
          [setting]: setting,
        }
      }).then((response) => {
        let res = response.data;
        console.log(res);
        if (res.code === statusCode.SUCCEED) {
          this.messageSettings[setting] = !this.messageSettings[setting];
        }
      }).catch((error) => {
        console.log(error);
      })
    },
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