<template>
  <editor v-model="content"
          api-key="no-api-key"
          ref="tinymce"
          :init="tinymceInit"/>
</template>

<script>
import tinymce from 'tinymce/tinymce';
import Editor from '@tinymce/tinymce-vue';
import 'tinymce/themes/silver/theme';
// 列表插件
import 'tinymce/plugins/lists';
import 'tinymce/plugins/advlist';
// 上传图片插件
import 'tinymce/plugins/image';
import 'tinymce/plugins/imagetools';
// 表格插件
import 'tinymce/plugins/table';
// 自动识别链接插件
import 'tinymce/plugins/autolink';
// 预览插件
import 'tinymce/plugins/preview';
import 'tinymce/plugins/code';
import 'tinymce/plugins/wordcount';
import 'tinymce/plugins/link';
import 'tinymce/langs/zh_CN';
import 'tinymce/skins/ui/oxide/content.min.css';
import 'tinymce/skins/ui/oxide/skin.min.css';
import 'tinymce/skins/content/default/content.css';


export default {
  data() {
    return {
      content: "",
    };
  },
  computed: {
    tinymceInit() {
      return {
        // 根据窗口大小设置编辑器区域高度, 187 由测试得出
        height: window.innerHeight - 187,
        resize: false,
        toolbar_sticky: true,
        language: 'zh_CN',
        plugins: "lists link image table code wordcount",
        toolbar: "bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify|bullist numlist |outdent indent blockquote | undo redo | link unlink image code | removeformat",
        branding: false,
        paste_data_images: true,
      };
    },
  },
  mounted() {
    this.initial();
  },
  methods: {
    initial() {
      tinymce.init(this.tinymceInit);
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
@import "tinymce/skins/content/default/content.css";
@import "tinymce/skins/ui/oxide/content.css";
@import "tinymce/skins/ui/oxide/skin.css";
</style>