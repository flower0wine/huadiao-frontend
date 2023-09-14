/**
 * 功能描述：Vuex
 * 创建日期：2023 年 05 月 02 日
 */

// 使用严格模式
'use strict';

import Vue from "vue";
import Vuex from "vuex";

const state = {
    allInfo: {
        me: null,
        uid: null,
        relation: null,
        fanCount: null,
        followCount: null,
        homepageInfo: {
            uid: null,
            pageBackground: null,
            userAvatar: null,
            visitCount: null,
        },
        userInfo: {
            bornDate: null,
            canvases: null,
            nickname: null,
            school: null,
            sex: null,
        },
    }
};
const actions = {};
const mutations = {
    initialAllInfo(state, {allInfo}) {
        state.allInfo = allInfo;
    },
};
const getters = {};

Vue.use(Vuex);

export default new Vuex.Store({
    getters,
    mutations,
    actions,
    state
})

