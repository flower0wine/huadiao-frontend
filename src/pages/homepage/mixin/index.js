/**
 * 功能描述：
 * 创建日期：2023 年 09 月 14 日
 */

// 使用严格模式
'use strict';

import {mapState} from "vuex";
import {apis} from "@/assets/js/constants/request-path";

export default {
    data() {
        return {
            homepageBackgroundImagePath: `${apis.imageHost}homepageBackground/`,
            userAvatarImagePath: `${apis.imageHost}userAvatar/`,
        }
    },
    computed: {
        ...mapState(["viewedUid"]),
        ...mapState({
            me(state) {
                return state.allInfo.me;
            },
        })
    },
    methods: {

    }
}