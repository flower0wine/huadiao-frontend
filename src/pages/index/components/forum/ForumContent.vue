<template>
  <div class="forum-content">
    <div class="content-display-container">
      <forum-content-header/>
      <router-view></router-view>
    </div>
    <div class="forum-label-container">
      <note-rank/>
    </div>
  </div>
</template>

<script>
import ForumContentHeader from "@/pages/index/components/forum/ForumContentHeader";
import NoteRank from "@/pages/index/components/forum/labels/NoteRank";

export default {
  name: "ForumContent",
  components: {NoteRank, ForumContentHeader},
  data() {
    return {
      contentComponents: {
        noteList: "NoteList",
      }
    }
  },
  methods: {},
  beforeDestroy() {
  }
}
</script>

<style scoped lang="scss">
@import "../../scss/forum/variables/index.scss";

.forum-content {
  display: flex;
  justify-content: space-between;
  align-items: start;
  width: $forumContentWidth + $forumTagWidth + $forumContentAndLabelBetween;
  min-height: 800px;
}

.content-display-container {
  width: $forumContentWidth;
  min-height: 800px;
  border-radius: $forumBorderRadius;
  background-color: $forumBackgroundColor;
  box-shadow: $forumBoxShadow;
  backdrop-filter: $forumBackdropBlurFilter;
}

.forum-label-container {
  width: $forumTagWidth;
  border-radius: $forumBorderRadius;
  box-shadow: $forumBoxShadow;
  backdrop-filter: $forumBackdropBlurFilter;

  > div:nth-child(n + 2) {
    margin-top: 20px;
  }
}
</style>