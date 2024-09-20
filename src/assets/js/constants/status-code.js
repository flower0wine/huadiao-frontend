/**
 * 功能描述：
 * 创建日期：2023 年 09 月 05 日
 */

// 使用严格模式
'use strict';

/**
 * 状态码
 */
export const statusCode = {
  SUCCEED: 1000,
  /**
   * 例子：当某个参数长度超过限制时返回该状态码
   */
  EXCEED_LIMIT: 1001,
  ERROR_PARAM: 2000,
  /**
   * 例子：当某个参数为空时返回该状态码
   */
  BLANK_PARAM: 2001,
  NOT_AUTHORITATIVE: 2003,
  /**
   * 例子：当访问一个不存在的页面时返回该状态码
   */
  PAGE_NOT_EXIST: 3000,
  NOT_ALLOW: 3002,
  /**
   * 例子：当某个分页参数未查找到数据时返回该状态码
   */
  EMPTY_DATA: 3003,
  /**
   * 例子：当添加一个已存在的数据时返回该状态码
   */
  EXISTED: 3001,
  /**
   * 例子：当访问一个不存在的用户时返回该状态码
   */
  NOT_EXIST: 3004,
  /**
   * 服务器错误
   */
  SERVER_ERROR: 5000
}


const statusCodeTemp = {};
// SUCCESS 映射为 succeed, ERROR_PARAM 映射为 errorParam, 其他状态码映射为驼峰命名
const handlerNames = [];

for (const codeName in statusCode) {
  const name = codeName.toLowerCase().split("_").map((item, index) => {
    if (index === 0) {
      return item;
    }
    return item.charAt(0).toUpperCase() + item.slice(1);
  }).join("");

  statusCodeTemp[name] = statusCode[codeName];
  handlerNames.push(name);
}

export const statusCodeMapping = statusCodeTemp;

/**
 * @typedef {Object} ResponseHandlers
 * @property {(callback: Function) => ResponseHandlers} error
 * @property {(callback: Function) => ResponseHandlers} succeed
 * @property {(callback: Function) => ResponseHandlers} errorParam
 * @property {(callback: Function) => ResponseHandlers} notAuthoritative
 * @property {(callback: Function) => ResponseHandlers} pageNotExist
 * @property {(callback: Function) => ResponseHandlers} notAllow
 * @property {(callback: Function) => ResponseHandlers} emptyData
 * @property {(callback: Function) => ResponseHandlers} existed
 * @property {(callback: Function) => ResponseHandlers} notExist
 * @property {(callback: Function) => ResponseHandlers} serverError
 */
/**
 * 响应处理器
 * @param {Object} response - 响应对象
 * @return {ResponseHandlers} - 返回一个包含各种处理方法的对象
 */
export function responseHandler(response) {
  let handlers = {};

  for (const key of handlerNames) {
    handlers[key] = (callback) => {
      if (response.code === statusCodeMapping[key]) {
        callback && callback(response);
      }
      return handlers;
    };
  }

  // 通用错误处理方法
  handlers.error = (callback) => {
    if (response.code !== statusCode.SUCCEED) {
      callback && callback(response);
    }
    return handlers;
  };

  return handlers;
}
