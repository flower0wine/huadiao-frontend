<template>
  <div class="note-content-board" ref="noteContentBoard">
    <!--笔记目录-->
    <note-catalogue ref="noteCatalogue"/>
    <!--笔记详细内容-->
    <div class="note-details" ref="noteDetails">
      <div class="note-title-box">
        <h1>{{ noteInfo.noteTitle }}</h1>
      </div>
      <div class="note-info-box">
        <div class="note-extra-infer">
          <div class="create-author"
               :class="noteInfo.original ? 'original-author' : 'transfer-author'"
          >{{ noteInfo.original ? "原创" : "转载" }}
          </div>
        </div>
        <div class="note-infer">
          <div class="public-time">
            <span v-html="svg.colorPublish" class="infer-icon"></span>
            <span>发布于 {{ huadiaoDateFormat(noteInfo.publishTime) }}</span>
          </div>
          <div class="view-number">
            <span v-html="svg.colorEye" class="infer-icon"></span>
            <span>浏览量 {{ noteInfo.viewCount }}</span>
          </div>
          <div class="star-number">
            <span v-html="svg.colorStar" class="infer-icon"></span>
            <span>收藏 {{ noteInfo.starCount }}</span>
          </div>
          <div class="topping" v-if="noteInfo.topping">置顶</div>
          <div class="concentration" v-if="noteInfo.concentration">精选</div>
        </div>
        <div class="note-tags" v-if="noteInfo.noteTags?.length">
          <div class="tags-label">笔记内容所属:</div>
          <span class="note-tag-item"
                v-for="item in noteInfo.noteTags"
                :key="item.tagId">{{item.tagName}}</span>
        </div>
      </div>
      <div class="note-content" v-html="noteInfo.noteContent"></div>
      <note-author-info-board/>
      <note-comment-board v-if="visible.commentBoard"/>
      <div v-else class="no-login-comment-tip">~ 登录后可查看评论 ~</div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import NoteAuthorInfoBoard from "@/pages/singlenote/components/NoteAuthorInfoBoard";
import NoteCommentBoard from "@/pages/singlenote/components/NoteCommentBoard";
import NoteCatalogue from "@/pages/singlenote/components/NoteCatalogue";
import {Timer} from "@/assets/js/utils";
import {svg} from "@/assets/js/constants/svgs";

export default {
  name: "NoteContentBoard",
  components: {NoteCatalogue, NoteCommentBoard, NoteAuthorInfoBoard},
  props: ["showCatalogue"],
  data() {
    return {
      visible: {
        catalogue: false,
        commentBoard: false,
      },
      svg,
      timer: new Timer(),
    }
  },
  computed: {
    ...mapState(["noteInfo", "user"]),
  },
  watch: {
    "$store.state.user": {
      handler() {
        this.openCommentBoardByLogin();
      },
    },
    showCatalogue: {
      handler(newValue) {
        if (newValue) {
          this.$refs.noteCatalogue.$el.style.opacity = "1";
          this.$refs.noteContentBoard.classList.add("show-catalogue");
        } else {
          this.$refs.noteContentBoard.classList.remove("show-catalogue");
          this.$refs.noteCatalogue.$el.style.opacity = "0";
        }
      },
    },
  },
  mounted() {
    this.clickContextMenuToOpenCatalogue();
    this.openCommentBoardByLogin();
  },
  methods: {
    openCommentBoardByLogin() {
      if(this.user.login) {
        this.visible.commentBoard = true;
      }
    },
    // 修改右键为打开目录
    clickContextMenuToOpenCatalogue() {
      this.$refs.noteDetails.addEventListener("contextmenu", (e) => {
        // e.preventDefault();
      });
    }
  },
  beforeDestroy() {
  }
}
</script>

<style>
.note-content li {
  list-style: unset;
}
</style>

<style scoped>
.note-content-board {
  display: flex;
  justify-content: space-between;
  width: 1200px;
  margin: 0px auto 200px;
}

.show-catalogue /deep/ .note-content-catalogue-board {
  width: 20%;
}

.show-catalogue .note-details {
  width: calc(80% - 16px);
}

.note-details {
  width: 100%;
  min-height: 800px;
  border-radius: 6px;
  padding: 20px;
  box-shadow: var(--note-box-shadow);
  background-color: var(--note-content-board-bg-color);
  transition: var(--transition-500ms);
}

.note-title-box {
  color: var(--note-title-color);
}

.note-info-box {
  position: relative;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  padding: 6px 70px;
  border-radius: 6px;
  color: var(--note-info-color);
  background-color: var(--note-info-bg-color);
}

.create-author {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 46px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border-top-left-radius: 6px;
  border-bottom-right-radius: 6px;
  color: var(--create-author-color);
}

/* 原创 */
.original-author {
  background-color: var(--original-author-bg-color);
}

/* 转载 */
.transfer-author {
  background-color: var(--transfer-author-bg-color);
}

.note-infer {
  display: flex;
  height: 24px;
}

.note-infer > div {
  margin-right: 30px;
  font-size: 14px;
}

.infer-icon /deep/ svg {
  width: 24px;
  height: 24px;
}

.infer-icon:first-child {
  margin-right: 6px;
}

.topping {
  padding: 1px 4px;
  border-radius: 4px;
  color: var(--topping-color);
  background-color: var(--topping-bg-color);
}

.concentration {
  position: absolute;
  top: -74px;
  right: -48px;
  width: 40px;
  height: 26px;
  letter-spacing: 5px;
  text-align: center;
  line-height: 26px;
  transform: rotate(45deg);
  color: var(--concentration-color);
  background-color: var(--concentration-bg-color);
}

.concentration::before {
  content: "";
  position: absolute;
  top: 0px;
  left: -26px;
  border-top: 0px solid transparent;
  border-right: 0px solid transparent;
  border-left: 26px solid transparent;
  border-bottom: 26px solid var(--concentration-border-color);
}

.concentration::after {
  content: "";
  position: absolute;
  top: 0px;
  left: 40px;
  border-top: 0px solid transparent;
  border-right: 26px solid transparent;
  border-left: 0px solid transparent;
  border-bottom: 26px solid var(--concentration-border-color);
}

.note-content {
  margin-top: 20px;
  min-height: 400px;
}

.tags-label {
  font-size: 14px;
}

.note-tags {
  display: flex;
  align-items: center;
  margin-top: 6px;
}

.note-tag-item {
  padding: 0px 3px;
  margin-left: 8px;
  text-align: center;
  line-height: 18px;
  font-size: 12px;
  color: var(--note-tag-item-color);
  background-color: var(--note-tag-item-bg-color);
  border: 1px solid var(--note-tag-item-border-color);
}

.note-tag-item:hover {
  color: var(--note-tag-item-hover-color);
}

.note-content {
  color: var(--note-content-color);
  letter-spacing: 2px;
  padding-bottom: 100px;
}

.no-login-comment-tip {
  padding-top: 40px;
  text-align: center;
  color: var(--no-login-comment-tip-color);
}
</style>
