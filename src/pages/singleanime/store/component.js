/**
 * 功能描述：
 * 创建日期：2024 年 05 月 10 日
 */

// 使用严格模式
'use strict';

import {DRAGGABLE_COMPONENTS} from "@/pages/singleanime/edit/vuedraggable-config";


function getComponentIndexByName(state, name) {
    return state.components.findIndex(component => component.name === name);
}



const componentInfo = {
    id: null,
    name: null,
    info: null,
    layoutIndex: null,
    componentIndex: null,
};


const state = {
    components: DRAGGABLE_COMPONENTS,

    // 右键选中的组件信息
    contextMenuComponentInfo: Object.assign({}, componentInfo),
};


const mutations = {
    incrementRemainingQuantity(state, name) {
        const index = getComponentIndexByName(state, name);
        state.components[index].remainingQuantity++;
    },

    decrementRemainingQuantity(state, name) {
        const index = getComponentIndexByName(state, name);
        state.components[index].remainingQuantity--;
    },

    setContextMenuComponentInfo(state, info) {
        state.contextMenuComponentInfo = Object.assign({}, info || componentInfo);
    },

};


const getters = {
    login(state) {
        return state.user?.login ?? false;
    },
}


export default {
    namespaced: true,
    state,
    mutations,
    getters,
};