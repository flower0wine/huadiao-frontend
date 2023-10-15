/**
 * utils 是一个工具 js 文件
 * 目前定义了 1 个工具类
 *  1. Timer 用于管理定时器
 */

'use strict';

// 只开启单个定时器时使用
const {statusCode} = require("@/assets/js/constants/status-code");

class Timer {
    timerId;
    constructor() {
        this.timerId = undefined;
    }
    timeout(fn, time) {
        if(this.timerId) {
            // 确保每次调用时都只有一个定时器
            clearTimeout(this.timerId);
        }
        this.timerId = setTimeout(fn, time);
    }
    interval(fn, time) {
        if(this.timerId) {
            clearInterval(this.timerId);
        }
        this.timerId = setInterval(fn, time);
    }
    destroy() {
        if(this.timerId) {
            clearTimeout(this.timerId);
        }
    }
}

/**
 * 响应处理类
 */
class ResponseHandler {
    response;

    constructor(response) {
        this.response = response;
    }

    // 响应成功回调
    succeed(callback) {
        if(this.response.code === statusCode.succeed) {
            callback && callback(this.response.data);
        }
        return this;
    }

    // 没有获取到结果回调
    notExist(callback) {
        if(this.response.code === statusCode.notExist) {
            callback && callback(this.response.data);
        }
        return this;
    }
}

module.exports = {
    Timer,
    ResponseHandler,
}