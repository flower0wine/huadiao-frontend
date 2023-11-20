<template>
  <div class="note-list-board">
    <div class="note-item"
         v-for="(noteItem, index) in noteList"
         :key="index"
    >
      <a :href="`/singlenote/${$route.params.viewedUid}/${noteItem.noteId}`">
        <div class="note-title">{{ noteItem.noteTitle }}</div>
        <div class="note-abstract" v-text="noteContent(noteItem.noteAbstract)"></div>
        <div class="note-item-footer">
          <div class="note-infer">
            <div>
              <span v-html="svg.time"></span>
              <span>{{ huadiaoDateFormat(noteItem.publishTime) }}</span>
            </div>
            <div>
              <span v-html="svg.eye"></span>
              <span>{{ noteItem.viewCount }}</span>
            </div>
            <div>
              <span v-html="svg.star"></span>
              <span>{{ noteItem.starCount }}</span>
            </div>
            <div>
              <span v-html="svg.comment"></span>
              <span>{{ noteItem.commentCount }}</span>
            </div>
            <div>
              <span v-html="svg.love"></span>
              <span>{{ noteItem.likeCount }}</span>
            </div>
          </div>
          <div class="edit-tools">
            <div class="tool">
              <a :href="`/buildnote/${noteItem.noteId}`">
                <span v-html="svg.edit"></span>
                <span>编辑</span>
              </a>
            </div>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import {svg} from "@/assets/js/constants/svgs";

export default {
  name: "NoteListBoard",
  data() {
    return {
      svg,
    }
  },
  computed: {
    ...mapState({
      noteList(state) {
        return state.author.noteList;
      }
    })
  },
  methods: {
    noteContent(noteAbstract) {
      if (noteAbstract.length > 220) {
        return noteAbstract.slice(0, 220) + '...';
      }
      return noteAbstract;
    },
  },
  beforeDestroy() {
  }
}
</script>

<style scoped>
.note-list-board {
  width: 1100px;
  min-height: 600px;
  margin: 60px auto 200px;
  border-radius: 6px;
  box-shadow: var(--note-box-shadow);
  background-color: var(--note-list-board-bg-color);
}

.note-item {
  padding: 20px;
}

.note-item:hover .edit-tools {
  display: block;
}

.note-item:nth-child(n + 2) {
  border-top: 1px solid var(--note-item-border-color);
}

.note-item-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.note-infer {
  display: flex;
}

.note-infer > div {
  margin-right: 30px;
}

.edit-tools > div {
  margin-left: 30px;
}

.note-item-footer /deep/ svg {
  width: 16px;
  height: 16px;
  fill: var(--note-item-footer-icon-color);
  vertical-align: -3px;
}

.note-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--note-title-color);
}

.note-title:hover {
  color: var(--note-title-hover-color);
}

.note-abstract {
  color: #4d4c4c;
  text-indent: 1em;
  margin-top: 10px;
}

.note-infer > div span,
.edit-tools > div span {
  font-size: 14px;
  color: var(--note-item-footer-word-color);
}

.note-infer span:first-child,
.edit-tools span:first-child {
  margin-right: 6px;
}

.edit-tools {
  display: none;
}

.tool {
  padding: 5px;
  border-radius: 6px;
  transition: background-color 400ms;
}

.tool:hover span {
  color: var(--note-item-footer-item-hover-color);
}

.tool:hover /deep/ svg {
  fill: var(--note-item-footer-item-hover-color);
}

.tool:hover {
  background-color: var(--note-item-footer-item-hover-bg-color);
}
</style>