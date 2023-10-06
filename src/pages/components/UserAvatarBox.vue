<template>
  <div class="user-avatar-box"
       :style="userAvatarStyle"
       :class="defaultOptions.hover ? 'userAvatarHover' : ''">
    <template v-if="defaultOptions.href">
      <a :href="defaultOptions.href">
        <div class="default-user-avatar" v-html="svg.avatar"></div>
        <div class="user-avatar"
             v-if="hasAvatar"
             :style="`${userAvatar}; ${borderColorStyle}`"></div>
      </a>
    </template>
    <template v-else>
      <div class="default-user-avatar" v-html="svg.avatar"></div>
      <div class="user-avatar"
           v-if="hasAvatar"
           :style="`${userAvatar}; ${borderColorStyle}`"></div>
    </template>
  </div>
</template>

<script>
import {svg} from "@/assets/js/constants/svgs";
import constants from "@/assets/js/constants";

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
      svg,
    }
  },
  watch: {
    options: {
      deep: true,
      handler(newValue) {
        this.modifySrcObject(this.defaultOptions, newValue);
      }
    },
    userAvatarUrl: {
      immediate: true,
      handler(newValue) {
        this.defaultUserAvatar = newValue;
      }
    }
  },
  mounted() {
  },
  computed: {
    hasAvatar() {
      return this.userAvatarUrl || this.defaultOptions.userAvatar;
    },
    userAvatar() {
      let userAvatar = this.defaultUserAvatar || this.defaultOptions.userAvatar;
      return this.parseUserAvatar(userAvatar);
    },
    userAvatarStyle() {
      let defaultOptions = this.defaultOptions;
      return `--scale: ${defaultOptions.scale}; --transitionTime: ${defaultOptions.transitionTime};
      ${defaultOptions.shadow && !this.defaultOptions.hover ? `box-shadow: var(--box-shadow-min);` : ''};`;
    },
    borderColorStyle() {
      let defaultOptions = this.defaultOptions;
      return `${defaultOptions.borderColor ? 'border: 2px solid ' + defaultOptions.borderColor : ''}`
    },
  },
  beforeMount() {
    this.modifySrcObject(this.defaultOptions, this.options);
  },
  methods: {
    parseUserAvatar(userAvatar) {
      if(!userAvatar.startsWith("blob:http://localhost") && !userAvatar.startsWith("http")) {
        userAvatar = `${this.userAvatarImagePath}${userAvatar}`;
      }
      return `background-image: url('${userAvatar}')`;
    }
  },
  beforeDestroy() {
  }
}
</script>

<style scoped>
.user-avatar-box {
  position: relative;
  --scale: "";
  --transitionTime: "";
  width: var(--scale);
  height: var(--scale);
  border-radius: 50%;
  transition: all var(--transitionTime);
}

.default-user-avatar /deep/ svg {
  width: var(--scale);
  height: var(--scale);
  transition: all var(--transitionTime);
}

.user-avatar {
  position: absolute;
  top: 0px;
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