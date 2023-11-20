/**
 * 功能描述：操作防抖
 * 创建日期：2023 年 11 月 19 日
 */

// 使用严格模式
'use strict';

import {Timer} from "@/assets/js/utils/index";

/**
 * 操作防抖
 * @param {number} delay 延迟时间
 */
class OperationDebounce {
    delay;
    timer;

    constructor(delay) {
        this.delay = delay ?? 500;
        this.timer = new Timer();
    }

    /**
     * 防抖
     * @param fn 要进行防抖的函数
     */
    debounce(fn) {
        this.timer.timeout(fn, this.delay);
    }

    setDelay(delay) {
        this.delay = delay;
    }
}

export default OperationDebounce;