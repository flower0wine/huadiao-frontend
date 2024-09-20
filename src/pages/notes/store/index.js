/**
 * 功能描述：
 * 创建日期：2023 年 03 月 20 日
 */

// 使用严格模式
'use strict';

import Vuex from "vuex";
import Vue from "vue";
import global from "@/common/global-store";

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
    me: false,
    authorInfo: {
      nickname: null,
      uid: null,
      userId: null,
      userAvatar: null,
      follows: null,
      fans: null,
    },
    noteList: []
  }
};
const actions = {};
const mutations = {
  // 初始化 user
  initialUser(state, {user}) {
    state.user = user;
    state.author.noteList = [];
  },
  // 添加笔记
  addNotes(state, {noteList}) {
    state.author.noteList.push(...noteList);
  },
  // 设置作者信息
  setAuthorInfo(state, {authorInfo, me}) {
    state.author.me = me;
    state.author.authorInfo = authorInfo;
  }
};
const getters = {};

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    global,
  },
  state,
  actions,
  mutations,
  getters,
});
