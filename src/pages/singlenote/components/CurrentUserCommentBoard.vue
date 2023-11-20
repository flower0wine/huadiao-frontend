<template>
  <div class="current-user-comment-box">
    <div class="input-box" ref="inputBox">
      <user-avatar-box :options="userAvatarOptions"></user-avatar-box>
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
      <div class="publish-comment-btn" @click="clickPublish">发布</div>
    </div>
    <div class="input-tools" v-show="isShow.inputTools">
      <div class="input-tool emote-tool" v-html="svg.emote"></div>
      <div class="input-tool notice-other">@</div>
    </div>
  </div>
</template>

<script>
import {svg} from "@/assets/js/constants/svgs";
import UserAvatarBox from "@/pages/components/UserAvatarBox";
import {mapState} from "vuex";

export default {
  name: "CurrentUserCommentBoard",
  components: {UserAvatarBox},
  props: ["publishComment", "commentInputBoard"],
  data() {
    return {
      inputValue: "",
      svg,
      isShow: {
        inputTools: false,
      },
      config: {
        defaultPlaceholder: "暴风雪前的宁静...",
      }
    }
  },
  computed: {
    ...mapState({
      userAvatarOptions(state) {
        return {
          scale: "44px",
          userAvatar: state.user.userAvatar,
        }
      },
    }),
    defaultPlaceholder() {
      if(this.commentInputBoard) {
        return this.commentInputBoard.defaultPlaceholder;
      }
      return this.config.defaultPlaceholder;
    }
  },
  mounted() {
  },
  methods: {
    clickPublish() {
      this.publishComment(this.inputValue);
      this.inputValue = "";
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
  color: var(--comment-input-color);
  background-color: var(--comment-input-bg-color);
}

#comment-input::placeholder {
  color: var(--comment-input-placeholder-color);
}

.publish-comment-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 100%;
  border-radius: 6px;
  margin-left: 20px;
  color: var(--publish-btn-color);
  background-color: var(--publish-btn-bg-color);
  cursor: pointer;
}

.publish-comment-btn:hover {
  background-color: var(--publish-btn-hover-bg-color);
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
  border: 1px solid var(--input-tools-color);
  cursor: pointer;
}

.input-tool:hover {
  color: var(--input-tools-hover-color);
  border: 1px solid var(--input-tools-hover-color);
}

.emote-tool /deep/ svg {
  width: 20px;
  height: 20px;
  fill: var(--input-tools-color);
  vertical-align: -3px;
}

.input-tool:hover /deep/ svg {
  fill: var(--input-tools-hover-color);
}

.notice-other {
  color: var(--input-tools-color);
  font-weight: 700;
  margin-left: 10px;
}
</style>