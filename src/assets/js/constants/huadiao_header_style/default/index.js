/**
 * 功能描述：
 * 创建日期：2023 年 10 月 28 日
 */

// 使用严格模式
'use strict';

const defaultHuadiaoHeaderStyle = {
    blur: false,
    shadow: false,
    customShadow: "",
    backgroundColor: "transparent",
    // 右侧入口颜色
    entryColor: "#fff",
    // 输入框颜色
    inputTheme: {
        searchIconColor: "#fff",
        textColor: "#fff",
        inputBackgroundColor: "#E06969A2",
        searchBackgroundColor: "#E314148A",
        searchOptionsBackgroundColor: "#EC6464CE",
        searchOptionHoverBackgroundColor: "#E36161CE",
        searchContentBoard: {
            background: "-webkit-linear-gradient(top, #f06161cf, #252525cf)",
        }
    },
    // 登录面板
    loggedBoardStyle: {
        shadow: false,
        borderColor: "#7C0628C1",
        textColor: "#dad5d5",
        accessColor: "#fff",
        background: "-webkit-linear-gradient(left bottom, #454440b9, #84041bb6)",
    },
};

export default defaultHuadiaoHeaderStyle;