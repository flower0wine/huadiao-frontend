/**
 * 功能描述：
 * 创建日期：2024 年 05 月 10 日
 */

// 使用严格模式
'use strict';

import {Generator, AlgorithmSupporter, useSubscribe} from "@/util";

const {generateUniqueId} = Generator;
const {useMaxNumberMapping} = AlgorithmSupporter;

const {
    addMapping,
    removeMapping,
    transferMappingToMaxPosition,
    handleMapping,
    getMaxMappingNumber,
} = useMaxNumberMapping(999_9999);

const {
    subscribe,
    unsubscribe,
    notify
} = useSubscribe();

export {
    subscribe,
    unsubscribe,
    transferMappingToMaxPosition,
    handleMapping,
    getMaxMappingNumber,
}


/**
 * 任务栏列表
 */
const taskBarMap = new Map();

/**
 * 获取任务栏列表
 * @param id{Symbol}
 * @return {Map}
 */
export function getTaskMapById(id) {
    return taskBarMap.get(id);
}


export function addTaskBar(id) {
    if (taskBarMap.has(id)) {
        return false;
    }

    taskBarMap.set(id, new Map());

    notify();
    return true;
}


export function removeTaskBar(id) {
    if(!taskBarMap.has(id)) {
        return false;
    }

    taskBarMap.delete(id);

    notify();
    return true;
}


export function addWindowTask(windowInfo) {
    if(!windowInfo) {
        console.warn('windowInfo is null or undefined');
        return;
    }

    const {taskBarId, id} = windowInfo;
    const taskMap = taskBarMap.get(taskBarId);

    if (taskMap) {
        if (taskMap.has(id)) {
            return false;
        }

        taskMap.set(id, windowInfo);
        addMapping(id);

        notify();
        return true;
    }
    return false;
}


export function removeWindowTask(taskBarId, windowId) {
    const taskMap = taskBarMap.get(taskBarId);
    if (taskMap && windowId) {
        if (!taskMap.has(windowId)) {
            return false;
        }

        taskMap.delete(windowId);
        removeMapping(windowId);

        notify();
        return true;
    }
    return false;
}


/**
 * 遍历所有窗口任务
 * @param handler{function} 函数返回 false 则停止遍历
 */
export function eachAllWindowTask(handler) {
    if (typeof handler!== "function") {
        return;
    }

    for (const taskMap of taskBarMap.values()) {
        for (const windowInfo of taskMap.values()) {
            if (handler(windowInfo) === false) {
                break;
            }
        }
    }
}


/**
 * 生成唯一的窗口 ID
 * @param description
 * @return {symbol}
 */
export function generateUniqueWindowId(description) {
    return generateUniqueId(description);
}


/**
 * 生成唯一的任务栏 ID
 * @param description
 * @return {symbol}
 */
export function generateUniqueTaskBarId(description) {
    return generateUniqueId(description);
}