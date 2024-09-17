<template>
  <div class="forum-content-header">
    <header class="header-list" @mouseleave="moveToCurrentItem">
      <div class="header-item"
           :class="{active: currentIndex === index}"
           v-for="(item, index) in headerItem"
           :key="index"
           ref="headerItemList"
      >
        <div class="header-item-content"
             :class="{active: currentIndex === index}"
             @click="changeCurrentIndex(index)"
             @mousemove="moveNavUnderline(index)"
        >{{ item.title }}</div>
      </div>

      <div class="nav-underline" :style="underLineConfig"></div>
    </header>
  </div>
</template>

<script>
export default {
  name: "ForumContentHeader",

  data() {
    return {
      currentIndex: 0,
      movingIndex: -1,
      headerItem: [{
        title: "推荐",
      }, {
        title: "最新",
      }],

      underLineConfig: {
        width: 0,
        left: 0,
      },
    }
  },

  mounted() {
    this.moveToCurrentItem();
  },

  methods: {
    moveToCurrentItem() {
      this.moveNavUnderline(this.currentIndex);
    },

    changeCurrentIndex(index) {
      this.currentIndex = index;
    },

    /**
     * 移动到指定导航子项的底部
     * @param index {number} 索引
     */
    moveNavUnderline(index) {
      if (index === this.movingIndex) {
        return;
      }

      this.movingIndex = index;
      let headerItemList = this.$refs.headerItemList;
      let width = getComputedStyle(headerItemList[index].children[0]).width;
      let headerItemMargin = 20;
      let left = headerItemMargin;

      for (let i = 0; i < index; i++) {
        let width = +getComputedStyle(headerItemList[i].children[0]).width.split("px")[0];
        left += width + (headerItemMargin << 1);
      }

      this.underLineConfig = {
        width,
        left: `${left}px`,
      };
    },
  },
}
</script>

<style scoped lang="scss">
@import "../../scss/forum/variables/index.scss";

$forumHeaderTextColor: #919191;
$forumHeaderTextColorActive: #cfcfcf;
$forumHeaderHeight: 60px;
$headerItemMargin: 20px;

.forum-content-header {
  display: flex;
  height: $forumHeaderHeight;
  border-bottom: 1px solid $forumBorderColor;
}

.header-list {
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  color: $forumHeaderTextColor;
  transition: all 300ms;
}

.header-item {
  display: block;
  height: 100%;
  text-align: center;
  cursor: pointer;
  color: $forumHeaderTextColor;

  &.active {
    color: $forumHeaderTextColorActive;
  }

  &:hover .header-item-content {
    color: $forumHeaderTextColorActive;
  }
}

.header-item-content {
  line-height: $forumHeaderHeight;
  margin: 0 $headerItemMargin;
  transition: color 200ms;
}

.nav-underline {
  position: absolute;
  bottom: 0;
  height: 3px;
  background-color: #fff;
  transition: all 300ms;
}
</style>
