<template>
  <div class="left-slider-board"
       @mouseenter.self="mouseenter"
       @mouseleave.self="mouseleave"
       @transitionend.self="transitionOver"
  >
    <user-avatar-box :options="userAvatarOptions"/>
    <transition name="fade">
      <template v-if="visible.userInfo.render">
        <div class="user-info" v-show="visible.userInfo.show">
          <div class="author-nickname">{{ cutStringByLength(authorInfo.nickname || authorInfo.userId, 14, true) }}</div>
          <div class="author-follow-fan">
            <a :href="`/followfan/${authorInfo.uid}/follow`">
              <div class="follow">
                <div>{{ authorInfo.follow }}</div>
                <div>关注</div>
              </div>
            </a>
            <a :href="`/followfan/${authorInfo.uid}/fan`">
              <div class="fan">
                <div>{{ authorInfo.fan }}</div>
                <div>粉丝</div>
              </div>
            </a>
          </div>
        </div>
      </template>
    </transition>
  </div>
</template>

<script>
import {svg} from "@/assets/js/constants/svgs";
import UserAvatarBox from "@/pages/components/UserAvatarBox";

export default {
  name: "NoteLeftSliderBoard",
  components: {UserAvatarBox},
  props: ["authorInfo"],
  data() {
    return {
      svg,
      enterLeftBoard: false,
      visible: {
        userInfo: {
          render: false,
          show: false
        },
      },
      userAvatarOptions: {
        href: `/homepage/${this.authorInfo.uid}`,
        userAvatar: this.authorInfo.userAvatar,
        scale: "30px",
        borderColor: "#d2d2d2",
        transitionTime: "500ms",
        shadow: true,
      },
    }
  },
  computed: {

  },
  mounted() {
  },
  methods: {
    mouseenter() {
      this.visible.userInfo.render = true;
      this.userAvatarOptions.scale = "60px";
      this.enterLeftBoard = true;
    },
    mouseleave() {
      this.visible.userInfo.show = false;
      this.enterLeftBoard = false;
      this.userAvatarOptions.scale = "30px";
    },
    transitionOver(e) {
      if(e.propertyName === "width" && this.enterLeftBoard) {
        this.visible.userInfo.show = true;
      }
    },
  },
  beforeDestroy() {
  }
}
</script>

<style scoped>
.left-slider-board {
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 20;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50px;
  height: 100vh;
  padding-top: 80px;
  background-color: var(--left-slider-board-bg-color);
  box-shadow: var(--note-box-shadow);
  transition: var(--transition-500ms);
}

.left-slider-board:hover {
  width: 200px;
  z-index: 100;
  padding-top: 30px;
}

.user-info {
  width: 100%;
  margin-top: 20px;
  color: var(--left-slider-user-info-color);
}

.user-info > div {
  margin-top: 10px;
}

.fade-enter-active {
  transition: all 500ms;
}

.author-nickname {
  padding: 0 20px;
  text-align: center;
}

.author-follow-fan {
  display: flex;
  justify-content: space-around;
}

.follow,
.fan {
  width: 50px;
  height: 60px;
  text-align: center;
  padding-top: 6px;
  border-radius: 6px;
  color: var(--left-slider-user-info-color);
  cursor: pointer;
  transition: var(--transition-500ms);
}

.follow:hover,
.fan:hover {
  color: var(--left-slider-user-info-hover-color);
  background-color:  var(--left-slider-user-info-hover-bg-color);
}
</style>