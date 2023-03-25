<template>
  <div class="huadiao-homepage-header">
    <div class="huadiao-index">
      <a href="/">
        <img src="/img/authority.png" alt>
      </a>
    </div>
    <div class="homepage-header-tools"
         v-if="me"
    >
      <span class="homepage-tool"
            title="更换背景"
      >
        <label for="homepageBackground">
          <img src="/svg/picture.svg"
               class="picture"
               alt>
          <input type="file" id="homepageBackground">
        </label>
      </span>
      <a href="/settings" target="_blank">
        <span class="homepage-tool"
              title="账号设置"
        >
        <img src="/svg/setting.svg"
             class="setting"
             alt>
      </span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "HuadiaoHomepageHeader",
  props: ["me"],
  data() {
    return {
      homepageConfig: {
      }
    }
  },
  methods: {},
  beforeDestroy() {
  }
}
</script>

<style scoped>
/* logo */
.huadiao-index img {
  width: var(--logo-scale);
}

.huadiao-homepage-header {
  display: flex;
  justify-content: space-between;
  padding: var(--header-padding);
}

.homepage-header-tools img {
  width: 30px;
  transition: var(--transition-500ms);
}

.homepage-tool {
  margin-left: 20px;
}

/* 换背景 */
.picture:hover {
  transform: translateY(-3px);
}

.setting:hover {
  transform: rotate(180deg);
}
</style>