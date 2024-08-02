/**
 * 功能描述：
 * 创建日期：2024 年 05 月 04 日
 */

// 使用严格模式
'use strict';

export const SVG_COMPONENT_PROPS = {
    width: {
        type: String,
        default: "16"
    },
    height: {
        type: String,
        default: "16"
    },
    fill: {
        type: String,
        default: '#000'
    },
    transform: {
        type: String,
        default: ''
    },
    transition: {
        type: String,
        default: ''
    },
};