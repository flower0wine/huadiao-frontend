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
        login: false,
        nickname: "",
        uid: 0,
        userAvatar: "",
        follows: 0,
        fans: 0,
    },
    // 作者
    author: {
        me: null,
        authorInfo: {
            nickname: "",
            uid: 0,
            userAvatar: "",
            follows: 0,
            fans: 0,
        },
        noteList: [{
          noteId: null,
          noteTitle: null,
          noteContent: null,
          publishTime: null,
          viewCount: null,
          starCount: null,
          likeCount: null,
          commentCount: null,
        }]
    }
};
const actions = {};
const mutations = {
    // 初始化 user
    initialUser(state, {user}) {
        state.user = user;
    },
    // 初始化作者信息和笔记信息
    initialNoteAndAuthor(state, {author}) {
        state.author = author;
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