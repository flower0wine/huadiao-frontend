<template>
  <div class="huadiao-account-settings">
    <div class="user-private-settings">
      <div class="setting-header">隐私设置</div>
      <div class="setting-list">
        <div class="setting-item"
             v-for="(item, index) in privateSettings"
             :key="index"
        >
          <span>{{item.description}}</span>
          <div class="setting-track"
               :ref="item.name"
               :class="userSettings[item.name + 'Status'] === '1' ? 'click-setting-track' : ''"
               @click="clickSettingItem(item.name)"
          >
            <div class="setting-slider"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="user-message-settings">
      <div class="setting-header">消息设置</div>
      <div class="setting-list">
        <div class="setting-item"
             v-for="(item, index) in messageSettings"
             :key="index"
        >
          <span>{{item.description}}</span>
          <div class="setting-track"
               :ref="item.name"
               :class="userSettings[item.name + 'Status'] === '1' ? 'click-setting-track' : ''"
               @click="clickSettingItem(item.name)"
          >
            <div class="setting-slider"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HuadiaoAccountSettings",
  data() {
    return {
      // 隐私设置
      privateSettings: [{
        name: "publicStar",
        description: "公开我的收藏",
      }, {
        name: "publicBorn",
        description: "公开我的生日",
      }, {
        name: "publicFanju",
        description: "公开我的番剧",
      }, {
        name: "publicSchool",
        description: "公开学校信息",
      }, {
        name: "publicFollow",
        description: "公开我的关注",
      }, {
        name: "publicCanvases",
        description: "公开个人介绍",
      }, {
        name: "publicHomepage",
        description: "公开我的主页",
      }],
      // 消息设置
      messageSettings: [{
        name: "messageRemind",
        description: "消息提醒",
      }, {
        name: "messageReply",
        description: "回复消息提醒",
      }, {
        name: "messageLike",
        description: "点赞消息提醒",
      }],
      userSettings: {
        messageLikeStatus: "1",
        messageRemindStatus: "1",
        messageReplyStatus: "1",
        publicBornStatus: "0",
        publicCanvasesStatus: "0",
        publicFanjuStatus: "0",
        publicFollowStatus: "1",
        publicHomepageStatus: "1",
        publicSchoolStatus: "1",
        publicStarStatus: "0",
        uid: "1",
        userId: "huadiao_012345678910",
      }
    }
  },
  methods: {
    // 点击滑块
    clickSettingItem(ref) {
      this.userSettings[ref + "Status"] = this.userSettings[ref + "Status"] === "1" ? "0" : "1";
    }
  },
  beforeDestroy() {
    this.clearAllRefsEvents();
  }
}
</script>

<style scoped>
.huadiao-account-settings {
  width: 1000px;
  height: 800px;
  margin: 0 auto;
  padding: 40px 80px;
  border-radius: 8px;
  backdrop-filter: blur(1px);
  color: #676767;
  background-color: #FFFFFF94;
  box-shadow: var(--box-shadow-min);
  transition: var(--transition-500ms);
}

.setting-header {
  color: #676767;
  font-size: 20px;
  font-weight: 700;
}

.setting-list {
  padding: 20px 40px;
  clear: both;
}

.setting-item {
  float: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  padding-right: 150px;
  width: 50%;
}

/* 滑块轨道 */
.setting-track {
  width: 30px;
  height: 16px;
  padding: 2px 0 0 2px;
  border-radius: 8px;
  background-color: rgba(162, 162, 162, 0.56);
  cursor: pointer;
}

.setting-slider {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.77);
  transition: var(--transition-500ms);
}

/* 点击滑块后 */
.click-setting-track .setting-slider {
  transform: translateX(14px);
}

.click-setting-track {
  background-color: rgba(250, 41, 41, 0.56);
}

.user-private-settings {
  /* 由于 clear: both 等无效, 故使用 overflow: hidden 清除浮动 */
  overflow: hidden;
}

.user-message-settings {
  margin-top: 40px;
  /* 由于 clear: both 等无效, 故使用 overflow: hidden 清除浮动 */
  overflow: hidden;
}
</style>