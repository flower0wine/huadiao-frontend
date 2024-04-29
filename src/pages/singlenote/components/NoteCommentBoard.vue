<template>
  <div class="note-comment-container" ref="noteCommentContainer">
    <div class="comment-title-box" id="comment-title" ref="commentTitle">
      <span>评论</span>
      <span class="comment-number">{{ noteInfo.commentCount }}</span>
    </div>
    <div class="comment-header-input" ref="currentUserCommentBoard">
      <div>
        <current-user-comment-board :publishComment="publishRootComment"/>
      </div>
    </div>
    <div class="comment-list">
      <root-comment-item v-for="(item, index) in noteInfo.commentList"
                         :key="item.commentId"
                         :rootCommentItem="item"
                         :rootIndex="index"
                         :data-root-id="item.commentId"
                         ref="rootCommentItem"
      />
      <div class="no-more-comment">没有更多评论了...</div>
    </div>
    <transition name="fade">
      <div class="fixed-comment-board"
           v-show="visible.fixedCommentBoard"
           ref="fixedCommentBoard"
      >
        <div class="comment-board-box">
          <current-user-comment-board :publishComment="publishRootComment"/>
        </div>
        <div class="fixed-comment-mask"></div>
      </div>
    </transition>
  </div>
</template>

<script>
import {mapState} from "vuex";
import RootCommentItem from "@/pages/singlenote/components/RootCommentItem";
import CurrentUserCommentBoard from "@/pages/singlenote/components/CurrentUserCommentBoard";
import {apis} from "@/assets/js/constants/request-path";
import {statusCode} from "@/assets/js/constants/status-code";

export default {
  name: "NoteCommentBoard",
  components: {CurrentUserCommentBoard, RootCommentItem},
  data() {
    return {
      // 是否获取过笔记评论
      obtainedNoteComment: false,
      // 评论条数偏移量
      offset: 0,
      // 单次获取条数
      row: 10,
      observer: null,
      // 观察者观察的评论索引
      observerIndex: 0,
      // 上次获取到的评论的数量
      preCommentLength: 0,
      visible: {
        fixedCommentBoard: false,
      },
      config: {
        replyPlaceholder: "回复 @",
      },
      // 发布中
      publishing: false,
    }
  },
  computed: {
    ...mapState(["noteInfo"]),
  },
  mounted() {
    this.scrollEvent();
    this.getCommentByObserver();

    this.$bus.$on("judgeClickObject", this.judgeClickObject);
  },
  methods: {
    // 根据观察者行为获取评论
    getCommentByObserver() {
      // 设置观察者
      this.observer = new IntersectionObserver( (entries) => {
        let observerInfo = entries[0];
        // 由非交叉状态变为交叉状态
        if(observerInfo.isIntersecting && !this.obtainedNoteComment) {
          this.obtainedNoteComment = true;
          this.commentRequest();
        }
      }, {
        threshold: 0.1,
      });

      // 获取评论
      this.commentRequest();
    },
    // 判断点击对象是否为当前根评论或者其子评论的回复按钮,
    judgeClickObject({pointerEvent, rootIndex, subIndex}) {
      let rootCommentItem = this.$refs.rootCommentItem;
      if(rootCommentItem) {
        // 隐藏其他根评论的输入框, 打开该回复按钮的根评论对应的输入框
        for(let ref of rootCommentItem) {
          ref.visible.replyBox = ref.$el.contains(pointerEvent.target);
        }

        // 修改 输入框的 placeholder, 为（回复 @昵称）格式
        let nickname;
        if(Number.isInteger(rootIndex) && rootIndex >= 0) {
          let comment = this.$store.state.noteInfo.commentList[rootIndex];
          nickname = comment.nickname;
          if(Number.isInteger(subIndex) && subIndex >= 0) {
            nickname = comment.commentList[subIndex].nickname;
          }
        }
        rootCommentItem[rootIndex].config.commentInputBoard.defaultPlaceholder = this.config.replyPlaceholder + nickname;
      }
    },
    // 根据滚动距离来判断是否显示固定的输入框
    scrollEvent() {
      window.addEventListener("scroll", () => {
        // 是否有评论
        let hasComment = this.noteInfo.commentList && (this.noteInfo.commentList.length !== 0);
        let showCommentInput = window.scrollY + 70 >= this.$refs.currentUserCommentBoard.offsetTop;
        this.visible.fixedCommentBoard = showCommentInput && hasComment;
      });
    },
    // 请求笔记评论, 一次请求 this.row（10） 条数
    commentRequest() {
      // 发送获取笔记评论请求
      this.sendRequest({
        path: apis.note.comment.get,
        params: {
          uid: this.authorUid,
          noteId: this.$route.params.noteId,
          offset: this.offset,
          row: this.row
        },
        thenCallback: (response) => {
          let res = response.data;
          console.log(res);

          if(res.code === statusCode.SUCCEED) {
            this.offset += this.row;
            this.$store.commit("addNoteComment", {comment: res.data});
            // 改变观察对象, DOM 树上有才能观察
            this.$nextTick(() => {
              let index;
              let observerIndex = this.observerIndex;
              // 观察的是每次获取到的评论的第一个
              this.observer.observe(this.$refs.rootCommentItem[observerIndex].$el);
              index = observerIndex - this.preCommentLength;
              if(observerIndex !== 0 && index >= 0) {
                // 取消观察上一个
                this.observer.unobserve(this.$refs.rootCommentItem[index].$el);
              }
              this.observerIndex += res.data.length;
              this.preCommentLength = res.data.length;
            });

            this.obtainedNoteComment = false;

          } else if(res.code === statusCode.NOT_EXIST) {
            // 评论已经全部获取, 不再观察
            if(this.observerIndex !== 0)
              this.observer.unobserve(this.$refs.rootCommentItem[this.observerIndex - this.preCommentLength].$el);
          }
        },
        errorCallback: (error) => {
          console.log(error);
          this.obtainedNoteComment = false;
        }
      })
    },
    // 发布根评论
    publishRootComment(commentContent) {
      if(this.publishing || commentContent == null || commentContent.trim() === "") {
        return null;
      }
      this.publishing = true;
      let root = true;
      let comment = this.packageComment(commentContent);

      this.addComment({
        root,
        comment,
        succeedCallback: () => {
          this.publishing = false;
        },
        failCallback: () => {
          this.huadiaoMiddleTip("回复失败!");
          this.publishing = false;
        },
      });
    }
  },
  beforeDestroy() {
  }
}
</script>

<style scoped>
.note-comment-container {
  padding: 20px 20px 100px;
}

.comment-title-box {
  font-size: 24px;
  color: var(--comment-title-color);
}

.comment-number {
  font-size: 16px;
  color: #8c8c8c;
  margin-left: 10px;
}

.comment-header-input {
  width: 60%;
  margin: 20px 0;
}

.fixed-comment-board {
  position: sticky;
  z-index: 10;
  width: 100%;
  bottom: 0;
  background-color: var(--fixed-comment-board-bg-color);
  transition: var(--transition-500ms);
}

.fixed-comment-board>div {
  width: 60%;
}

.comment-board-box {
  position: relative;
  z-index: 2;
  padding: 10px;
  background-color: var(--fixed-comment-board-bg-color);
}

.fixed-comment-mask {
  position: absolute;
  z-index: 1;
  top: 0px;
  width: 100%;
  height: 30px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.15);
  filter: blur(10px);
}

.no-more-comment {
  margin: 30px auto;
  text-align: center;
  width: 150px;
  font-size: 14px;
  color: #979797;
}
</style>