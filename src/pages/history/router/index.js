/**
 * 功能描述：
 * 创建日期：2023 年 03 月 20 日
 */

// 使用严格模式
'use strict';

import VueRouter from "vue-router";

export default new VueRouter({
    mode: "history",
    routes: [
        {
            path: "/history",
            redirect: "/history/:name(note)",
        },
        {
            path: "/history/:name(note)",
            component: () => import("@/pages/history/pages/NoteHistoryList"),
        },
        {
            path: "/history/:name(fanju)",
            component: () => import("@/pages/history/pages/AnimeHistoryList"),
        }
    ],
})
