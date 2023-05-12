/**
 * 功能描述：Vuex
 * 创建日期：2023 年 05 月 02 日
 */

// 使用严格模式
'use strict';

import Vue from "vue";
import Vuex from "vuex";

const state = {
    user: {
        login: false,
        nickname: "",
        uid: 0,
        userAvatar: "",
        follows: 0,
        fans: 0,
    },
};
const actions = {};
const mutations = {};
const getters = {};

Vue.use(Vuex);

export default new Vuex.Store({
    getters,
    mutations,
    actions,
    state
})

