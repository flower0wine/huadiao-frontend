/**
 * 功能描述：
 * 创建日期：2023 年 03 月 20 日
 */

// 使用严格模式
'use strict';

import Vuex from "vuex";
import Vue from "vue";

const state = {
    // 用户信息
    user: {
        login: null,
        nickname: null,
        userId: null,
        uid: null,
        fan: null,
        follow: null,
        userAvatar: null
    },
    cardBorderImage: [{
        borderImageOutset: null,
        borderImageSource: null,
        borderImageWidth: null,
        borderImageSlice: null,
    }],
    huadiaoHouseInfo: {
        titleColor: '#ff4e00',
        titleBackground: '-webkit-linear-gradient(90deg, #0f0c29, #302b63, #24243e)',
        pageBackground: "animeBackground.jpeg",
        pageForeground: "-webkit-linear-gradient(270deg, #24243e, #302b63, #0f0c29)",
        cardBorderImage: -1,
        cardBackground: "-webkit-linear-gradient(270deg, #6f0000, #200122)",
        animeList: [{
            title: null,
            cover: null,
            animeId: null,
            addTime: null,
        }],
    },
};
const actions = {};
const mutations = {
    initialUser(state, {user}) {
        state.user = user;
    },
    initialHuadiaoHouseInfo(state, {huadiaoHouseInfo}) {
        for(let key in huadiaoHouseInfo) {
            if(huadiaoHouseInfo[key]) {
                state.huadiaoHouseInfo[key] = huadiaoHouseInfo[key];
            }
        }
    },
    initialCardBorderImage(state, {cardBorderImage}) {
        state.cardBorderImage = [...cardBorderImage];
    },
    modifyTitleColor(state, {color}) {
        state.huadiaoHouseInfo.titleColor = color;
    },
    modifyTitleBackground(state, {background}) {
        state.huadiaoHouseInfo.titleBackground = background;
    },
    modifyPageBackground(state, {background}) {
        state.huadiaoHouseInfo.pageBackground = background;
    },
    modifyPageForeground(state, {background}) {
        state.huadiaoHouseInfo.pageForeground = background;
    },
    modifyCardBorderImage(state, {borderImageIndex}) {
        state.huadiaoHouseInfo.cardBorderImage = borderImageIndex;
    },
    modifyCardBackground(state, {background}) {
        state.huadiaoHouseInfo.cardBackground = background;
    },
    // 添加番剧
    addAnime(state, {title, cover, addTime, animeId}) {
        state.huadiaoHouseInfo.animeList.push({
            title,
            cover,
            addTime,
            animeId
        });
    },
    // 删除番剧
    deleteAnime(state, {index}) {
        state.huadiaoHouseInfo.animeList.splice(index, 1);
    }
};
const getters = {};

Vue.use(Vuex);

export default new Vuex.Store({
   state,
   actions,
   mutations,
   getters,
});