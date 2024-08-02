/**
 * 功能描述：
 * 创建日期：2024 年 07 月 13 日
 */

// 使用严格模式
'use strict';

export default {
    data() {
        return {
            offset: 0,
            row: 10,

            hasNext: true,
            accessing: false,
        };
    },

    methods: {
        resetPaginator() {
            this.offset = 0;
            this.row = 10;
            this.hasNext = true;
            this.accessing = false;
        },
    },
}