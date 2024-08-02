<template>
  <ContextMenu v-bind="$props">
    <slot></slot>
    <ContextMenuItem @click="$emit('closeWindow')" class="window-task-context-menu-item">
      <div class="icon">
        <component :is="'CloseIcon'"/>
      </div>
      <div class="text">
        <div class="close-window">关闭窗口</div>
      </div>
    </ContextMenuItem>
  </ContextMenu>
</template>

<script>
import ContextMenu from "@/pages/components/contextmenu/ContextMenu";
import ContextMenuItem from "@/pages/components/contextmenu/ContextMenuItem";
import useContextMenu from "@/pages/components/contextmenu/useContextMenu";
import CloseIcon from "@/pages/components/window/icon/color/CloseIcon";

const {props} = useContextMenu();

export default {
  name: "WindowTaskContextMenu",

  props,

  emits: ["closeWindow"],

  components: {
    ContextMenuItem,
    ContextMenu,
    CloseIcon,
  },
}
</script>

<style scoped lang="scss">

.window-task-context-menu-item::v-deep {
  display: flex;
  align-items: center;
  padding: 4px 8px;

  .icon svg {
    width: 15px;
    height: 15px;
    vertical-align: -2px;
  }

  .text {
    margin-left: 8px;
    font-size: 14px;
  }
}

</style>