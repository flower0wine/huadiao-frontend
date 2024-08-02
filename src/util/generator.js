/**
 * 功能描述：
 * 创建日期：2024 年 05 月 13 日
 */

// 使用严格模式
'use strict';

/**
 * 生成唯一标识符
 * @param description
 * @return {symbol}
 */
export function generateUniqueId(description) {
    return description ? Symbol(description) : Symbol();
}


/**
 * 生成随机字母字符串
 */
export function randomAlphaString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}