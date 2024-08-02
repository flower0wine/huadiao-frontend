/**
 * 功能描述：
 * 创建日期：2024 年 04 月 20 日
 */

// 使用严格模式
'use strict';

import VueRouter from "vue-router";

export default new VueRouter({
    mode: "history",
    routes: [{
        path: '/error',
        name: 'error',
    }, {
        path: '/error/404',
        name: 'clientError404',
        component: () => import('@/pages/error/components/ClientError404')
    }]
});