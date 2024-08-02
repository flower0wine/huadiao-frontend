<template>
  <div class="whisper-chat-board">
    <div class="chat-header">{{ nickname }}</div>
    <chat-message-window />
  </div>
</template>

<script>
import ChatMessageWindow from "@/pages/message/components/ChatMessageWindow";
import {mapState} from "vuex";
import {huadiaoNickname} from "@/util/huadiao-tool";

export default {
  name: "WhisperChatBoard",
  components: {ChatMessageWindow},
  computed: {
    ...mapState("whisperUserStore", ["selectedLatestUserIndex"]),

    ...mapState("whisperUserStore", ["whisperUsers"]),

    nickname() {
      const user = this.whisperUsers[this.selectedLatestUserIndex];
      if (!user) {
        return "选择一位好友聊天吧";
      }
      const {nickname, userId} = user;
      return huadiaoNickname(nickname, userId);
    },
  },
}
</script>

<style scoped>
.whisper-chat-board {
  display: flex;
  flex-direction: column;
  width: calc(100% - 260px);
  height: 100%;
}

.chat-header {
  font-size: 14px;
  text-align: center;
  line-height: 30px;
  border-bottom: 1px solid #bebebe;
}

</style>