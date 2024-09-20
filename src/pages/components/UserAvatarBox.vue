<template>
  <div class="user-avatar-box"
       :style="userAvatarStyle"
       :class="defaultOptions.hover ? 'userAvatarHover' : ''">
    <!--带链接-->
    <template v-if="defaultOptions.href">
      <a :href="defaultOptions.href" target="_blank">
        <div class="default-user-avatar" v-html="avatarIcon"></div>
        <div class="user-avatar"
             v-if="hasAvatar"
             :style="`background-image: url(${userAvatar}); ${borderStyle};`"></div>
      </a>
    </template>

    <!--不带链接-->
    <template v-else>
      <div class="default-user-avatar" v-html="avatarIcon"></div>
      <div class="user-avatar"
           v-if="hasAvatar"
           :style="`background-image: url(${userAvatar}); ${borderStyle}`"></div>
    </template>
  </div>
</template>

<script>
import {svg} from "@/assets/js/constants/svgs";
import {modifySrcObject} from "@/util/tool";
import {getAvatarUrl} from "@/util/huadiao-tool";

export default {
  name: "UserAvatarBox",
  props: ["options", "userAvatarUrl"],
  data() {
    return {
      defaultUserAvatar: "",
      defaultOptions: {
        userAvatar: "",
        scale: "",
        borderColor: "",
        href: "",
        transitionTime: "",
        shadow: false,
        hover: false,
      },
    }
  },
  watch: {
    options: {
      deep: true,
      handler(newValue) {
        modifySrcObject(this.defaultOptions, newValue);
      }
    },
    userAvatarUrl: {
      immediate: true,
      handler(newValue) {
        this.defaultUserAvatar = newValue;
      }
    }
  },

  created() {
    modifySrcObject(this.defaultOptions, this.options);
  },

  computed: {
    avatarIcon() {
      return svg.avatar;
    },

    hasAvatar() {
      return Boolean(this.userAvatarUrl || this.defaultOptions.userAvatar);
    },
    userAvatar() {
      let userAvatar = this.defaultUserAvatar || this.defaultOptions.userAvatar;
      return getAvatarUrl(userAvatar);
    },
    userAvatarStyle() {
      let defaultOptions = this.defaultOptions;
      return `--scale: ${defaultOptions.scale}; --transitionTime: ${defaultOptions.transitionTime};
      ${defaultOptions.shadow && !this.defaultOptions.hover ? `box-shadow: var(--box-shadow-min);` : ''};`;
    },
    borderStyle() {
      let defaultOptions = this.defaultOptions;
      return defaultOptions.borderColor ? 'border: 2px solid ' + defaultOptions.borderColor : '';
    }
  },
}
</script>

<style scoped>
.user-avatar-box {
  position: relative;
  --scale: "";
  --borderColor: "";
  --transitionTime: "";
  width: var(--scale);
  height: var(--scale);
  border-radius: 50%;
  transition: all var(--transitionTime);
}

.default-user-avatar {
  position: absolute;
  top: 0px;
  left: 0px;
  width: var(--scale);
  height: var(--scale);
  border-radius: 50%;
}

.default-user-avatar /deep/ svg {
  width: var(--scale);
  height: var(--scale);
  transition: all var(--transitionTime);
}

.user-avatar {
  position: absolute;
  top: 0px;
  left: 0px;
  width: var(--scale);
  height: var(--scale);
  border-radius: 50%;
  background: center/cover no-repeat;
  transition: all var(--transitionTime);
}

.userAvatarHover:hover {
  transform: translateY(-3px);
  box-shadow: var(--box-shadow-min);
}
</style>
