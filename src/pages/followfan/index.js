/**
 * 功能描述：
 * 创建日期：2023 年 02 月 27 日
 */

// 使用严格模式
'use strict';
import Vue from 'vue'
import VueRouter from "vue-router";
import index from "@/pages/followfan/index.vue";
import "@/assets/css/common.css";
import "@/assets/css/animation.css";
import router from "@/pages/followfan/router";
import store from "@/pages/followfan/store";

Vue.config.productionTip = false;  // 生产提示

// 使用路由
Vue.use(VueRouter);

const app = new Vue({
  beforeCreate() {
    // 全局事件总线, 声明 vm 为中间变量
    Vue.prototype.$bus = this;
  },
  // 渲染
  render: h => h(index),
  // 路由
  router,
  // vuex
  store,
  // 挂载
});

router.onReady(() => {
  app.$mount('#app');
});

