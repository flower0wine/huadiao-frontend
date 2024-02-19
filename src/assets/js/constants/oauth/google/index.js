/**
 * 功能描述：
 * 创建日期：2024 年 02 月 17 日
 */

// 使用严格模式
'use strict';

import {apis} from "@/assets/js/constants/request-path";

let redirectUri = `${apis.huadiaoHost}${apis.common.oauth.google}`;

export default {
    clientId: "727702302847-h7suu6m0lu4dpb2enkqbf5oerosvnpfh.apps.googleusercontent.com",
    authorizeUri: "https://accounts.google.com/o/oauth2/v2/auth",
    scope: "openid profile email",
    responseType: "code",
    redirectUri,
}