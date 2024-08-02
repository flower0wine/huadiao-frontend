/**
 * 功能描述：
 * 创建日期：2024 年 05 月 13 日
 */

// 使用严格模式
'use strict';

export function isNumber(value) {
    return typeof value === 'number' && !isNaN(value);
}