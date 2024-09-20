/**
 * 功能描述：工具类
 * 创建日期：2024 年 05 月 08 日
 */

// 使用严格模式
'use strict';

import * as Checker from "@/util/checker";
import * as DomHandler from "@/util/dom";
import * as Generator from "@/util/generator";
import * as MouseEventHandler from "@/util/mouse-event";
import * as MouseButtonHandler from "@/util/mouse-button";
import * as AnimationHandler from "@/util/animation";
import * as AlgorithmSupporter from "@/util/algorithm";
import useSubscribe from "@/util/subscribe";

/**
 * 节流
 * @param fn
 * @param delay
 * @return {(function(...[*]): void)|*}
 */
function throttle(fn, delay) {
    let timer = null;

    return function (...args) {
        if (!timer) {
            timer = window.setTimeout(() => {
                timer = null;
                return fn.apply(this, args);
            }, delay);
        }
    }
}

/**
 * 防抖
 * @param fn
 * @param delay
 * @return {(function(...[*]): void)|*}
 */
export function debounce(fn, delay) {
    let timer;

    return function (...args) {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}

/**
 * 展平 promise
 * @param promise {Promise}
 * @return {Promise<[Error, null]> | Promise<[null, any]>}
 */
export async function flatPromise(promise) {
    let err, res;

    try {
        res = await promise;
    } catch (e) {
        err = e;
    }

    return [err, res];
}

export {
    Checker,
    DomHandler,
    Generator,
    MouseEventHandler,
    MouseButtonHandler,
    AnimationHandler,
    AlgorithmSupporter,
    throttle,
    useSubscribe,
}




