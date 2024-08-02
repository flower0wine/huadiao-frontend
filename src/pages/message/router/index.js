/**
 * 功能描述：
 * 创建日期：2023 年 03 月 20 日
 */

// 使用严格模式
'use strict';

import VueRouter from "vue-router";
import {
    LIKE_ROUTE_PATH,
    MESSAGE_CHAT_BOARD_ROUTE_NAME,
    REPLY_ROUTE_PATH, SYSTEM_ROUTE_PATH,
    WHISPER_ROUTE_PATH
} from "@/pages/message/config";

export default new VueRouter({
    mode: "hash",
    routes: [
        {
            path: "/",
            redirect: REPLY_ROUTE_PATH,
        },
        {
            name: "replyMeBoard",
            path: REPLY_ROUTE_PATH,
            component: () => import("@/pages/message/pages/ReplyMeBoard"),
        },
        {
            name: "whisperBoard",
            path: WHISPER_ROUTE_PATH,
            component: () => import("@/pages/message/pages/WhisperBoard"),
            children: [{
                name: MESSAGE_CHAT_BOARD_ROUTE_NAME,
                path: ":uid(\\d+)",
                components: {
                    whisperChatBoard: () => import("@/pages/message/pages/WhisperChatBoard"),
                }
            }, ]
        },
        {
            name: "likeMeBoard",
            path: LIKE_ROUTE_PATH,
            component: () => import("@/pages/message/pages/LikeMeBoard"),
        },
        {
            name: "likeMeDetails",
            path: `${LIKE_ROUTE_PATH}/:messageIndex(\\d+)`,
            component: () => import("@/pages/message/pages/LikeMeDetails"),
        },
        {
            name: "systemMessageBoard",
            path: SYSTEM_ROUTE_PATH,
            component: () => import("@/pages/message/pages/SystemMessageBoard"),
        },
        {
            name: "messageSettingsBoard",
            path: "/settings",
            component: () => import("@/pages/message/pages/MessageSettingsBoard"),
        }
    ],
})
