<template>
  <nav class="nav-list" ref="navList">
    <router-link class="nav-item"
                 active-class="active"
                 v-for="(item, index) in navItem"
                 :class="judgeHeaderItemActive(item.alias)"
                 :to="item.to"
                 :key="index">
      <div class="nav-content">
        <span class="nav-icon" v-html="item.svg"></span>
        <span class="nav-text">{{item.title}}</span>
      </div>
    </router-link>
  </nav>
</template>

<script>
import {svg} from "@/assets/js/constants/svgs";

export default {
  name: "NoteNavigationList",
  data() {
    return {
      navItem: [{
        title: "关注",
        to: "/note/follow",
        svg: svg.follow,
      }, {
        title: "综合",
        to: "/note/comprehensiveness",
        svg: svg.comprehensiveness,
        alias: ["/", "/note"],
      }, {
        title: "前端",
        to: "/note/frontend",
        svg: svg.frontend,
      }, {
        title: "后端",
        to: "/note/backend",
        svg: svg.backend,
      }]
    }
  },
  mounted() {
    this.initial();
  },
  methods: {
    initial() {
      let navList = this.$refs.navList;
      navList.style.height = this.navItem.length * 50 + "px";
    },
  },
  beforeDestroy() {
  }
}
</script>

<style lang="scss">
.nav-icon svg {
  width: 20px;
  height: 20px;
  vertical-align: -4px;
}
</style>

<style scoped lang="scss">
@import "../../../scss/forum/variables/index";

.nav-content span:first-child {
  margin-right: 16px;
}
</style>