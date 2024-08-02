<template>
  <div class="page-layout">
    <MarginGlobal/>
    <LayoutGlobal/>
    <LayoutGlobalOperator/>
  </div>
</template>

<script>
import MarginGlobal from "@/pages/singleanime/edit/aside/adjust/layout/global/MarginGlobal";
import LayoutGlobal from "@/pages/singleanime/edit/aside/adjust/layout/global/LayoutGlobal";
import localforage from "localforage";
import LayoutGlobalOperator from "@/pages/singleanime/edit/aside/adjust/layout/global/LayoutGlobalOperator";
import {mapMutations, mapState} from "vuex";

const ANIME_LAYOUT_KEY = "anime-layout";

export default {
  name: "PageLayout",

  components: {
    LayoutGlobalOperator,
    LayoutGlobal,
    MarginGlobal
  },

  computed: {
    ...mapState("pageLayout", [
        "layoutList"
    ]),
  },

  beforeCreate() {
    localforage.getItem(ANIME_LAYOUT_KEY).then(layoutList => {
      if (layoutList) {
        this.setLayoutList(layoutList);
      }
    });
  },

  watch: {
    layoutList: {
      deep: true,
      immediate: true,
      handler(layoutList) {
        localforage.setItem(ANIME_LAYOUT_KEY, layoutList);
      }
    }
  },

  methods: {
    ...mapMutations("pageLayout", [
        "setLayoutList",
    ])
  },
}
</script>

<style scoped lang="scss">
@import "../../../aside-board";

.page-layout::v-deep {
  .adjust-item {
    padding: 0 10px;

    .item-header {
      margin-top: 10px;
    }

    &:nth-child(n + 2) {
      border-top: 1px solid #e7e7e7;
    }
  }
}
</style>