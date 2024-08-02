<template>
  <ContextMenu v-bind="$props">
    <ContextMenuItem @click="$emit('delete')">
      <span>删除</span>
    </ContextMenuItem>
    <ContextMenuItem @click="$emit('edit')">
      <span>编辑</span>
    </ContextMenuItem>
  </ContextMenu>
</template>

<script>
import ContextMenu from "@/pages/components/contextmenu/ContextMenu";
import ContextMenuItem from "@/pages/components/contextmenu/ContextMenuItem";
import useContextMenu from "@/pages/components/contextmenu/useContextMenu";

const {props} = useContextMenu();

export default {
  name: "ComponentContextMenu",

  props,

  emits: ["delete", "edit"],

  components: {
    ContextMenuItem,
    ContextMenu,
  },
}
</script>

<style scoped lang="scss">
</style>