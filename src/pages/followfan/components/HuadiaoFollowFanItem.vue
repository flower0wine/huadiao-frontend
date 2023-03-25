<template>
  <div class="huadiao-follow-fan-item">
    <a class="user-avatar-box"
       :title="'前往' + item.nickname + '的个人主页'"
       :href="isLogin ? '/homepage/' + uid : wrongLink"
    >
      <img src="/svg/noLoginAvatar.svg" alt="">
      <div class="user-avatar" ref="userAvatar"></div>
    </a>
    <div class="user-infer">
      <div class="nickname"
           :title="item.nickname"
      >{{ item.nickname }}
      </div>
      <div class="canvases"
           :title="item.canvases"
      >{{ item.canvases }}
      </div>
    </div>
    <div class="user-tools" v-if="me">
      <div class="user-relation">
        <slot name="relation"
              :className="follow ? 'follow' : 'unfollow'"
              :changeFollowStatus="changeFollowStatus"
              :follow="follow"
        ></slot>
        <img src="/svg/more.svg"
             @mouseenter="isShow.toolMenu = true"
             @mouseleave="isShow.toolMenu = false"
             ref="more"
             alt="">
      </div>
      <transition name="fade">
        <div class="tool-menu"
             v-show="isShow.toolMenu"
             @mouseenter="isShow.toolMenu = true"
             @mouseleave="isShow.toolMenu = false"
             ref="toolMenu"
        >
          <div>发消息</div>
          <slot name="toolMenu"></slot>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import constants from "@/assets/js/constants";
import {mapState} from "vuex";

export default {
  name: "HuadiaoFollowFanItem",
  props: ["item", "uid", "type"],
  data() {
    return {
      // 是否关注
      follow: this.type === "follow" ? true : (this.type === "fan" && this.item.isFriend),
      isShow: {
        toolMenu: false,
      },
      wrongLink: constants.wrongLink,
    }
  },
  computed: {
    ...mapState(["isLogin"]),
    me() {
      return this.$store.state.followFan.me;
    }
  },
  mounted() {
    this.initialFollowUser();
  },
  methods: {
    // 初始化
    initialFollowUser() {
      this.$refs.userAvatar.style.backgroundImage = "url(" + this.item.userAvatar + ")"
    },
    // 改变关注状态
    changeFollowStatus() {
      this.follow = !this.follow;
      // 刷新关注
      if(this.type === "follow") {
        this.$store.dispatch("flushUserFollow", {increment: this.follow ? 1 : -1, followUid: this.uid});
      }
    },
  },
  beforeDestroy() {
    this.clearAllRefsEvents();
  }
}
</script>

<style scoped>
.huadiao-follow-fan-item:hover {
  background-color: rgba(156, 156, 156, 0.103);
}

.huadiao-follow-fan-item {
  display: flex;
}

.user-avatar-box {
  position: relative;
  width: 80px;
  height: 80px;
  padding: 15px 0 0 15px;
}

.user-avatar-box img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  transition: var(--transition-500ms);
}

.user-avatar-box img:hover,
.user-avatar:hover {
  transform: translateY(-3px);
  box-shadow: var(--box-shadow-min);
}

.user-avatar {
  position: absolute;
  top: 15px;
  left: 15px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  transition: var(--transition-500ms);
}

.user-infer,
.user-tools {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.nickname {
  font-size: 14px;
}

.canvases {
  font-size: 12px;
  margin-top: 10px;
}

/* 操作工具 */
.user-tools {
  position: relative;
  width: 150px;
  margin-left: auto;
}

.user-relation {
  display: flex;
}

.user-relation div {
  width: 70px;
  height: 22px;
  text-align: center;
  line-height: 22px;
  border-radius: 4px;
  background-color: #f3f3f3;
  cursor: pointer;
  transition: var(--transition-500ms);
}

.user-relation img {
  width: 15px;
  margin-left: 10px;
}

.user-relation div:hover {
  transform: translateY(-3px);
  box-shadow: var(--box-shadow-min);
}

.tool-menu {
  position: absolute;
  z-index: 3;
  top: 60px;
  right: 20px;
  width: 80px;
  border-radius: 6px;
  background-color: #fff;
  box-shadow: var(--box-shadow-min);
  transition: var(--transition-500ms);
}

/* 新添加的 html 元素没有 css 样式, 故使用 /deep/ */
.tool-menu/deep/div {
  height: 26px;
  text-align: center;
  line-height: 26px;
  font-size: 12px;
  cursor: pointer;
}

.tool-menu/deep/div:hover {
  background-color: rgba(216, 216, 216, 0.253);
}

/* 未关注 */
div.unfollow {
  color: #fff;
  background-color: #ff3f3f;
}

div.unfollow:hover {
  background-color: #d93535;
}

/* 已关注 */
div.follow {
  background-color: #f3f3f3;
}

div.follow:hover {
  background-color: #e0e0e0;
}


</style>