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
                uid: 112435,
                userId: "huadiao",
                nickname: "情无非是瞬间的激素的作用罢了",
                userAvatar: "https://img1.baidu.com/it/u=413643897,2296924942&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1680541200&t=26be472b80013591100109eb63c7c5ec",
                likeDate: "2022-02-03 23:00:00.0",
            }
        }],
        whisper: [{
            // 用户类型: user(普通用户), authority(官方)
            type: "user",
            // 允许删除
            allowDelete: true,
            user: {
                uid: 14521,
                userId: "huadiao",
                nickname: "云随风去",
                userAvatar: "https://img1.baidu.com/it/u=413643897,2296924942&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1680541200&t=26be472b80013591100109eb63c7c5ec",
            },
            messageList: [{
                // 消息类型: text(普通文本), image(仅图片), textAndImage(图片和文本)
                type: "text",
                // 居中对齐
                center: false,
                // 我发送的消息
                me: true,
                // 撤回消息
                recall: false,
                messageId: "4er43tegwwefrw3e4rgtw",
                publishDate: "2023-04-04 23:12:00.0",
                messageContent: "终来名扬不成, 誉也废去"
            }, {
                // 消息类型: text(普通文本), image(仅图片), textAndImage(图片和文本)
                type: "text",
                // 居中对齐
                center: false,
                // 我发送的消息
                me: true,
                // 撤回消息
                recall: false,
                messageId: "4er43tegwrwefwewrgtw",
                publishDate: "2022-02-03 23:00:00.0",
                messageContent: "欲名扬千古"
            }, {
                // 消息类型: text(普通文本), image(仅图片), textAndImage(图片和文本)
                type: "text",
                // 居中对齐
                center: false,
                // 我发送的消息
                me: true,
                // 撤回消息
                recall: false,
                messageId: "4er43tea3erfgwrgtw",
                publishDate: "2022-02-03 23:00:00.0",
                messageContent: "尝人生酸甜苦辣"
            }, {
                // 消息类型: text(普通文本), image(仅图片), textAndImage(图片和文本)
                type: "text",
                // 居中对齐
                center: false,
                // 我发送的消息
                me: true,
                // 撤回消息
                recall: false,
                messageId: "4er43tegwr232rgtw",
                publishDate: "2022-02-03 23:00:00.0",
                messageContent: "我欲纵横天下"
            }, {
                // 消息类型: text(普通文本), image(仅图片), textAndImage(图片和文本)
                type: "text",
                // 居中对齐
                center: true,
                // 我发送的消息
                me: false,
                // 撤回消息
                recall: false,
                messageId: "4ergsafaefrtw",
                publishDate: "2022-02-03 23:00:00.0",
                messageContent: "品世间人生百态",
            }],
        }, {
            type: "user",
            allowDelete: true,
            user: {
                uid: 1245643,
                userId: "huadiao",
                nickname: "情无非是瞬间的激素的作用罢了",
                userAvatar: "https://img1.baidu.com/it/u=413643897,2296924942&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1680541200&t=26be472b80013591100109eb63c7c5ec",
            },
            messageList: [{
                // 消息类型: text(普通文本), image(仅图片), textAndImage(图片和文本)
                type: "text",
                // 居中对齐
                center: true,
                // 我发送的消息
                me: false,
                // 撤回消息
                recall: false,
                messageId: "4ergt4rgte3ww",
                publishDate: "2022-02-03 23:00:00.0",
                messageContent: "追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年"
            }, {
                // 消息类型: text(普通文本), image(仅图片), textAndImage(图片和文本)
                type: "text",
                // 居中对齐
                center: false,
                // 我发送的消息
                me: true,
                // 撤回消息
                recall: false,
                messageId: "4erg2q3wrfdtw",
                publishDate: "2022-02-03 23:00:00.0",
                messageContent: "追风少年"
            }],
        }, {
            type: "user",
            allowDelete: true,
            user: {
                uid: 122343,
                userId: "huadiao",
                nickname: "情无非是瞬间的激素的作用罢了",
                userAvatar: "https://img1.baidu.com/it/u=413643897,2296924942&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1680541200&t=26be472b80013591100109eb63c7c5ec",
            },
            messageList: [{
                // 消息类型: text(普通文本), image(仅图片), textAndImage(图片和文本)
                type: "text",
                // 居中对齐
                center: true,
                // 我发送的消息
                me: false,
                // 撤回消息
                recall: false,
                messageId: "4ergte34frtw",
                publishDate: "2022-02-03 23:00:00.0",
                messageContent: "追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年"
            }, {
                // 消息类型: text(普通文本), image(仅图片), textAndImage(图片和文本)
                type: "text",
                // 居中对齐
                center: false,
                // 我发送的消息
                me: true,
                // 撤回消息
                recall: false,
                messageId: "4ewetfgrgtw",
                publishDate: "2022-02-03 23:00:00.0",
                messageContent: "追风少年"
            }],
        }, {
            type: "user",
            allowDelete: true,
            user: {
                uid: 12234513,
                userId: "huadiao",
                nickname: "情无非是瞬间的激素的作用罢了",
                userAvatar: "https://img1.baidu.com/it/u=413643897,2296924942&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1680541200&t=26be472b80013591100109eb63c7c5ec",
            },
            messageList: [{
                // 消息类型: text(普通文本), image(仅图片), textAndImage(图片和文本)
                type: "text",
                // 居中对齐
                center: true,
                // 我发送的消息
                me: false,
                // 撤回消息
                recall: false,
                messageId: "4ergtwtyju",
                publishDate: "2022-02-03 23:00:00.0",
                messageContent: "追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年"
            }, {
                // 消息类型: text(普通文本), image(仅图片), textAndImage(图片和文本)
                type: "text",
                // 居中对齐
                center: false,
                // 我发送的消息
                me: true,
                // 撤回消息
                recall: false,
                messageId: "4errhgyerfggtw",
                publishDate: "2022-02-03 23:00:00.0",
                messageContent: "追风少年"
            }],
        }, {
            type: "user",
            allowDelete: false,
            user: {
                uid: 112323,
                userId: "huadiao",
                nickname: "情无非是瞬间的激素的作用罢了",
                userAvatar: "https://img1.baidu.com/it/u=413643897,2296924942&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1680541200&t=26be472b80013591100109eb63c7c5ec",
            },
            messageList: [{
                // 消息类型: text(普通文本), image(仅图片), textAndImage(图片和文本)
                type: "text",
                // 居中对齐
                center: true,
                // 我发送的消息
                me: false,
                // 撤回消息
                recall: false,
                messageId: "4ergtw",
                publishDate: "2022-02-03 23:00:00.0",
                messageContent: "追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年追风少年"
            }, {
                // 消息类型: text(普通文本), image(仅图片), textAndImage(图片和文本)
                type: "text",
                // 居中对齐
                center: false,
                // 我发送的消息
                me: true,
                // 撤回消息
                recall: false,
                messageId: "4ergtyhjnbw",
                publishDate: "2022-02-03 23:00:00.0",
                messageContent: "追风少年"
            }],
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
        systemMessage: [{
            publishDate: "2020-03-30 23:00:02.0",
            messageContent: `花凋成立!<a href="#">欢迎</a>`
        }],
        messageSettings: {
            messageLikeStatus: true,
            messageRemindStatus: true,
            messageReplyStatus: true,
            unfollowFoldStatus: true,
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
    },
    // 删除最近聊天对象
    deleteLatestUser(state, {latestUserIndex}) {
        state.message.whisper.splice(latestUserIndex, 1);
    },
    // 对某个人发送消息
    sendWhisperMessage(state, {latestUserIndex, messageContent, currentDate, messageId}) {
        state.message.whisper[latestUserIndex].messageList.unshift({
            // 消息类型: text(普通文本), image(仅图片), textAndImage(图片和文本)
            type: "text",
            // 居中对齐
            center: false,
            // 我发送的消息
            me: true,
            // 撤回消息
            recall: false,
            messageId,
            publishDate: currentDate,
            messageContent,
        });
    },
    // 删除发送的消息, 我的或者是他的
    deleteWhisperMessage(state, {latestUserIndex, messageIndex, messageId, unmatchedCallback}) {
        if(typeof latestUserIndex !== "undefined" && messageIndex >= 0 && messageId) {
            let messageList = state.message.whisper[latestUserIndex].messageList;
            if(messageList[messageIndex].messageId === messageId) {
                messageList.splice(messageIndex, 1);
            } else {
                // 不匹配回调
                unmatchedCallback();
            }
        }
    }
};
const getters = {
    // 根据我的信息中的用户 uid 来获取其索引。如果找不到匹配的用户, 默认返回第一个用户
    accordingUidGetIndex: (state) => {
        return (uid) => {
            let whisper = state.message.whisper;
            if(whisper.length === 0) {
                return -1;
            }
            for (let index = 0; index < whisper.length; index++) {
                if (whisper[index].user.uid === uid) {
                    return index;
                }
            }
            // 如果找不到匹配的用户, 默认返回第一个用户
            return 0;
        }
    }
};

Vue.use(Vuex);

export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters,
});