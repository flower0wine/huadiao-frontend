/**
 * 功能描述：Vuex
 * 创建日期：2023 年 05 月 02 日
 */

// 使用严格模式
'use strict';

import Vue from "vue";
import Vuex from "vuex";

const state = {
    viewedUid: -1,
    allInfo: {
        me: null,
        uid: null,
        relation: null,
        fanCount: null,
        followCount: null,
        noteStarCount: null,
        noteLikeCount: null,
        noteCount: null,
        animeCount: null,
        homepageInfo: {
            uid: null,
            pageBackground: "",
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
    initialViewedUid(state, {viewedUid}) {
        state.viewedUid = viewedUid;
    },
    modifyHomepageBackground(state, {background}) {
        state.allInfo.homepageInfo.pageBackground = background;
    },
    modifyUserAvatar(state, {userAvatar}) {
        state.allInfo.homepageInfo.userAvatar = userAvatar;
    }
};
const getters = {};

Vue.use(Vuex);

export default new Vuex.Store({
    getters,
    mutations,
    actions,
    state
})

