<template>
  <div class="context-menu-item" @click="$emit('click')">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "ContextMenuItem",

  emits: ["click"],
}
</script>

<style scoped lang="scss">
@import "./index.scss";

.context-menu-item {
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: darken($backgroundColor, 5%);
  }

  &:first-child {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }

  &:last-child {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  &:nth-child(n + 2) {
    border-top: 1px solid darken($backgroundColor, 5%);
  }
}
</style>