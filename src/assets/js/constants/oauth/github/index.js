/**
 * 功能描述：
 * 创建日期：2024 年 02 月 10 日
 */

// 使用严格模式
'use strict';

import {apis} from "@/assets/js/constants/request-path";

let redirectUri = `${apis.huadiaoHost}${apis.common.oauth.github}`;

let githubOauth;

if (process.env.NODE_ENV === "production") {
    githubOauth = {
        clientId: "Ov23ctPjEkxFJuwvphCD",
        authorizeUri: "https://github.com/login/oauth/authorize",
        redirectUri,
    }
} else {
    githubOauth = {
        clientId: "cdbdc26e987d1cf6c058",
        authorizeUri: "https://github.com/login/oauth/authorize",
        redirectUri,
    };
}

export default githubOauth;