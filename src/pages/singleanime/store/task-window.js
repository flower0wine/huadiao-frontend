/**
 * 功能描述：
 * 创建日期：2024 年 05 月 11 日
 */

// 使用严格模式
'use strict';

const state = {
    // 存储的是任务栏名称和对应的任务栏 ID 的映射
    taskBarIdMap: new Map(),
};

const mutations = {
    addTaskBar(state, {barName, barId}) {
        if (state.taskBarIdMap.has(barName)) {
            throw new Error(`Task bar with id ${barId} already exists`);
        }

        state.taskBarIdMap.set(barName, barId);
    },

    removeTaskBar(state, barName) {
        state.taskBarIdMap.delete(barName);
    },
};

const getters = {
    getTaskBarId(state) {
        return (barName) => {
            return state.taskBarIdMap.get(barName);
        };
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
}