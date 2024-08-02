<template>
  <div class="edit-component">
    <div class="edit-item edit-width">
      <NumberInput :model-value="cache.width"
                   unit="px"
                   @update="updateWidth">
        <span class="edit-title">修改宽度</span>
      </NumberInput>
    </div>
    <div class="edit-item edit-height">
      <NumberInput :model-value="cache.height"
                   unit="px"
                   @update="updateHeight">
        <span class="edit-title">修改高度</span>
      </NumberInput>
    </div>
  </div>
</template>

<script>
import NumberInput from "@/pages/components/input/NumberInput";
import {EDIT_COMPONENT_NAME} from "@/pages/singleanime/edit/content/anime-component-config";

export default {
  name: EDIT_COMPONENT_NAME,

  emits: ["update", "preview", "cancel"],

  props: {
    data: {
      type: Object,
      required: true,
    }
  },

  data() {
    return {
      cache: {
        ...this.data,
      }
    };
  },

  computed: {
    // 预览数据
    previewData() {
      return {
        ...this.cache,
      };
    },

    // 原始数据
    originalData() {
      return {
        ...this.data,
      };
    }
  },

  methods: {
    preview() {
      this.$emit("preview", this.previewData);
    },

    update() {
      this.$emit("update", this.previewData);
    },

    cancel() {
      this.$emit("cancel", this.originalData);
    },

    updateWidth(width) {
      this.cache.width = width;
      this.preview();
    },

    updateHeight(height) {
      this.cache.height = height;
      this.preview();
    },
  },

  components: {
    NumberInput
  },
}
</script>

<style scoped lang="scss">
.edit-component {
  width: 100%;
  height: 100%;
  padding: 20px;
}

.edit-item {
  margin-bottom: 15px;
}

</style>