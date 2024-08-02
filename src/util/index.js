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
 * 修改源对象指定属性为提供的对象的属性
 * @param targetConfig {Object} 要粘贴属性到的目标对象
 * @param srcConfig {Object}  要复制属性源对象
 * @param option {{generate: boolean, proto: boolean, arrayCover: boolean}}
 * 配置对象:
 * 1. generate: 是否允许创建新属性, 默认为 true
 * 2. proto: 是否复制原型的属性, 默认为 false
 * 3. arrayCover: 如果 srcConfig 的某个属性为数组, 并且 targetConfig 对应属性也为数组, 则直接覆盖, 否则添加至 targetConfig 的数组中, 默认为 true (覆盖)
 */
export function modifySrcObject(targetConfig,
    srcConfig,
    option = {generate: true, proto: false, arrayCover: true}) {
    for (let c in srcConfig) {
        // 不修改原型并且源对象上没有此属性
        if (!option.proto && !Object.prototype.hasOwnProperty.call(srcConfig, c)) {
            continue;
        }
        // 可能为 对象 或者 null(属于对象)
        if (typeof srcConfig[c] === "object") {
            if(Array.isArray(srcConfig[c]) && Array.isArray(targetConfig[c])) {
                // 若能覆盖
                if(option.arrayCover) {
                    targetConfig[c] = srcConfig[c];
                } else {
                    targetConfig[c].push(...srcConfig[c]);
                }
            } else {
                // 如果 targetConfig 不存在对应的属性
                if (!targetConfig[c]) {
                    // 是否生成新属性
                    if (!option.generate) continue;
                    targetConfig[c] = srcConfig[c] === null ? null : {};
                }
                // 递归
                if (srcConfig[c] !== null) {
                    modifySrcObject(targetConfig[c], srcConfig[c], option);
                }
            }
        } else {
            // 如果不能生成, 则 continue
            if (!targetConfig[c] && !option.generate) continue;
            // 赋值 或者 生成新属性
            if (srcConfig[c] != null) {
                targetConfig[c] = srcConfig[c]
            }
        }
    }
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




