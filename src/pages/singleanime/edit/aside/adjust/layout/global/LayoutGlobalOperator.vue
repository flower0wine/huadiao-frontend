<template>
  <AdjustItem title="布局操作">
    <div class="layout-list" @mouseleave="inactiveLayout">
      <div class="layout-item"
           title="点击定位布局"
           v-for="(item, index) in layoutList"
           :key="item.name"
           @click="activateLayout(index)">
        <div class="layout-info">
          <div class="layout-name">{{item.name}}</div>
        </div>
        <div class="tool-list">
          <div class="tool delete-tool" @click.stop="deleteLayout(index)">
            <span>删除</span>
          </div>
        </div>
      </div>
    </div>
  </AdjustItem>
</template>

<script>
import {mapMutations, mapState} from "vuex";
import AdjustItem from "@/pages/singleanime/edit/aside/adjust/AdjustItem";

export default {
  name: "LayoutGlobalOperator",

  components: {AdjustItem},

  computed: {
    ...mapState("pageLayout", [
        "layoutList",
    ]),
  },

  created() {
    window.addEventListener("click", this.inactiveLayout);
  },

  beforeDestroy() {
    window.removeEventListener("click", this.inactiveLayout);
  },

  methods: {
    ...mapMutations("pageLayout", [
        "setActiveLayoutIndex",
        "removeLayout",
    ]),

    activateLayout(index) {
      this.setActiveLayoutIndex(index);
    },

    inactiveLayout() {
      // 设置为 null
      this.setActiveLayoutIndex(null);
    },

    deleteLayout(index) {
      this.removeLayout(index);
    }
  }
}
</script>

<style scoped lang="scss">
.layout-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  padding: 0 10px;
  margin-bottom: 10px;
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  cursor: pointer;

  .layout-info {
    color: #626262;
  }

  &:hover {
    background-color: #dedede;
  }
}

.tool-list {
  display: flex;
  align-items: center;

  $deleteToolColor: #f56c6c;

 .delete-tool {
    background-color: #{$deleteToolColor};
    color: #fff;

    &:hover {
      background-color: darken($deleteToolColor, 5%);
    }
  }

  .tool {
    flex-grow: 1;
    border-radius: 6px;
    padding: 3px 6px;
    cursor: pointer;
  }
}
</style>