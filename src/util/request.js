/**
 * 功能描述：
 * 创建日期：2024 年 07 月 06 日
 */

// 使用严格模式
'use strict';

import axios, {HttpStatusCode} from "axios";
import {statusCode} from "@/assets/js/constants/status-code";

export const HUADIAO_HOST_IP = process.env.VUE_APP_HUADIAO_HOST_IP;

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

axios.interceptors.response.use((resp) => {
    if (resp.status === HttpStatusCode.Ok) {
        // 未登录跳转主页
        if (resp.data.code === statusCode.NOT_AUTHORITATIVE && !isExcludeInterceptors(window.location.pathname)) {
            window.location.href = "/";
        }
        // 页面不存在
        else if (resp.data.code === statusCode.PAGE_NOT_EXIST) {
            window.location.href = "/error/404";
        }
    }
    return resp;
});

export function createAxios(config = {}) {
    const instance = axios.create({
        baseURL: "http://" + HUADIAO_HOST_IP + "/huadiao",
        timeout: 10000,
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
            window.location.href = "/error/404";
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

export const { get, post, put, delete: del } = axiosInstance;
