/**
 * 功能描述：
 * 创建日期：2023 年 03 月 06 日
 */

// 使用严格模式
'use strict';

export default {
    url: 'http://localhost:9090/huadiao/',
    wrongLink: "javascript:void(0);",
    // 注册响应处理
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
    // 账号信息响应处理
    accountInfoResponse: {
        wrongNullNickname: "昵称不能为空或只包含空格",
        wrongLengthNickname: "昵称长度最大为 20 个字符",
        wrongSex: "错误的性别",
        wrongBornDate: "日期格式应为 2000-00-00 或 2000/00/00",
        wrongLengthCanvases: "个人简介长度最长为 50 个字符",
        wrongLengthSchool: "学校长度最长为 30 个字符",
    },
    // 账号设置响应设置
    accountSettingResponse: {
        accountSettingUpdateSucceed: "accountSettingUpdateSucceed",
        accountSettingUpdateFail: "accountSettingUpdateFail",
    },
}