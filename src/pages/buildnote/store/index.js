/**
 * 功能描述：
 * 创建日期：2023 年 03 月 20 日
 */

// 使用严格模式
'use strict';

import Vuex from "vuex";
import Vue from "vue";

const state = {
    isLogin: true,
    // 用户信息
    user: {
        isLogin: null,
        nickname: "花凋大总管",
        canvases: "今天是花凋一周年!",
        school: "东华理工大学",
        userId: "huadiao_01234567890",
        bornDate: "2003-03-15",
        sex: "2",
        uid: "1",
        fans: 8,
        follows: 8,
        userAvatar: "https://img0.baidu.com/it/u=981218435,2998857702&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1677690000&t=d8a591b46edf38a8a1d31e5193e384a9",
    },
};
const actions = {};
const mutations = {
    // 初始化 user
    initialUser(state, {user}) {
        state.user = user;
    },
};
const getters = {};

Vue.use(Vuex);

export default new Vuex.Store({
   state,
   actions,
   mutations,
   getters,
});