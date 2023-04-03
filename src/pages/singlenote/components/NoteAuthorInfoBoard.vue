<template>
  <div class="author-infer-box">
    <div class="author-infer">
      <div class="author-avatar-box">
        <a href="#">
          <div v-html="svg.avatar" class="default-author-avatar"></div>
          <div class="author-avatar" ref="authorAvatar"></div>
        </a>
      </div>
      <div class="author-nickname">{{ noteInfer.authorInfer.nickname }}</div>
      <div class="follow-or-cancel"
           @click="clickToFollowOrCancelFollow"
           ref="followOrCancelBtn"
      >{{judgeMeAndOtherRelation(followed, following)}}</div>
    </div>
    <div class="note-infer">
      <div class="note-infer-item">
        <span v-html="svg.like" class="icon" @click="clickNoteLikeIcon" ref="likeIcon"></span>
        <span>{{ noteInfer.likeNumber }}</span>
      </div>
      <div class="note-infer-item">
        <span v-html="svg.like" class="icon" @click="clickNoteUnlikeIcon" ref="unlikeIcon"></span>
      </div>
      <div class="note-infer-item">
        <span v-html="svg.star" class="icon" @click="clickNoteStarIcon" ref="starIcon"></span>
        <span>{{ noteInfer.starNumber }}</span>
      </div>
      <div class="note-infer-item">
        <a href="#comment-title">
          <span v-html="svg.comment" class="icon"></span>
          <span>{{ noteInfer.commentNumber }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "NoteAuthorInfoBoard",
  data() {
    return {
      svg: {
        like: `<svg t="1679821254891" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5216" width="200" height="200"><path d="M511.35920355 512m-491.89865244 0a491.89865245 491.89865245 0 1 0 983.79730489 0 491.89865245 491.89865245 0 1 0-983.79730489 0Z" fill="#FF6161" p-id="5217"></path><path d="M255.39015111 404.87048533c-96.76026311 0-182.51047822 47.06941155-235.63832889 119.537664 5.18462578 207.90931911 139.22759111 383.778816 325.34983111 450.59640889 117.440512-37.86524445 202.43342222-147.96572445 202.43342222-278.04740267 0-161.30594133-130.78072889-292.08667022-292.14492444-292.08667022z" fill="#FF7D7D" p-id="5218"></path><path d="M319.29503289 750.49278578h7.68955733V416.40482133h-7.68955733c-41.06922667 0-74.39064178 33.32141511-74.39064178 74.39064178v185.36493511c0.05825422 41.01097245 33.32141511 74.33238755 74.39064178 74.33238756z" fill="#FFCAC7" p-id="5219"></path><path d="M738.02638222 374.28701867h-155.65528177c12.11687822-39.78763378 28.36980622-121.51830755-28.5445689-156.06306134-26.738688-16.13641955-89.76975645-27.49599289-88.25514666 43.22463289 1.45635555 70.72062578-2.56318578 148.373504-92.33294222 154.95623111v334.08796445h318.88361244c36.11761778 0 67.28362667-25.39884089 74.50715022-60.817408l45.84607289-224.04573867c9.72845511-47.18592-26.27265422-91.34262045-74.448896-91.34262044z" fill="#FFFFFF" p-id="5220"></path></svg>`,
        star: `<svg t="1679821287724" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5363" width="200" height="200"><path d="M512 512.99032178m-491.89865245 0a491.89865245 491.89865245 0 1 0 983.7973049 0 491.89865245 491.89865245 0 1 0-983.7973049 0Z" fill="#F8A10F" p-id="5364"></path><path d="M256.03094755 405.86080711c-96.76026311 0-182.51047822 47.06941155-235.63832888 119.537664 5.18462578 207.90931911 139.22759111 383.778816 325.34983111 450.59640889 117.440512-37.86524445 202.43342222-147.96572445 202.43342222-278.04740267 0-161.24768711-130.78072889-292.08667022-292.14492445-292.08667022z" fill="#FFBD48" p-id="5365"></path><path d="M581.61379555 215.60251733L640.15928889 334.266368a52.19578311 52.19578311 0 0 0 39.26334578 28.54456889l130.95549155 19.04913066c42.75859911 6.23320178 59.82708622 58.77851022 28.89409423 88.95419734l-94.77961956 92.39119644a52.09675093 52.09675093 0 0 0-14.97133511 46.137344l22.36962133 130.43120356c7.28177778 42.58383645-37.39921067 75.08969245-75.67223466 54.99198578l-117.1492409-61.57471289a52.166656 52.166656 0 0 0-48.5257671 0l-117.1492409 61.57471289c-38.273024 20.09770667-82.95401245-12.34989511-75.67223466-54.99198578l22.36962133-130.43120356c2.91271111-16.89372445-2.67969422-34.19522845-14.97133511-46.137344L230.39908978 470.75601067c-30.932992-30.17568711-13.86450489-82.72099555 28.89409422-88.95419734l130.95549155-19.04913066a51.92781369 51.92781369 0 0 0 39.26334578-28.54456889L488.11576889 215.60251733c19.10738489-38.73905778 74.39064178-38.73905778 93.49802666 0z" fill="#FFFFFF" p-id="5366"></path><path d="M510.60189867 733.13302755a52.166656 52.166656 0 0 1 48.52576711 0l117.14924089 61.5747129c38.273024 20.09770667 82.95401245-12.34989511 75.67223466-54.99198578l-22.36962133-130.43120356c-2.91271111-16.89372445 2.67969422-34.19522845 14.97133511-46.137344l-233.94895644 169.98582044z" fill="#FFEACC" p-id="5367"></path></svg>`,
        avatar: `<svg t="1657536982283" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3627" width="200" height="200"><path d="M510.77050482 2.21923328c281.4240859 0 509.56537287 228.14128697 509.56537173 509.56653682 0 281.42757888-228.14128697 509.56653682-509.56537173 509.56653681-281.42757888 0-509.56886585-228.14012302-509.56886585-509.56653681 0-281.4240859 228.14128697-509.56653682 509.56886585-509.56653682z" fill="#EEEEEE" p-id="3628"></path><path d="M510.77050482 516.51164387c90.0558939 0 163.05952199-73.30168832 163.05952199-163.72549973 0-90.42264633-73.00362809-163.72433465-163.05952199-163.72433465-90.05705785 0-163.06301497 73.30168832-163.06301497 163.72433465-0.00116395 90.42497536 73.00479317 163.72549859 163.06301497 163.72549973z m251.51800206 200.09807531l1.21552441-0.45756757c-39.85964146-100.90130205-137.98992099-172.25861689-252.73352647-172.25861689-113.31967317 0-210.42537358 69.60155875-251.2141221 168.51890176l0.56235463 0.22820181a39.9609344 39.9609344 0 0 0-2.9188881 15.01940622c0 22.15886393 17.97555086 40.12510094 40.15420757 40.12509981 16.79146325 0 31.16701469-10.30401138 37.16196921-24.92522837l0.65433486 0.26545948c28.69987328-68.84360192 96.50958109-117.22355485 175.60014393-117.22355484 79.76934741 0 148.05874461 49.21940878 176.32433493 119.00725475l0.2875813-0.10828003c6.4338944 13.58499499 20.27037696 22.98434901 36.30970538 22.98434901 22.17516373 0 40.15187968-17.96507307 40.15187968-40.12509981a40.14256469 40.14256469 0 0 0-1.55549923-11.05032533z" fill="#CCCCCC" p-id="3629"></path></svg>`,
        comment: `<svg t="1679821313732" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5510" width="200" height="200"><path d="M509.84459378 509.37856m-491.89865245 0a491.89865245 491.89865245 0 1 0 983.79730489 0 491.89865245 491.89865245 0 1 0-983.79730489 0Z" fill="#FAD400" p-id="5511"></path><path d="M253.93379555 402.30729955c-96.76026311 0-182.51047822 47.06941155-235.63832888 119.537664 5.18462578 207.90931911 139.22759111 383.778816 325.34983111 450.5964089 117.440512-37.86524445 202.43342222-147.96572445 202.43342222-278.04740267-0.05825422-161.30594133-130.83898311-292.08667022-292.14492445-292.08667023z" fill="#FFE771" p-id="5512"></path><path d="M282.12883911 632.99401955l-17.88404622 144.58697956c-4.60208355 37.04968533 30.35044978 66.70108445 66.17679644 56.15707022l181.57841067-53.477376-229.87116089-147.26667378z" fill="#FFF4C5" p-id="5513"></path><path d="M509.84459378 206.864384c-167.07310933 0-302.57243022 135.44106667-302.57243023 302.57243022s135.44106667 302.57243022 302.57243023 302.57243023 302.57243022-135.44106667 302.57243022-302.57243023-135.44106667-302.57243022-302.57243022-302.57243022z m-158.10195911 351.27296c-26.91345067 0-48.70052978-21.78707911-48.70052978-48.70052978s21.78707911-48.70052978 48.70052978-48.70052977 48.70052978 21.78707911 48.70052978 48.70052977-21.84533333 48.70052978-48.70052978 48.70052978z m157.40290844 0c-26.91345067 0-48.70052978-21.78707911-48.70052978-48.70052978s21.78707911-48.70052978 48.70052978-48.70052977 48.70052978 21.78707911 48.70052978 48.70052977-21.78707911 48.70052978-48.70052978 48.70052978z m157.40290844 0c-26.91345067 0-48.70052978-21.78707911-48.70052977-48.70052978s21.78707911-48.70052978 48.70052977-48.70052977c26.91345067 0 48.70052978 21.78707911 48.70052978 48.70052977s-21.78707911 48.70052978-48.70052978 48.70052978z" fill="#FFFFFF" p-id="5514"></path></svg>`,
      },
      followed: null,
      following: null,
    }
  },
  computed: {
    ...mapState(["noteInfer"]),
  },
  mounted() {
    this.initial();
  },
  methods: {
    // 初始化
    initial() {
      this.$refs.authorAvatar.style.backgroundImage = "url('" + this.noteInfer.authorInfer.userAvatar + "')";
      !this.noteInfer.noteAndMeRelation.myLike && this.$refs.likeIcon.classList.add("like-unlike-icon");
      !this.noteInfer.noteAndMeRelation.myUnlike && this.$refs.unlikeIcon.classList.add("like-unlike-icon");
      !this.noteInfer.noteAndMeRelation.myStar && this.$refs.starIcon.classList.add("star-icon");
      this.followed = this.noteInfer.authorAndMeRelation.followed;
      this.following = this.noteInfer.authorAndMeRelation.following;
      if(this.following) {
        this.$refs.followOrCancelBtn.classList.add("following");
      }
    },
    // 点击关注或者取消关注
    clickToFollowOrCancelFollow() {
      this.following = !this.following;
      if(this.following) {
        this.$refs.followOrCancelBtn.classList.add("following");
      } else {
        this.$refs.followOrCancelBtn.classList.remove("following");
      }
    },
    // 点击喜欢笔记图标, yesCallback
    clickNoteLikeIcon() {
      this.$store.commit("clickNoteLikeIcon", {
        likeCallback: () => {
          this.$refs.likeIcon.classList.add("like-unlike-icon");
        },
        cancelLikeCallback: () => {
          this.$refs.likeIcon.classList.remove("like-unlike-icon");
        }
      });
    },
    // 点击不喜欢笔记图标
    clickNoteUnlikeIcon() {
      this.$store.commit("clickNoteUnLikeIcon", {
        unlikeCallback: () => {
          this.$refs.unlikeIcon.classList.add("like-unlike-icon");
        },
        cancelUnlikeCallback: () => {
          this.$refs.unlikeIcon.classList.remove("like-unlike-icon");
        }
      });
    },
    // 点击收藏笔记图标
    clickNoteStarIcon() {
      this.$store.commit("clickNoteStarIcon", {
        starCallback: () => {
          this.$refs.starIcon.classList.add("star-icon");
        },
        cancelStarCallback: () => {
          this.$refs.starIcon.classList.remove("star-icon");
        }
      });
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

.author-avatar-box {
  position: relative;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  box-shadow: var(--box-shadow-min);
}

.default-author-avatar /deep/ svg {
  width: 30px;
  height: 30px;
}

.author-avatar {
  position: absolute;
  top: 0px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
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