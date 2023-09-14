<template>
  <div class="author-infer-box">
    <div class="author-infer">
      <user-avatar-box :options="userAvatarOptions"/>
      <div class="author-nickname">{{ noteInfo.authorInfo.nickname }}</div>
      <div class="follow-or-cancel"
           v-if="!me"
           @click="clickToFollowOrCancelFollow"
           ref="followOrCancelBtn"
      >{{judgeRelation(fan, follow)}}</div>
    </div>
    <div class="note-infer">
      <div class="note-infer-item">
        <span v-html="svg.colorLike" class="icon" @click="clickNoteLikeIcon" ref="likeIcon"></span>
        <span>{{ noteInfo.likeNumber }}</span>
      </div>
      <div class="note-infer-item">
        <span v-html="svg.colorLike" class="icon" @click="clickNoteUnlikeIcon" ref="unlikeIcon"></span>
      </div>
      <div class="note-infer-item">
        <span v-html="svg.colorStar" class="icon" @click="clickNoteStarIcon" ref="starIcon"></span>
        <span>{{ noteInfo.starNumber }}</span>
      </div>
      <div class="note-infer-item">
        <a href="#comment-title">
          <span v-html="svg.colorComment" class="icon"></span>
          <span>{{ noteInfo.commentNumber }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import {svg} from "@/assets/js/constants/svgs";
import UserAvatarBox from "@/pages/components/UserAvatarBox";

export default {
  name: "NoteAuthorInfoBoard",
  components: {UserAvatarBox},
  data() {
    return {
      svg,
      follow: null,
      fan: null,
      userAvatarOptions: {
        userAvatar: this.$store.state.noteInfo.authorInfo.userAvatar,
        href: `/homepage/${this.$store.state.noteInfo.authorInfo.uid}`,
        scale: "30px",
        shadow: true,
      },
    }
  },
  computed: {
    ...mapState(["noteInfo"]),
    ...mapState({
      authorInfo(state) {
        return state.noteInfo.authorInfo;
      },
      me(state) {
        return state.noteInfo.noteAndMeRelation.me;
      },
    }),
  },
  mounted() {
    this.initial();
  },
  methods: {
    // 初始化
    initial() {
      // 初始化点赞, 不喜欢, 收藏, 关注信息及关注按钮等
      !this.noteInfo.noteAndMeRelation.myLike && this.$refs.likeIcon.classList.add("like-unlike-icon");
      !this.noteInfo.noteAndMeRelation.myUnlike && this.$refs.unlikeIcon.classList.add("like-unlike-icon");
      !this.noteInfo.noteAndMeRelation.myStar && this.$refs.starIcon.classList.add("star-icon");
      this.judgeMeAndOtherRelation(this.$store.state.noteInfo.authorAndMeRelation);
      if(this.follow) {
        this.$refs.followOrCancelBtn.classList.add("following");
      }
    },
    // 点击关注或者取消关注
    clickToFollowOrCancelFollow() {
      this.follow = !this.follow;
      // 根据点击后的关系来判断是关注还是取消关注
      let path = this.follow ? "newFriend" : "modify";

      this.sendRequest({
        path: `relation/${path}`,
        params: {
          uid: this.noteInfo.authorInfo.uid,
        },
        thenCallback: (response) => {
          let res = response.data;
          console.log(res);
          if (this.follow) {
            this.$refs.followOrCancelBtn.classList.add("following");
          } else {
            this.$refs.followOrCancelBtn.classList.remove("following");
          }
        },
        errorCallback: (error) => {
          console.log(error);
        }
      })
    },
    // 点击喜欢笔记图标
    clickNoteLikeIcon() {
      let path = this.$store.state.noteInfo.noteAndMeRelation.myLike ? "delete" : "new";

      this.sendRequest({
        path: `note/like/${path}`,
        params: {
          uid: this.$route.params.authorUid,
          noteId: this.$route.params.noteId
        },
        thenCallback: (response) => {
          let res = response.data;
          console.log(res);

          this.$store.commit("clickNoteLikeIcon", {
            likeCallback: () => {
              this.$refs.likeIcon.classList.remove("like-unlike-icon");
            },
            cancelLikeCallback: () => {
              this.$refs.likeIcon.classList.add("like-unlike-icon");
            }
          });
        },
        errorCallback: (error) => {
          console.log(error);
        }
      })
    },
    // 点击不喜欢笔记图标
    clickNoteUnlikeIcon() {
      let path = this.$store.state.noteInfo.noteAndMeRelation.myUnlike ? "delete" : "new";

      this.sendRequest({
        path: `note/unlike/${path}`,
        params: {
          uid: this.$route.params.authorUid,
          noteId: this.$route.params.noteId
        },
        thenCallback: (response) => {
          let res = response.data;
          console.log(res);

          this.$store.commit("clickNoteUnLikeIcon", {
            unlikeCallback: () => {
              this.$refs.unlikeIcon.classList.remove("like-unlike-icon");
            },
            cancelUnlikeCallback: () => {
              this.$refs.unlikeIcon.classList.add("like-unlike-icon");
            }
          });
        },
        errorCallback: (error) => {
          console.log(error);
        }
      })
    },
    // 点击收藏笔记图标
    clickNoteStarIcon() {
      let path = this.$store.state.noteInfo.noteAndMeRelation.myStar ? "delete" : "new";

      this.sendRequest({
        path: `note/star/${path}`,
        params: {
          uid: this.$route.params.authorUid,
          noteId: this.$route.params.noteId,
        },
        thenCallback: (response) => {
          let res = response.data;
          console.log(res);

          this.$store.commit("clickNoteStarIcon", {
            starCallback: () => {
              this.$refs.starIcon.classList.remove("star-icon");
            },
            cancelStarCallback: () => {
              this.$refs.starIcon.classList.add("star-icon");
            }
          });
        },
        errorCallback: (error) => {
          console.log(error);
        }
      })
    },
  },
  beforeDestroy() {
    this.clearAllRefsEvents();
  }
}
</script>

<style scoped>

.author-infer-box {
  position: sticky;
  bottom: 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 0 16px;
  color: #6c6c6c;
  border-top: 1px solid #b9b9b9;
  border-bottom: 1px solid #b9b9b9;
  background-color: #fff;
}

.note-infer-item a {
  color: #6c6c6c;
}

.author-infer {
  display: flex;
}

.author-nickname {
  margin-left: 10px;
  line-height: 30px;
}

.follow-or-cancel {
  width: 60px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  margin-left: 20px;
  border-radius: 15px;
  color: #fff;
  background-color: #f13f3f;
  cursor: pointer;
  transition: var(--transition-300ms);
}

.following {
  width: 76px;
  background-color: #c5c5c5;
}

.follow-or-cancel:hover {
  background-color: #de3737;
}

.following:hover {
  background-color: #b4b4b4;
}

.note-infer {
  display: flex;
}

.note-infer > div {
  font-size: 14px;
  margin-left: 20px;
}

.note-infer /deep/ svg {
  width: 24px;
  height: 24px;
}

.note-infer-item:nth-child(2) /deep/ svg {
  transform: rotateX(-180deg);
}

.icon {
  margin-right: 4px;
}

.like-unlike-icon /deep/ path:nth-child(1) {
  fill: #c9c9c9;
}

.like-unlike-icon /deep/ path:nth-child(2) {
  fill: #dadada;
}

.like-unlike-icon /deep/ path:nth-child(3) {
  fill: #cbcbcb;
}

.star-icon /deep/path:nth-child(1) {
  fill: #c9c9c9;
}

.star-icon /deep/path:nth-child(2) {
  fill: #dadada;
}
</style>