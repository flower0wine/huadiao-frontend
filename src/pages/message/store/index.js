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
    message: {
        replyMeMessage: [{
            type: "video",
            messageId: "4e3rfwe4r8fzersfg3wju98e4t",
            messageContent: "哇哦, 太棒了!",
            replyDate: "2022-02-03 23:00:00.0",
            video: {
                cover: "https://i1.hdslb.com/bfs/archive/6bf97275f63a5293dbf7002902e309db619d80c1.jpg@60w_60h_1c.webp",
                url: "https://www.bilibili.com/video/BV1HD4y1G7jv/#reply737253853",
            },
            note: {
                abstract: "爱你便是唯一的信仰爱你便是唯一的信仰爱你便是唯一的信仰爱你便是唯一的信仰",
                url: "https://www.bilibili.com/video/BV1Qf4y1T7Hx/?dm_progress=121647&p=91&dmid=1084025937659664640",
            },
            comment: {
                abstract: "对你是惊鸿一瞥对你是惊鸿一瞥对你是惊鸿一瞥对你是惊鸿一瞥对你是惊鸿一瞥",
                url: "https://www.bilibili.com/video/BV1JL411T7F4/#reply104791030176",
            },
            replyUser: {
                uid: 1,
                userId: "huadiao",
                nickname: "情无非是瞬间的激素的作用罢了",
                userAvatar: "https://img1.baidu.com/it/u=413643897,2296924942&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1680541200&t=26be472b80013591100109eb63c7c5ec",
                likeDate: "2022-02-03 23:00:00.0",
            }
        }, {
            type: "note",
            messageContent: "你做的很好，我很喜欢!!!",
            replyDate: "2022-02-03 23:00:00.0",
            messageId: "4e3rfwe4r8f3erdfwju98e4t",
            video: {
                cover: "https://i1.hdslb.com/bfs/archive/6bf97275f63a5293dbf7002902e309db619d80c1.jpg@60w_60h_1c.webp",
                url: "https://www.bilibili.com/video/BV1HD4y1G7jv/#reply737253853",
            },
            note: {
                abstract: "爱你便是唯一的信仰爱你便是唯一的信仰爱你便是唯一的信仰爱你便是唯一的信仰",
                url: "https://www.bilibili.com/video/BV1Qf4y1T7Hx/?dm_progress=121647&p=91&dmid=1084025937659664640",
            },
            comment: {
                abstract: "对你是惊鸿一瞥对你是惊鸿一瞥对你是惊鸿一瞥对你是惊鸿一瞥对你是惊鸿一瞥",
                url: "https://www.bilibili.com/video/BV1JL411T7F4/#reply104791030176",
            },
            replyUser: {
                uid: 1,
                userId: "huadiao",
                nickname: "情无非是瞬间的激素的作用罢了",
                userAvatar: "https://img1.baidu.com/it/u=413643897,2296924942&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1680541200&t=26be472b80013591100109eb63c7c5ec",
                likeDate: "2022-02-03 23:00:00.0",
            }
        }],
        likeMeMessage: [{
            type: "note",
            messageId: "4e3rfwe4r8f3wju98e4t",
            video: {
                cover: "https://i1.hdslb.com/bfs/archive/6bf97275f63a5293dbf7002902e309db619d80c1.jpg@60w_60h_1c.webp",
                url: "https://www.bilibili.com/video/BV1HD4y1G7jv/#reply737253853",
            },
            note: {
                abstract: "爱你便是唯一的信仰爱你便是唯一的信仰爱你便是唯一的信仰爱你便是唯一的信仰",
                url: "https://www.bilibili.com/video/BV1Qf4y1T7Hx/?dm_progress=121647&p=91&dmid=1084025937659664640",
            },
            comment: {
                abstract: "对你是惊鸿一瞥对你是惊鸿一瞥对你是惊鸿一瞥对你是惊鸿一瞥对你是惊鸿一瞥",
                url: "https://www.bilibili.com/video/BV1JL411T7F4/#reply104791030176",
            },
            likerList: [{
                uid: 1,
                userId: "huadiao",
                nickname: "情无非是瞬间的激素的作用罢了",
                userAvatar: "https://img1.baidu.com/it/u=413643897,2296924942&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1680541200&t=26be472b80013591100109eb63c7c5ec",
                likeDate: "2022-02-03 23:00:00.0",
                following: true,
                followed: false,
            }, {
                uid: 2,
                userId: "huadiao",
                nickname: "如果有一种爱叫做无私奉献",
                userAvatar: "https://img1.baidu.com/it/u=413643897,2296924942&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1680541200&t=26be472b80013591100109eb63c7c5ec",
                likeDate: "2022-02-03 23:00:00.0",
                following: true,
                followed: true,
            }]
        }, {
            type: "video",
            messageId: "3e4f9t8r3hwe4r8f",
            video: {
                title: "震惊, 伟b",
                cover: "https://i1.hdslb.com/bfs/archive/6bf97275f63a5293dbf7002902e309db619d80c1.jpg@60w_60h_1c.webp",
                url: "https://www.bilibili.com/video/BV1HD4y1G7jv/#reply737253853",
            },
            note: {
                abstract: "爱你便是唯一的信仰",
                url: "https://www.bilibili.com/video/BV1Qf4y1T7Hx/?dm_progress=121647&p=91&dmid=1084025937659664640",
            },
            comment: {
                abstract: "对你是惊鸿一瞥",
                url: "https://www.bilibili.com/video/BV1JL411T7F4/#reply104791030176",
            },
            likerList: [{
                uid: 1,
                userId: "huadiao",
                nickname: "情无非是瞬间的激素的作用罢了",
                userAvatar: "https://img1.baidu.com/it/u=413643897,2296924942&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1680541200&t=26be472b80013591100109eb63c7c5ec",
                likeDate: "2022-02-03 23:00:00.0",
                following: false,
                followed: false,
            }, {
                uid: 2,
                userId: "huadiao",
                nickname: "如果有一种爱叫做无私奉献",
                userAvatar: "https://img1.baidu.com/it/u=413643897,2296924942&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1680541200&t=26be472b80013591100109eb63c7c5ec",
                likeDate: "2022-02-03 23:00:00.0",
                following: true,
                followed: false,
            }]
        }],
        privateMessage: [],
        systemMessage: [{
            publishDate: "2020-03-30 23:00:02.0",
            messageContent: `花凋成立!<a href="#">欢迎</a>`
        }],
        messageSettings: {
            messageRemind: true
        }
    }
};
const actions = {};
const mutations = {
    // 通过收到的赞改变关注关系
    clickToChangeRelation(state, {messageIndex, likerIndex}) {
        state.message.likeMeMessage[messageIndex].likerList[likerIndex].following = !state.message.likeMeMessage[messageIndex].likerList[likerIndex].following;
    },
    // 删除收到的赞消息
    deleteLikeMessage(state, {messageIndex}) {
        state.message.likeMeMessage.splice(messageIndex, 1);
    },
    // 删除回复我的消息
    deleteReplyMessage(state, {messageIndex}) {
        state.message.replyMeMessage.splice(messageIndex, 1);
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