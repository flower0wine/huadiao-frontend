<template>
  <div class="note-history-item">
    <div class="last-time">
      <div class="left-blank"></div>
      <div class="triangle"></div>
      <div class="visited-date">{{viewedDate}}</div>
    </div>
    <div class="note-history-infer">
      <div class="note-title">
        <a href="#">{{noteHistory.noteTitle}}</a>
      </div>
      <div class="note-abstract">{{noteHistory.noteAbstract}}</div>
      <div class="note-author-infer">
        <div class="user-avatar-box">
          <a href="#">
            <span v-html="svg.avatar"></span>
            <div class="user-avatar" ref="userAvatar"></div>
          </a>
        </div>
        <div class="user-nickname">{{noteHistory.authorNickname}}</div>
      </div>
      <div v-html="svg.del" class="delete-icon"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NoteHistoryItem",
  props: ["noteHistory"],
  data() {
    return {
      svg: {
        avatar: `<svg t="1657536982283" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3627" width="200" height="200"><path d="M510.77050482 2.21923328c281.4240859 0 509.56537287 228.14128697 509.56537173 509.56653682 0 281.42757888-228.14128697 509.56653682-509.56537173 509.56653681-281.42757888 0-509.56886585-228.14012302-509.56886585-509.56653681 0-281.4240859 228.14128697-509.56653682 509.56886585-509.56653682z" fill="#EEEEEE" p-id="3628"></path><path d="M510.77050482 516.51164387c90.0558939 0 163.05952199-73.30168832 163.05952199-163.72549973 0-90.42264633-73.00362809-163.72433465-163.05952199-163.72433465-90.05705785 0-163.06301497 73.30168832-163.06301497 163.72433465-0.00116395 90.42497536 73.00479317 163.72549859 163.06301497 163.72549973z m251.51800206 200.09807531l1.21552441-0.45756757c-39.85964146-100.90130205-137.98992099-172.25861689-252.73352647-172.25861689-113.31967317 0-210.42537358 69.60155875-251.2141221 168.51890176l0.56235463 0.22820181a39.9609344 39.9609344 0 0 0-2.9188881 15.01940622c0 22.15886393 17.97555086 40.12510094 40.15420757 40.12509981 16.79146325 0 31.16701469-10.30401138 37.16196921-24.92522837l0.65433486 0.26545948c28.69987328-68.84360192 96.50958109-117.22355485 175.60014393-117.22355484 79.76934741 0 148.05874461 49.21940878 176.32433493 119.00725475l0.2875813-0.10828003c6.4338944 13.58499499 20.27037696 22.98434901 36.30970538 22.98434901 22.17516373 0 40.15187968-17.96507307 40.15187968-40.12509981a40.14256469 40.14256469 0 0 0-1.55549923-11.05032533z" fill="#CCCCCC" p-id="3629"></path></svg>`,
        del: `<svg fill="#7A7A7A" t="1679366439084" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5216" width="200" height="200"><path d="M955.904 119.46666667H750.93333333V34.13333333a34.13333333 34.13333333 0 0 0-34.13333333-34.13333333H307.2a34.13333333 34.13333333 0 0 0-34.13333333 34.13333333v85.33333334H68.096a34.13333333 34.13333333 0 0 0 0 68.26666666H104.10666667l83.11466666 745.23306667A102.4 102.4 0 0 0 288.9728 1024h446.02026667a102.43413333 102.43413333 0 0 0 101.7856-91.0336L919.89333333 187.73333333h35.97653334a34.13333333 34.13333333 0 0 0 0.03413333-68.26666666zM341.33333333 68.26666667h341.33333334v51.2H341.33333333V68.26666667z m427.6224 857.12213333a34.13333333 34.13333333 0 0 1-33.92853333 30.34453333H288.9728a34.13333333 34.13333333 0 0 1-33.92853333-30.34453333L172.78293333 187.73333333h678.43413334l-82.26133334 737.65546667z" p-id="5217"></path><path d="M614.4 841.5232a34.13333333 34.13333333 0 0 0 34.13333333-34.13333333V306.24426667a34.13333333 34.13333333 0 0 0-68.26666666 0v501.1456a34.13333333 34.13333333 0 0 0 34.13333333 34.13333333zM426.66666667 841.5232a34.13333333 34.13333333 0 0 0 34.13333333-34.13333333V306.24426667a34.13333333 34.13333333 0 0 0-68.26666667 0v501.1456a34.13333333 34.13333333 0 0 0 34.13333334 34.13333333z" p-id="5218"></path></svg>`,
      }
    }
  },
  computed: {
    viewedDate() {
      let date = this.noteHistory.viewedDate.split(/[-:\s]/);
      let now = new Date();
      if(date[0] === String(now.getFullYear()) && date[1] === String(now.getMonth() + 1) && date[2] === String(now.getDate())) {
        return date[3] + ":" + date[4];
      }
      return date[0] + "年" + date[1] + "月" + date[2] + "日"
    }
  },
  mounted() {
    this.initial();
  },
  methods: {
    // 初始化
    initial() {
      this.$refs.userAvatar.style.backgroundImage = "url('" + this.noteHistory.authorUserAvatar + "')";
    },
  },
  beforeDestroy() {
  }
}
</script>

<style scoped>
.note-history-item {
  position: relative;
  display: flex;
  width: 100%;
  min-height: 120px;
}

.last-time {
  position: absolute;
  width: 100px;
  height: 100%;
}

.left-blank {
  width: 100px;
  height: 100%;
  border-right: 1px solid #c9c8c8;
}

.triangle {
  position: absolute;
  top: 51px;
  right: -16px;
  border-top: 8px solid transparent;
  border-left: 8px solid #c9c8c8;
  border-right: 8px solid transparent;
  border-bottom: 8px solid transparent;
}

.visited-date {
  position: absolute;
  top: 50px;
  left: 130px;
  font-size: 12px;
  white-space: nowrap;
  color: #a1a1a1;
}

.note-history-infer {
  width: 100%;
  margin-left: 260px;
  padding: 6px 10px;
}

.user-avatar-box {
  position: relative;
  width: 20px;
  height: 20px;
}

.user-avatar-box /deep/ svg {
  width: 20px;
  height: 20px;
}

.user-avatar {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}

.note-history-infer {
  border-bottom: 1px solid #c9c8c8;
}

.note-abstract {
  min-height: 50px;
  margin: 8px 0 0 8px;
  color: #888888;
}

.note-author-infer {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #7A7A7A;
}

.note-title a {
  color: #000;
}

.note-title:hover a {
  color: #ef2828;
}

.user-nickname {
  margin-left: 10px;
}

.delete-icon {
  position: absolute;
  top: 49px;
  right: 27px;
  width: 26px;
  height: 26px;
  border-radius: 6px;
  text-align: center;
  transition: var(--transition-500ms);
  cursor: pointer;
}

.delete-icon:hover {
  background-color: #e1e1e1;
}

.delete-icon:hover /deep/ svg {
  fill: #e34343;
}

.delete-icon /deep/ svg {
  width: 20px;
  height: 20px;
  transition: var(--transition-500ms);
}
</style>