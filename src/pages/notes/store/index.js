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
    // 作者
    author: {
        nickname: "花凋大总管",
        userAvatar: "https://img2.baidu.com/it/u=2887833645,2834576538&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1679677200&t=9691b915847b2697e6f5ffc546cee982",
        canvases: "今天是花凋一周年!",
        userId: "huadiao_01234567890",
        bornDate: "2003-03-15",
        sex: "2",
        uid: "1",
        fans: 8,
        follows: 8,
        noteList: [{
            buildDate: "2022-08-22 08:58:41.0",
            likeNumber: "0",
            markNumber: "0",
            noteAbstract: "如果说爱有阴晴圆缺",
            noteId: "155",
            noteTitle: "风萧萧兮易水寒，壮士一去兮不复还",
            starNumber: "0",
            viewNumber: "0",
        },{
            buildDate: "2022-08-22 08:58:41.0",
            likeNumber: "0",
            markNumber: "0",
            noteAbstract: "如果说爱有阴晴圆缺",
            noteId: "143",
            noteTitle: "风萧萧兮易水寒，壮士一去兮不复还",
            starNumber: "0",
            viewNumber: "0",
        },{
            buildDate: "2022-08-22 08:58:41.0",
            likeNumber: "0",
            markNumber: "0",
            noteAbstract: "如果说爱有阴晴圆缺",
            noteId: "123",
            noteTitle: "风萧萧兮易水寒，壮士一去兮不复还",
            starNumber: "0",
            viewNumber: "0",
        },{
            buildDate: "2022-08-22 08:58:41.0",
            likeNumber: "0",
            markNumber: "0",
            noteAbstract: "如果说爱有阴晴圆缺",
            noteId: "145",
            noteTitle: "风萧萧兮易水寒，壮士一去兮不复还",
            starNumber: "0",
            viewNumber: "0",
        },{
            buildDate: "2022-08-22 08:58:41.0",
            likeNumber: "0",
            markNumber: "0",
            noteAbstract: "如果说爱有阴晴圆缺",
            noteId: "11",
            noteTitle: "风萧萧兮易水寒，壮士一去兮不复还",
            starNumber: "0",
            viewNumber: "0",
        },{
            buildDate: "2022-08-22 08:58:41.0",
            likeNumber: "0",
            markNumber: "0",
            noteAbstract: "如果说爱有阴晴圆缺",
            noteId: "13",
            noteTitle: "风萧萧兮易水寒，壮士一去兮不复还",
            starNumber: "0",
            viewNumber: "0",
        },{
            buildDate: "2022-08-22 08:58:41.0",
            likeNumber: "0",
            markNumber: "0",
            noteAbstract: "如果说爱有阴晴圆缺",
            noteId: "12",
            noteTitle: "风萧萧兮易水寒，壮士一去兮不复还",
            starNumber: "0",
            viewNumber: "0",
        },{
            buildDate: "2022-08-22 08:58:41.0",
            likeNumber: "0",
            markNumber: "0",
            noteAbstract: "如果说爱有阴晴圆缺",
            noteId: "2",
            noteTitle: "风萧萧兮易水寒，壮士一去兮不复还",
            starNumber: "0",
            viewNumber: "0",
        }]
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