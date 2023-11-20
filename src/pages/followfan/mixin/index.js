/**
 * 功能描述：
 * 创建日期：2023 年 09 月 29 日
 */

// 使用严格模式
'use strict';

import {apis} from "@/assets/js/constants/request-path";

export default {
    data() {
        return {
            followFanImagePath: `${apis.imageHost}followFan/`,
        }
    },
    methods: {
        getMapKey(uid, groupId) {
            return `${uid}/${groupId}`;
        }
    }
}