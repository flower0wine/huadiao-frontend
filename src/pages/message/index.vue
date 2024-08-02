<template>
  <div class="huadiao-message">
    <huadiao-header :huadiaoHeaderStyle="huadiaoHeaderStyle"/>
    <div class="message-board" v-if="visible">
      <message-navigation-board/>
      <div class="message-content-board">
        <div class="content-title">
          <template v-if="backNavigation[name]">
            <router-link :to="{name: backNavigation[name].name}">{{ backNavigation[name].content }}
            </router-link>
            <span> > </span>
          </template>
          <span>{{ navigator[name] }}</span>
        </div>
        <div class="router-view" ref="routerView">
          <transition name="top-show"
                      mode="out-in"
                      @before-enter="$refs.routerView.style.overflow = 'hidden'"
                      @after-leave="$refs.routerView.style.overflow = ''">
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
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
import HuadiaoHeader from "@/pages/components/HuadiaoHeader";
import HuadiaoPopupWindow from "@/pages/components/HuadiaoPopupWindow";
import HuadiaoWarningTopContainer from "@/pages/components/HuadiaoWarningTopContainer";
import HuadiaoMiddleTip from "@/pages/components/HuadiaoMiddleTip";
import MessageNavigationBoard from "@/pages/message/components/MessageNavigationBoard";
import {huadiaoHeaderStyle} from "@/assets/js/constants/style/huadiao_header_style/message";
import MessageBackground from "@/assets/img/message/messageBackground.webp";

export default {
  name: "HuadiaoMessage",
  data() {
    return {
      visible: false,
      huadiaoHeaderStyle,
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
  watch: {
    "$store.state.user": {
      deep: true,
      immediate: true,
      handler(val) {
        this.visible = true;
      },
    },
  },
  computed: {
    name() {
      return this.$route.name;
    },
    messageBackground() {
      return MessageBackground;
    }
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
  background: url('~/src/assets/img/message/messageBackground.webp') no-repeat center center fixed;
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