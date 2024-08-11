<template>
  <div class="huadiao-forum-page"
       ref="huadiaoForumPage">
    <div class="huadiao-forum-page-background"
         :style="packageBackgroundUrl(indexForumBackground)"></div>
    <div class="forum-main-container">
      <main class="forum-main" v-if="visible.content">
        <forum-navigation/>
        <forum-content/>
        <div class="forum-label-container">
          <NoteRank/>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import ForumContent from "@/pages/index/components/forum/ForumContent";
import ForumNavigation from "@/pages/index/components/forum/components/ForumNavigation";
import IndexForumBackground from "@/assets/img/index/indexPageTwoBackground.webp";
import NoteRank from "@/pages/index/components/forum/components/NoteRank";

let observer;

export default {
  name: "IndexForum",
  components: {NoteRank, ForumNavigation, ForumContent},
  data() {
    return {
      visible: {
        content: false,
      }
    }
  },
  computed: {
    indexForumBackground() {
      return IndexForumBackground;
    }
  },
  created() {
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if(entry.isIntersecting) {
          observer.unobserve(entry.target);
          this.visible.content = true;
        }
      });
    }, {
      threshold: 0.1
    });
  },
  mounted() {
    observer.observe(this.$refs.huadiaoForumPage);
  },
  methods: {
  },
  beforeDestroy() {
  }
}
</script>

<style scoped lang="scss">
@import "~@/pages/index/scss/forum/variables/index";
@import "~@/pages/index/scss/forum/layout";

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
  background: no-repeat center center;
  background-size: cover;
}

.forum-main-container {
  padding-top: $forumPaddingTop;
}

.forum-main {
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 20px;
  margin-top: 20px;
  margin-inline: auto;
}

.forum-label-container {
  @extend .forum-sticky;
  width: 20%;
  min-width: 160px;
  max-width: 250px;
  height: min-content;
  border-radius: $forumBorderRadius;
  box-shadow: $forumBoxShadow;
  backdrop-filter: $forumBackdropBlurFilter;

  > div:nth-child(n + 2) {
    margin-top: 20px;
  }
}
</style>