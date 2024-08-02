/**
 * 功能描述：
 * 创建日期：2024 年 07 月 13 日
 */

// 使用严格模式
'use strict';

import {apis} from "@/assets/js/constants/request-path";
import {ResponseHandler} from "@/assets/js/utils";
import {mapMutations} from "vuex";

const messageQueue = [];

export default {
    data() {
        return {
            websocket: null,
        };
    },

    created() {
        this.connectWebsocket();
    },

    methods: {
        ...mapMutations("whisperMessageStore", ["unshiftMessage"]),

        connectWebsocket() {
            this.websocket = new WebSocket(apis.whisperHost);
            this.websocket.onopen = this.websocketOpenCallback;
            this.websocket.onmessage = this.websocketMessageCallback;
            this.websocket.onerror = this.websocketErrorCallback;
            this.websocket.onclose = this.websocketCloseCallback;
        },

        // websocket 连接建立
        websocketOpenCallback(e) {
            console.log(e);
        },

        websocketErrorCallback(e) {
            console.log(e);
        },

        websocketCloseCallback(e) {
            console.log(e);
            this.connectWebsocket();
        },

        // websocket 接收到服务器消息
        websocketMessageCallback(e) {
            let res = JSON.parse(e.data);
            console.log(res);
            new ResponseHandler(res).succeed((res) => {
                if (res.type === "send") {
                    this.handleSendMessageResponse(res);
                } else if (res.type === "receive") {
                    this.handleReceiveMessageResponse(res.whisperMessage);
                }
            });
        },

        // 发送消息
        sendWhisperMessage(message) {
            this.websocket.send(JSON.stringify(message));

            messageQueue.push(message);
        },

        handleSendMessageResponse(res) {
            res = {
                ...res,
                ...(messageQueue.shift() || {}),
            }

            this.sendMessageCallback(res);
        },

        handleReceiveMessageResponse(message) {
            this.receiveMessageCallback(message);
        },
    },
}