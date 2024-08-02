<template>
  <div class="adjust-item">
    <header class="item-header">{{ $props.title }}</header>
    <main class="item-main">
      <slot></slot>
    </main>
  </div>
</template>

<script>
export default {
  name: "AdjustItem",

  props: {
    title: {
      type: String,
      required: true
    },

  }
}
</script>

<style scoped lang="scss">
@import "./adjust.scss";

</style>