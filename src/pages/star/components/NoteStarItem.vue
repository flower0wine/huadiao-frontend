<template>
  <div class="note-star-item">
    <a :href="`/singlenote/${noteStar.uid}/${noteStar.noteId}`"
       :title="noteStar.noteTitle"
       class="note-star-link"
    >
      <div class="note-title">{{ noteTitle }}</div>
      <div class="note-abstract" v-html="noteStar.noteContent"></div>
      <div class="note-star-link-bottom">
        <a :href="`/homepage/${noteStar.uid}`"
           class="homepage-link"
           :title="`前往${noteStar.nickname}的主页`"
        >
          <div class="user-avatar-box">
            <span v-html="svg.noAvatar"></span>
            <div class="user-avatar" :style="`background-image: url('${userAvatarImagePath}${noteStar.userAvatar}');`"></div>
          </div>
        </a>
        <div>{{ starDate }}</div>
      </div>
    </a>
    <div class="choose-mark"
         v-show="clickPatch"
         @click="clickToChooseNoteStar"
         ref="chooseMark"
    >
      <span v-html="svg.choose"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "NoteStarItem",
  props: ["noteStar", "index", "clickPatch", "addStarToArray", "removeStarFromArray"],
  data() {
    return {
      svg: {
        noAvatar: `<svg t="1657536982283" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3627" width="200" height="200"><path d="M510.77050482 2.21923328c281.4240859 0 509.56537287 228.14128697 509.56537173 509.56653682 0 281.42757888-228.14128697 509.56653682-509.56537173 509.56653681-281.42757888 0-509.56886585-228.14012302-509.56886585-509.56653681 0-281.4240859 228.14128697-509.56653682 509.56886585-509.56653682z" fill="#EEEEEE" p-id="3628"></path><path d="M510.77050482 516.51164387c90.0558939 0 163.05952199-73.30168832 163.05952199-163.72549973 0-90.42264633-73.00362809-163.72433465-163.05952199-163.72433465-90.05705785 0-163.06301497 73.30168832-163.06301497 163.72433465-0.00116395 90.42497536 73.00479317 163.72549859 163.06301497 163.72549973z m251.51800206 200.09807531l1.21552441-0.45756757c-39.85964146-100.90130205-137.98992099-172.25861689-252.73352647-172.25861689-113.31967317 0-210.42537358 69.60155875-251.2141221 168.51890176l0.56235463 0.22820181a39.9609344 39.9609344 0 0 0-2.9188881 15.01940622c0 22.15886393 17.97555086 40.12510094 40.15420757 40.12509981 16.79146325 0 31.16701469-10.30401138 37.16196921-24.92522837l0.65433486 0.26545948c28.69987328-68.84360192 96.50958109-117.22355485 175.60014393-117.22355484 79.76934741 0 148.05874461 49.21940878 176.32433493 119.00725475l0.2875813-0.10828003c6.4338944 13.58499499 20.27037696 22.98434901 36.30970538 22.98434901 22.17516373 0 40.15187968-17.96507307 40.15187968-40.12509981a40.14256469 40.14256469 0 0 0-1.55549923-11.05032533z" fill="#CCCCCC" p-id="3629"></path></svg>`,
        choose: `<svg fill="#777676" t="1679192203408" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5216" width="200" height="200"><path d="M819.2 302.545455L465.454545 677.236364 251.345455 465.454545c-9.309091-9.309091-23.272727-9.309091-32.581819 0-9.309091 9.309091-9.309091 23.272727 0 32.581819l230.4 230.4c9.309091 9.309091 23.272727 9.309091 32.581819 0l370.036363-393.309091c9.309091-9.309091 9.309091-23.272727 0-32.581818-9.309091-9.309091-23.272727-9.309091-32.581818 0zM930.909091 0H93.090909C41.890909 0 0 41.890909 0 93.090909v837.818182c0 51.2 41.890909 93.090909 93.090909 93.090909h837.818182c51.2 0 93.090909-41.890909 93.090909-93.090909V93.090909c0-51.2-41.890909-93.090909-93.090909-93.090909z m46.545454 930.909091c0 25.6-20.945455 46.545455-46.545454 46.545454H93.090909c-25.6 0-46.545455-20.945455-46.545454-46.545454V93.090909c0-25.6 20.945455-46.545455 46.545454-46.545454h837.818182c25.6 0 46.545455 20.945455 46.545454 46.545454v837.818182z" p-id="5217"></path></svg>`,
      },
      classList: null,
    }
  },
  computed: {
    // 收藏日期
    starDate() {
      let date = new Date(this.noteStar.starTime);
      return date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日";
    },
    noteTitle() {
      let noteTitle = this.noteStar.noteTitle;
      return noteTitle.length > 25 ? noteTitle.substring(0, 25) + "..." : noteTitle;
    },
  },
  mounted() {
    this.initial();
  },
  methods: {
    // 初始化
    initial() {
      this.classList = this.$refs.chooseMark.classList;
    },
    // 点击来选择笔记收藏
    clickToChooseNoteStar() {
      if(this.classList.contains("click-choose-mark")) {
        this.removeStarFromArray(this.index);
        this.removeClickNoteStarStyle();
      } else {
        this.addStarToArray(this.index);
        this.addClickNoteStarStyle();
      }
    },
    // 添加点击样式
    addClickNoteStarStyle() {
      this.classList.add("click-choose-mark");
    },
    // 移除点击样式
    removeClickNoteStarStyle() {
      this.classList.remove("click-choose-mark");
    },
  },
  beforeDestroy() {
  }
}
</script>

<style scoped>
.note-star-item {
  position: relative;
  float: left;
  width: 50%;
  height: 140px;
  transition: var(--transition-500ms);
}

.note-star-item .note-star-link:hover {
  background-color: rgba(255, 255, 255, 0.42);
}

.note-star-link {
  display: inline-block;
  width: 100%;
  height: 100%;
  padding: 10px;
  border-radius: 6px;
}

.note-star-link {
  color: #5c5c5c;
}

.homepage-link {
  margin-right: 10px;
}

.user-avatar-box {
  position: relative;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  transition: var(--transition-500ms);
}

.homepage-link:hover .user-avatar-box {
  transform: translateY(-3px);
  box-shadow: var(--box-shadow-min);
}

.note-title:hover {
  color: var(--note-star-color);
}

.user-avatar-box /deep/ svg {
  position: relative;
  width: 30px;
  height: 30px;
}

.user-avatar {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}

.note-abstract {
  font-size: 16px;
  padding: 6px 10px;
  color: #777676;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}

.note-star-link {
  display: flex;
  flex-direction: column;
}

.note-star-link-bottom {
  display: flex;
  justify-content: end;
  align-items: center;
  margin-top: auto;
  padding-right: 20px;
  color: #777676;
  font-size: 16px;
}

.choose-mark {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: transparent;
  transition: var(--transition-500ms);
}

.choose-mark:hover {
  background-color: #00000011;
}

.choose-mark /deep/ svg {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.click-choose-mark {
  background-color: #00000011;
}

.click-choose-mark /deep/ svg {
  fill: #4202ff;
}
</style>