/**
 * 功能描述：
 * 创建日期：2024 年 05 月 13 日
 */

// 使用严格模式
'use strict';

/**
 * 过渡函数
 * @param element{Element}
 * @param options{Object} 过渡属性配置, 按照
 * <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/CSSStyleDeclaration">MDN - CSSStyleDeclaration</a>
 * 来填写
 * @param {Function}[callback] 过度结束回调函数
 */
export function transition(element, options, callback) {
    if(!element || !options) {
        console.warn(`element or options is undefined`);
        return;
    }

    if(!(element instanceof Element)) {
        console.warn(`element: ${element} is not an instance of Element`);
        return;
    }

    const transitionEndHandler = () => {
        element.removeEventListener("transitionend", transitionEndHandler);

        if(callback) {
            callback();
        }

        element.style.transition = "";
    }

    if(!options.transition) {
        options.transition = "all 0.3s ease";
    }

    for (let key in options) {
        element.style[key] = options[key];
    }

    element.addEventListener("transitionend", transitionEndHandler);
}
