/**
 * 功能描述：
 * 创建日期：2023 年 03 月 07 日
 */

// 使用严格模式
'use strict';
import Vuex from "vuex";
import Vue from "vue";

const state = {
    // 花凋头部信息
    user: {
        login: false,
        userId: "huadiao_01234567890",
        nickname: "花凋大总管",
        uid: "1",
        fans: 8,
        follows: 8,
        userAvatar: "https://img0.baidu.com/it/u=981218435,2998857702&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1677690000&t=d8a591b46edf38a8a1d31e5193e384a9",
    },
    // 用户信息
    userInfo: {
        canvases: "今天是花凋一周年!",
        school: "东华理工大学",
        bornDate: "2003-03-15",
        sex: "2",
    },
    // 账号设置
    accountSettings: {
        messageLikeStatus: 1,
        messageRemindStatus: 1,
        messageReplyStatus: 1,
        publicBornStatus: 1,
        publicCanvasesStatus: 1,
        publicFanjuStatus: 1,
        publicFollowStatus: 1,
        publicHomepageStatus: 1,
        publicSchoolStatus: 1,
        publicStarStatus: 1,
    }
}
const mutations = {
    // 初始化 user 的信息
    initialUser(state, {user}) {
        state.user = user;
    },
    // 初始化 userInfo 的信息
    initialUserInfo(state, {userInfo}) {
        state.userInfo = userInfo;
    },
    // 初始化账号设置
    initialUserSettings(state, {settings}) {
        state.accountSettings = settings;
    }
};
const actions = {};
const getters = {};

Vue.use(Vuex);

export default new Vuex.Store({
    getters,
    state,
    mutations,
    actions
})