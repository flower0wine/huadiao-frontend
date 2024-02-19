<template>
  <div class="login-way-list">
    <login-github/>
    <login-google/>
  </div>
</template>

<script>
import LoginGithub from "@/pages/index/components/index/LoginGithub";
import LoginGoogle from "@/pages/index/components/index/LoginGoogle";
export default {
  name: "LoginWayList",
  components: {LoginGoogle, LoginGithub},
  data() {
    return {}
  },
  methods: {},
  beforeDestroy() {
  }
}
</script>

<style lang="scss">
.login-way-list {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 40px;

  .login-icon svg {
    width: 24px;
    height: 24px;
  }
}
</style>

<style scoped>

</style>