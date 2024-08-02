/**
 * 功能描述：
 * 创建日期：2024 年 07 月 12 日
 */

// 使用严格模式
'use strict';

const state = {
    count: {
        reply: 0,
        like: 0,
        whisper: 0,
        system: 0,
    },
};

const mutations = {
    setAllUnreadCount(state, allCount) {
        state.count = allCount;
    },

    setReplyCount(state, count) {
        state.count.reply = count;
    },

    setLikeCount(state, count) {
        state.count.like = count;
    },

    setWhisperCount(state, count) {
        state.count.whisper = count;
    },

    setSystemCount(state, count) {
        state.count.system = count;
    },
};

const actions = {};

const getters = {};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};