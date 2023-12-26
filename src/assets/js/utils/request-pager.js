/**
 * 功能描述：
 * 创建日期：2023 年 11 月 14 日
 */

// 使用严格模式
'use strict';

import {ResponseHandler} from "@/assets/js/utils/index";

class RequestPager {
    defaultOption;
    provideOption;

    constructor(option) {
        this.defaultOption = {
            offset: 0,
            row: 10,
            hasNext: true,
            accessing: false,
            completeCallback: null,
        };
        this.provideOption = option;
        Object.assign(this.defaultOption, option);
    }

    /**
     * 请求模板, 传入的函数会接收到三个参数
     * 1. 对象, 包含 {offset, row}
     * 2. 请求回调（必须调用）, 在请求响应成功时调用
     * 3. 失败回调（必须调用）, 在请求响应失败时调用
     * @param requestFn {function} 发起请求的函数
     * @return {void | *} 返回调用 requestFn 的返回值
     */
    requestModel(requestFn) {
        if (!this.hasNext || this.defaultOption.accessing) {
            return;
        }
        this.defaultOption.accessing = true;
        let params = {
            offset: this.getOffset(),
            row: this.getRow(),
        };
        return requestFn && requestFn(params);
    }

    /**
     * 请求回调, 使用 {@link ResponseHandler} 类, 已经调用过一次 succeed, 为了设置 accessing, 还有其他操作
     * @param response 需要传入响应结果
     * @returns {ResponseHandler} 返回响应处理类
     */
    requestCallback(response) {
        let responseHandler = new ResponseHandler(response);
        responseHandler.succeed((data) => {
            this.sumOffset(data.length);
        }).notExist(() => {
            this.noNext();
        });
        this.defaultOption.accessing = false;
        return responseHandler;
    }

    errorCallback(error) {
        console.log(error);
        this.defaultOption.accessing = false;
    }

    // 设置回调
    setCompleteCallback(completeCallback) {
        this.defaultOption.completeCallback = completeCallback;
    }

    // 是否还有数据
    hasNext() {
        return this.defaultOption.hasNext;
    }

    // 设置 hasNext 为 false
    noNext() {
        let completeCallback = this.defaultOption.completeCallback;
        completeCallback && completeCallback();
        this.defaultOption.hasNext = false;
    }

    getOffset() {
        return this.defaultOption.offset;
    }

    getRow() {
        return this.defaultOption.row;
    }

    // 累加 offset
    sumOffset(num) {
        if (typeof num === "number") {
            this.defaultOption.offset += num;
            if (num < this.getRow()) {
                this.noNext();
            }
        }
    }

    /**
     * 重置, 如果传入了 option, 则以 option 的参数为重置结果, 传入 true 则清除回调, 默认不清除
     * @param clearCompleteCallback 是否清除回调, 默认为 false
     */
    reset(clearCompleteCallback = false) {
        let defaultOption = this.defaultOption;
        let provideOption = this.provideOption;
        defaultOption.offset = provideOption?.offset ?? 0;
        defaultOption.row = provideOption?.row ?? defaultOption.row;
        defaultOption.hasNext = true;
        if (clearCompleteCallback) {
            defaultOption.completeCallback = null;
        }
    }
}

export default RequestPager;


