/**
 * 功能描述：
 * 创建日期：2024 年 04 月 20 日
 */

// 使用严格模式
'use strict';

import VueRouter from "vue-router";
import {
    ERROR_403_PAGE_PATH,
    ERROR_404_PAGE_PATH
} from "@/pages/error/error-pages-path";

export default new VueRouter({
    mode: "history",
    routes: [
        {
            path: '/error',
            name: 'error',
        },
        {
            path: ERROR_404_PAGE_PATH,
            name: "clientError404",
            component: () => import('@/pages/error/pages/ClientError404')
        },
        {
            path: ERROR_403_PAGE_PATH,
            name: "clientError403",
            component: () => import('@/pages/error/pages/ClientError403')
        },
    ]
});