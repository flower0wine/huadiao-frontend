/**
 * 功能描述：搜索历史保存和获取
 * 创建日期：2023 年 11 月 17 日
 */

// 使用严格模式
'use strict';

import localforage from "localforage";

/**
 * 保存搜索历史, 最多保存 10 条
 * @param searchType {string} 搜索类型
 * @param content {string} 搜索内容
 * @return {Promise<unknown>} 返回 promise
 */
function saveSearchHistory(searchType, content) {
    let searchHistory = {
        searchType,
        content,
        time: new Date().getTime(),
    }
    localforage.getItem(searchType).then((data) => {
        if (!Array.isArray(data)) {
            return localforage.setItem(searchType, [searchHistory]);
        }
        let exist = data.findIndex((item) => item.content === content);
        if (data.length < 10) {
            if (exist !== -1) {
                data.splice(exist, 1);
            }
        } else {
            if (exist !== -1) {
                data.splice(exist, 1);
            } else {
                data.pop();
            }
        }
        data.unshift(searchHistory);
        return localforage.setItem(searchType, data);
    });
}

/**
 *  获取搜索历史
 * @param searchType {string} 搜索类型
 * @return {Promise<unknown>} 返回 promise
 */
function getSearchHistory(searchType) {
    return localforage.getItem(searchType);
}

/**
 * 移除某个搜索历史
 * @param searchType {string} 搜索类型
 * @param historyIndex {number} 历史索引
 * @return {Promise<unknown>} 返回 promise
 */
function removeSearchHistory(searchType, historyIndex) {
    return localforage.getItem(searchType).then((data) => {
        if (!Array.isArray(data)) {
            return localforage.setItem(searchType, []);
        }
        data.forEach((item, index) => {
            if (historyIndex === index) {
                data.splice(index, 1);
            }
        });
        return localforage.setItem(searchType, data);
    });
}

/**
 * 删除所有的搜索历史
 * @param searchType {string} 搜索类型
 * @return {Promise<unknown>} 返回 promise
 */
function clearSearchHistory(searchType) {
    return localforage.removeItem(searchType);
}

export default {
    saveSearchHistory,
    getSearchHistory,
    removeSearchHistory,
    clearSearchHistory
};
