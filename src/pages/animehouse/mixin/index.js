/**
 * 功能描述：
 * 创建日期：2023 年 09 月 10 日
 */

// 使用严格模式
'use strict';

import {mapState} from "vuex";
import {apis} from "@/assets/js/constants/request-path";

export const animeHouseMixin = {
    data() {
        return {
            huadiaoHouseImageHost: `${apis.imageHost}huadiaoHouse/`,
        }
    },
    computed: {
        ...mapState({
            me(state) {
                let viewedUid = parseInt(this.$route.params.viewedUid);
                return state.user.uid === viewedUid;
            },
        }),
    },
    methods: {
    }
}