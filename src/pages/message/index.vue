<template>
  <div class="huadiao-message">
    <huadiao-header :user="user" :isLogin="isLogin" :huadiaoHeaderStyle="huadiaoHeaderStyle"/>
    <div class="message-board">
      <message-navigation-board/>
      <div class="message-content-board">
        <div class="content-title">
          <template v-if="backNavigation[$route.name]">
            <router-link :to="{name: backNavigation[$route.name].name}">{{ backNavigation[$route.name].content }}
            </router-link>
            <span> > </span>
          </template>
          <span>{{ navigator[$route.name] }}</span>
        </div>
        <div class="router-view">
          <transition name="top-show" mode="out-in">
            <router-view></router-view>
          </transition>
        </div>
      </div>
    </div>
    <huadiao-popup-window/>
    <huadiao-warning-top-container/>
    <huadiao-middle-tip/>
  </div>
</template>

<script>
import {mapState} from "vuex";
import HuadiaoHeader from "@/pages/components/HuadiaoHeader";
import HuadiaoPopupWindow from "@/pages/components/HuadiaoPopupWindow";
import HuadiaoWarningTopContainer from "@/pages/components/HuadiaoWarningTopContainer";
import HuadiaoMiddleTip from "@/pages/components/HuadiaoMiddleTip";
import MessageNavigationBoard from "@/pages/message/components/MessageNavigationBoard";

export default {
  name: "HuadiaoMessage",
  data() {
    return {
      huadiaoHeaderStyle: {
        blur: true,
        shadow: true,
        backgroundColor: "#FFFFFFB3",
        // 右侧入口颜色
        entryColor: "rgb(97 97 97)",
        // 输入框颜色
        inputTheme: {
          searchIconColor: "#fff",
          textColor: "rgb(120 120 120)",
          inputBackgroundColor: "rgba(199, 199, 199, 0.64)",
          searchBackgroundColor: "rgba(201, 201, 201, 0.54)",
        },
        // 登录面板
        loggedBoardStyle: {
          borderColor: "#C9C9C9C1",
          textColor: "#ffffff",
          accessColor: "#fff",
          background: "-webkit-linear-gradient(left bottom, rgb(0, 0, 0, 0.73), rgb(72, 122, 208, 0.71), #fff)",
        }
      },
      // 导航
      navigator: {
        replyMeBoard: "回复我的",
        whisperBoard: "我的消息",
        messageChatBoard: "我的消息",
        unfollow: "未关注的人",
        likeMeBoard: "收到的赞",
        likeMeDetails: "点赞详情",
        systemMessageBoard: "系统消息",
        messageSettingsBoard: "消息设置",
      },
      // 回退目录
      backNavigation: {
        likeMeDetails: {
          name: "likeMeBoard",
          content: "收到的赞",
        },
      }
    }
  },
  computed: {
    ...mapState(["isLogin", "user"]),
  },
  mounted() {
    this.clickToHidden();
  },
  methods: {
    // 点击隐藏
    clickToHidden() {
      window.addEventListener("click", () => {
        // 隐藏消息操作面板
        this.$bus.$emit("hiddenMessageOperationBoard");
      });
    }
  },
  beforeDestroy() {
    this.clearAllRefsEvents();
  },
  components: {
    MessageNavigationBoard,
    HuadiaoMiddleTip,
    HuadiaoWarningTopContainer,
    HuadiaoPopupWindow,
    HuadiaoHeader
  },
}
</script>

<style>
body {
  min-width: 1300px;
  --message-text-color: #4b4b4b;
  color: #4b4b4b;
  background: url('~/public/img/message/messageBackground.png') no-repeat center center fixed;
  background-size: cover;
}
</style>

<style scoped>
.huadiao-message {
  width: 100%;
  min-height: 100vh;
  --message-board-background: #FFFFFFB5;
}

.message-board {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  width: 1200px;
  height: 100vh;
  padding-top: 80px;
}

.message-content-board {
  width: calc(100% - 220px);
  height: 100%;
}

.content-title {
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-radius: 6px;
  padding-left: 20px;
  margin-bottom: 10px;
  letter-spacing: 2px;
  background-color: #FFFFFFB5;
}

.content-title a {
  color: var(--message-text-color);
}

.content-title a:hover {
  color: #d35252;
}

.router-view {
  width: 100%;
  height: calc(100% - 50px);
  min-height: 450px;
  border-radius: 6px;
  background-color: rgba(255, 255, 255, 0.712);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  overflow-y: auto;
}

.router-view::-webkit-scrollbar {
  width: 10px;
}

.router-view::-webkit-scrollbar-track {
  background-color: #e8e8e8;
  border-radius: 5px;
}

.router-view::-webkit-scrollbar-thumb {
  background-color: #aaaaaa;
  border-radius: 5px;
}
</style>