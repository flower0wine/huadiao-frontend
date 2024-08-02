<template>
  <div class="window-task"
       ref="windowTask"
       :title="info.name"
       @click.stop="apis.show"
       @contextmenu.prevent="showContextMenu">
    <slot name="default"></slot>
    <WindowTaskContextMenu v-if="contextMenuVisible"
                           :top="contextMenu.top"
                           :left="contextMenu.left"
                           :custom-position="customPosition"
                           @closeWindow="apis.close">
      <slot name="menu"></slot>
    </WindowTaskContextMenu>
  </div>
</template>

<script>
import WindowTaskContextMenu from "@/pages/components/window/taskbar/WindowTaskContextMenu";
import {addClickCallback, removeClickCallback} from "@/util/mouse-event";

let clickCallback = null;

export default {
  name: "WindowTask",

  data() {
    return {
      contextMenuVisible: false,
      contextMenu: {
        top: 0,
        left: 0,
      },
    };
  },

  props: {
    apis: {
      type: Object,
      required: true,
    },

    customMenuPosition: {
      type: Function,
      required: false,
    },

    info: {
      type: Object,
      required: true,
    },
  },

  computed: {
    windowTask() {
      return this.$refs.windowTask;
    },
  },

  mounted() {
    clickCallback = this.hideContextMenu.bind(this);
    addClickCallback(clickCallback);
  },

  beforeDestroy() {
    removeClickCallback(clickCallback);
  },

  methods: {

    showContextMenu(e) {
      const { clientX, clientY } = e;

      this.contextMenu.top = clientY;
      this.contextMenu.left = clientX;

      this.contextMenuVisible = true;
    },

    hideContextMenu() {
      this.contextMenuVisible = false;
    },

    customPosition(menuRect) {
      return this.customMenuPosition(menuRect, this.windowTask.getBoundingClientRect());
    }
  },

  components: {
    WindowTaskContextMenu
  },
}
</script>

<style scoped lang="scss">

</style>