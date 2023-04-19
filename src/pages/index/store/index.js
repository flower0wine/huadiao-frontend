/**
 * 功能描述：
 * 创建日期：2023 年 03 月 02 日
 */

// 使用严格模式
'use strict';
import Vue from "vue";
import Vuex from "vuex";

// 用于存储数据
const state = {
    refs: {
        immediatelyLogin: null,
        immediatelyRegister: null,
    },
    // 用户信息
    user: {
        login: false,
        fans: 0,
        follows: 0,
        nickname: "",
        uid: 0,
        userAvatar: ""
    },
    // 诗句
    poem: {

    }
}

// 用于响应组件中的动作
const actions = {
}
// 用于操作数据
const mutations = {
    // 初始化 user 的信息
    initialUser(state, {user}) {
        state.user = user;
    },
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