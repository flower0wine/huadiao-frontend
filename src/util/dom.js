/**
 * 功能描述：
 * 创建日期：2024 年 05 月 13 日
 */

// 使用严格模式
'use strict';

/**
 * 添加或删除元素的类名
 * @param {Array | Element} elements 元素或元素数组
 * @param {Array | String} classNames 类名或类名数组
 * @param {Boolean} add 是否添加类名，默认为 true, false 则为删除
 */
export function addOrRemoveClassNames(elements, classNames, add = true) {
    if(!elements || !classNames) {
        return;
    }

    if(!Array.isArray(classNames)) {
        if(classNames.length === 0) {
            return;
        }
        classNames = [classNames];
    }

    if(!Array.isArray(elements)) {
        if(elements.length === 0) {
            return;
        }
        elements = [elements];
    }

    const addClass = (classList, className) => {
        classList.add(className);
    };

    const removeClass = (classList, className) => {
        classList.remove(className);
    };

    const handler = add ? addClass : removeClass;

    elements.forEach((element) => {
        if(!element.classList) {
            return;
        }

        const classList = element.classList;
        classNames.forEach((className) => {
            handler(classList, String(className));
        });
    });
}