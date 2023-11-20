<template>
  <editor v-model="content"
          :init="init"/>
</template>

<script>
import tinymce from "tinymce";
import "tinymce/themes/silver";
import Editor from "@tinymce/tinymce-vue";
import "tinymce/themes/silver";
import "tinymce/plugins/image";
import "tinymce/plugins/link";
import "tinymce/plugins/code";
import "tinymce/plugins/table";
import "tinymce/plugins/lists";
import "tinymce/plugins/wordcount";
import "tinymce/icons/default/icons";
import "tinymce/models/dom";
import "tinymce/langs/zh_CN";

export default {
  data() {
    return {
      content: "",
      init: {
        language_url: "/tinymce/langs/zh_CN.js",
        language: "zh_CN",
        resize: false,
        toolbar_sticky: true,
        content_css: "tinymce/toolbar.css",
        plugins: "link lists image code table wordcount",
        toolbar: "bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify|bullist numlist |outdent indent blockquote | undo redo | link unlink image code | removeformat",
        branding: false,
        paste_data_images: true,
      },
    };
  },
  beforeMount() {
    // 根据窗口大小设置编辑器区域高度, 187 由测试得出
    this.init.height = window.innerHeight - 187;
  },
  mounted() {
    this.initial();
  },
  methods: {
    initial() {
      tinymce.init({});
      this.$bus.$on("getNoteContent", this.getNoteContent);
      this.$bus.$on("setNoteContent", this.setNoteContent);
    },
    // 获取笔记内容
    getNoteContent(note) {
      let activeEditor = tinymce.activeEditor;
      let editBody = activeEditor.getBody();
      activeEditor.selection.select(editBody);
      let text = activeEditor.selection.getContent({'format': 'text'});

      note.htmlContent = this.content;
      note.textContent = text;
    },
    // 设置笔记内容
    setNoteContent(content) {
      this.content = content;
    },
  },
  components: {
    Editor
  }
}
</script>

<style>
.tox .tox-promotion {
  display: none;
}
</style>

<style>
@import "tinymce/skins/ui/oxide/content.css";
@import "tinymce/skins/ui/oxide/skin.css";
</style>