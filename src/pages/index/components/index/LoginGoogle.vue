<template>
  <div class="login-google login-way"
       @click="clickToLoginGoogle">
    <div class="login-icon">
      <div v-html="svg.google"></div>
    </div>
  </div>
</template>

<script>
import {svg} from "@/assets/js/constants/svgs";
import googleOauth from "@/assets/js/constants/oauth/google";
import {getOauthPath} from "@/assets/js/utils";

let {authorizeUri, scope, responseType, clientId, redirectUri} = googleOauth;

export default {
  name: "LoginGoogle",
  data() {
    return {
      svg: {
        google: svg.google,
      }
    }
  },
  methods: {
    clickToLoginGoogle() {
      window.open(getOauthPath(authorizeUri, clientId, redirectUri, scope, responseType), "_self", "location=yes");
    }
  },
  beforeDestroy() {
  }
}
</script>

<style scoped>

</style>