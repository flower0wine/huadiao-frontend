/**
 * 功能描述：
 * 创建日期：2023 年 03 月 20 日
 */

// 使用严格模式
'use strict';

import VueRouter from "vue-router";

export default new VueRouter({
    mode: "history",
    routes: [{
        path: "/singleanime/:id(\\d+)/edit",
        name: "editSingleAnime",
        component: () => import("@/pages/singleanime/edit/AnimeEditor.vue"),
        children: [{
            path: "global",
            alias: "",
            name: "editSingleAnimeGlobal",
            component: () => import("@/pages/singleanime/edit/aside/adjust/layout/global/PageLayout.vue")
        }, {
            path: "component",
            name: "editSingleAnimeComponent",
            // component: () => import("@/pages/singleanime/edit/aside/adjust/component/PageLayout.vue")
        }],
    }, {
        path: "/singleanime/:id(\\d+)",
        name: "singleAnime",
        component: () => import("@/pages/singleanime/preview/AnimePreviewer.vue")
    }],
})
