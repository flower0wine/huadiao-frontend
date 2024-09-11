<template>
  <div class="error-403">
    <div class="error-img">
      <img src="@/assets/error/403.png" alt="" />
    </div>
    <div class="error-tip">
      <div class="tip-icon">
        <WarnIcon />
      </div>
      <div class="tip-text">查看该页面需要权限</div>
    </div>
  </div>
</template>

<script>
import WarnIcon from "@/pages/components/svg/WarnIcon";

export default {
  name: "ClientError403",
  components: {WarnIcon},
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
.error-403 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.error-tip {
  display: flex;

  .tip-icon {
    width: 35px;
    height: 35px;
    margin-right: 10px;
  }

  .tip-text {
    font-size: 24px;
    color: #646464;
  }
}

.error-img {
  width: 300px;

  img {
    width: 100%;
  }
}
</style>