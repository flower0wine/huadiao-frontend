/**
 * 功能描述：花凋头部搜索框使用的常量
 * 创建日期：2023 年 11 月 16 日
 */

// 使用严格模式
'use strict';

/**
 * 搜索类型映射, 英文与中文的映射
 * @type {{noteTitle: string, noteSummary: string, nickname: string, userId: string}}
 */
export const searchTypeMapping = {
    nickname: "用户昵称",
    userId: "用户ID",
    noteTitle: "笔记标题",
    noteSummary: "笔记摘要"
};

/**
 * 所有的类型
 * @type {{note: string, user: string}}
 */
export const overallType = {
    user: "user",
    note: "note"
}

/**
 * 所有的搜索类型常量, 区分当前搜索类型属于笔记还是用户
 * @type {{noteTitle: string, noteSummary: string, nickname: string, userId: string}}
 */
export const overallSearchType = {
    nickname: overallType.user,
    userId: overallType.user,
    noteTitle: overallType.note,
    noteSummary: overallType.note
}

/**
 * 搜索类型数组, 以 searchTypeMapping 的键名生成
 * @type {string[]}
 */
export const searchTypeList = (() => {
    let arr = [];
    for (let key in searchTypeMapping) {
        arr.push(key);
    }
    return arr;
})();

/**
 * 搜索类型, 以 searchTypeMapping 的键名生成, 键值也为键名
 * @type {{noteTitle: string, noteSummary: string, nickname: string, userId: string}}
 */
export const searchType = (() => {
    let obj = {};
    for (let key in searchTypeMapping) {
        obj[key] = key;
    }
    return obj;
})();
