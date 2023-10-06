<template>
  <div class="note-list-board">
    <div class="note-item"
         v-for="(noteItem, index) in noteList"
         :key="index"
    >
      <a :href="`/singlenote/${$route.params.viewedUid}/${noteItem.noteId}`">
        <div class="note-title">{{noteItem.noteTitle}}</div>
        <div class="note-abstract" v-html="noteItem.noteContent"></div>
        <div class="note-infer">
          <div>
            <span v-html="svg.time"></span>
            <span>{{ huadiaoDateFormat(noteItem.publishTime) }}</span>
          </div>
          <div>
            <span v-html="svg.eye"></span>
            <span>{{noteItem.viewCount}}</span>
          </div>
          <div>
            <span v-html="svg.star"></span>
            <span>{{noteItem.starCount}}</span>
          </div>
          <div>
            <span v-html="svg.comment"></span>
            <span>{{noteItem.commentCount}}</span>
          </div>
          <div>
            <span v-html="svg.love"></span>
            <span>{{noteItem.likeCount}}</span>
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
  box-shadow: var(--box-shadow-min);
  background-color: #ececec;
}

.note-item {
  padding: 20px;
}

.note-item:nth-child(n + 1) {
  border-top: 1px solid #c2c2c2;
}

.note-infer {
  display: flex;
}

.note-infer>div {
  margin-right: 30px;
}

.note-infer /deep/ svg {
  width: 16px;
  height: 16px;
  fill: #807d7d;
  vertical-align: -3px;
}

.note-title {
  font-size: 24px;
  font-weight: 700;
  color: #4b4949;
}

.note-title:hover {
  color: #b00b0b;
}

.note-abstract {
  color: #4d4c4c;
  text-indent: 1em;
  margin-top: 10px;
}

.note-infer {
  color: #9f9c9c;
  margin-top: 10px;
}

.note-infer>div span {
  font-size: 14px;
}

.note-infer span:first-child {
  margin-right: 6px;
}
</style>