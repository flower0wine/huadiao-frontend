/**
 * 功能描述：对请求节流
 * 创建日期：2023 年 11 月 15 日
 */

// 使用严格模式
'use strict';

import {Timer} from "@/assets/js/utils/index";

/**
 * 对操作设置节流, 默认操作时间间隔为 500 ms
 */
class OperationThrottle {
    delay;
    timer;
    accessible;

    constructor(delay) {
        this.delay = delay ?? 500;
        this.timer = new Timer();
        this.accessible = true;
    }

    // 询问是否可以访问, 可以访问返回 true
    access() {
        if(!this.accessible) return false;
        this.accessible = false;
        this.timer.timeout(() => {
            this.accessible = true;
        }, this.delay);
        return true;
    }

    setDelay(delay) {
        this.delay = delay;
    }
}

export default OperationThrottle;