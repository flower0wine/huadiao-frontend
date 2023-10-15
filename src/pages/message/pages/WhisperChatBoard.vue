<template>
  <div class="whisper-chat-board">
    <div class="chat-header">{{ nickname }}</div>
    <chat-message-window/>
    <chat-input/>
  </div>
</template>

<script>
import ChatMessageWindow from "@/pages/message/components/ChatMessageWindow";
import ChatInput from "@/pages/message/components/ChatInput";
import {mapState} from "vuex";

export default {
  name: "WhisperChatBoard",
  components: {ChatInput, ChatMessageWindow},
  data() {
    return {}
  },
  created() {
  },
  computed: {
    ...mapState(["latestUserIndex"]),
    chatUid() {
      return parseInt(this.$route.params.uid);
    },
    nickname() {
      let whisper = this.$store.state.message.whisper;
      return this.getNickname(whisper[this.latestUserIndex]);
    }
  },
  methods: {

  },
  beforeDestroy() {
  }
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