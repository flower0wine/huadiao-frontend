/**
 * 功能描述：
 * 创建日期：2023 年 03 月 06 日
 */

// 使用严格模式
'use strict';

export default {
    imageHost: "http://localhost:9090/images/",
    statusCode: {
        succeed: 1000,
        errorParam: 2000,
        blankParam: 2001,
        notExist: 3000,
        existed: 3001,
    },
    wrongLink: "javascript:void(0);",
}