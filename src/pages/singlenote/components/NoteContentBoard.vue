<template>
  <div class="note-content-board" ref="noteContentBoard">
    <!--笔记目录-->
    <note-catalogue ref="noteCatalogue"/>
    <!--笔记详细内容-->
    <div class="note-details" ref="noteDetails">
      <div class="note-title-box">
        <h1>{{ noteInfo.noteTitle }}</h1>
      </div>
      <div class="note-infer-box">
        <div class="note-extra-infer">
          <div class="create-author"
               :class="noteInfo.original ? 'original-author' : 'transfer-author'"
          >{{ noteInfo.original ? "原创" : "转载" }}
          </div>
        </div>
        <div class="note-infer">
          <div class="public-time">
            <span v-html="svg.public" class="infer-icon"></span>
            <span>发布于 {{ dateFormat(noteInfo.publishTime) }}</span>
          </div>
          <div class="view-number">
            <span v-html="svg.view" class="infer-icon"></span>
            <span>浏览量 {{ noteInfo.viewNumber }}</span>
          </div>
          <div class="star-number">
            <span v-html="svg.star" class="infer-icon"></span>
            <span>收藏 {{ noteInfo.starNumber }}</span>
          </div>
          <div class="topping" v-if="noteInfo.topping">置顶</div>
          <div class="concentration" v-if="noteInfo.concentration">精选</div>
        </div>
        <div class="note-tags">
          <div class="tags-label">笔记内容所属:</div>
          <a class="note-tag-item" href="#">linux</a>
          <a class="note-tag-item" href="#">网络</a>
          <a class="note-tag-item" href="#">运维</a>
        </div>
      </div>
      <div class="note-content" v-html="noteInfo.noteContent"></div>
      <note-author-info-board/>
      <note-comment-board/>
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
      },
      svg,
      timer: new Timer(),
    }
  },
  computed: {
    ...mapState(["noteInfo"]),
  },
  watch: {
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
  },
  methods: {
    // 修改右键为打开目录
    clickContextMenuToOpenCatalogue() {
      this.$refs.noteDetails.addEventListener("contextmenu", (e) => {
        e.preventDefault();
      });
    }
  },
  beforeDestroy() {
  }
}
</script>

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
  box-shadow: var(--box-shadow);
  transition: var(--transition-500ms);
}

.note-infer-box {
  position: relative;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  padding: 6px 70px;
  border-radius: 6px;
  color: #8c8c8c;
  background-color: #f1f1f1;
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
  color: #fff;
}

/* 原创 */
.original-author {
  background-color: #DC4040AD;
}

/* 转载 */
.transfer-author {
  background-color: #67CE2BAD;
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
  color: #fff;
  background-color: #c2c2c2;
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
  color: #ffffff;
  background-color: #eccf0d;
}

.concentration::before {
  content: "";
  position: absolute;
  top: 0px;
  left: -26px;
  border-top: 0px solid transparent;
  border-right: 0px solid transparent;
  border-left: 26px solid transparent;
  border-bottom: 26px solid #eccf0d;
}

.concentration::after {
  content: "";
  position: absolute;
  top: 0px;
  left: 40px;
  border-top: 0px solid transparent;
  border-right: 26px solid transparent;
  border-left: 0px solid transparent;
  border-bottom: 26px solid #eccf0d;
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
  color: #c24545;
  background-color: #fff;
  border: 1px solid #bcbcbc;
}

.note-tag-item:hover {
  color: #a13838;
}

.note-content {
  color: #282828;
  letter-spacing: 2px;
  padding-bottom: 100px;
}

</style>