/**
 * 功能描述：
 * 创建日期：2023 年 02 月 27 日
 */

// 使用严格模式
'use strict';
import VueRouter from "vue-router";

export default new VueRouter({
    mode: "history",
    routes: [
        {
            path: "/",
            alias: ["/note/:type(\\w+)", "/note"],
            component: () => import("@/pages/index/components/forum/note/NoteList"),
        },
        {
            path: "/anime",
            alias: ["/anime/:type(\\w+)"],
            component: () => import("@/pages/index/components/forum/anime/AnimeList"),
        }
    ]
})