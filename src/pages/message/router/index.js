/**
 * 功能描述：
 * 创建日期：2023 年 03 月 20 日
 */

// 使用严格模式
'use strict';

import VueRouter from "vue-router";

export default new VueRouter({
    mode: "hash",
    routes: [
        {
            path: "/",
            redirect: "/reply",
        },
        {
            name: "replyMeBoard",
            path: "/reply",
            component: () => import("@/pages/message/pages/ReplyMeBoard"),
        },
        {
            name: "whisperBoard",
            path: "/whisper",
            component: () => import("@/pages/message/pages/WhisperBoard"),
            children: [{
                name: "messageChatBoard",
                path: ":uid(\\d+)",
                components: {
                    whisperChatBoard: () => import("@/pages/message/components/WhisperChatBoard"),
                }
            }]
        },
        {
            name: "likeMeBoard",
            path: "/like",
            component: () => import("@/pages/message/pages/LikeMeBoard"),
            children: [{
                name: "likeMeDetails",
                path: ":messageIndex(\\d+)",
                component: () => import("@/pages/message/pages/LikeMeDetails"),
            },],
        },
        {
            name: "systemMessageBoard",
            path: "/system",
            component: () => import("@/pages/message/pages/SystemMessageBoard"),
        },
        {
            name: "messageSettingsBoard",
            path: "/settings",
            component: () => import("@/pages/message/pages/MessageSettingsBoard"),
        }
    ],
})
