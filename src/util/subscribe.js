/**
 * 功能描述：
 * 创建日期：2024 年 05 月 11 日
 */

// 使用严格模式
'use strict';

export default function useSubscribe() {

    /**
     * 更新订阅者
     * @type {function[]}
     */
    const subscribers = [];


    /**
     * 订阅
     * @param fn
     * @return {function(): void} 取消订阅的函数
     */
    function subscribe(fn) {
        subscribers.push(fn);
        return () => unsubscribe(fn);
    }


    function unsubscribe(fn) {
        const index = subscribers.indexOf(fn);
        if (index!== -1) {
            subscribers.splice(index, 1);
        }
    }


    function notify(...args) {
        subscribers.forEach(fn => fn(...args));
    }


    return {
        subscribe,
        unsubscribe,
        notify
    };
}