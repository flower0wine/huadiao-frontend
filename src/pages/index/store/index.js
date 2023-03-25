/**
 * 功能描述：
 * 创建日期：2023 年 03 月 02 日
 */

// 使用严格模式
'use strict';
import Vue from "vue";
import Vuex from "vuex";

// 用于响应组件中的动作
const actions = {

}
// 用于操作数据
const mutations = {
    // 修改网络连接状态
    modifyOnLineState(state, bool) {
        state.isOnLine = bool;
    },
    // 修改是否连接上服务器
    modifyConnectServerState(state, bool) {
        state.isConnectServer = bool;
    }
}
// 用于存储数据
const state = {
    // 是否联网
    isOnLine: true,
    // 是否连接上服务器
    isConnectServer: true,
    refs: {
        immediatelyLogin: null,
        immediatelyRegister: null,
    }
}
// 获取
const getters = {
}

// 先使用 vuex 插件
Vue.use(Vuex)

// 再创建 store 对象
export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters,
})