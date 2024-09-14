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
          <nav class="nav-list"
               v-show="visible.dropdownList[index]"
               ref="navList">
            <div class="nav-item" v-for="(item, index) in item.list" :key="index">
              <template v-if="item.disabled">
                <div class="nav-content" @click="handleDisabledItemClick(item)">
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
              </template>
            </div>
          </nav>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import {svg} from "@/assets/js/constants/svgs";
import {huadiaoMiddleTip} from "@/pages/components/HuadiaoMiddleTip";

export default {
  name: "ForumNavigation",
  data() {
    return {
      visible: {
        dropdownList: null,
      },
    }
  },
  computed: {
    svg() {
      return {
        dropdown: svg.access,
      }
    },
    dropdownNavList() {
      return [
        {
          title: "笔记",
          svg: svg.blog,
          className: "note-dropdown",
          list: [{
            title: "关注",
            to: "/note/follow",
            svg: svg.follow,
            disabled: true,
          }, {
            title: "综合",
            to: "/note/comprehensiveness",
            svg: svg.comprehensiveness,
            alias: ["/", "/note"],
            disabled: true,
          }, {
            title: "前端",
            to: "/note/frontend",
            svg: svg.frontend,
            disabled: true,
          }, {
            title: "后端",
            to: "/note/backend",
            svg: svg.backend,
            disabled: true,
          }],
        },
        {
          title: "番剧",
          svg: svg.fanju,
          className: "anime-dropdown",
          list: [{
            title: "关注",
            to: "/anime/follow",
            svg: svg.follow,
            disabled: true,
          }, {
            title: "综合",
            to: "/anime/comprehensiveness",
            svg: svg.comprehensiveness,
            alias: ["/anime"],
            disabled: true,
          }],
        },
      ];
    },
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

      for (let i = 0; i < this.dropdownNavList.length; i++) {
        let navItem = this.dropdownNavList[i];
        this.$refs.navList[i].style.height = navItem.list.length * 50 + "px";
      }
    },
    clickChangeDropdownVisibility(index) {
      let dropdownItem = this.$refs.dropdownItem;
      let dropdownList = this.visible.dropdownList;
      dropdownList.splice(index, 1, !dropdownList[index]);
      dropdownItem[index].classList.toggle("active");
    },

    handleDisabledItemClick(item) {
      huadiaoMiddleTip("该功能暂未开放");
    }
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

  &:nth-child(n + 2) {
    border-top: 1px solid $navBorderColor;
  }
}

@each $item in (("note-dropdown", 20px), ("anime-dropdown", 23px), ("dropdown-icon", 18px)) {
  .#{nth($item, 1)}::v-deep svg {
    width: #{nth($item, 2)};
    height: #{nth($item, 2)};
    fill: $navTextColor;
  }
}
</style>