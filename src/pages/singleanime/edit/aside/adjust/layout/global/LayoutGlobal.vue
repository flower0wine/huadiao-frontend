<template>
  <AdjustItem title="组件布局">
    <div class="choose-layout" @mousedown="mousedown" :style="chooseLayoutStyle">
      <div class="item" v-for="i in layoutRows * layoutCols" :key="i" ref="items"></div>
    </div>
    <div class="choose-layout-tools">
      <div class="line-one">
        <div class="name-input-tool tool">
          <span>区域名称:</span>
          <input type="text" placeholder="名称可选填" v-model="layoutName">
          <div class="name-exist" v-if="layoutNameExists">名称已存在</div>
        </div>
      </div>
      <div class="line-two">
        <div class="store-tool tool" @click="storeLayout">
          <span>存储布局</span>
        </div>
        <div class="reset-tool tool" @click="reset">
          <span>重置布局</span>
        </div>
      </div>
    </div>
  </AdjustItem>
</template>

<script>
import AdjustItem from "@/pages/singleanime/edit/aside/adjust/AdjustItem";
import {mapGetters, mapMutations, mapState} from "vuex";
import {DomHandler, Checker} from "@/util";
import {
  ACTIVE_CLASS_NAME,
  SELECTED_CLASS_NAME,
  USED_CLASS_NAME,
} from "@/constant";

let position;

const {addOrRemoveClassNames} = DomHandler;
const {isNumber} = Checker;

export default {
  name: "LayoutGlobal",

  components: {AdjustItem},

  data() {
    return {
      layoutName: "",
      layoutNameExists: false,
    }
  },

  computed: {
    ...mapState("pageLayout", [
      "layoutList",
      "layoutRows",
      "layoutCols",
      "activeLayoutIndex"
    ]),

    ...mapGetters("pageLayout", ["nameExist"]),

    chooseLayoutStyle() {
      return `--layout-cols: ${this.layoutCols};`;
    },
  },

  mounted() {
    this.patchAddUsedClass(this.layoutList);
  },

  watch: {
    layoutName(newVal) {
      this.layoutNameExists = this.nameExist(newVal);
    },

    layoutList: {
      handler(layoutList) {
        this.patchAddUsedClass(layoutList);
      }
    },

    activeLayoutIndex(index) {
      if (isNumber(index)) {
        const layout = this.layoutList[index];
        const {startX, startY, endX, endY} = layout.position;
        const firstItem = this.$refs.items[startX + startY * this.layoutCols];

        // 防止重复触发
        if (firstItem.classList.contains(ACTIVE_CLASS_NAME)) {
          return;
        }

        let rectItems;

        // 获取到当前区域的元素
        this.rectIndexEach(startX, startY, endX, endY, (items) => {
          rectItems = items;
        });

        this.addActiveClass(rectItems);

        const callback = () => {
          firstItem.removeEventListener("animationend", callback);
          this.removeActiveClass(rectItems);
        };

        firstItem.addEventListener("animationend", callback);
      }
    }
  },

  methods: {
    ...mapMutations("pageLayout", [
      "addLayout",
      "resetLayout",
    ]),

    storeLayout() {
      if (position && !this.nameExist(this.layoutName)) {
        this.addLayout({
          name: this.layoutName,
          position,
        });
      }

      this.clear();
    },

    clear() {
      position = null;
      this.layoutName = "";
      this.removeSelectedClass();
    },

    reset() {
      this.clear();
      this.resetLayout();
    },

    mousedown(e) {
      const currentTarget = e.currentTarget;
      const rect = currentTarget.getBoundingClientRect();
      const itemSize = currentTarget.children[0].offsetWidth;

      // 因为 e.pageX 和 e.pageY 相对于页面的左上角, e.screenX 和 e.screenY 相对于屏幕的左上角
      // clientX 和 clientY 相对于可视区域的左上角
      const startX = e.clientX - rect.left;
      const startY = e.clientY - rect.top;

      let moveX = startX,
          moveY = startY;

      const minX = 0;
      const maxX = this.layoutCols * itemSize;
      const minY = 0;
      const maxY = this.layoutRows * itemSize;

      function clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
      }

      const handler = () => {
        let startXIndex = this.getRangeIndex(startX, this.layoutCols, itemSize);
        let startYIndex = this.getRangeIndex(startY, this.layoutRows, itemSize);
        let endXIndex = this.getRangeIndex(moveX, this.layoutCols, itemSize);
        let endYIndex = this.getRangeIndex(moveY, this.layoutRows, itemSize);

        if (startXIndex > endXIndex) {
          [startXIndex, endXIndex] = [endXIndex, startXIndex];
        }

        if (startYIndex > endYIndex) {
          [startYIndex, endYIndex] = [endYIndex, startYIndex];
        }

        this.removeSelectedClass();

        this.rectIndexEach(
            startXIndex,
            startYIndex,
            endXIndex,
            endYIndex,
            this.addSelectedClass
        );

        position = {
          startX: startXIndex,
          startY: startYIndex,
          endX: endXIndex,
          endY: endYIndex
        };
      }

      const move = (e) => {
        moveX = clamp(e.clientX - rect.left, minX, maxX);
        moveY = clamp(e.clientY - rect.top, minY, maxY);

        handler();
      }

      const up = () => {
        window.removeEventListener("mousemove", move);
        window.removeEventListener("mouseup", up);
      }

      handler();

      window.addEventListener("mousemove", move);
      window.addEventListener("mouseup", up);
    },

    /**
     * 计算 value 在区间中索引 <br>
     * 如 step 为 3, itemSize 为 10, value 为 15,
     * 因为 15 在 10 ~ 20 之间, 所以返回 1, 索引从 0 开始
     */
    getRangeIndex(value, step, itemSize) {
      let index = 0,
          sum = itemSize;

      while (sum < value) {
        sum += itemSize;
        index++;
      }

      return index;
    },

    /**
     * 迭代索引范围内的元素
     */
    rectIndexEach(startX, startY, endX, endY, handler) {
      const items = this.$refs.items;
      const elements = [];

      for (let i = startX; i <= endX; i++) {
        for (let j = startY; j <= endY; j++) {
          elements.push(items[i + j * this.layoutCols]);
        }
      }

      handler(elements);
    },

    /**
     * 批量添加 used 类名
     */
    patchAddUsedClass(layoutList) {
      this.removeUsedClass();

      for (let i = 0; i < layoutList.length; i++) {
        const {startX, startY, endX, endY} = layoutList[i].position;

        // 可能的耗时操作, 异步执行
        window.setTimeout(() => {
          this.rectIndexEach(startX, startY, endX, endY, this.addUsedClass);
        });
      }
    },

    addSelectedClass(items) {
      addOrRemoveClassNames(items, SELECTED_CLASS_NAME, true);
    },

    removeSelectedClass() {
      addOrRemoveClassNames(this.$refs.items, SELECTED_CLASS_NAME, false);
    },

    addUsedClass(items) {
      addOrRemoveClassNames(items, USED_CLASS_NAME, true);
    },

    removeUsedClass() {
      addOrRemoveClassNames(this.$refs.items, USED_CLASS_NAME, false);
    },

    addActiveClass(items) {
      addOrRemoveClassNames(items, ACTIVE_CLASS_NAME, true);
    },

    removeActiveClass(items) {
      addOrRemoveClassNames(items, ACTIVE_CLASS_NAME, false);
    },
  }
}
</script>

<style scoped lang="scss">
@import "~@/pages/singleanime/edit/aside/animation.scss";

@include flicker-animation(6);

.choose-layout {
  --layout-cols: 0;
  display: grid;
  width: 100%;
  grid-template-columns: repeat(var(--layout-cols), 1fr);
  background-color: #fff;
  user-select: none;

  .item {
    $delay: 0.3s;

    aspect-ratio: 1 / 1;
    border: 1px solid #eee;
    transition: background-color #{$delay} linear;

    &.selected {
      background-color: #2196d5;
    }

    &.used {
      background-color: #dedede;
    }

    &.active {
      background-color: #f44336;
      // animation-delay: #{$delay} 避免与 transition 冲突
      animation: flicker 2s #{$delay} linear forwards;
    }
  }
}

.choose-layout-tools {
  padding-top: 10px;

  $storeToolBgColor: #4caf50;
  $resetToolBgColor: #f44336;

  .line-two {
    display: flex;
    justify-content: space-around;
  }

  .tool {
    padding: 6px 12px;
    border-radius: 6px;
    color: #fff;
    cursor: pointer;
  }

  .name-input-tool {
    .name-exist {
      margin-top: 5px;
      font-size: 12px;
      color: #f44336;
    }

    input {
      width: 100px;
      height: 30px;
      border-radius: 6px;
      padding-left: 6px;
      margin-left: 10px;
    }
  }

  .store-tool {
    background-color: #{$storeToolBgColor};

    &:hover {
      background-color: darken($storeToolBgColor, 3%);
    }
  }

  .reset-tool {
    background-color: #{$resetToolBgColor};

    &:hover {
      background-color: darken($resetToolBgColor, 6%);
    }
  }
}
</style>