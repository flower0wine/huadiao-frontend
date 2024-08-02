/**
 * 功能描述：
 * 创建日期：2023 年 10 月 09 日
 */

// 使用严格模式
'use strict';

export const LIKE_MESSAGE_TYPE = {
    NOTE: 1,
    COMMENT: 2
};

export const LIKE_MESSAGE_TYPE_NAME = {
    1: '笔记',
    2: '评论'
};

export function isNoteType(type) {
    return type === LIKE_MESSAGE_TYPE.NOTE;
}

export function isCommentType(type) {
    return type === LIKE_MESSAGE_TYPE.COMMENT;
}

export function getNoteMessageType(message) {
    // 如果是评论点赞
    if (message.rootCommentId !== 0) {
        return LIKE_MESSAGE_TYPE.COMMENT;
    }
    // 如果是笔记点赞
    else {
        return LIKE_MESSAGE_TYPE.NOTE;
    }
}
