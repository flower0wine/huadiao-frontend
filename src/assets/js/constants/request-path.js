/**
 * 功能描述：保存所有的后端接口
 * 创建日期：2023 年 09 月 04 日
 */

// 使用严格模式
'use strict';

export const apis = {
    // 主机地址
    host: 'http://localhost:9090/huadiao/',
    // 笔记相关 api
    note: {
        comment: "note/comment",
        commentStatus: "note/comment",
        commentDelete: "note/comment/delete",
        commentReport: "note/comment/report",
    },
    // 个人主页相关 api
    homepage: {
        info: "homepage/info",
    },
    // 番剧页面相关 api
    huadiaoHouse: {
        info: "huadiaohouse/info",
        cardBorderImage: "huadiaohouse/border",
        infoModify: "huadiaohouse/info/modify",
        infoPictureModify: "huadiaohouse/info/picture/modify",
        addAnime: "huadiaohouse/anime/add",
        deleteAnime: "huadiaohouse/anime/delete",
    }
};