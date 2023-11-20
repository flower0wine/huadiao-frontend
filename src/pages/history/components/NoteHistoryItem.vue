<template>
  <div class="note-history-item">
    <div class="last-time">
      <div class="left-blank"></div>
      <div class="triangle"></div>
      <div class="visited-date">{{huadiaoDateFormat(noteHistory.time)}}</div>
    </div>
    <div class="note-history-infer">
      <div class="note-title">
        <a :href="`/${pageLinkStart.note}/${noteHistory.authorUid}/${noteHistory.noteId}`">{{noteHistory.title}}</a>
      </div>
      <div class="note-abstract" v-html="noteHistory.summary"></div>
      <div class="note-author-infer">
        <div class="user-avatar-box">
          <a :href="`/${pageLinkStart.homepage}/${noteHistory.authorUid}`">
            <span v-html="svg.avatar"></span>
            <div class="user-avatar" :style="`background-image: url('${userAvatarImagePath}${noteHistory.author.avatar}')`"></div>
          </a>
        </div>
        <div class="user-nickname">{{noteHistory.author.nickname || noteHistory.author.userId}}</div>
      </div>
      <div v-html="svg.deleteTrashcan"
           class="delete-icon"
           @click="deleteNoteHistory(noteHistory.authorUid, noteHistory.noteId)"></div>
    </div>
  </div>
</template>

<script>
import {apis} from "@/assets/js/constants/request-path";
import {svg} from "@/assets/js/constants/svgs";
import {statusCode} from "@/assets/js/constants/status-code";

export default {
  name: "NoteHistoryItem",
  props: ["noteHistory"],
  data() {
    return {
      pageLinkStart: apis.pageLinkStart,
      svg: {
        avatar: svg.avatar,
        deleteTrashcan: svg.deleteTrashcan,
      }
    }
  },
  methods: {
    deleteNoteHistory(uid, noteId) {
      this.sendRequest({
        path: apis.history.noteDelete,
        params: {
          noteId,
          uid,
        },
        thenCallback: (response) => {
          let res = response.data;
          console.log(res);
          if(res.code === statusCode.succeed) {
            this.$store.commit("deleteNoteHistory", {noteId, uid});
          }
        },
        errorCallback: (error) => {
          console.log(error);
        }
      })
    },
  },
  beforeDestroy() {
  }
}
</script>

<style scoped>
.note-history-item {
  position: relative;
  display: flex;
  width: 100%;
  min-height: 120px;
  transition: all 500ms;
}

.last-time {
  position: absolute;
  width: 100px;
  height: 100%;
}

.left-blank {
  width: 70px;
  height: 100%;
  border-right: 1px solid #c9c8c8;
}

.triangle {
  position: absolute;
  top: 51px;
  right: 14px;
  border-top: 8px solid transparent;
  border-left: 8px solid #c9c8c8;
  border-right: 8px solid transparent;
  border-bottom: 8px solid transparent;
}

.visited-date {
  position: absolute;
  top: 51px;
  left: 91px;
  font-size: 12px;
  white-space: nowrap;
  color: #a1a1a1;
}

.note-history-infer {
  width: 100%;
  margin-left: 260px;
  padding: 10px;
}

.user-avatar-box {
  position: relative;
  width: 20px;
  height: 20px;
}

.user-avatar-box /deep/ svg {
  width: 20px;
  height: 20px;
}

.user-avatar {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}

.note-history-infer {
  border-bottom: 1px solid #c9c8c8;
}

.note-abstract {
  min-height: 50px;
  margin: 8px 0 0 8px;
  color: #888888;
}

.note-author-infer {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #7A7A7A;
}

.note-title a {
  color: #000;
}

.note-title:hover a {
  color: #ef2828;
}

.user-nickname {
  margin-left: 10px;
}

.delete-icon {
  position: absolute;
  top: 49px;
  right: 27px;
  width: 26px;
  height: 26px;
  border-radius: 6px;
  text-align: center;
  transition: var(--transition-500ms);
  cursor: pointer;
  fill: #c0c0c0;
}

.delete-icon:hover {
  background-color: #ececec;
}

.delete-icon:hover /deep/ svg {
  fill: #e54d4d;
}

.delete-icon /deep/ svg {
  width: 20px;
  height: 20px;
  transition: var(--transition-500ms);
}
</style>