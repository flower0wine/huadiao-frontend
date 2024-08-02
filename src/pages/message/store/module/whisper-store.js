/**
 * 功能描述：
 * 创建日期：2024 年 07 月 12 日
 */

// 使用严格模式
'use strict';

const state = {
    whisper: [],
};

const mutations = {
    setWhisper(state, payload) {
        state.whisper = payload;
    },

    addWhisper(state, payload) {
        state.whisper.push(...payload);
    },

    removeOneWhisper(state, index) {
        state.whisper.splice(index, 1);
    },

    removeWhispers(state, messageIdList) {
        state.whisper = state.whisper.filter(item => !messageIdList.includes(item.messageId));
    },
};

const getters = {};

const actions = {};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};