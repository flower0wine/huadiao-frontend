<template>
  <div class="huadiao-menu-bar" :style="menuBoardStyle">
    <div class="huadiao-menu-header">
      <span>菜单栏</span>
    </div>
    <div v-for="(menuConfig, index) in huadiaoMenuConfig"
         :key="index"
         :title="menuConfig.title"
         class="huadiao-menu-item"
    >
      <a :href="menuConfig.url" target="_blank">
        <span v-html="menuConfig.svg" class="svg-icon"></span>
        <span>{{ menuConfig.description }}</span>
      </a>
    </div>
  </div>
</template>

<script>
import constants from "@/assets/js/constants";
import {svg} from "@/assets/js/constants/svgs";
import {mapState} from "vuex";
import {menuPageOne} from "@/assets/js/constants/huadiao_menu_style";

export default {
  name: "HuadiaoMenu",
  props: ["menuStyle", "login"],
  data() {
    return {
      huadiaoMenuConfig: [],
      huadiaoMenuStyle: {
        ...menuPageOne,
      },
    }
  },
  computed: {
    ...mapState(["user"]),
    menuBoardStyle() {
      let {background, menuBorderColor} = this.huadiaoMenuStyle;
      return `background: ${background}; --menu-border-color: ${menuBorderColor};`;
    },
  },
  watch: {
    user: {
      handler() {
        this.setHuadiaoMenuConfig();
      }
    }
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
    },
    setHuadiaoMenuConfig() {
      let uid = this.user.uid;
      this.huadiaoMenuConfig = [{
        title: "该替键盘清灰了",
        svg: svg.add,
        description: "新建笔记",
        url: this.getLinkByUserLogged("/buildnote"),
      }, {
        title: "回顾一下以前的艰辛",
        svg: svg.notes,
        description: "我的笔记",
        url: this.getLinkByUserLogged(`/notes/${uid}`),
      }, {
        title: "收藏都在这里",
        svg: svg.star,
        description: "我的收藏",
        url: this.getLinkByUserLogged(`/star/${uid}/note`),
      }, {
        title: "瞅一瞅关注了谁",
        svg: svg.follow,
        description: "我的关注",
        url: this.getLinkByUserLogged(`/followfan/${uid}/follow`),
      }, {
        title: "打造属于我的番剧馆",
        svg: svg.fanju,
        description: "我的番剧馆",
        url: this.getLinkByUserLogged("/animehouse/" + uid),
      }, {
        title: "有个性的个人主页",
        svg: svg.user,
        description: "我的主页",
        url: this.getLinkByUserLogged("/homepage/" + uid),
      }, {
        title: "核心隐私地带",
        svg: svg.setting,
        description: "我的设置",
        url: this.getLinkByUserLogged("/account/settings")
      }];
    },
  },
  beforeDestroy() {
  }
}
</script>

<style scoped>

.huadiao-menu-bar {
  position: fixed;
  z-index: 31;
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

.svg-icon /deep/ svg {
  width: 18px;
  height: 18px;
  fill: #fff;
}

</style>