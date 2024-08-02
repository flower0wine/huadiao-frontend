/**
 * 功能描述：
 * 创建日期：2024 年 07 月 20 日
 */

// 使用严格模式
'use strict';

import {get} from "@/util/request";

export function getEmotes() {
    return get("/emote");
}

export function getUnreadCount() {
    return get("/message/unread/count");
}