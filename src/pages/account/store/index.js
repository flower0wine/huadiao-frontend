/**
 * 功能描述：
 * 创建日期：2023 年 03 月 07 日
 */

// 使用严格模式
'use strict';
import Vuex from "vuex";
import Vue from "vue";
import global from "@/common/global-store";

const state = {
  // 花凋头部信息
  user: {
    login: null,
    userId: null,
    nickname: null,
    uid: null,
    fans: null,
    follows: null,
    userAvatar: null
  },
  // 账号设置
  accountSettings: {
    messageLikeStatus: null,
    messageRemindStatus: null,
    messageReplyStatus: null,
    publicBornStatus: null,
    publicCanvasesStatus: null,
    publicFanjuStatus: null,
    publicFollowStatus: null,
    publicHomepageStatus: null,
    publicSchoolStatus: null,
    publicStarStatus: null,
  }
}
const mutations = {
  // 初始化 user 的信息
  initialUser(state, {user}) {
    state.user = user;
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
  modules: {
    global,
  },
  getters,
  state,
  mutations,
  actions
})
