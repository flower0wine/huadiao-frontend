/**
 * utils 是一个工具 js 文件
 * 目前定义了 1 个工具类
 *  1. Timer 用于管理定时器
 */

'use strict';

const {statusCode} = require("@/assets/js/constants/status-code");

// 只开启单个定时器时使用
class Timer {
    timeoutTimerId;
    intervalTimerId;

    constructor() {
    }

    // 如果计时器存在则删除旧的创建新的计时器
    timeout(fn, delay) {
        if(this.timeoutTimerId) {
            // 确保每次调用时都只有一个定时器
            clearTimeout(this.timeoutTimerId);
        }
        this.timeoutTimerId = setTimeout(fn, delay);
    }

    interval(fn, delay) {
        if(this.intervalTimerId) {
            clearInterval(this.intervalTimerId);
        }
        this.intervalTimerId = setInterval(fn, delay);
    }

    // 清除计时器
    destroy() {
        if(this.timeoutTimerId) {
            clearTimeout(this.timeoutTimerId);
        }
        if(this.intervalTimerId) {
            clearInterval(this.intervalTimerId);
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

    // 参数存在错误
    errorParam(callback) {
        if(this.response.code === statusCode.errorParam) {
            callback && callback(this.response.data);
        }
        return this;
    }
}

function getOauthPath(authorizeUri, clientId, redirectUri, scope, responseType) {
    let uri = new URL(authorizeUri);
    uri.searchParams.set("client_id", clientId);
    uri.searchParams.set("redirect_uri", redirectUri);

    scope && uri.searchParams.set("scope", scope);
    responseType && uri.searchParams.set("response_type", responseType);
    return uri.toString();
}
module.exports = {
    Timer,
    ResponseHandler,
    getOauthPath,
}