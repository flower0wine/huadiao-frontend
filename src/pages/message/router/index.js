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
            path: "/message",
            redirect: "/message/reply",
        },
        {
            name: "replyMeBoard",
            path: "/message/reply",
            component: () => import("@/pages/message/pages/ReplyMeBoard"),
        },
        {
            name: "privateMessageBoard",
            path: "/message/private",
            component: () => import("@/pages/message/pages/PrivateMessageBoard"),
        },
        {
            name: "likeMeBoard",
            path: "/message/like",
            component: () => import("@/pages/message/pages/LikeMeBoard"),
        },
        {
            name: "likeMeDetails",
            path: "/message/like/:messageIndex(\\d+)",
            component: () => import("@/pages/message/pages/LikeMeDetails"),
        },
        {
            name: "systemMessageBoard",
            path: "/message/system",
            component: () => import("@/pages/message/pages/SystemMessageBoard"),
        },
        {
            name: "messageSettingsBoard",
            path: "/message/settings",
            component: () => import("@/pages/message/pages/MessageSettingsBoard"),
        },
    ],
})
