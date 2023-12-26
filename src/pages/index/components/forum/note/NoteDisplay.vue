<template>
  <div class="note-display">
    <a :href="noteLink(noteItem.author.uid, noteItem.id)"
       target="_blank"
       class="note-link"
       :title="noteItem.title">
      <div class="note-container">
        <div class="note-left">
          <div class="note-title">{{ noteItem.title }}</div>
          <div class="note-content">
            <div class="note-abstract" :title="noteItem.summary">{{ noteItem.summary }}</div>
            <div class="note-info">
              <div class="line-one">
                <div class="author-info" :title="noteItem.author.nickname || noteItem.author.userId">
                  <user-avatar-box :options="{
                  scale: `26px`,
                  userAvatar: noteItem.author.userAvatar,
                  borderColor: `#8c8c8c`,
                  href: homepage(noteItem.author.uid)
                }"/>
                  <div class="nickname">
                    {{ cutStringByLength(noteItem.author.nickname || noteItem.author.userId, 12, true) }}
                  </div>
                </div>
                <div class="interact-tools">
                  <div class="like" :title="`文章《${noteItem.title}》点赞数为 ${noteItem.like}`">
                    <span class="like-icon" v-html="svg.like"></span>
                    <span>{{ numberFormatThousand(noteItem.like) }}</span>
                  </div>
                  <div class="view" :title="`文章《${noteItem.title}》浏览量为 ${noteItem.view}`">
                    <span class="view-icon" v-html="svg.view"></span>
                    <span>{{ numberFormatThousand(noteItem.view) }}</span>
                  </div>
                </div>
              </div>
              <div class="line-two">
                <div class="publish-time">
                  <span class="time-icon" v-html="svg.time"></span>
                  <span>{{ huadiaoDateFormat(noteItem.time, "date") }}</span>
                </div>
                <div class="label-list">
                  <a class="label"
                     href="#"
                     target="_blank"
                     v-for="(item, index) in noteItem.label"
                     :title="item"
                     :key="index">{{ item }}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="note-right">
          <div class="note-image" v-if="noteItem.cover" :style="getImageStyle(noteItem.cover)"></div>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
import {svg} from "@/assets/js/constants/svgs";
import UserAvatarBox from "@/pages/components/UserAvatarBox";

export default {
  name: "NoteDisplay",
  components: {UserAvatarBox},
  props: ["noteItem"],
  data() {
    return {
      svg: {
        like: svg.like,
        view: svg.eye,
        time: svg.time
      }
    }
  },
  methods: {
    getImageStyle(image) {
      return `background-image: url('${image}');`;
    }
  },
  beforeDestroy() {
  }
}
</script>

<style lang="scss">
@import "../../../scss/forum/variables/index.scss";

.like-icon svg {
  width: 14px;
  height: 14px;
  vertical-align: -2px;
  margin-right: 3px;
  fill: $noteInfoTextColor;
}

.view-icon svg {
  width: 16px;
  height: 16px;
  vertical-align: -3px;
  margin-right: 3px;
  fill: $noteInfoTextColor;
}

.publish-time svg {
  width: 18px;
  height: 18px;
  margin-right: 3px;
  vertical-align: -4px;
  fill: $noteInfoTextColor;
}


</style>

<style scoped lang="scss">
@import "../../../scss/forum/variables/index.scss";

$noteRightWidth: 160px;
$noteBetweenWidth: 20px;

.note-display {
  padding: 10px 16px;

  &:nth-child(n + 2) {
    border-top: 1px solid $forumContentItemBorderColor;
  }

  &:hover {
    background-color: $forumContentItemBorderColor;
  }
}

.note-display .note-link {
  display: block;
  color: unset;
}

.author-info,
.right-info,
.line-one,
.line-two,
.label-list,
.note-container {
  display: flex;
}

.note-left {
  width: calc(100% - #{$noteRightWidth} - #{$noteBetweenWidth});
  margin-right: $noteBetweenWidth;
}

.note-content {
  margin-left: 6px;
}

.note-right {
  align-self: center;
  text-align: center;
}

.note-image {
  width: $noteRightWidth;
  height: 100px;
  border-radius: 8px;
  background-color: $imageBackgroundColor;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}

.publish-time {
  font-size: 14px;
  margin-top: 5px;
  color: $noteInfoTextColor;
}

.note-title {
  font-size: 18px;
  font-weight: 700;
  color: #ececec;
}

.note-abstract {
  margin-top: 4px;
  color: #d5d5d5;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.note-info {
  margin-top: 5px;
  font-size: 14px;
  color: $noteInfoTextColor;
}

.line-one {
  div {
    margin-right: 14px;
  }
}

.line-two {
  justify-content: space-between;
  align-items: end;
}

.interact-tools {
  display: flex;

  & > div {
    margin-right: 10px;
  }
}

.label {
  display: block;
  padding: 2px 6px;
  border-radius: 4px;
  margin-inline: 4px;
  color: #a8a8a8;
  background-color: #4f4f4f;
}
</style>