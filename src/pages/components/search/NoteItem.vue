<template>
  <div class="note-item search-item">
    <a :href="`/${pageLinkStart.note}/${item.authorUid}/${item.noteId}`"
       class="link"
       target="_blank">
      <div class="note-item-content">
        <div class="note-title" v-html="item.title"></div>
        <div class="note-summary" v-html="item.summary"></div>
        <div class="note-info">
          <div class="author-info">
            <user-avatar-box :options="{
              scale: `30px`,
              href: `/${pageLinkStart.homepage}/${item.authorUid}`,
              userAvatar: `${userAvatarImagePath}${item.author.avatar}`,
            }"/>
            <div class="nickname">{{item.author.nickname ?? item.author.userId }}</div>
          </div>
          <div class="publish-time">{{huadiaoDateFormat(item.time)}}</div>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
import {apis} from "@/assets/js/constants/request-path";
import UserAvatarBox from "@/pages/components/UserAvatarBox";

export default {
  name: "NoteItem",
  props: ["item"],
  components: {UserAvatarBox},
  data() {
    return {
      pageLinkStart: apis.pageLinkStart,
    }
  },
  methods: {},
  beforeDestroy() {
  }
}
</script>

<style scoped>


.note-item {
  width: 400px;
  height: 100px;
  padding: 10px;
  border-radius: 4px;
  background-color: #fff;
}

.note-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #000;
}

.note-title {
  font-weight: 700;
  color: #000;
}

.note-summary {
  margin-left: 10px;
  font-size: 14px;
  color: #5d5d5d;
}

.author-info {
  display: flex;
  align-items: center;
  margin-top: 5px;
}

.author-info .nickname {
  margin-left: 10px;
}

.publish-time {
  margin-right: 30px;
  font-size: 12px;
  color: #a4a4a4;
}
</style>