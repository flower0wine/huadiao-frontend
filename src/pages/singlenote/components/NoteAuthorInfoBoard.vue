<template>
  <div class="author-info-box" v-if="authorInfo">
    <div class="author-infer">
      <user-avatar-box :options="userAvatarOptions"/>
      <div class="author-nickname">{{ authorInfo.nickname || authorInfo.userId }}</div>
      <div class="follow-or-cancel"
           v-if="!me"
           @click="checkLogin && clickToFollowOrCancelFollow"
           ref="followOrCancelBtn"
      >{{ judgeRelation(fan, follow) }}
      </div>
    </div>
    <div class="note-info">
      <div class="note-info-item">
        <span v-html="svg.colorLike" class="icon" @click="checkLogin && clickNoteLikeIcon" ref="likeIcon"></span>
        <span>{{ noteInfo.likeCount }}</span>
      </div>
      <div class="note-info-item">
        <span v-html="svg.colorLike" class="icon" @click="checkLogin && clickNoteUnlikeIcon" ref="unlikeIcon"></span>
      </div>
      <div class="note-info-item">
        <span v-html="svg.colorStar" class="icon" @click="checkLogin && clickNoteStarIcon" ref="starIcon"></span>
        <span>{{ noteInfo.starCount }}</span>
      </div>
      <div class="note-info-item">
        <a href="#comment-title">
          <span v-html="svg.colorComment" class="icon"></span>
          <span>{{ noteInfo.commentCount }}</span>
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
        scale: "30px"
      },
    }
  },
  computed: {
    viewedUid() {
      return this.$route.params.viewedUid;
    },
    ...mapState(["noteInfo"]),
    ...mapState({
      authorInfo(state) {
        return state.author.authorInfo;
      },
      me(state) {
        return state.noteInfo.me;
      },
      login(state) {
        return state.user.login;
      }
    }),
  },
  watch: {
    "authorInfo": {
      handler() {
        this.setUserAvatarOptions();
      }
    }
  },
  mounted() {
    this.initial();
  },
  methods: {
    // 初始化
    initial() {
      let noteAndMeRelation = this.noteInfo.noteAndMeRelation;
      let authorAndMeRelation = this.$store.state.noteInfo.authorAndMeRelation;
      let refs = this.$refs;
      // 初始化点赞, 不喜欢, 收藏, 关注信息及关注按钮等
      !noteAndMeRelation?.myLike && refs.likeIcon.classList.add("like-unlike-icon");
      !noteAndMeRelation?.myUnlike && refs.unlikeIcon.classList.add("like-unlike-icon");
      !noteAndMeRelation?.myStar && refs.starIcon.classList.add("star-icon");
      if (authorAndMeRelation) {
        this.judgeMeAndOtherRelation(this.$store.state.noteInfo.authorAndMeRelation);
        if (this.follow) {
          refs.followOrCancelBtn.classList.add("following");
        }
      }
    },
    setUserAvatarOptions() {
      this.userAvatarOptions = {
        userAvatar: this.authorInfo.userAvatar,
        href: `/homepage/${this.authorInfo.uid}`,
        scale: this.userAvatarOptions.scale,
        shadow: true,
      };
    },
    // 由于未登录可以访问笔记页面, 所以需要检查是否登录
    checkLogin() {
      if(!this.login) {
        this.huadiaoMiddleTip("您还未登录!");
        return false;
      }
      return true;
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
          uid: this.viewedUid,
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
          uid: this.viewedUid,
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
          uid: this.viewedUid,
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

.author-info-box {
  position: sticky;
  bottom: 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 0 16px;
  color: var(--author-info-box-color);
  border-top: 1px solid var(--author-info-box-border-color);
  border-bottom: 1px solid var(--author-info-box-border-color);
  background-color: var(--author-info-box-bg-color);
}

.note-info-item a {
  color: var(--note-info-item-a-color);
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
  color: var(--follow-or-cancel-color);
  background-color: var(--follow-or-cancel-bg-color);
  cursor: pointer;
  transition: var(--transition-300ms);
}

.following {
  width: 76px;
  background-color: var(--following-bg-color);
}

.follow-or-cancel:hover {
  background-color: var(--follow-or-cancel-hover-bg-color);
}

.following:hover {
  background-color: var(--following-hover-bg-color);
}

.note-info {
  display: flex;
}

.note-info > div {
  font-size: 14px;
  margin-left: 20px;
}

.note-info /deep/ svg {
  width: 24px;
  height: 24px;
}

.note-info-item:nth-child(2) /deep/ svg {
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

.star-icon /deep/ path:nth-child(1) {
  fill: #c9c9c9;
}

.star-icon /deep/ path:nth-child(2) {
  fill: #dadada;
}
</style>