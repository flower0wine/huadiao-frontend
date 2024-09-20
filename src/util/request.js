/**
 * 功能描述：
 * 创建日期：2024 年 07 月 06 日
 */

// 使用严格模式
'use strict';

import axios from "axios";
import {responseHandler, statusCode} from "@/assets/js/constants/status-code";
import {ERROR_404_PAGE_PATH} from "@/pages/error/error-pages-path";

export const SITE_ORIGIN = window.location.origin;

export const HUADIAO_IMAGE_HOST = `${SITE_ORIGIN}/images/`;
export const HUADIAO_USER_AVATAR_HOST = `${HUADIAO_IMAGE_HOST}userAvatar/`;
export const HUADIAO_HOUSE_IMAGE_HOST = `${HUADIAO_IMAGE_HOST}huadiaoHouse/`;

const excludeInterceptors = [
  /\//,
  /^\/search\/(user|note)\/.*/,
  /^\/note\/(get|all)/,
  /^\/common\/.*/,
  /^\/forum\/.*/,
  /^\/userinfo/,
  /^\/homepage\/info/,
  /^\/huadiaohouse\/info/,
];

function isExcludeInterceptors(pathname) {
  for (let i = 0; i < excludeInterceptors.length; i++) {
    if (excludeInterceptors[i].test(pathname)) {
      return true;
    }
  }
  return false;
}

export function createAxios(config = {}) {
  const instance = axios.create({
    baseURL: `${SITE_ORIGIN}/huadiao`,
    withCredentials: true,

    ...config,
  });

  instance.interceptors.response.use((response) => {
    // 未登录跳转主页
    if (response.data.code === statusCode.NOT_AUTHORITATIVE && !isExcludeInterceptors(window.location.pathname)) {
      window.location.href = "/";
    }
    // 页面不存在
    else if (response.data.code === statusCode.PAGE_NOT_EXIST) {
      window.location.href = ERROR_404_PAGE_PATH;
    }

    //返回参数
    let res = response.data;
    // 如果是返回的文件
    if (response.config.responseType === 'blob') {
      return res;
    }
    // 兼容服务端返回的字符串数据
    if (typeof res === 'string') {
      res = res ? JSON.parse(res) : res;
    }
    return res;
  }, (error) => {
    return Promise.reject(error);
  });

  return instance;
}

export const axiosInstance = createAxios();

export const {get, post, put, delete: del} = axiosInstance;


export function requestPager(request, config = {}) {
  let accessing = false;
  let hasNext = true;

  const defaultConfig = {
    page: 1,
    size: 10,
    useHasNext: true,
  };

  let _config = {
    ...defaultConfig,
   ...config,
  };

  function checkHasNext() {
    if (_config.useHasNext) {
      return hasNext;
    }
    return true;
  }

  async function fetch(params) {
    if (accessing) {
      return Promise.reject(new Error('Accessing...'));
    }

    if (!checkHasNext()) {
      return Promise.reject(new Error('No more data'));
    }

    accessing = true;

    if (typeof params?.page === 'number') {
      _config.page = params.page;
    }
    if (typeof params?.size === 'number') {
      _config.size = params.size;
    }

    return new Promise((resolve, reject) => {
      request({page: _config.page, size: _config.size, ...params})
        .then((res) => {
          responseHandler(res)
            .emptyData(() => {
              setHasNext(false);
            });

          accessing = false;
          _config.page++;
          resolve(res);
        })
        .catch((err) => {
          accessing = false;
          reject(err);
        });
    });
  }

  function reset() {
    _config = {
     ...defaultConfig,
     ...config,
    };
    hasNext = true;
    accessing = false;
  }

  function setHasNext(value) {
    hasNext = value;
  }

  function getSize() {
    return _config.size;
  }

  return {
    reset,
    fetch,

    setHasNext,
    getSize,
  };
}
