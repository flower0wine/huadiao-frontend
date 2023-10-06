<template>
  <div class="huadiao-follow-fan-item"
       ref="followFanItem">
    <div class="choose-input-box"
         v-show="patch">
      <div class="choose-input"
           v-html="svg.multiplyInput"
           @click="clickMultiplyInput"></div>
    </div>
    <a class="user-avatar-box"
       :title="'前往' + nickname + '的个人主页'"
       :href="`/homepage/${item.uid}`"
    >
      <img src="/svg/noLoginAvatar.svg" alt="">
      <div class="user-avatar"
           :style="`background-image: url('${userAvatarImagePath}${item.userAvatar}')`"
      ></div>
    </a>
    <div class="user-infer">
      <div class="nickname"
           :title="nickname"
      >{{ nickname }}
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
             @mouseenter="visible.toolMenu.render = visible.toolMenu.show = true"
             @mouseleave="visible.toolMenu.show = false"
             ref="more"
             alt="">
      </div>
      <transition name="fade">
        <div class="tool-menu"
             v-if="visible.toolMenu.render"
             v-show="visible.toolMenu.show"
             @mouseenter="visible.toolMenu.show = true"
             @mouseleave="visible.toolMenu.show = false"
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
import {apis} from "@/assets/js/constants/request-path";
import {statusCode} from "@/assets/js/constants/status-code";
import {svg} from "@/assets/js/constants/svgs";

export default {
  name: "HuadiaoFollowFanItem",
  props: ["item", "type", "index", "addFollow", "removeFollow", "patch", "mapKey", "groupId"],
  data() {
    return {
      svg,
      // 是否关注
      follow: this.type === "follow" ? true : (this.type === "fan" && this.item.friend),
      itemClass: "chose-follow-item",
      visible: {
        toolMenu: {
          render: false,
          show: false,
        },
      },
    }
  },
  computed: {
    me() {
      return this.$store.state.me;
    },
    nickname() {
      return this.item.nickname ?? this.item.userId;
    },
    canvases() {
      return this.item.canvases > 20 ? this.item.canvases.substring(0, 20) :
          this.item.canvases;
    }
  },
  watch: {
    patch: {
      handler(val) {
        if (!val) {
          let classList = this.$refs.followFanItem.classList;
          classList.remove(this.itemClass);
        }
      }
    }
  },
  methods: {
    clickMultiplyInput() {
      let classList = this.$refs.followFanItem.classList;
      let clazz = this.itemClass;
      if (classList.contains(clazz)) {
        classList.remove(clazz);
        this.removeFollow(this.index);
      } else {
        classList.add(clazz);
        this.addFollow(this.index);
      }
    },
    changeFollowStatus(uid) {
      // 根据不同的关注状态选择不同的后端接口
      let path;
      if (this.follow) {
        path = apis.followFan.deleteFollow;
      } else {
        path = apis.followFan.newFollow;
      }
      this.sendRequest({
        path,
        params: {
          uid,
        },
        thenCallback: (response) => {
          let res = response.data;
          console.log(res);
          if (res.code === statusCode.succeed) {
            this.changeFollowStatusOfFollow();
            this.$bus.$emit("flushFollowFanGroup");
          }
          this.follow = !this.follow;
        },
        errorCallback: (error) => {
          console.log(error);
        },
      });
    },
    changeFollowStatusOfFollow() {
      if(this.type === "follow") {
        this.$bus.$emit("changeFollowStatus", this.index);
      }
    },
  },
  beforeDestroy() {
  }
}
</script>

<style scoped>
.huadiao-follow-fan-item:hover {
  background-color: rgba(156, 156, 156, 0.103);
}

.huadiao-follow-fan-item {
  display: flex;
  transition: background-color 300ms;
}

.chose-follow-item .choose-input-box /deep/ svg {
  fill: #d96c6c;
}

.chose-follow-item .choose-input-box /deep/ svg path:nth-child(1) {
  display: inline-block;
}

.choose-input-box {
  display: flex;
  justify-content: right;
  align-items: center;
  width: 50px;
  height: 80px;
}

.choose-input {
  width: 38px;
  height: 38px;
}

.choose-input-box /deep/ svg {
  width: 38px;
  height: 38px;
  fill: #a4a4a4;
  cursor: pointer;
}

.choose-input-box /deep/ svg path:nth-child(1) {
  display: none;
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
.tool-menu /deep/ div {
  height: 26px;
  text-align: center;
  line-height: 26px;
  font-size: 12px;
  cursor: pointer;
}

.tool-menu /deep/ div:hover {
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