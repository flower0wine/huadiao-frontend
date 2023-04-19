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
            path: "/account",
            redirect: "/account/info",
        },
        {
            name: "accountInfo",
            path: "/account/info",
            components: {
                // mainBoard 是指定的 router-view 的 name, 必须配合 components 属性使用
                mainBoard: () => import("@/pages/account/pages/HuadiaoAccountInfo")
            },
        },
        {
            name: "accountSettings",
            path: "/account/settings",
            components: {
                mainBoard: () => import("@/pages/account/pages/HuadiaoAccountSettings")
            }
        }
    ]
})