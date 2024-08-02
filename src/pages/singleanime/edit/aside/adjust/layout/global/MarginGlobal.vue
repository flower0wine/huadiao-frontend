<template>
  <AdjustItem title="调整边距">
    <div class="adjust-item-content">
      <label for="adjust-padding">调整内边距：</label>
      <input type="number"
             id="adjust-padding"
             v-model.number="padding"
             min="0"
             max="50"
             step="1">
      <span>像素</span>
    </div>
    <div class="adjust-item-content">
      <label for="adjust-margin">调整外边距：</label>
      <input type="number"
             id="adjust-margin"
             v-model.number="margin"
             min="0"
             max="50"
             step="1">
      <span>像素</span>
    </div>
  </AdjustItem>
</template>

<script>
import AdjustItem from "@/pages/singleanime/edit/aside/adjust/AdjustItem";
export default {
  name: "MarginGlobal",

  components: {AdjustItem},

  computed: {
    padding: {
      get() {
        return this.$store.state.pageLayout.padding;
      },
      set(value) {
        this.$store.commit("pageLayout/setPadding", value);
      }
    },

    margin: {
      get() {
        return this.$store.state.pageLayout.margin;
      },
      set(value) {
        this.$store.commit("pageLayout/setMargin", value);
      }
    }
  }
}
</script>

<style scoped lang="scss">
.adjust-item-content {
  height: 40px;
  display: flex;
  align-items: center;

  input {
    width: 50px;
    height: 30px;
    margin: 0 10px;
    border-radius: 4px;
    padding: 0 5px;
  }
}
</style>