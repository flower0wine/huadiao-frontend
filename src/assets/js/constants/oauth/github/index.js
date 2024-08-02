/**
 * 功能描述：
 * 创建日期：2024 年 02 月 10 日
 */

// 使用严格模式
'use strict';

import {apis} from "@/assets/js/constants/request-path";

let redirectUri = `${apis.huadiaoHost}${apis.common.oauth.github}`;

export default {
    clientId: "Iv1.877c85676f1a2d08",
    authorizeUri: "https://github.com/login/oauth/authorize",
    redirectUri,
}