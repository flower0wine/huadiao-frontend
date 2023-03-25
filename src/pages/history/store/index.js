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
    // 笔记历史
    noteHistory: [{
        authorNickname: "孙庆洋",
        authorUid: "30",
        authorUserAvatar: "https://img1.baidu.com/it/u=413643897,2296924942&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
        noteAbstract: "孙庆洋大SB",
        noteId: "5",
        noteTitle: "孙庆洋SB",
        viewedDate: "2023-3-21 13:05:57.0",
    }, {
        authorNickname: "孙庆洋",
        authorUid: "30",
        authorUserAvatar: "https://img1.baidu.com/it/u=413643897,2296924942&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
        noteAbstract: "孙庆洋大SB",
        noteId: "52",
        noteTitle: "孙庆洋SB",
        viewedDate: "2022-10-17 13:05:57.0",
    },{
        authorNickname: "孙庆洋",
        authorUid: "30",
        authorUserAvatar: "https://img1.baidu.com/it/u=413643897,2296924942&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
        noteAbstract: "孙庆洋大SB",
        noteId: "51",
        noteTitle: "孙庆洋SB",
        viewedDate: "2022-10-17 13:05:57.0",
    },{
        authorNickname: "孙庆洋",
        authorUid: "30",
        authorUserAvatar: "https://img1.baidu.com/it/u=413643897,2296924942&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
        noteAbstract: "孙庆洋大SB",
        noteId: "53",
        noteTitle: "孙庆洋SB",
        viewedDate: "2022-10-17 13:05:57.0",
    },{
        authorNickname: "孙庆洋",
        authorUid: "30",
        authorUserAvatar: "https://img1.baidu.com/it/u=413643897,2296924942&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
        noteAbstract: "孙庆洋大SB",
        noteId: "15",
        noteTitle: "孙庆洋SB",
        viewedDate: "2022-10-17 13:05:57.0",
    },{
        authorNickname: "孙庆洋",
        authorUid: "30",
        authorUserAvatar: "https://img1.baidu.com/it/u=413643897,2296924942&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
        noteAbstract: "孙庆洋大SB",
        noteId: "35",
        noteTitle: "孙庆洋SB",
        viewedDate: "2022-10-17 13:05:57.0",
    }]
};
const actions = {
};
const mutations = {
    // 清空历史记录
    clearAllHistory(state, {succeedCallback}) {
        state.noteHistory = [];
        succeedCallback && succeedCallback();
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