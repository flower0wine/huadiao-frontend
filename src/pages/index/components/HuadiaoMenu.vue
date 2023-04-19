<template>
  <div class="huadiao-menu-bar" :style="`background: ${huadiaoMenuStyle.background}; --menu-border-color: ${huadiaoMenuStyle.menuBorderColor}`">
    <div class="huadiao-menu-header">
      <span>菜单栏</span>
    </div>
    <div v-for="(menuConfig, index) in huadiaoMenuConfig"
         :key="index"
         :title="menuConfig.title"
         class="huadiao-menu-item"
    >
      <a :href="menuConfig.url" target="_blank">
        <img :src="menuConfig.svg" alt>
        <span>{{ menuConfig.description }}</span>
      </a>
    </div>
  </div>
</template>

<script>
import constants from "@/assets/js/constants";

export default {
  name: "HuadiaoMenu",
  props: ["user", "menuStyle", "login"],
  data() {
    return {
      huadiaoMenuConfig: [{
        title: "该替键盘清灰了",
        svg: "/svg/newAdd.svg",
        description: "新建笔记",
        url: this.getLinkByUserLogged("/buildNote"),
      }, {
        title: "回顾一下以前的艰辛",
        svg: "/svg/notes.svg",
        description: "我的笔记",
        url: this.getLinkByUserLogged("/" + this.user.uid + "/notes"),
      }, {
        title: "收藏都在这里",
        svg: "/svg/star.svg",
        description: "我的收藏",
        url: this.getLinkByUserLogged("/star/" + this.user.uid),
      }, {
        title: "瞅一瞅关注了谁",
        svg: "/svg/follow.svg",
        description: "我的关注",
        url: this.getLinkByUserLogged("/" + this.user.uid + "/follow/follow"),
      }, {
        title: "打造属于我的番剧馆",
        svg: "/svg/fanju.svg",
        description: "我的番剧馆",
        url: this.getLinkByUserLogged("/huadiaohouse/" + this.user.uid),
      }, {
        title: "有个性的个人主页",
        svg: "/svg/user.svg",
        description: "我的主页",
        url: this.getLinkByUserLogged("/homepage/" + this.user.uid),
      }, {
        title: "核心隐私地带",
        svg: "/svg/setting.svg",
        description: "我的设置",
        url: this.getLinkByUserLogged("/settings")
      }],
      huadiaoMenuStyle: {
        background: "-webkit-linear-gradient(top, #9005a97a, #fb424279)",
        menuBorderColor: "#9f4996",
      }
    }
  },
  beforeMount() {
  },
  mounted() {
    this.$bus.$on("modifyHuadiaoMenuStyle", this.modifyHuadiaoMenuStyle);
  },
  methods: {
    // 在渲染之后再次修改样式
    modifyHuadiaoMenuStyle(style) {
      this.modifySrcObject(this.huadiaoMenuStyle, style);
    },
    // 根据用户登录状态转换链接
    getLinkByUserLogged(url) {
      return this.login ? url : constants.wrongLink
    }
  },
  beforeDestroy() {
  }
}
</script>

<style scoped>

.huadiao-menu-bar {
  position: fixed;
  z-index: 9;
  width: 230px;
  min-height: 400px;
  height: 100vh;
  border-radius: 0 16px 16px 0;
  color: #fff;
  --menu-border-color: "";
  transition: var(--transition-500ms);
}

.huadiao-menu-header span {
  font-size: 25px;
  font-weight: 700;
}

/* 每个菜单选项 */
.huadiao-menu-bar .huadiao-menu-item a,
.huadiao-menu-header {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 45px;
  font-size: 20px;
  color: #fff;
}

.huadiao-menu-bar .huadiao-menu-item a {
  border-top: 1px solid var(--menu-border-color);
}

/* 菜单项解释 */
.huadiao-menu-item span {
  margin-left: 10px;
}

.huadiao-menu-bar img {
  width: 20px;
  height: 20px;
}

</style>