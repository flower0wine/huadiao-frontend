<template>
  <div class="forum-nav">
    <div class="dropdown-nav-list">
      <div class="dropdown-item"
           v-for="(item, navIndex) in list"
           :key="navIndex"
           :class="{active: navActive[navIndex]}"
      >
        <div class="dropdown-guide"
             :style="{height: `${itemHeight}px`}"
             @click="toggleDropdown(navIndex)">
          <div class="intro-icon" v-if="item.svg" v-html="item.svg"></div>
          <div class="item-text">{{ item.title }}</div>
          <div class="dropdown-icon"
               v-if="item.list.length > 0"
               v-html="svg.dropdown"></div>
        </div>
        <transition name="height-to-short">
          <nav class="nav-list"
               v-show="navActive[navIndex]"
               :style="{height: `${item.list.length * itemHeight}px`}">
            <div class="nav-item"
                 v-for="(item, itemIndex) in item.list"
                 :key="itemIndex"
                 @click="handleClickNavItem(navIndex, itemIndex)"
                 :class="{active: activeIndex[0] === navIndex && activeIndex[1] === itemIndex}"
            >
              <div class="nav-content">
                <span class="nav-icon" v-html="item.svg"></span>
                <span class="nav-text">{{item.title}}</span>
              </div>
              <!--<template v-if="item.disabled">
                <div class="nav-content">
                  <span class="nav-icon" v-html="item.svg"></span>
                  <span class="nav-text">{{item.title}}</span>
                </div>
              </template>
              <template v-else>
                <router-link active-class="active"
                             :class="judgeHeaderItemActive(item.alias)"
                             :to="item.to">
                  <div class="nav-content">
                    <span class="nav-icon" v-html="item.svg"></span>
                    <span class="nav-text">{{item.title}}</span>
                  </div>
                </router-link>
              </template>-->
            </div>
          </nav>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import {svg} from "@/assets/js/constants/svgs";
import {huadiaoMiddleTip} from "@/eventbus";

export default {
  name: "ForumNavigation",

  props: {
    list: {
      type: Array,
      required: true,
    },

    activeIndex: {
      type: Array,
      required: true,
    },
  },

  emits: ["navItemClick"],

  data() {
    return {
      navActive: {
        0: true,
      },
      itemHeight: 50,
    }
  },
  computed: {
    svg() {
      return {
        dropdown: svg.access,
      }
    },
  },

  methods: {
    toggleDropdown(index) {
      this.$set(this.navActive, index, !this.navActive[index]);
    },

    handleClickNavItem(navIndex, itemIndex) {
      if (this.list[navIndex].list[itemIndex].disabled) {
        huadiaoMiddleTip("该功能暂未开放");
        return;
      }
      this.$emit("navItemClick", navIndex, itemIndex);
    },
  },
  beforeDestroy() {
  }
}
</script>

<style scoped lang="scss">
@import "~@/pages/index/scss/forum/variables";
@import "~@/pages/index/scss/forum/layout";

$dropDownNavListPadding: 8px;

.forum-nav {
  @extend .forum-sticky;
  width: 20%;
  min-width: 140px;
  max-width: 200px;
  height: calc(100vh - #{$forumPaddingTop} - #{$forumContentAndLabelBetween});
  border-radius: $forumBorderRadius;
  box-shadow: $forumBoxShadow;
  backdrop-filter: $forumBackdropBlurFilter;
  background-color: $forumBackgroundColor;
  user-select: none;
}

.dropdown-nav-list {
  height: 100%;
  padding: $dropDownNavListPadding;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: #5d5d5d;
  }
}

.dropdown-guide {
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: $navTextColor;

  &:hover {
    background-color: $forumHoverBackgroundColor;
  }
}

.height-to-short-enter-active,
.height-to-short-leave-active {
  overflow: hidden;
  transition: all 300ms;
}

.height-to-short-enter,
.height-to-short-leave-to {
  height: 0!important;
}

.nav-content span:first-child {
  margin-right: 16px;
}

.nav-icon::v-deep {
  svg {
    width: 20px;
    height: 20px;
    vertical-align: -4px;
  }
}

$navItemHeight: 50px;
$navBorderColor: #6b789878;

.dropdown-item::v-deep {
  svg {
    fill: $navTextColor;
  }

  .dropdown-icon svg {
    width: 17px;
    height: 17px;
    transition: transform 300ms;
  }

  .intro-icon svg {
    width: 20px;
    height: 20px;
  }

  &.active .dropdown-icon svg {
    transform: rotate(180deg);
  }

  &:nth-child(n + 2) {
    border-top: 1px solid $navBorderColor;
  }
}

.nav-item {
  display: block;
  height: $navItemHeight;
  margin-left: 10px;
  border-radius: 4px;
  color: $navTextColor;

  &:hover {
    background-color: $forumHoverBackgroundColor;
  }

  & .nav-content {
    height: 100%;
    line-height: $navItemHeight;
    padding: 0 12px;
  }

  &.active {
    color: $navActiveTextColor;
    background-color: $nacActiveBackgroundColor;
  }

  &:nth-child(n + 2) {
    border-top: 1px solid $navBorderColor;
  }
}
</style>
