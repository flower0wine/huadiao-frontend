<template>
  <div class="huadiao-forum-page">
    <div class="huadiao-forum-page-background" ref="forumBackground"></div>
    <div class="forum-main-container">
      <main class="forum-main">
        <forum-navigation/>
        <forum-content/>
      </main>
    </div>
  </div>
</template>

<script>
import ForumContent from "@/pages/index/components/forum/ForumContent";
import ForumNavigation from "@/pages/index/components/forum/navigation/ForumNavigation";
export default {
  name: "IndexForum",
  components: {ForumNavigation, ForumContent},
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
  },
  beforeDestroy() {
  }
}
</script>

<style scoped lang="scss">
@import "../../scss/forum/variables/index.scss";

.huadiao-forum-page {
  width: 100%;
  min-height: 100vh;
  scroll-snap-align: start;
}

/* 屏二背景 */
.huadiao-forum-page-background {
  position: fixed;
  top: 0;
  z-index: -9;
  width: 100%;
  height: 100vh;
  background: url("~../../../../../public/img/index/indexPageTwoBackground.jpg") no-repeat center center;
  background-size: cover;
}

.forum-main-container {
  padding-top: $forumPaddingTop;
}

.forum-main {
  display: flex;
  justify-content: space-between;
  width: $forumWidth;
  margin: $forumMainMarginTop auto;
}
</style>