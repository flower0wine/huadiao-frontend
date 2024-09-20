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

/**
 * 二分查找添加数字
 * @param array
 * @param number
 */
export function insertOrderArray(array, number) {
  if (array && Array.isArray(array) &&
    typeof number === "number" && Number.isInteger(number)) {
    if (array.length === 0) {
      array.push(number);
    } else {
      let search = this.binarySearchPosition(array, number);
      for (let index = array.length; index > search; index--) {
        array[index] = array[index - 1];
        array.splice(index, 1, array[index - 1]);
      }
      array.splice(search, 1, number);
    }
  }
}

/**
 * 二分查找删除数字
 * @param array
 * @param number
 */
export function deleteNumberFromArray(array, number) {
  if (array && Array.isArray(array) &&
    typeof number === "number" && Number.isInteger(number)) {
    let left = 0, right = array.length - 1, mid;
    while (left <= right) {
      mid = left + ((right - left) >> 1);
      if (array[mid] === number) {
        array.splice(mid, 1);
      } else if (array[mid] > number) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
  }
}
