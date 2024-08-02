/**
 * 功能描述：保存所有的后端接口
 * 创建日期：2023 年 09 月 04 日
 */

// 使用严格模式
'use strict';

const HUADIAO_HOST_IP = process.env.VUE_APP_HUADIAO_HOST_IP;

/**
 * 后端接口
 */
export const apis = {
    // 网站访问地址
    huadiaoHost: `http://${HUADIAO_HOST_IP}/huadiao/`,
    whisperHost: `ws://${HUADIAO_HOST_IP}/huadiao/message/whisper/talk`,
    imageHost: `http://${HUADIAO_HOST_IP}/images/`,
    // 页面 url
    pageLinkStart: {
        homepage: "homepage",
        note: "singlenote"
    },
    huadiaoHeader: "header",
    common: {
        register: "common/register",
        login: "common/login",
        oauth: {
            github: "common/register/github",
            google: "common/register/google",
        },
        registerCode: "common/registerCode",
    },
    // 搜索
    search: {
        user: {
            nickname: "search/user/nickname",
            userId: "search/user/userid",
        },
        note: {
            title: "search/note/title",
            summary: "search/note/summary",
        },
        history: {
            note: {
                title: "search/history/note/title",
                deleteSpecific: "search/history/note/delete/specific",
                deleteAll: "search/history/note/delete/all",
            }
        }
    },
    // 首页相关 API
    index: {
        forum: {
            note: {
                recommend: "forum/note/recommend",
                rank: "forum/note/rank",
            }
        },
    },
    // 笔记相关 api
    note: {
        get: "note/get",
        all:  "note/all",
        edit: "note/edit",
        modify: "note/modify",
        publish: "note/publish",
        delete: "note/delete",
        like: {
            add: "note/like/add",
            delete: "note/like/delete",
        },
        unlike: {
            add: "note/unlike/add",
            delete: "note/unlike/delete",
        },
        star: {
            add: "note/star/add",
            delete: "note/star/delete",
        },
        comment: {
            like: {
                add: "note/comment/like/add",
                delete: "note/comment/like/delete",
            },
            unlike: {
                add: "note/comment/unlike/add",
                delete: "note/comment/unlike/delete",
            },
            get: "note/comment",
            add: "note/comment/add",
            delete: "note/comment/delete",
            report: "note/comment/report",
        },
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
        info: "userinfo",
    },
    setting: {
        modify: "setting/modify",
        accountGet: "setting/account/get",
        messageGet: "setting/message/get",
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
    },
    // 消息 api
    message: {
        systemGet: "message/system/get",
        likeGet: "message/like/get",
        likeDelete: "message/like/delete",
        replyGet: "message/reply/get",
        replyDelete: "message/reply/delete",
        latestUserGet: "message/whisper/user",
        latestSingleUserGet: "message/whisper/user/single",
        latestUserDelete: "message/whisper/user/delete",
        whisperAdd: "message/whisper/add",
        whisperDelete: "message/whisper/delete",
        whisperGet: "message/whisper/get",
    }
};