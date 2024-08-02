<template>
  <Teleport :to="to"
            :disabled="disabled">
    <div class="context-menu"
         :style="style"
         ref="menu"
         @contextmenu.prevent="">
      <slot></slot>
    </div>
  </Teleport>
</template>

<script>
import Teleport from "@/pages/components/Teleport";
import useContextMenu from "@/pages/components/contextmenu/useContextMenu";

const {props} = useContextMenu();

export default {
  name: "ContextMenu",

  props: {
    to: {
      type: [String, HTMLElement],
      default: "body"
    },

    disabled: {
      type: Boolean,
      default: false
    },

    ...props,
  },

  data() {
    return {
      style: {
        visibility: "hidden",
      },
    }
  },

  computed: {
    menu() {
      return this.$refs.menu;
    },
  },

  mounted() {
    this.setStyle();
  },

  watch: {
    top() {
      this.setStyle();
    },

    left() {
      this.setStyle();
    },
  },

  methods: {
    setStyle() {
      let { top: clickedTop, left: clickedLeft } = this;
      let top = clickedTop,
          left = clickedLeft,
          position;

      const rect = this.menu.getBoundingClientRect();

      // 自定义菜单位置
      if (this.customPosition) {
        position = this.customPosition(rect, clickedTop, clickedLeft);

        top = position.top;
        left = position.left;
      }

      const { innerWidth, innerHeight } = window;

      // 不让菜单超出窗口边界
      if (top < 0) {
        top = 0;
      } else if (top + rect.height > innerHeight) {
        top = innerHeight - rect.height;
      }

      if (left < 0) {
        left = 0;
      } else if (left + rect.width > innerWidth) {
        left = innerWidth - rect.width;
      }

      this.style = {
        top: `${top}px`,
        left: `${left}px`,
      };
    }
  },

  components: {Teleport},
}
</script>


<style scoped lang="scss">
@import "./index.scss";

.context-menu {
  position: absolute;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  background-color: #{$backgroundColor};
}

</style>