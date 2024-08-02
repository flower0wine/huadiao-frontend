/**
 * 功能描述：
 * 创建日期：2024 年 05 月 13 日
 */

// 使用严格模式
'use strict';

/**
 * 鼠标点击事件回调函数数组
 * @type {function[]}
 */
const clickCallback = [];


window.addEventListener("click", (e) => {
    clickCallback.forEach((fn) => {
        fn(e);
    });
});


/**
 * 添加鼠标主键点击事件回调函数
 * @param fn{function}
 */
export function addClickCallback(fn) {
    clickCallback.push(fn);
}


/**
 * 移除鼠标主键点击事件回调函数
 * @param fn{function}
 */
export function removeClickCallback(fn) {
    const index = clickCallback.indexOf(fn);
    if (index > -1) {
        clickCallback.splice(index, 1);
    }
}