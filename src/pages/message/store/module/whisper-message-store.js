/**
 * 功能描述：
 * 创建日期：2024 年 07 月 13 日
 */

// 使用严格模式
'use strict';

const state = {
    messageList: [],
};

const getters = {};

const mutations = {
    pushMessage(state, messageList) {
        if (!Array.isArray(messageList)) {
            messageList = [messageList];
        }
        state.messageList.push(...messageList);
    },

    unshiftMessage(state, messageList) {
        if (!Array.isArray(messageList)) {
            messageList = [messageList];
        }
        messageList.reverse();
        state.messageList.unshift(...messageList);
    },

    removeMessage(state, index) {
        state.messageList.splice(index, 1);
    },

    clearMessage(state) {
        state.messageList = [];
    },
};

const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};