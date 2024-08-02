/**
 * 功能描述：
 * 创建日期：2024 年 05 月 14 日
 */

// 使用严格模式
'use strict';


export function useMaxNumberMapping(minNumber) {
    const numbers = [];
    const mappings = [];

    /**
     * 添加映射, 新加的映射会自动分配一个最大的数字
     * @param mapping{any}
     * @return {boolean}
     */
    function addMapping(mapping) {
        if (mappings.includes(mapping)) {
            return false;
        }

        mappings.push(mapping);

        if (numbers.length === 0) {
            numbers.push(minNumber);
        } else {
            const number = numbers[numbers.length - 1];
            numbers.push(number + 1);
        }
        return true;
    }

    function removeMapping(mapping) {
        const index = mappings.indexOf(mapping);
        if (index === -1) {
            return false;
        }

        mappings.splice(index, 1);
        numbers.splice(index, 1);
        return true;
    }

    /**
     * 将映射移动到最大位置
     * @param mapping{any}
     * @return {boolean} 发生移动返回 true, 如果元素已经处于最大位置时返回 false
     */
    function transferMappingToMaxPosition(mapping) {
        const index = mappings.indexOf(mapping);
        if (index === -1) {
            return false;
        }

        if (index === mappings.length - 1) {
            return false;
        }

        const [splice] = mappings.splice(index, 1);
        mappings.push(splice);
        return true;
    }

    /**
     * 将映射遍历得到一个 Map 对象, 作为 handler 的参数
     * @param handler{function(Map)}
     */
    function handleMapping(handler) {
        const map = new Map();
        mappings.forEach((mapping, index) => {
            map.set(mapping, numbers[index]);
        });
        handler(map);
    }

    function getMaxMappingNumber() {
        return numbers[numbers.length - 1];
    }

    return {
        addMapping,
        removeMapping,
        transferMappingToMaxPosition,
        handleMapping,
        getMaxMappingNumber,
    }
}