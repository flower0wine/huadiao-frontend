/**
 * 功能描述：
 * 创建日期：2023 年 03 月 20 日
 */

// 使用严格模式
'use strict';

import Vuex from "vuex";
import Vue from "vue";

const state = {
    isLogin: true,
    // 用户信息
    user: {
        isLogin: null,
        nickname: "花凋大总管",
        canvases: "今天是花凋一周年!",
        school: "东华理工大学",
        userId: "huadiao_01234567890",
        bornDate: "2003-03-15",
        sex: "2",
        uid: "1",
        fans: 8,
        follows: 8,
        userAvatar: "https://img0.baidu.com/it/u=981218435,2998857702&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1677690000&t=d8a591b46edf38a8a1d31e5193e384a9",
    },
    noteInfer: {
        authorNickname: "花凋大总管",
        authorUserAvatar: "https://img0.baidu.com/it/u=3342050756,1076278459&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1679763600&t=04523d323f70995c7cac591ead5ae7ca",
        authorUserId: "huadiao_012345678910",
        buildDate: "2022-08-22 19:24:35.0",
        followed: false,
        following: false,
        likeNumber: "0",
        markNumber: "0",
        me: true,
        myLike: false,
        myStar: false,
        myUnlike: false,
        noteContent: "<p>&nbsp;&nbsp;&nbsp;&nbsp;11111</p><p>&nbsp;&nbs",
        noteTitle: "111111",
        rootMarkList: [{
            markContent: "测试",
            markDate: "2023-02-13 14:43:15.0",
            markList: [{
                markContent: "hh1",
                markDate: "2023-03-24 11:14:22.0",
                nickname: "花凋大总管",
                selfId: "222FJiTr7!yxk5K9dxpr",
                uid: "1",
                userAvatar: "https://img1.baidu.com/it/u=782309483,3047525129&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1679763600&t=48b1fbd2d1e01039004c66a64089141d",
            }],
            nickname: "花凋大总管",
            rootMarkId: "GrN9&?1ijL_h96?RW2wA",
            uid: "1",
            userAvatar: "https://img0.baidu.com/it/u=3342050756,1076278459&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1679763600&t=04523d323f70995c7cac591ead5ae7ca",
        }],
        starNumber: "0",
        viewNumber: "0",
        viewerNickname: "花凋大总管",
        viewerUid: "1",
        viewerUserAvatar: "https://img0.baidu.com/it/u=3342050756,1076278459&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1679763600&t=04523d323f70995c7cac591ead5ae7ca",
    }
};
const actions = {};
const mutations = {};
const getters = {};

Vue.use(Vuex);

export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters,
});