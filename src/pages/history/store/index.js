/**
 * 功能描述：
 * 创建日期：2023 年 03 月 20 日
 */

// 使用严格模式
'use strict';

import Vuex from "vuex";
import Vue from "vue";

const state = {
    // 用户信息
    user: {
        login: null,
        nickname: null,
        userId: null,
        uid: null,
        fans: null,
        follows: null,
        userAvatar: null,
    },
    // 笔记历史
    noteHistory: [],
    // 番剧馆历史
    animeHistory: [],
};
const actions = {
};
const mutations = {
    initialUser(state, {user}) {
        state.user = user;
    },
    clearNoteHistory(state) {
        state.noteHistory = [];
    },
    addNoteHistory(state, {history}) {
        state.noteHistory.push(...history);
    },
    addAnimeHistory(state, {animeHistory}) {
        state.animeHistory.push(...animeHistory);
    },
    deleteNoteHistory(state, {noteId, uid}) {
        let noteHistoryList = state.noteHistory;
        for(let index = 0; index < noteHistoryList.length; index++) {
            if(noteHistoryList[index].uid === uid && noteHistoryList[index].noteId === noteId) {
                noteHistoryList.splice(index, 1);
            }
        }
    },
    deleteAnimeHistory(state, {uid}) {
        let animeHistoryList = state.animeHistory;
        for(let index = 0; index < animeHistoryList.length; index++) {
            if(animeHistoryList[index].uid === uid) {
                animeHistoryList.splice(index, 1);
            }
        }
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