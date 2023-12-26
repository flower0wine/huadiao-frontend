<template>
  <div class="note-list-board">
    <div class="note-list" v-if="getDataCompleted">
      <div class="note-item"
           v-for="(noteItem, index) in noteList"
           :key="index">
        <a :href="`/singlenote/${viewedUid}/${noteItem.noteId}`">
          <div class="note-title">{{ noteItem.noteTitle }}</div>
          <div class="note-abstract" v-text="formatNoteAbstract(noteItem.noteAbstract)"></div>
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
              <div class="tool" @click="clickToEditNote($event, noteItem)">
                <span v-html="svg.edit"></span>
                <span>编辑</span>
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
    <simple-loading :observe-callback="observeCallback"
                    :option="{loadedText: `目前没有任何的笔记`}"
                    :get-hooks="getHooks"/>
  </div>
</template>

<script>
import {mapState} from "vuex";
import {svg} from "@/assets/js/constants/svgs";
import SimpleLoading from "@/pages/components/loading/SimpleLoading";
import {apis} from "@/assets/js/constants/request-path";
import RequestPager from "@/assets/js/utils/request-pager";

let pager = new RequestPager();

export default {
  name: "NoteListBoard",
  components: {SimpleLoading},
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
    }),
    viewedUid() {
      return this.$route.params.viewedUid;
    }
  },
  methods: {
    getHooks({unobserve}) {
      pager.setCompleteCallback(unobserve);
    },
    formatNoteAbstract(noteAbstract) {
      if (noteAbstract.length > 220) {
        return noteAbstract.slice(0, 220) + '...';
      }
      return noteAbstract;
    },
    observeCallback() {
      this.getUserNotesByUid();
    },
    clickToEditNote(e, noteItem) {
      e.preventDefault();
      this.openNewPage(`/buildnote/${noteItem.noteId}`);
    },
    // 获取用户所有笔记
    getUserNotesByUid() {
      pager.requestModel((params) => {
        this.sendRequest({
          path: apis.note.all,
          params: {
            uid: this.viewedUid,
            ...params,
          },
        }).then((response) => {
          let res = response.data;
          console.log(res);

          pager.requestCallback(res).succeed((data) => {
            this.$store.commit("addNotes", {noteList: data});
            this.getDataCompleted = true;
          });
        }).catch(pager.errorCallback);
      })
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