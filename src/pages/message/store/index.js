/**
 * 功能描述：
 * 创建日期：2023 年 03 月 20 日
 */

// 使用严格模式
'use strict';

import Vuex from "vuex";
import Vue from "vue";
import unreadCountStore from "@/pages/message/store/module/unread-count-store";
import whisperStore from "@/pages/message/store/module/whisper-store";
import whisperUserStore from "@/pages/message/store/module/whisper-user-store";
import whisperMessageStore from "@/pages/message/store/module/whisper-message-store";

const state = {
    latestUserIndex: 0,
    user: {
        login: false,
        uid: null,
        nickname: null,
        userId: null,
        fans: null,
        follows: null,
        userAvatar: null,
    },
    message: {
        replyMeMessage: [],
        whisper: [],
        likeMessage: [],
        systemMessage: [],
        messageSettings: {
            messageLikeStatus: false,
            messageRemindStatus: false,
            messageReplyStatus: false,
            unfollowFoldStatus: false,
        }
    }
};
const actions = {
    addMessage(context, {listArray}) {
        let message = [];
        let maxIndex = 0, list, max;
        let indexArray = new Array(listArray.length).fill(0);
        listArray.filter((item) => {
            return item.length > 0;
        });
        let running = function () {
            for (let i = 0; i < listArray.length; i++) {
                let index = indexArray[i];
                list = listArray[i];
                if (index < list.length) {
                    return true;
                }
            }
            return false;
        }
        // 时间复杂度, O(n * n)
        while (running()) {
            max = listArray[0][indexArray[0]].time;
            maxIndex = 0;
            for (let i = 0, length = listArray.length; i < length; i++) {
                if (max < listArray[i][indexArray[i]].time) {
                    max = listArray[i][indexArray[i]].time;
                    maxIndex = i;
                }
            }
            message.push(listArray[maxIndex][indexArray[maxIndex]]);
            indexArray[maxIndex]++;
            if (indexArray[maxIndex] === listArray[maxIndex].length) {
                listArray.splice(maxIndex, 1);
                indexArray.splice(maxIndex, 1);
            }
        }
        return message;
    },
    addReplyMessage(context, {listArray, timeStr}) {
        context.dispatch("addMessage", {listArray, timeStr}).then((message) => {
            context.commit("addReplyMessage", {message});
        });
    },
};
const mutations = {
    initialUser(state, {user}) {
        state.user = user;
    },
    initialMessageSetting(state, {messageSettings}) {
        state.message.messageSettings = messageSettings;
    },
    setLatestUserIndex(state, {index}) {
        state.latestUserIndex = index;
    },
    addLatestSingleUser(state, {user}) {
        state.message.whisper.push(user);
    },
    addLatestUser(state, {users}) {
        state.message.whisper.push(...users);
    },
    addReplyMessage(state, {message}) {
        state.message.replyMeMessage.push(...message);
    },
    addSystemMessage(state, {message}) {
        state.message.systemMessage.push(...message);
    },
    addLikeMessage(state, {messageList}) {
        state.message.likeMessage.push(...messageList);
    },
    // 删除收到的赞消息
    deleteLikeMessage(state, {messageIndex}) {
        state.message.likeMessage.splice(messageIndex, 1);
    },
    // 删除回复我的消息
    deleteReplyMessage(state, {messageIndex}) {
        state.message.replyMeMessage.splice(messageIndex, 1);
    },
    // 删除最近聊天对象
    deleteLatestUser(state, {index}) {
        state.message.whisper.splice(index, 1);
    },
};
const getters = {
};

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        unreadCountStore,
        whisperStore,
        whisperUserStore,
        whisperMessageStore,
    },
    state,
    actions,
    mutations,
    getters,
});