<template>
  <div class="current-user-comment-box">
    <div class="input-box" ref="inputBox">
      <div class="user-avatar-box">
        <div class="default-user-avatar" v-html="svg.avatar"></div>
        <div class="user-avatar" ref="userAvatar"></div>
      </div>
      <div class="comment-input">
        <textarea autocomplete="off"
                  minlength="1"
                  id="comment-input"
                  :placeholder="defaultPlaceholder"
                  v-model="inputValue"
                  @focusin="focusinCommentTextarea"
                  @focusout="focusoutCommentTextarea"
        ></textarea>
      </div>
      <div class="publish-comment-btn" @click="publishComment(inputValue)">发布</div>
    </div>
    <div class="input-tools" v-show="isShow.inputTools">
      <div class="input-tool emote-tool" v-html="svg.emote"></div>
      <div class="input-tool notice-other">@</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CurrentUserCommentBoard",
  props: ["publishComment", "commentInputBoard"],
  data() {
    return {
      inputValue: "",
      isShow: {
        inputTools: false,
      },
      svg: {
        emote: `<svg t="1679914079532" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="18290" width="200" height="200"><path d="M512 0C229.7 0 0 229.7 0 512s229.7 512 512 512 512-229.7 512-512S794.3 0 512 0z m0 952.6C269.1 952.6 71.4 754.9 71.4 512S269.1 71.4 512 71.4 952.6 269.1 952.6 512 754.9 952.6 512 952.6z" p-id="18291"></path><path d="M255.60483 411.159939a59.5 59.5 0 1 0 84.144238-84.147175 59.5 59.5 0 1 0-84.144238 84.147175Z" p-id="18292"></path><path d="M684.216818 411.198881a59.5 59.5 0 1 0 84.144239-84.147175 59.5 59.5 0 1 0-84.144239 84.147175Z" p-id="18293"></path><path d="M650.8 563.1c-14.2 13.7-14.5 36.3-0.8 50.5 10.9 11.2 16.8 26 16.8 41.6 0 15.9-6.3 30.8-17.5 42s-26.1 17.3-42 17.3h-0.2c-15.9 0-30.8-6.3-42-17.5-11.2-11.3-17.4-26.2-17.3-42.1v-23.8c0-19.7-16-35.7-35.7-35.7s-35.7 16-35.7 35.7v23.8c0 15.6-5.9 30.3-16.8 41.6-11.1 11.4-25.9 17.9-41.8 18.1-15.2-0.4-30.9-5.7-42.4-16.8-23.6-22.8-24.2-60.6-1.3-84.2 13.7-14.2 13.4-36.8-0.8-50.5s-36.8-13.4-50.5 0.8c-50.3 51.9-49 135 2.9 185.2 24.6 23.9 56.9 37 91.1 37h2.1c35-0.6 67.7-14.7 92-39.8 0.4-0.4 0.8-0.8 1.2-1.3 0.8 0.9 1.6 1.7 2.4 2.5 24.7 24.8 57.5 38.5 92.5 38.6h0.3c34.9 0 67.7-13.5 92.4-38.1 24.8-24.7 38.5-57.5 38.6-92.5 0.1-34.3-13-66.8-36.9-91.5-13.8-14.3-36.4-14.6-50.6-0.9z" p-id="18294"></path></svg>`,
      },
      config: {
        defaultPlaceholder: "暴风雪前的宁静...",
      }
    }
  },
  computed: {
    defaultPlaceholder() {
      if(this.commentInputBoard) {
        return this.commentInputBoard.defaultPlaceholder;
      }
      return this.config.defaultPlaceholder;
    }
  },
  mounted() {
    this.initial();
  },
  methods: {
    // 初始化
    initial() {
      this.$refs.userAvatar.style.backgroundImage = "url('" + this.$store.state.user.userAvatar + "')";
    },
    // 评论框得到焦点
    focusinCommentTextarea() {
      this.isShow.inputTools = true;
      this.$refs.inputBox.classList.add("focusin-input-box");
    },
    // 评论框失去焦点
    focusoutCommentTextarea() {
      this.isShow.inputTools = false;
      this.$refs.inputBox.classList.remove("focusin-input-box");
    }
  },
  beforeDestroy() {
  }
}
</script>

<style scoped>

.input-box {
  position: relative;
  display: flex;
  align-items: center;
  height: 44px;
  transition: var(--transition-500ms);
}

.focusin-input-box {
  height: 70px;
}

.user-avatar-box {
  position: relative;
  width: 44px;
  height: 44px;
  border-radius: 50%;
}

.default-user-avatar /deep/ svg {
  width: 44px;
  height: 44px;
}

.user-avatar {
  position: absolute;
  top: 0px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}

.comment-input {
  width: 100%;
  height: 100%;
  padding-left: 20px;
}

#comment-input {
  width: 100%;
  height: 100%;
  border-radius: 6px;
  padding: 10px;
  font-size: 14px;
  color: #6f6f6f;
  background-color: #ebebeb;
}

#comment-input::placeholder {
  color: #a9a9a9;
}

.publish-comment-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 100%;
  border-radius: 6px;
  margin-left: 20px;
  color: #fff;
  background-color: #f03838;
  cursor: pointer;
}

.publish-comment-btn:hover {
  background-color: #de3434;
}

.input-tools {
  display: flex;
  margin: 10px 0 0 65px;
}

.input-tool {
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border-radius: 4px;
  border: 1px solid #a6a6a6;
  cursor: pointer;
}

.input-tool:hover {
  color: #dc5959;
  border: 1px solid #dc5959;
}

.emote-tool /deep/ svg {
  width: 20px;
  height: 20px;
  fill: #a6a6a6;
  vertical-align: -3px;
}

.input-tool:hover /deep/ svg {
  fill: #dc5959;
}

.notice-other {
  color: #a6a6a6;
  font-weight: 700;
  margin-left: 10px;
}
</style>