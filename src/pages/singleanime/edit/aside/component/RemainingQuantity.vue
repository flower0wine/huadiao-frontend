<template>
  <div class="remaining-quantity">
    <span class="quantity">{{ remainingQuantity }}</span>
  </div>
</template>

<script>
export default {
  name: "RemainingQuantity",

  props: {
    remainingQuantity: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style scoped>

</style>