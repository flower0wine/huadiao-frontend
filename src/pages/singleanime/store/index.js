/**
 * 功能描述：
 * 创建日期：2023 年 03 月 20 日
 */

// 使用严格模式
'use strict';

import Vuex from "vuex";
import Vue from "vue";
import pageLayout from "@/pages/singleanime/store/page-layout";
import component from "@/pages/singleanime/store/component";
import taskWindow from "@/pages/singleanime/store/task-window";

const state = {
    // 用户信息
    user: {
        login: false,
        nickname: null,
        canvases: null,
        school: null,
        userId: null,
        bornDate: null,
        sex: 0,
        uid: 0,
        fans: 0,
        follows: 0,
        userAvatar: ""
    },
};


const mutations = {
    initialUser(state, {user}) {
        state.user = user;
    },
};


Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        component,
        pageLayout,
        taskWindow,
    },

    state,
    mutations,
});