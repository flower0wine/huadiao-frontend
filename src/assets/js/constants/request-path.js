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
        modifyAvatar: "homepage/avatar/modify",
        modifyBackground: "homepage/background/modify",
    },
    // 番剧页面相关 api
    huadiaoHouse: {
        info: "huadiaohouse/info",
        cardBorderImage: "huadiaohouse/border",
        infoModify: "huadiaohouse/info/modify",
        infoPictureModify: "huadiaohouse/info/picture/modify",
        addAnime: "huadiaohouse/anime/add",
        deleteAnime: "huadiaohouse/anime/delete",
    },
    // 账号信息页面相关 api
    account: {
        info: "userInfo",
    },
    // 历史记录页面相关 api
    history: {
        note: "history/note",
        anime: "history/anime",
        noteDelete: "history/note/delete",
        animeDelete: "history/anime/delete",
    },
    star: {
        noteGroupGet: "star/note/group",
        noteGroupAdd: "star/note/group/add",
        noteGroupModify: "star/note/group/modify",
        noteGroupDelete: "star/note/group/delete",
        noteGet: "star/note/get",
        noteDelete: "star/note/delete",
        noteCopy: "star/note/copy",
        noteMove: "star/note/move",
        animeGroupGet: "star/anime/group",
        animeGroupAdd: "star/anime/group/add",
        animeGroupModify: "star/anime/group/modify",
        animeGroupDelete: "star/anime/group/delete",
        animeGet: "star/anime/get",
    },
    followFan: {
        newFollow: "relation/friend",
        deleteFollow: "relation/friend/cancel",
        deleteFan: "relation/fan/remove",
        followGet: "relation/follow",
        fanGet: "relation/fan",
        followFanCount: "relation/count",
        followGroupGet: "relation/follow/group",
        followGroupAdd: "relation/follow/group/add",
        followGroupModify: "relation/follow/group/modify",
        followGroupDelete: "relation/follow/group/delete",
        followCopy: "relation/follow/copy",
        followMove: "relation/follow/move",
    }
};