<template>
  <div class="login-github login-way"
       @click="clickToLoginGithub">
    <div class="login-icon">
      <div v-html="svg.github"></div>
    </div>
  </div>
</template>

<script>
import {svg} from "@/assets/js/constants/svgs";
import githubOauth from "@/assets/js/constants/oauth/github";
import {getOauthPath} from "@/assets/js/utils";

let {authorizeUri, clientId, redirectUri} = githubOauth;

export default {
  name: "LoginGithub",
  data() {
    return {
      svg: {
        github: svg.github,
      },
    }
  },
  methods: {
    clickToLoginGithub() {
      window.open(getOauthPath(authorizeUri, clientId, redirectUri), "_self");
    }
  },
  beforeDestroy() {
  }
}
</script>

<style scoped>

</style>