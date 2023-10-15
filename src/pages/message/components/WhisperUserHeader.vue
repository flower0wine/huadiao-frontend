<template>
  <div class="whisper-user-header-container">
    <template v-if="visible.unfollowUser">
      <router-link to="/whisper" class="latest-user-link">近期消息</router-link>
      <span> > </span>
      <span>未关注的人</span>
    </template>
    <template v-else>
      <span>近期消息</span>
    </template>
  </div>
</template>

<script>
export default {
  name: "WhisperUserHeader",
  data() {
    return {
      visible: {
        unfollowUser: true,
      },
    }
  },
  watch: {

  },
  created() {
    console.log(this.$route)
  },
  methods: {},
  beforeDestroy() {
  }
}
</script>

<style scoped>
.whisper-user-header-container {
  font-size: 12px;
  padding-left: 25px;
  line-height: 30px;
  border-bottom: 1px solid #bebebe;
}

.latest-user-link {
  color: #4b4b4b;
  transition: color 300ms;
}

.latest-user-link:hover {
  color: #cc3b3b;
}
</style>