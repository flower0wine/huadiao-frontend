/**
 * 功能描述：
 * 创建日期：2023 年 09 月 25 日
 */

// 使用严格模式
'use strict';

export default {
    data() {
        return {
        }
    },
    created() {
    },
    methods: {
        getMapKey(uid, groupId) {
            return `${uid}/${groupId}`;
        }
    }
}