<template>
  <div class="login-way-list">
    <login-github/>
  </div>
</template>

<script>
import LoginGithub from "@/pages/index/components/index/LoginGithub";
export default {
  name: "LoginWayList",
  components: {LoginGithub},
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
  margin-top: 40px;
  text-align: center;

  .login-icon svg {
    width: 24px;
    height: 24px;
  }
}
</style>

<style scoped>

</style>