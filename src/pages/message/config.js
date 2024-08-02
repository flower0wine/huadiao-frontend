/**
 * 功能描述：
 * 创建日期：2024 年 07 月 12 日
 */

// 使用严格模式
'use strict';

export const MESSAGE_CHAT_BOARD_ROUTE_NAME = "messageChatBoard";

export const CANNOT_DECREASE_NAV_LIST = ["whisper"];

export const NAV_ORDER = ["reply", "like", CANNOT_DECREASE_NAV_LIST[0], "system"];

export const REPLY_ROUTE_PATH = "/reply";
export const LIKE_ROUTE_PATH = "/like";
export const WHISPER_ROUTE_PATH = "/whisper";
export const SYSTEM_ROUTE_PATH = "/system";

export const NAVIGATION = {
    reply: {
        content: "回复我的",
        to: REPLY_ROUTE_PATH,
    },
    like: {
        content: "点赞我的",
        to: LIKE_ROUTE_PATH,
    },
    whisper: {
        content: "我的消息",
        to: WHISPER_ROUTE_PATH,
    },
    system: {
        content: "系统消息",
        to: SYSTEM_ROUTE_PATH,
    },
};