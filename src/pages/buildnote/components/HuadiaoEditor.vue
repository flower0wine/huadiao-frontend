<template>
  <div>
    <div class="note-textarea">
      <div class="note-title">
        <input type="text"
               id="note-title"
               v-model="title"
               placeholder="请输入标题【5~100】"
               maxlength="100">
      </div>
      <tinymce-editor/>
    </div>
    <div class="note-footer">
      <div class="publish-note"
           @click="publishNote">
        <span v-html="svg.publish" class="publish-icon"></span>
        <span>发布</span>
      </div>
    </div>
  </div>
</template>

<script>
import TinymceEditor from "@/pages/buildnote/components/TinymceEditor";
import {mapState} from "vuex";

export default {
  name: "HuadiaoEditor",
  data() {
    return {
      title: "",
      svg: {
        publish: `<svg t="1684157756388" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5216" width="200" height="200"><path d="M1023.62 43.23c0-23.02-18.83-41.85-41.85-41.85-7.84 0-14.64 2.1-20.92 5.75L25.48 500.96c-13.6 6.8-22.49 21.97-22.49 37.67 0 15.69 8.89 29.81 23.02 37.14l242.73 132.88c6.27 2.61 13.08 4.18 18.83 4.18 16.22 0 30.35-8.9 37.67-23.02 9.94-20.4 1.57-46.04-18.83-56.5l-169.49-95.73 679.03-359.91-426.9 518.95c-6.27 8.37-9.94 17.79-9.94 27.2v256.86c0 22.49 19.36 41.85 41.85 41.85 22.49 0 41.85-19.36 41.85-41.85V739.51l454.61-553.47-87.88 704.13-255.3-121.89c-5.23-3.14-11.51-4.19-18.31-4.19-16.22 0-30.34 8.89-37.66 23.54-4.71 9.94-5.76 21.45-2.1 31.91 3.66 10.99 10.99 19.36 20.92 24.07l308.13 145.43c5.23 3.14 11.51 4.18 18.31 4.18 6.28 0 13.08-1.57 19.36-4.71 12.03-6.28 20.4-17.79 21.97-30.87l118.75-909.21v-5.2z" p-id="5217"></path></svg>`,
      },
      noteId: null,
    }
  },
  computed: {
    ...mapState(["isLogin", "user"]),
  },
  created() {
    this.noteId = this.$route.params.noteId;
    this.getNoteByNoteId();
  },
  methods: {
    // 获取笔记, 当需要修改笔记时
    getNoteByNoteId() {
      // 如果不是数字, 就返回
      if(!(/\d+/.test(this.noteId))) {
        return;
      }
      this.sendRequest({
        path: "note/myNote",
        params: {
          noteId: this.noteId,
        },
        thenCallback: (response) => {
          let res = response.data;
          console.log(res);
          // 设置标题和笔记内容
          this.title = res.noteTitle;
          this.$bus.$emit("setNoteContent", res.noteContent);
        },
        errorCallback: (error) => {
          console.log(error);
        }
      });
    },
    // 点击发送笔记
    publishNote() {
      let note = {content: null};
      // 获取笔记内容
      this.$bus.$emit("getNoteContent", note);

      // 检查笔记标题
      if (!this.checkTitle(this.title)) {
        return;
      }
      // 检查笔记内容
      if (!this.checkContent(note.content)) {
        return;
      }
      // 当为 /buildnote/数字 结尾时表示当前是修改笔记, 为 /buildnote 结尾时则为发布笔记
      let path = this.noteId ? "note/modify" : "note/publish";

      this.sendRequest({
        path,
        method: "post",
        params: {
          noteId: this.noteId,
        },
        data: {
          title: this.title,
          content: note.content,
        },
        thenCallback: (response) => {
          let res = response.data;
          if (res === "addNewNoteSucceed") {
            this.huadiaoMiddleTip("发布成功!");
          } else if(res === "modifyNoteSucceed") {
            this.huadiaoMiddleTip("修改成功!");
          }
        },
        errorCallback: (error) => {
          console.log(error);
        }
      })
    },
    // 检查标题
    checkTitle(title) {
      if (title && 5 <= title.length && title.length <= 100) {
        return true;
      }
      this.huadiaoMiddleTip("标题长度应为 5~100");
      return false;
    },
    // 检查笔记内容
    checkContent(content) {
      if (content && content !== "") {
        return true;
      }
      this.huadiaoMiddleTip("笔记内容不能为空");
      return false;
    }
  },
  beforeDestroy() {
  },
  components: {
    TinymceEditor,
  }
}
</script>

<style>

/*隐藏 tinymce alert*/
.tox .tox-notifications-container .tox-notification {
  display: none;
}

.tox-tinymce {
  border: 0 !important;
  border-bottom-left-radius: 7px;
  border-bottom-right-radius: 7px;
}

.tox-editor-header {
  border-top: 1px solid #ccc !important;
}
</style>

<style scoped>

.note-textarea {
  padding: 72px 0;
  margin: 0 auto;
  width: 1200px;
  min-height: 800px;
}

.note-title {
  height: 50px;
}

#note-title {
  width: 100%;
  height: 100%;
  font-size: 16px;
  color: #656565;
  padding-left: 10px;
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
}

#note-title::-webkit-input-placeholder {
  font-size: 16px;
  color: #ccc;
}

.note-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: fixed;
  z-index: 10;
  bottom: 0;
  width: 100%;
  height: 55px;
  border-top: 1px solid #e7e7e7;
  background-color: #ffffff;
}

.publish-note {
  width: 80px;
  height: 36px;
  margin-right: 100px;
  border-radius: 20px;
  text-align: center;
  line-height: 36px;
  letter-spacing: 2px;
  color: #fff;
  background-color: #e3a313;
  cursor: pointer;
}

.publish-note:hover {
  background-color: #d09612;
}

.publish-icon /deep/ svg {
  width: 16px;
  height: 16px;
  fill: #fff;
  vertical-align: -2px;
  margin-right: 6px;
}

.publish-note:hover /deep/ svg {
  animation: publishIcon 1.2s forwards;
}

@keyframes publishIcon {
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(30px, -30px);
  }
  51% {
    transform: translate(-30px, 30px);
  }
  100% {
    transform: translate(0, 0);
  }
}
</style>