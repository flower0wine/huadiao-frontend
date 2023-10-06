/**
 * 功能描述：
 * 创建日期：2023 年 02 月 27 日
 */

// 使用严格模式
'use strict';
import Vue from 'vue'
import VueRouter from "vue-router";
import index from "@/pages/account/index.vue";
import "@/assets/css/common.css";
import "@/assets/css/animation.css";
import {mixin} from "@/mixin";
import $ from "jquery";
import router from "@/pages/account/router";
import store from "@/pages/account/store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;  // 生产提示

// 使用路由
Vue.use(VueRouter);
Vue.use(ElementUI);

// 使用 VUE 混入
// 引入所有页面公共 mixin
Vue.mixin(mixin);

new Vue({
    beforeCreate() {
        // 全局事件总线, 声明 vm 为中间变量
        Vue.prototype.$bus = this;
        // 全局 jquery
        Vue.prototype.$ = $;
    },
    // 渲染
    render: h => h(index),
    // 路由
    router,
    // vuex
    store
    // 挂载
}).$mount('#app');
