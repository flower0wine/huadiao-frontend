<template>
  <div class="left-slider-board"
       @mouseenter="visible.userInfer = true"
       @mouseleave="visible.userInfer = false"
  >
    <user-avatar-box :options="userAvatarOptions"/>
    <transition name="fade">
      <template v-if="visible.userInfer">
        <div class="user-info">
          <div class="author-nickname">{{ cutStringByLength(authorInfo.nickname, 14) }}...</div>
          <div class="author-follow-fan">
            <a href="/followfan/follow">
              <div class="follow">
                <div>{{ authorInfo.follow }}</div>
                <div>关注</div>
              </div>
            </a>
            <a href="/followfan/fan">
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
      visible: {
        userInfer: false,
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
  },
  beforeDestroy() {
  }
}
</script>

<style>
.left-slider-board:hover .user-avatar-box,
.left-slider-board:hover .user-avatar,
.left-slider-board:hover .default-user-avatar svg {
  width: 60px;
  height: 60px;
}
</style>

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
  background-color: #ececec;
  box-shadow: var(--box-shadow-min);
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
  color: #727070;
}

.user-info > div {
  margin-top: 10px;
}

.fade-enter-active {
  transition: all 500ms 500ms;
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
  color: #727070;
  cursor: pointer;
  transition: var(--transition-500ms);
}

.follow:hover,
.fan:hover {
  color: #f53e3e;
  background-color: #e1e1e1;
}
</style>