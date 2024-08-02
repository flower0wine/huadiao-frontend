/**
 * 功能描述：
 * 创建日期：2024 年 07 月 12 日
 */

// 使用严格模式
'use strict';

const state = {
    whisperUsers: [],
    selectedLatestUserIndex: null,
};

const mutations = {
    setWhisperUsers(state, users) {
        state.whisperUsers = users;
    },

    unshiftWhisperUser(state, user) {
        const index = state.whisperUsers.findIndex(item => item.uid === user.uid);
        if (index !== -1) {
            state.whisperUsers.splice(index, 1);
        }
        state.whisperUsers.unshift(user);
    },

    addWhisperUsers(state, users) {
        users = users.filter(item => !state.whisperUsers.some(user => user.uid === item.uid));
        state.whisperUsers.push(...users);
    },

    removeOneWhisperUser(state, index) {
        state.whisperUsers.splice(index, 1);
    },

    removeWhisperUser(state, uidList) {
        state.whisperUsers = state.whisperUsers.filter(item => !uidList.includes(item.uid));
    },

    setSelectedLatestUserIndex(state, index) {
        state.selectedLatestUserIndex = index;
    },

    updateWhisperUserLatestMessage(state, { uid, message }) {
        const index = state.whisperUsers.findIndex(item => item.uid === uid);
        if (index !== -1) {
            state.whisperUsers[index].latestMessage = message;
        }
    },
};

const actions = {};

const getters = {
    userUnreadCount(state) {
        return (uid, zeroing) => {
            const index = state.whisperUsers.findIndex(item => item.uid === uid);
            if (index === -1) {
                return 0;
            }
            const unreadCount = state.whisperUsers[index].unreadCount;
            if (zeroing) {
                state.whisperUsers[index].unreadCount = 0;
            }
            return unreadCount;
        };
    },

    userExist(state) {
        return (uid) => {
            return state.whisperUsers.some(item => item.uid === uid);
        };
    },

    whisperUser(state) {
        return state.whisperUsers[state.selectedLatestUserIndex];
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};