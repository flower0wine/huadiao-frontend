<template>
  <div class="forum-nav">
    <div class="dropdown-nav-list">
      <div class="dropdown-item"
           :class="item.className"
           v-for="(item, index) in dropdownNavList"
           :key="index"
           ref="dropdownItem">
        <div class="dropdown-guide"
             @click="clickChangeDropdownVisibility(index)">
          <div class="intro-icon" v-html="item.svg"></div>
          <div class="item-text">{{ item.title }}</div>
          <div class="dropdown-icon" v-html="svg.dropdown"></div>
        </div>
        <transition name="height-to-short">
          <component :is="item.componentName" v-show="visible.dropdownList[index]"/>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import {svg} from "@/assets/js/constants/svgs";
import NoteNavigationList from "@/pages/index/components/forum/navigation/NoteNavigationList";
import AnimeNavigationList from "@/pages/index/components/forum/navigation/AnimeNavigationList";

export default {
  name: "ForumNavigation",
  components: {AnimeNavigationList, NoteNavigationList},
  data() {
    return {
      visible: {
        dropdownList: null,
      },
      svg: {
        dropdown: svg.access,
      },
      dropdownNavList: [{
        title: "笔记",
        svg: svg.blog,
        componentName: "NoteNavigationList",
        className: "note-dropdown",
      }, {
        title: "番剧",
        svg: svg.fanju,
        componentName: "AnimeNavigationList",
        className: "anime-dropdown",
      }],
    }
  },
  beforeMount() {
    this.beforeMountInitial();
  },
  mounted() {
    this.mountedInitial();
  },
  methods: {
    beforeMountInitial() {
      this.visible.dropdownList = new Array(this.dropdownNavList.length).fill(false);
      this.visible.dropdownList[0] = true;
    },
    mountedInitial() {
      this.$refs.dropdownItem[0].classList.toggle("active");
    },
    clickChangeDropdownVisibility(index) {
      let dropdownItem = this.$refs.dropdownItem;
      let dropdownList = this.visible.dropdownList;
      dropdownList.splice(index, 1, !dropdownList[index]);
      dropdownItem[index].classList.toggle("active");
    },
  },
  beforeDestroy() {
  }
}
</script>

<style lang="scss">
@import "../../../scss/forum/variables/index";

$navItemHeight: 50px;
$navBorderColor: #6b789878;

.dropdown-item {
  & .dropdown-icon svg {
    transition: transform 300ms;
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

  &:nth-child(n + 1) {
    border-top: 1px solid $navBorderColor;
  }
}

@each $item in (("note-dropdown", 20px), ("anime-dropdown", 23px), ("dropdown-icon", 18px)) {
  .#{nth($item, 1)} svg {
    width: #{nth($item, 2)};
    height: #{nth($item, 2)};
    fill: $navTextColor;
  }
}
</style>

<style scoped lang="scss">
@import "../../../scss/forum/variables/index";

$dropDownNavListPadding: 8px;

.forum-nav {
  position: sticky;
  top: $forumPaddingTop + $forumMainMarginTop;
  width: $forumNavWidth;
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
  height: 50px;
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
</style>