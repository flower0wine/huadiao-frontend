<template>
  <Teleport to="body">
    <div class="window"
         :style="windowStyle"
         v-if="windowVisible.render"
         @mousedown.stop="handleWindowRank"
         ref="window"
         v-show="windowVisible.show">
      <header @mousedown="handleHeaderMouseDown">
        <div class="window-name">
          <div class="icon">
            <component :is="icon"/>
          </div>
          <div class="title">{{ name }}</div>
        </div>
        <WindowControl :is-maximized="isMaximized"
                       @minimize="minimizeWindow"
                       @maximize="maximizeWindow"
                       @close="closeWindow"
                       @restore="restoreWindow"/>
      </header>
      <main>
        <slot></slot>
      </main>
      <ResizeControl v-show="!isMaximized"
                     @mousedown="handleResizeControlMouseDown"
                     @resize.stop="handleResize"/>
    </div>
  </Teleport>
</template>

<script>
import Teleport from "@/pages/components/Teleport";
import WindowControl from "@/pages/components/window/control/WindowControl";
import ResizeControl from "@/pages/components/window/control/ResizeControl";
import useResizeControl from "@/pages/components/window/control/useResizeControl";
import useWindowControl from "@/pages/components/window/control/useWindowControl";
import useWindow from "@/pages/components/window/useWindow";
import {
  addWindowTask,
  removeWindowTask,
  getMaxMappingNumber,
} from "@/pages/components/window/window-manager";
import DefaultWindowIcon from "@/pages/components/window/icon/DefaultWindowIcon";


const {
  handleResizeControlMouseDown,
  handleResize
} = useResizeControl();

const {
  props,
  emits,
  handleWindowRank,
  handleHeaderMouseDown,
  handleBrowserResize,
  setWidth,
  setHeight,
} = useWindow();

const {
  exposeWindowApis,

  restoreInfo,
  storeInfo,

  closeWindow,
  maximizeWindow,
  minimizeWindow,
  restoreWindow,

  showWindow,
  hideWindow,
  destroy,
} = useWindowControl();


export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Window",

  emits,

  props,

  data() {
    return {
      top: 0,
      left: 0,
      windowWidth: 0,
      windowHeight: 0,
      transition: "",

      windowVisible: {
        render: true,
        show: true,
      },

      isMaximized: false,
    };
  },

  created() {
    this.setWidth(this.width);
    this.setHeight(this.height);

    this.top = (window.innerHeight - this.windowHeight) / 2;
    this.left = (window.innerWidth - this.windowWidth) / 2;

    this.getWindowApis(this.exposeApis);

    window.addEventListener("resize", this.handleBrowserResize);
  },

  mounted() {
    addWindowTask(this.windowInfo);

    this.window.style.zIndex = getMaxMappingNumber();
  },

  beforeDestroy() {
    removeWindowTask(this.taskBarId, this.id);

    window.removeEventListener("resize", this.handleBrowserResize);
  },

  methods: {
    handleResizeControlMouseDown,

    handleResize,

    exposeWindowApis,

    restoreInfo,
    storeInfo,

    showWindow,
    hideWindow,
    destroy,

    closeWindow,
    restoreWindow,
    minimizeWindow,
    maximizeWindow,

    handleWindowRank,
    handleHeaderMouseDown,
    handleBrowserResize,

    setWidth,
    setHeight,
  },

  computed: {
    window() {
      return this.$refs.window;
    },

    windowStyle() {
      return {
        width: `${this.windowWidth}px`,
        height: `${this.windowHeight}px`,
        top: `${this.top}px`,
        left: `${this.left}px`,
        transition: `${this.transition}`,
      };
    },

    exposeApis() {
      return this.exposeWindowApis();
    },

    windowInfo() {
      return {
        id: this.id,
        el: this.window,
        taskBarId: this.taskBarId,
        icon: this.icon,
        name: this.name,
        apis: this.exposeApis,
      };
    }
  },

  watch: {
    width(val) {
      this.setWidth(val);
    },

    height(val) {
      this.setHeight(val);
    }
  },

  components: {
    ResizeControl,
    WindowControl,
    Teleport,
    DefaultWindowIcon,
  },
}
</script>

<style scoped lang="scss">
$headerHeight: 40px;

.window {
  position: fixed;
  z-index: 1;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  overflow: hidden;

  header {
    position: relative;
    height: #{$headerHeight};
    line-height: #{$headerHeight};
    color: #fff;
    background-color: #5b5b5b;
    user-select: none;
  }

  main {
    height: calc(100% - #{$headerHeight});
    overflow: hidden;
  }
}

.window-name {
  display: flex;
  align-items: center;

  .title {
    font-size: 14px;
  }

  & > .icon {
    padding-inline: 10px;

    svg {
      width: 20px;
      height: 20px;
    }
  }
}

</style>