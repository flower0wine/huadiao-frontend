<template>
  <div class="resize-controls">
    <div class="controls side-controls">
      <div class="control left-resie"
           @mousedown.stop="handleSideMouseDown($event, WINDOW_RESIZE_KEY.RESIZE_WINDOW_LEFT_SIDE_KEY)"></div>
      <div class="control right-resize"
           @mousedown.stop="handleSideMouseDown($event, WINDOW_RESIZE_KEY.RESIZE_WINDOW_RIGHT_SIDE_KEY)"></div>
      <div class="control top-resize"
           @mousedown.stop="handleSideMouseDown($event, WINDOW_RESIZE_KEY.RESIZE_WINDOW_TOP_SIDE_KEY)"></div>
      <div class="control bottom-resize"
           @mousedown.stop="handleSideMouseDown($event, WINDOW_RESIZE_KEY.RESIZE_WINDOW_BOTTOM_SIDE_KEY)"></div>
    </div>
    <div class="controls corner-controls">
      <div class="control top-left-resize"
           @mousedown.stop="handleCornerMouseDown($event, WINDOW_RESIZE_KEY.RESIZE_WINDOW_TOP_LEFT_CORNER_KEY)"></div>
      <div class="control top-right-resize"
           @mousedown.stop="handleCornerMouseDown($event, WINDOW_RESIZE_KEY.RESIZE_WINDOW_TOP_RIGHT_CORNER_KEY)"></div>
      <div class="control bottom-left-resize"
           @mousedown.stop="handleCornerMouseDown($event, WINDOW_RESIZE_KEY.RESIZE_WINDOW_BOTTOM_LEFT_CORNER_KEY)"></div>
      <div class="control bottom-right-resize"
           @mousedown.stop="handleCornerMouseDown($event, WINDOW_RESIZE_KEY.RESIZE_WINDOW_BOTTOM_RIGHT_CORNER_KEY)"></div>
    </div>
  </div>
</template>

<script>
import {WINDOW_RESIZE_KEY} from "@/pages/components/window/window-config.js";
import {isMainMouseButton} from "@/util/mouse-button";

let selectedKey = null;

export default {
  name: "ResizeControl",

  emits: ["mousedown", "resize", "mouseup"],

  computed: {
    WINDOW_RESIZE_KEY() {
      return WINDOW_RESIZE_KEY;
    },
  },

  methods: {
    handleMousedown(e, key) {
      if(!isMainMouseButton(e)) {
        return;
      }

      selectedKey = key;
      this.bindEvents();

      this.$emit("mousedown", e);
    },

    handleSideMouseDown(e, key) {
      this.handleMousedown(e, key);
    },

    handleCornerMouseDown(e, key) {
      this.handleMousedown(e, key);
    },

    mousemove(e) {
      this.$emit("resize", e, selectedKey);
    },

    mouseup() {
      window.removeEventListener('mousemove', this.mousemove);
      window.removeEventListener('mouseup', this.mouseup);

      selectedKey = null;
      this.$emit("mouseup");
    },

    bindEvents() {
      window.addEventListener('mousemove', this.mousemove);
      window.addEventListener('mouseup', this.mouseup);
    },
  },

  beforeDestroy() {
    this.mouseup();
  }
}
</script>

<style scoped lang="scss">
$size: 10px;

.resize-controls {
  user-select: none;
}

.side-controls {
  .control {
    position: absolute;
  }

  .left-resie,
  .right-resize {
    top: 0;
    width: #{$size};
    height: 100%;
  }

  .top-resize,
  .bottom-resize {
    width: 100%;
    height: #{$size};
  }

  .left-resie {
    left: 0;
    transform: translateX(-50%);
    cursor: ew-resize;
  }

  .right-resize {
    right: 0;
    transform: translateX(50%);
    cursor: ew-resize;
  }

  .top-resize {
    top: 0;
    transform: translateY(-50%);
    cursor: ns-resize;
  }

  .bottom-resize {
    bottom: 0;
    transform: translateY(50%);
    cursor: ns-resize;
  }
}

.corner-controls {
  .control {
    position: absolute;
    width: #{$size};
    height: #{$size};
  }

  .top-left-resize {
    top: 0;
    left: 0;
    transform: translate(-50%, -50%);
    cursor: nwse-resize;
  }

  .top-right-resize {
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
    cursor: nesw-resize;
  }

  .bottom-left-resize {
    bottom: 0;
    left: 0;
    transform: translate(-50%, 50%);
    cursor: nesw-resize;
  }

  .bottom-right-resize {
    bottom: 0;
    right: 0;
    transform: translate(50%, 50%);
    cursor: nwse-resize;
  }
}
</style>