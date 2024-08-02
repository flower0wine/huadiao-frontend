<template>
  <div class="chat-input">
    <div class="input-tools">
      <div class="tool" title="插入图片">
        <div class="tool-icon">
          <PictureIcon />
        </div>
      </div>
      <div class="tool emote-tool" title="插入表情" ref="emoteTool">
        <div class="tool-icon" @click="openEmoteBoard">
          <EmoteIcon />
        </div>
        <EmoteBoard v-if="emoteBoard.render"
                    v-show="emoteBoard.show"
                    @close="closeEmoteBoard"
                    @choose="insertEmote" />
      </div>
      <div class="input-word-number">{{ wordNumber }}/300</div>
      <div class="send-message-box" @click="sendMessage">发送</div>
    </div>
    <div class="input-textarea"
         contenteditable="true"
         @blur="changeRange"
         @focus="changeRange"
         @click="changeRange"
         @compositionstart="compositionstart"
         @compositionend="compositionend"
         @input="messageEntering"
         @keydown.delete="backspace"
         @keyup.delete.exact="backspace"
         @keydown.enter="sendMessage"
         @keyup.ctrl="keyupCtrl"
         @paste="paste"
         ref="inputTextarea"
    ></div>
  </div>
</template>

<script>
import useRichText from "@/pages/message/hook/useRichText";
import EmoteBoard from "@/pages/message/components/EmoteBoard";
import EmoteIcon from "@/pages/components/svg/EmoteIcon";
import PictureIcon from "@/pages/components/svg/PictureIcon";

export default {
  name: "ChatInput",
  components: {PictureIcon, EmoteIcon, EmoteBoard},
  mixins: [
    useRichText,
  ],
  emits: ["sendMessage"],
  data() {
    return {
      emoteBoard: {
        render: false,
        show: false,
      },
      sending: false,
      range: null,
    };
  },
  mounted() {
    window.addEventListener("click", (e) => {
      if (!this.$refs.emoteTool.contains(e.target)) {
        this.closeEmoteBoard();
      }
    });
  },
  methods: {
    openEmoteBoard() {
      this.emoteBoard.render = true;
      this.emoteBoard.show = !this.emoteBoard.show;
    },

    closeEmoteBoard() {
      this.emoteBoard.show = false;
    },

    keyupCtrl(e) {
      if (e.code === "KeyZ") {
        this.calculateWordNumber();
      }
    },

    changeRange() {
      const selection = window.getSelection();

      if (selection.rangeCount > 0) {
        this.range = selection.getRangeAt(0);
      }
    },

    calculateWordNumber() {
      const messageContent = this.$refs.inputTextarea.childNodes;
      let wordNumber = 0;
      for (let node of messageContent) {
        if (node.nodeType === Node.TEXT_NODE) {
          const text = node.textContent;
          wordNumber += text.length;
        } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName === "IMG") {
          wordNumber += node.getAttribute("alt").length;
        }
      }
      this.wordNumber = wordNumber;
    },

    sendMessage(e) {
      if (e.keyCode === 13 && e.shiftKey) {
        return;
      }
      e.preventDefault();

      const messageContent = this.$refs.inputTextarea.innerHTML;
      if (!this.checkMessageContent()) {
        return;
      }

      try {
        this.$emit("sendMessage", messageContent);
        this.$refs.inputTextarea.innerHTML = "";
        this.wordNumber = 0;
        this.range = null;
      } catch (error) {
        console.log(error);
      }
    },

    paste() {
      this.calculateWordNumber();
    },

    backspace() {
      this.calculateWordNumber();
    },
  },
  beforeDestroy() {
    window.removeEventListener("click", this.closeEmoteBoard);
  },
}
</script>

<style lang="scss" scoped>

.chat-input {
  height: 200px;
  border-top: 1px solid #aaaaaa;
}

.input-tools {
  display: flex;
  align-items: center;
  padding: 6px;
  border-bottom: 1px solid #aaaaaa;
}

.tool {
  position: relative;
  margin-right: 6px;
}

.tool-icon {
  width: 34px;
  height: 34px;
  text-align: center;
  line-height: 34px;
  border-radius: 4px;
  transition: var(--transition-300ms);
}

.tool-icon:hover {
  background-color: #ffffff4f;
}

.tool-icon::v-deep svg:hover {
  fill: #d15656;
}

.tool-icon::v-deep svg {
  width: 22px;
  height: 22px;
  fill: #aaa;
  vertical-align: -6px;
  transition: var(--transition-300ms);
}

.input-word-number {
  font-size: 14px;
  color: #5e5e5e;
  margin-left: auto;
  margin-right: 20px;
}

.send-message-box {
  width: 60px;
  text-align: center;
  line-height: 30px;
  font-size: 14px;
  border-radius: 6px;
  color: #fff;
  background-color: #da4444;
  cursor: pointer;
}

.send-message-box:hover {
  background-color: #cb4040;
}

.input-textarea {
  width: 100%;
  height: calc(100% - 47px);
  outline: none;
  padding: 10px;
  font-size: 14px;
  overflow-x: hidden;
  overflow-y: auto;
  word-break: break-word;
  word-wrap: break-word;
}

.input-textarea::-webkit-scrollbar {
  width: 10px;
}

.input-textarea::-webkit-scrollbar-track {
  border-radius: 5px;
  background-color: #eee;
}

.input-textarea::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: #a5a5a5;
}

.input-textarea {
  &::v-deep .emote {
    width: 20px;
    height: 20px;
  }
}
</style>