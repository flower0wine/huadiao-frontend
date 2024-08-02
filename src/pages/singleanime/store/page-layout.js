/**
 * 功能描述：
 * 创建日期：2024 年 05 月 07 日
 */

// 使用严格模式
'use strict';

import {Generator} from "@/util";

const {randomAlphaString} = Generator;


/**
 * 检查布局索引是否有效
 * @return {boolean} 有效返回 true，否则返回 false
 */
function checkLayoutIndex(state, index) {
    return typeof index === "number" && 0 <= index && index < state.layoutList.length;
}


const LAYOUT_ROWS = 8;
const LAYOUT_COLS = 5;

const DEFAULT_LAYOUT = [{
    name: "header",
    position: {
        startX: 0,
        startY: 0,
        endX: LAYOUT_COLS - 1,
        endY: 0
    }
}, {
    name: "video",
    position: {
        startX: 1,
        startY: 1,
        endX: LAYOUT_COLS - 2,
        endY: 4
    }
}];

const state = {
    layoutRows: LAYOUT_ROWS,
    layoutCols: LAYOUT_COLS,

    // 页面的 padding 和 margin
    padding: 0,
    margin: 0,

    // 页面的布局
    layoutList: [...DEFAULT_LAYOUT],

    // 当前选中的布局的索引
    activeLayoutIndex: null,
}


const mutations = {
    setPadding(state, padding) {
        state.padding = padding;
    },

    setMargin(state, margin) {
        state.margin = margin;
    },

    addLayout(state, {position, name}) {
        if(!position) {
            throw new Error("Position is required");
        }
        if(!name) {
            name = `${randomAlphaString(5)}Layout`;
        } else if (this.getters.nameExist(name)) {
            throw new Error(`Layout name ${name} already exist`);
        }
        state.layoutList.push({
            name,
            position
        });
    },

    removeLayout(state, index) {
        if(!checkLayoutIndex(state, index)) {
            return;
        }
        state.layoutList.splice(index, 1);
    },

    setLayoutList(state, layout) {
        state.layoutList = layout;
    },

    setActiveLayoutIndex(state, index) {
        if(!checkLayoutIndex(state, index)) {
            state.activeLayoutIndex = null;
            return;
        }
        state.activeLayoutIndex = index;
    },

    resetLayout(state) {
        state.layoutList = [...DEFAULT_LAYOUT];
        state.activeLayoutIndex = null;
    }

}


const getters = {
    nameExist(state) {
        return (name) => {
            return state.layoutList.some(item => item.name === name);
        };
    }
};


export default {
    namespaced: true,
    state,
    mutations,
    getters
}