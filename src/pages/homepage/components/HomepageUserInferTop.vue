<template>
  <div class="homepage-user-infer">
    <label for="userAvatar"
           :title="me ? '更换头像' : ''"
    >
      <span class="user-avatar-container">
        <img src="/svg/noLoginAvatar.svg"
             class="user-default-avatar"
             alt>
        <span class="user-avatar" :style="`background-image: ${addBackground(homepageInfo.userAvatar)}`" ref="userAvatar"></span>
      </span>
      <input type="file"
             v-if="me"
             id="userAvatar">
    </label>
    <div class="homepage-nickname">{{userInfo.nickname}}</div>
    <div class="homepage-sex">
      <img :src="sexSvg[userInfo.sex]"
           class="sex-icon"
           alt>
    </div>
    <div class="born-date-school">
      <span class="born-date">{{userInfo.bornDate}}</span>
      <a :href="baiduSearch + userInfo.school"
         target="_blank">
        <span class="school">{{userInfo.school}}</span>
      </a>
    </div>
    <div class="homepage-canvases"
         :title="userInfo.canvases">
      {{userInfo.canvases.length < 200 ? userInfo.canvases : userInfo.canvases.slice(0, 200) + "..."}}
    </div>
  </div>
</template>

<script>
export default {
  name: "HomepageUserInferTop",
  props: ["userInfo", "homepageInfo", "me"],
  data() {
    return {
      sexSvg: {
        // 未知性别
        "0": "/svg/noKnownSex.svg",
        // 男
        "1": "/svg/man.svg",
        // 女
        "2": "/svg/women.svg",
      },
      baiduSearch: "https://www.baidu.com/s?tn=68018901_39_oem_dg&ie=utf-8&word="
    }
  },
  mounted() {
  },
  methods: {
  },
  beforeDestroy() {
  }
}
</script>

<style scoped>
.homepage-user-infer {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
}

.user-avatar-container {
  position: relative;
  display: inline-block;
  border-radius: 50%;
  box-shadow: var(--box-shadow);
}

.user-avatar {
  position: absolute;
  top: 0;
  left: 0;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 2px solid #fff;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  transition: var(--transition-500ms);
}

.user-avatar-container {
  transition: all linear 60s;
}

.user-avatar-container:hover {
  transform: rotateZ(3600deg);
}

.user-default-avatar {
  width: 80px;
}

.homepage-nickname {
  font-size: 20px;
  font-weight: 700;
  margin: 20px 0 3px 0;
  color: #fff;
  text-shadow: 4px 4px 5px #0000009B;
}

.homepage-nickname:hover {
  background-image: -webkit-linear-gradient(right, #f35626,#feab3a);
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  animation: background 10s infinite;
}

.sex-icon {
  width: 20px;
}

.born-date-school {
  font-size: 14px;
  color: #EEEEEEFF;
}

.born-date-school a {
  color: #EEEEEEFF;
}

.born-date {
  margin-right: 40px;
}

.homepage-canvases {
  width: 700px;
  margin: 10px 0 20px 0;
  text-align: center;
  letter-spacing: 1px;
  color: #EEEEEEFF;
}
</style>