<template>
  <div class="left-slider-board"
       v-if="getDataCompleted"
       @mouseenter.self="mouseenter"
       @mouseleave.self="mouseleave"
       @transitionend.self="transitionOver">
    <user-avatar-box :options="userAvatarOptions"/>
    <transition name="fade">
      <template v-if="visible.userInfo.render">
        <div class="user-info" v-show="visible.userInfo.show">
          <div class="author-nickname">{{ cutStringByLength(authorInfo.nickname || authorInfo.userId, 14, true) }}</div>
          <div class="author-follow-fan">
            <a :href="followLink(authorInfo.uid)">
              <div class="follow">
                <div>{{ authorInfo.follow }}</div>
                <div>关注</div>
              </div>
            </a>
            <a :href="fanLink(authorInfo.uid)">
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
import UserAvatarBox from "@/pages/components/UserAvatarBox";
import {apis} from "@/assets/js/constants/request-path";
import {ResponseHandler} from "@/assets/js/utils";
import {mapState} from "vuex";

const SMALL_AVATAR_SCALE = "30px";
const BIG_AVATAR_SCALE = "60px";

export default {
  name: "NoteLeftSliderBoard",
  components: {UserAvatarBox},
  data() {
    return {
      enterLeftBoard: false,
      visible: {
        userInfo: {
          render: false,
          show: false
        },
      },
      userAvatarOptions: null,
    }
  },
  computed: {
    ...mapState({
      authorInfo(state) {
        return state.author.authorInfo ?? {};
      }
    }),
  },
  watch: {
    authorInfo: {
      handler() {
        this.userAvatarOptions = {
          href: this.homepage(this.authorInfo.uid),
          userAvatar: this.authorInfo.userAvatar,
          scale: SMALL_AVATAR_SCALE,
          borderColor: "#d2d2d2",
          transitionTime: "500ms",
          shadow: true,
        };
      }
    }
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      this.sendRequest({
        path: apis.account.info,
        params: {
          uid: this.authorUid,
        }
      }).then((response) => {
        let res = response.data;
        console.log(res);

        new ResponseHandler(res).succeed((data) => {
          this.$store.commit("setAuthorInfo", {authorInfo: data.userInfo, me: data.me});
          this.getDataCompleted = true;
        });
      })
    },
    mouseenter() {
      this.visible.userInfo.render = true;
      this.enterLeftBoard = true;
      this.userAvatarOptions.scale = BIG_AVATAR_SCALE;
    },
    mouseleave() {
      this.visible.userInfo.show = false;
      this.enterLeftBoard = false;
      this.userAvatarOptions.scale = SMALL_AVATAR_SCALE;
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