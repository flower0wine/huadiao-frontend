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
import {ResponseHandler} from "@/assets/js/utils";
import {apis} from "@/assets/js/constants/request-path";
import {svg} from "@/assets/js/constants/svgs";

export default {
  name: "HuadiaoEditor",
  data() {
    return {
      title: "",
      svg: {
        publish: svg.publish,
      },
      noteId: null,
    }
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
        path: apis.note.edit,
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
      let note = {
        textContent: null,
        htmlContent: null
      };
      // 获取笔记内容
      this.$bus.$emit("getNoteContent", note);

      // 检查笔记标题
      if (!this.checkTitle(this.title)) {
        return;
      }
      // 检查笔记内容
      if (!this.checkContent(note.textContent)) {
        return;
      }
      // 对纯文本内容裁切
      if(note.textContent.length > 300) {
        note.textContent = note.textContent.substring(0, 300);
      }
      // 当为 /buildnote/数字 结尾时表示当前是修改笔记, 为 /buildnote 结尾时则为发布笔记
      let path = this.noteId ? apis.note.modify : apis.note.publish;

      this.sendRequest({
        path,
        method: "post",
        params: {
          noteId: this.noteId,
        },
        data: {
          title: this.title,
          summary: note.textContent,
          content: note.htmlContent,
        },
        thenCallback: (response) => {
          let res = response.data;
          new ResponseHandler(res).succeed(() => {
            this.huadiaoMiddleTip("发布成功!");
          });
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
  overflow: hidden;
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