<template>
  <div class="huadiao-homepage-header">
    <div class="huadiao-index">
      <a href="/">
        <img :src="authorityImg" alt>
      </a>
    </div>
    <div class="homepage-header-tools"
         v-if="me"
    >
      <span class="homepage-tool"
            title="更换背景"
      >
        <label for="homepageBackground">
          <span v-html="svg.picture" class="picture"></span>
          <input type="file" id="homepageBackground" @change="homepageBackgroundChange" ref="homepageBackgroundInput">
        </label>
      </span>
      <span class="homepage-tool"
            title="账号设置">
        <a href="/account/settings" target="_blank">
          <span v-html="svg.setting" class="setting"></span>
        </a>
      </span>
    </div>
  </div>
</template>

<script>
import {svg} from "@/assets/js/constants/svgs";
import {apis} from "@/assets/js/constants/request-path";
import {statusCode} from "@/assets/js/constants/status-code";
import AuthorityImg from "@/assets/img/authority.webp";

export default {
  name: "HuadiaoHomepageHeader",
  data() {
    return {
      svg,
    }
  },
  computed: {
    authorityImg() {
      return AuthorityImg;
    }
  },
  methods: {
    homepageBackgroundChange() {
      let homepageBackground = this.$refs.homepageBackgroundInput;
      this.$store.commit("modifyHomepageBackground", {background: this.getImgPath(homepageBackground)});
      let formDate = new FormData();
      formDate.append("background", homepageBackground.files[0]);
      this.sendRequest({
        path: apis.homepage.modifyBackground,
        method: "post",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formDate,
        thenCallback: (response) => {
          let res = response.data;
          console.log(res);
          if(res.code === statusCode.SUCCEED) {
            this.huadiaoMiddleTip("页面背景修改成功");
          }
        },
        errorCallback: (error) => {
          console.log(error);
        }
      })
    },
  },
  beforeDestroy() {
  }
}
</script>

<style scoped>
/* logo */
.huadiao-index img {
  width: 40px;
}

.huadiao-homepage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7px 10px;
}

.homepage-header-tools /deep/ svg {
  width: 26px;
  height: 26px;
  fill: #fff;
  transition: var(--transition-500ms);
}

.homepage-tool {
  margin-left: 15px;
}

/* 换背景 */
.picture:hover /deep/ svg {
  transform: translateY(-3px);
}

.setting:hover /deep/ svg {
  transform: rotate(180deg);
}
</style>