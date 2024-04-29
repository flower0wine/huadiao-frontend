/**
 * 功能描述：
 * 创建日期：2023 年 02 月 27 日
 */

// 使用严格模式
'use strict';
import Vue from 'vue'
import VueRouter from "vue-router";
import "@/assets/css/common.css";
import {mixin} from "@/mixin";
import App from "@/pages/error/App.vue";
import router from "@/pages/error/router";

Vue.config.productionTip = false;  // 生产提示

// 使用路由
Vue.use(VueRouter);

// 使用 VUE 混入
// 引入所有页面公共 mixin
Vue.mixin(mixin);

new Vue({
    beforeCreate() {
        // 全局事件总线, 声明 vm 为中间变量
        Vue.prototype.$bus = this;
    },
    router,
    // 渲染
    render: h => h(App),
    // 挂载
}).$mount('#app');
