
/**
 * 功能描述：
 * 创建日期：2023 年 04 月 02 日
 */

// 使用严格模式
'use strict';

export default function (string) {
    let domList = new DOMParser().parseFromString(string, "text/html").body.children;
    let arr = [];
    for (let dom of domList) {
        arr.push(dom);
    }
    arr.off = function () {
        console.log(this)
    }
    return arr;
}
