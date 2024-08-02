/**
 * 功能描述：
 * 创建日期：2024 年 05 月 12 日
 */

// 使用严格模式
'use strict';

export default function useContextMenu() {
    const props = {

        // top 和 left 在 customMenuPosition 存在的情况下仅是用于通知 Vue 重新渲染
        top: {
            type: Number,
            default: 0,
        },

        left: {
            type: Number,
            default: 0,
        },

        // 自定义菜单位置
        customPosition: {
            type: Function,
            required: false,
        },
    };

    return {
        props,
    }
}