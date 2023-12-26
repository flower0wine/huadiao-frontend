/**
 * 功能描述：
 * 创建日期：2023 年 02 月 27 日
 */

// 使用严格模式
'use strict';
import Vue from 'vue'
import VueRouter from "vue-router";
import router from "@/pages/index/router";
import index from "@/pages/index/index.vue";
import "@/assets/css/common.css";
import "@/assets/css/animation.css";
import {mixin} from "@/mixin";
import {mixin as indexMixin} from "@/pages/index/mixin";
import $ from "jquery";
import store from "@/pages/index/store";
import huadiaoFullPage from "@/assets/js/plugins/huadiao-fullpage";

Vue.config.productionTip = false;  // 生产提示

// 使用路由
Vue.use(VueRouter);
// 全屏滚动
Vue.use(huadiaoFullPage);

// 使用 VUE 混入
// 引入所有页面公共 mixin
Vue.mixin(mixin);
Vue.mixin(indexMixin);

new Vue({
    beforeCreate() {
        // 全局事件总线, 声明 vm 为中间变量
        Vue.prototype.$bus = this;
        // 全局 jquery
        Vue.prototype.$ = $;
    },
    // 渲染
    render: h => h(index),
    // 导入路由配置
    router,
    // 使用 vuex
    store,
    // 挂载
}).$mount('#app');
