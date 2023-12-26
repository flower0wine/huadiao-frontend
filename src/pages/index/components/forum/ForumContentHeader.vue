<template>
  <div class="forum-content-header">
    <header class="header-list" @mouseleave="mouseleaveResetUnderline">
      <router-link class="header-item"
                   v-for="(item, index) in headerItem"
                   @click.native="changeCurrentIndex(index)"
                   @mousemove.native="mouseoverToMoveUnderline(index)"
                   active-class="active"
                   :class="judgeHeaderItemActive(item.alias)"
                   :to="concatQueryPath(item.to)"
                   :key="index"
                   ref="headerItemList">
        <div class="header-item-content">{{ item.title }}</div>
      </router-link>
      <div class="nav-underline" ref="navUnderline"></div>
    </header>
  </div>
</template>

<script>
const headerItemMargin = 20;
const rootPath = "/";

export default {
  name: "ForumContentHeader",
  data() {
    return {
      currentIndex: 0,
      movingIndex: -1,
      headerItem: [{
        title: "推荐",
        to: rootPath,
        alias: [rootPath]
      }, {
        title: "最新",
        to: "newest",
      }],
    }
  },
  computed: {
    routeFullPath() {
      return this.$route.fullPath;
    },
    routeQuery() {
      return this.$route.query;
    }
  },
  watch: {
    routeFullPath: {
      handler() {
        this.moveToRelevantHeaderItem();
      }
    }
  },
  mounted() {
    this.moveToRelevantHeaderItem();
  },
  methods: {
    /**
     * 根据当前的 fullPath 移动到对应的子项下
     */
    moveToRelevantHeaderItem() {
      this.changeCurrentIndex(this.findIndexFromHeaderItem());
      this.moveToCurrentItem();
    },
    /**
     * 寻找索引, 根据当前的 fullPath
     * @return {number} 找到返回对应的索引, 未找到默认为第一个, 即为 0
     */
    findIndexFromHeaderItem() {
      let headerItem = this.headerItem;
      for(let i = 0; i < headerItem.length; i++) {
        let to = headerItem[i].to;
        if(this.routeFullPath === to) {
          return i;
        }
        if(this.routeFullPath.endsWith(to)) {
          return i;
        }
      }
      return 0;
    },
    moveToCurrentItem() {
      let currentIndex = this.currentIndex;
      this.$refs.headerItemList[currentIndex].$el.classList.add(this.headerItemActiveClassName);
      this.moveNavUnderline(currentIndex);
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
      let width = getComputedStyle(headerItemList[index].$el.children[0]).width;
      let left = headerItemMargin;
      for (let i = 0; i < index; i++) {
        let width = +getComputedStyle(headerItemList[i].$el.children[0]).width.split("px")[0];
        left += width + (headerItemMargin << 1);
      }
      let navUnderline = this.$refs.navUnderline;
      navUnderline.style.width = width;
      navUnderline.style.left = `${left}px`;
    },
    mouseleaveResetUnderline() {
      this.moveToCurrentItem();
    },
    /**
     * 鼠标悬浮时移动下划线
     * @param index {number} 索引
     */
    mouseoverToMoveUnderline(index) {
      this.moveNavUnderline(index);
    },
    changeCurrentIndex(index) {
      this.currentIndex = index;
    },
    /**
     * 拼接 query 参数
     * @param path {string} 要拼接的 query 参数
     */
    concatQueryPath(path) {
      let queryKey = "sort";
      if(path === rootPath) {
        return "";
      }
      path = `?${queryKey}=${path}`;
      return path;
    }
  },
  beforeDestroy() {
  }
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