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
    // 注册响应消息
    registerResponse: {
        wrongCode: "验证码错误!",
        sameUsername: "这个用户名太受欢迎了, 已经有人使用, 换一个吧!",
        succeedRegister: "恭喜! 注册成功!",
        wrongUsername: "用户名不能包含数字、字母和下划线以外的字符!",
        wrongPassword: "密码必须包含数字, 小写字母, 大写字母, 并且不能包含数字、字母和下划线以及 !, -, @ 以外的字符!",
        wrongUsernameLength: "用户名长度应为 8 至 20 之间!",
        wrongPasswordLength: "密码长度应为 8 至 32 之间!",
        noSamePassword: "两次输入的密码不一样! 按下 ctrl + alt 可以返回重新输入!",
        nullUsername: "请填写用户名!",
        nullPassword: "请填写密码!",
        nullCheckCode: "请填写验证码!"
    },
    // 账号设置响应消息
    accountSettingResponse: {
        accountSettingUpdateSucceed: "accountSettingUpdateSucceed",
        accountSettingUpdateFail: "accountSettingUpdateFail",
    },
    // 单个笔记页面响应消息
    singleNoteResponse: {
        chooseDeleteComment: "确认删除吗?删除根评论其下的子评论也会删除!",
        deleteCommentSucceed: "评论删除成功",
        reportNoteCommentSucceed: "举报评论成功"
    }
}