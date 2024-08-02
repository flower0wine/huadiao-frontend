/**
 * 功能描述：
 * 创建日期：2024 年 07 月 13 日
 */

// 使用严格模式
'use strict';

export default {
    computed: {
        chatUid() {
            const chatUid = parseInt(this.$route.params.uid);
            return isNaN(chatUid) ? null : chatUid;
        },
    },
}