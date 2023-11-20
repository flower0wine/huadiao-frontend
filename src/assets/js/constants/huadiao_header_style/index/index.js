/**
 * 功能描述：
 * 创建日期：2023 年 10 月 14 日
 */

// 使用严格模式
'use strict';
const indexPageOne = {
    inputTheme: {
        inputBackgroundColor: "#E06969A2",
        searchBackgroundColor: "#E314148A",
        searchOptionsBackgroundColor: "#EC6464CE",
        searchOptionHoverBackgroundColor: "#E36161CE",
        searchContentBoard: {
            background: "-webkit-linear-gradient(top, #f06161cf, #252525cf)",
        }
    },
    loggedBoardStyle: {
        borderColor: "#7C0628C1",
        background: "-webkit-linear-gradient(left bottom, #454440b9, #84041bb6)",
    },
    noLoggedBoardStyle: {
        background: "-webkit-linear-gradient(left bottom, #454440b4, #84041bb9)",
        ImmediatelyBtnBackgroundColor: "#4c829e",
        registerTextColor: "#4c829e",
    }
};

const indexPageTwo = {
    inputTheme: {
        inputBackgroundColor: "#a2a9b7a2",
        searchBackgroundColor: "#17a6988a",
        searchOptionsBackgroundColor: "#17a6988a",
        searchOptionHoverBackgroundColor: "#169A8D89",
        searchContentBoard: {
            background: "-webkit-linear-gradient(top, #17a6988a, #252525cf)",
        },
    },
    loggedBoardStyle: {
        borderColor: "#067C6AC1",
        background: "-webkit-linear-gradient(left bottom, #454440b9, #046084B5)",
    },
    noLoggedBoardStyle: {
        background: "-webkit-linear-gradient(left bottom, #454440b9, #043A84BA)",
        ImmediatelyBtnBackgroundColor: "#156A96FF",
        registerTextColor: "#569BBEFF",
    }
};

export {indexPageOne, indexPageTwo};
