<template>
  <div class="note-comment-container" ref="noteCommentContainer">
    <div class="comment-title-box" id="comment-title">
      <span>评论</span>
      <span class="comment-number">{{ noteInfo.commentNumber }}</span>
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
import constants from "@/assets/js/constants";

let statusCode = constants.statusCode;

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
      visible: {
        fixedCommentBoard: false,
      },
      svg: {
        avatar: `<svg t="1657536982283" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3627" width="200" height="200"><path d="M510.77050482 2.21923328c281.4240859 0 509.56537287 228.14128697 509.56537173 509.56653682 0 281.42757888-228.14128697 509.56653682-509.56537173 509.56653681-281.42757888 0-509.56886585-228.14012302-509.56886585-509.56653681 0-281.4240859 228.14128697-509.56653682 509.56886585-509.56653682z" fill="#EEEEEE" p-id="3628"></path><path d="M510.77050482 516.51164387c90.0558939 0 163.05952199-73.30168832 163.05952199-163.72549973 0-90.42264633-73.00362809-163.72433465-163.05952199-163.72433465-90.05705785 0-163.06301497 73.30168832-163.06301497 163.72433465-0.00116395 90.42497536 73.00479317 163.72549859 163.06301497 163.72549973z m251.51800206 200.09807531l1.21552441-0.45756757c-39.85964146-100.90130205-137.98992099-172.25861689-252.73352647-172.25861689-113.31967317 0-210.42537358 69.60155875-251.2141221 168.51890176l0.56235463 0.22820181a39.9609344 39.9609344 0 0 0-2.9188881 15.01940622c0 22.15886393 17.97555086 40.12510094 40.15420757 40.12509981 16.79146325 0 31.16701469-10.30401138 37.16196921-24.92522837l0.65433486 0.26545948c28.69987328-68.84360192 96.50958109-117.22355485 175.60014393-117.22355484 79.76934741 0 148.05874461 49.21940878 176.32433493 119.00725475l0.2875813-0.10828003c6.4338944 13.58499499 20.27037696 22.98434901 36.30970538 22.98434901 22.17516373 0 40.15187968-17.96507307 40.15187968-40.12509981a40.14256469 40.14256469 0 0 0-1.55549923-11.05032533z" fill="#CCCCCC" p-id="3629"></path></svg>`,
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
    this.$bus.$on("judgeClickObject", this.judgeClickObject);
  },
  methods: {
    // 判断点击对象是否为当前根评论或者其子评论的回复按钮,
    judgeClickObject({pointerEvent, rootIndex, subIndex}) {
      if(this.$refs.rootCommentItem) {
        // 隐藏其他根评论的输入框, 打开该回复按钮的根评论对应的输入框
        for(let ref of this.$refs.rootCommentItem) {
          ref.visible.replyBox = ref.$el.contains(pointerEvent.target);
        }

        // 修改 输入框的 placeholder, 为（回复 @昵称）格式
        let nickname;
        if(Number.isInteger(rootIndex) && rootIndex >= 0) {
          nickname = this.$store.state.noteInfo.commentList[rootIndex].nickname;
          if(Number.isInteger(subIndex) && subIndex >= 0) {
            nickname = this.$store.state.noteInfo.commentList[rootIndex].commentList[subIndex].nickname;
          }
        }
        this.$refs.rootCommentItem[rootIndex].config.commentInputBoard.defaultPlaceholder = this.config.replyPlaceholder + nickname;
      }
    },
    /**
     * 滚动触发
     * 1. 根据滚动距离来判断是否显示固定的输入框
     * 2. 根据是否滚动到评论区底部来获取评论
     */
    scrollEvent() {
      window.addEventListener("scroll", () => {
        // 是否有评论
        let hasComment = this.noteInfo.commentList && (this.noteInfo.commentList.length !== 0);
        let showCommentInput = window.scrollY + 70 >= this.$refs.currentUserCommentBoard.offsetTop;
        this.visible.fixedCommentBoard = showCommentInput && hasComment;

        // 判断是否滚动到评论区最下方, 最下方获取评论
        if(!this.obtainedNoteComment) {
          // 可视区底部到文档最上部的距离
          let clientBottom = window.scrollY + document.documentElement.clientHeight;
          // 笔记区域高度加上笔记区域上部到文档上部的距离
          let height = this.$refs.noteCommentContainer.clientHeight + this.$refs.noteCommentContainer.offsetTop;
          if(clientBottom + 160 < height) {
            return;
          }
          this.obtainedNoteComment = true;
          // 发送获取笔记评论请求
          this.sendRequest({
            path: "note/comment",
            params: {
              uid: this.$route.params.authorUid,
              noteId: this.$route.params.noteId,
              offset: this.offset,
              row: this.row
            },
            thenCallback: (response) => {
              let res = response.data;
              console.log(res);
              if(res.code === statusCode.succeed) {
                this.offset += this.row;
                this.$store.commit("addNoteComment", {comment: res.data});
                this.obtainedNoteComment = false;
              } else if(res.code === statusCode.notExist) {
                // 评论已经全部获取
              }
            },
            errorCallback: (error) => {
              console.log(error);
              this.obtainedNoteComment = false;
            }
          })
        }
      });
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
  width: 100%;
  bottom: 0;
  background-color: #fff;
  transition: var(--transition-500ms);
}

.fixed-comment-board>div {
  width: 60%;
}

.comment-board-box {
  position: relative;
  z-index: 2;
  padding: 10px;
  background-color: #fff;
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