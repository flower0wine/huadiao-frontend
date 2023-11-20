/**
 * 功能描述：
 * 创建日期：2023 年 03 月 06 日
 */

// 使用严格模式
'use strict';

export default {
    wrongLink: "javascript:void(0);",
    usernameReg: /(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9_]{8,20}/,
    passwordReg: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9_,.+~&^%$#=-]{8,32}/,
}