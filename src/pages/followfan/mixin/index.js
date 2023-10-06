/**
 * 功能描述：
 * 创建日期：2023 年 09 月 29 日
 */

// 使用严格模式
'use strict';

import constants from "@/assets/js/constants";

export default {
    data() {
        return {
            followFanImagePath: `${constants.imageHost}followFan/`,
        }
    },
    methods: {
        getMapKey(uid, groupId) {
            return `${uid}/${groupId}`;
        }
    }
}