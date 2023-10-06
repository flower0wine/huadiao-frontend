/**
 * 功能描述：
 * 创建日期：2023 年 09 月 14 日
 */

// 使用严格模式
'use strict';

import {mapState} from "vuex";
import constants from "@/assets/js/constants";

export default {
    data() {
        return {
            homepageBackgroundImagePath: `${constants.imageHost}homepageBackground/`,
            userAvatarImagePath: `${constants.imageHost}userAvatar/`,
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