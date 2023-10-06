/**
 * 功能描述：
 * 创建日期：2023 年 03 月 16 日
 */

// 使用严格模式
'use strict';

import VueRouter from "vue-router";

export default new VueRouter({
    mode: "history",
    routes: [
        {
            path: "/star/:viewedUid(\\d+)/note",
            redirect: "/star/:viewedUid(\\d+)/note/-1"
        },
        {
            path: "/star/:viewedUid(\\d+)/anime",
            redirect: "/star/:viewedUid(\\d+)/anime/-1"
        },
        {
            path: "/star/:viewedUid(\\d+)/note/:groupId(-?\\d+)",
            components: {
                // 目录
                catalogue: () => import("@/pages/star/pages/NotesStarCatalogue"),
                // 内容
                starBoard: () => import("@/pages/star/pages/NotesStarBoard"),
            },
        },
        {
            path: "/star/:viewedUid(\\d+)/anime/:groupId(-?\\d+)",
            components: {
                // 目录
                catalogue: () => import("@/pages/star/pages/FanjuStarCatalogue"),
                // 内容
                starBoard: () => import("@/pages/star/pages/FanjuStarBoard"),
            }
        },
    ],
})