/**
 * 功能描述：
 * 创建日期：2023 年 03 月 16 日
 */

// 使用严格模式
'use strict';

import Vue from "vue";
import Vuex from "vuex";

const state = {
    isLogin: true,
    // 用户信息
    user: {
        isLogin: null,
        nickname: "花凋大总管",
        canvases: "今天是花凋一周年!",
        school: "东华理工大学",
        userId: "huadiao_01234567890",
        bornDate: "2003-03-15",
        sex: "2",
        uid: "1",
        fans: 8,
        follows: 8,
        userAvatar: "https://img0.baidu.com/it/u=981218435,2998857702&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1677690000&t=d8a591b46edf38a8a1d31e5193e384a9",
    },
    // 笔记收藏目录
    noteStarCatalogue: [{
        favoriteId: -1,
        favoriteName: "全部收藏",
        favoriteCanvases: "江山、美人",
        number: 0,
        // 是否允许操作
        allowOperate: true,
        isPublic: false,
    }, {
        favoriteId: -2,
        favoriteName: "精品收藏",
        favoriteCanvases: "世间",
        number: 0,
        allowOperate: false,
        isPublic: true,
    }],
    // 根据 noteStar 的 favoriteId 分组后的收藏
    noteStarDivide: null,
    // 笔记收藏
    noteStar: [{
        authorAvatar: "https://img2.baidu.com/it/u=174991003,1991123578&fm=253&fmt=auto&app=120&f=JPEG?w=780&h=1170",
        noteId: 1,
        noteTitle: "风萧萧兮易水寒, 壮士一去兮不复还",
        starDate: "2023-02-03 13:00:00",
        authorNickname: "风随雨来",
        favoriteId: -1,
        noteAbstract: "荆轲刺秦王, 秦王绕柱, 属下趁着荆轲不注意砍伤荆轲, 秦王将身负重伤的荆轲刺死",
    }, {
        authorAvatar: "https://img1.baidu.com/it/u=407852637,3650486136&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
        noteId: 2,
        noteTitle: "观今宜鉴古, 无古不成今。知已知彼, 将心比心。",
        starDate: "2023-02-03 13:00:00",
        authorNickname: "浴火成金",
        favoriteId: -1,
        noteAbstract: "但愿人长久, 千里共婵娟。酒逢知己饮, 诗向会人吟。",
    }, {
        authorAvatar: "https://img1.baidu.com/it/u=407852637,3650486136&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
        noteId: 3,
        noteTitle: "观今宜鉴古, 无古不成今。知已知彼, 将心比心。",
        starDate: "2023-02-03 13:00:00",
        authorNickname: "浴火成金",
        favoriteId: -2,
        noteAbstract: "但愿人长久, 千里共婵娟。酒逢知己饮, 诗向会人吟。",
    }, {
        authorAvatar: "https://img1.baidu.com/it/u=407852637,3650486136&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
        noteId: 4,
        noteTitle: "观今宜鉴古, 无古不成今。知已知彼, 将心比心。",
        starDate: "2023-02-03 13:00:00",
        authorNickname: "浴火成金",
        favoriteId: -1,
        noteAbstract: "但愿人长久, 千里共婵娟。酒逢知己饮, 诗向会人吟。",
    }, {
        authorAvatar: "https://img1.baidu.com/it/u=407852637,3650486136&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
        noteId: 5,
        noteTitle: "观今宜鉴古, 无古不成今。知已知彼, 将心比心。",
        starDate: "2023-02-03 13:00:00",
        authorNickname: "浴火成金",
        favoriteId: -2,
        noteAbstract: "但愿人长久, 千里共婵娟。酒逢知己饮, 诗向会人吟。",
    }, {
        authorAvatar: "https://img1.baidu.com/it/u=407852637,3650486136&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
        noteId: 6,
        noteTitle: "观今宜鉴古, 无古不成今。知已知彼, 将心比心。",
        starDate: "2023-02-03 13:00:00",
        authorNickname: "浴火成金",
        favoriteId: -2,
        noteAbstract: "但愿人长久, 千里共婵娟。酒逢知己饮, 诗向会人吟。",
    }, {
        authorAvatar: "https://img1.baidu.com/it/u=407852637,3650486136&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
        noteId: 7,
        noteTitle: "观今宜鉴古, 无古不成今。知已知彼, 将心比心。",
        starDate: "2023-02-03 13:00:00",
        authorNickname: "浴火成金",
        favoriteId: -1,
        noteAbstract: "但愿人长久, 千里共婵娟。酒逢知己饮, 诗向会人吟。",
    }, {
        authorAvatar: "https://img1.baidu.com/it/u=407852637,3650486136&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
        noteId: 8,
        noteTitle: "观今宜鉴古, 无古不成今。知已知彼, 将心比心。",
        starDate: "2023-02-03 13:00:00",
        authorNickname: "浴火成金",
        favoriteId: -1,
        noteAbstract: "但愿人长久, 千里共婵娟。酒逢知己饮, 诗向会人吟。",
    }, {
        authorAvatar: "https://img1.baidu.com/it/u=407852637,3650486136&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
        noteId: 9,
        noteTitle: "观今宜鉴古, 无古不成今。知已知彼, 将心比心。",
        starDate: "2023-02-03 13:00:00",
        authorNickname: "浴火成金",
        favoriteId: -1,
        noteAbstract: "但愿人长久, 千里共婵娟。酒逢知己饮, 诗向会人吟。",
    }, {
        authorAvatar: "https://img1.baidu.com/it/u=407852637,3650486136&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
        noteId: 10,
        noteTitle: "观今宜鉴古, 无古不成今。知已知彼, 将心比心。",
        starDate: "2023-02-03 13:00:00",
        authorNickname: "浴火成金",
        favoriteId: -1,
        noteAbstract: "但愿人长久, 千里共婵娟。酒逢知己饮, 诗向会人吟。",
    }, {
        authorAvatar: "https://img1.baidu.com/it/u=407852637,3650486136&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
        noteId: 11,
        noteTitle: "观今宜鉴古, 无古不成今。知已知彼, 将心比心。",
        starDate: "2023-02-03 13:00:00",
        authorNickname: "浴火成金",
        favoriteId: -1,
        noteAbstract: "但愿人长久, 千里共婵娟。酒逢知己饮, 诗向会人吟。",
    }, {
        authorAvatar: "https://img1.baidu.com/it/u=407852637,3650486136&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
        noteId: 12,
        noteTitle: "观今宜鉴古, 无古不成今。知已知彼, 将心比心。",
        starDate: "2023-02-03 13:00:00",
        authorNickname: "浴火成金",
        favoriteId: -1,
        noteAbstract: "但愿人长久, 千里共婵娟。酒逢知己饮, 诗向会人吟。",
    }, {
        authorAvatar: "https://img1.baidu.com/it/u=407852637,3650486136&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
        noteId: 13,
        noteTitle: "观今宜鉴古, 无古不成今。知已知彼, 将心比心。",
        starDate: "2023-02-03 13:00:00",
        authorNickname: "浴火成金",
        favoriteId: -1,
        noteAbstract: "但愿人长久, 千里共婵娟。酒逢知己饮, 诗向会人吟。",
    }, {
        authorAvatar: "https://img1.baidu.com/it/u=407852637,3650486136&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
        noteId: 14,
        noteTitle: "观今宜鉴古, 无古不成今。知已知彼, 将心比心。",
        starDate: "2023-02-03 13:00:00",
        authorNickname: "浴火成金",
        favoriteId: -1,
        noteAbstract: "但愿人长久, 千里共婵娟。酒逢知己饮, 诗向会人吟。",
    }],
    me: true,
};
const actions = {
    // 修改收藏夹信息
    modifyFavoriteInfer(context, {
        favoriteName,
        favoriteCanvases,
        isPublic,
        modifyIndex,
        succeedCallback,
        failCallback
    }) {
        context.dispatch("checkFavoriteOperation", modifyIndex).then(res => {
            if (res) {
                context.commit("modifyFavoriteInfer", {favoriteName, favoriteCanvases, isPublic, modifyIndex});
                succeedCallback && succeedCallback();
            } else {
                failCallback && failCallback();
            }
        });
    },
    // 删除收藏夹
    deleteFavorite(context, {deleteIndex, succeedCallback, failCallback}) {
        context.dispatch("checkFavoriteOperation", deleteIndex).then(res => {
            if (res) {
                context.commit("deleteFavorite", deleteIndex);
                succeedCallback && succeedCallback();
            } else {
                failCallback && failCallback();
            }
        });
    },
    // 检查操作收藏夹是否合理
    checkFavoriteOperation(context, index) {
        let noteStar = context.state.noteStarCatalogue;
        if (0 <= index && index < noteStar.length) {
            if (noteStar[index].allowOperate) {
                return true;
            }
        }
        return false;
    },
    // 取消收藏
    cancelNoteStar(context, {selectedNoteStarArray, favoriteId, succeedCallback, failCallback}) {
        let noteStar = context.state.noteStarDivide.get(favoriteId);
        for (let index = selectedNoteStarArray.length - 1; index >= 0; index--) {
            if (0 <= selectedNoteStarArray[index] && selectedNoteStarArray[index] <= noteStar.length - 1) {
                context.commit("cancelNoteStar", {
                    favoriteId,
                    index: selectedNoteStarArray[index],
                });
            } else {
                failCallback && failCallback();
                return;
            }
        }
        succeedCallback && succeedCallback();
    },
    // 按照收藏夹将收藏分开
    accordingFavoriteIdDivide(context) {
        let map = new Map();
        for (let noteStar of context.state.noteStar) {
            let favoriteId = String(noteStar.favoriteId);
            if (map.has(favoriteId)) {
                map.get(favoriteId).push(noteStar);
            } else {
                map.set(favoriteId, [noteStar]);
            }
        }
        context.state.noteStarDivide = map;
    },
    // 复制笔记收藏到其他收藏夹
    copyNoteStarToOtherFavorite(context, {
        selectedNoteStarArray,
        srcFavoriteId,
        destFavoriteId,
        succeedCallback,
        failCallback
    }) {
        context.dispatch("copyOrMoveNoteStarToOtherFavorite", {
            selectedNoteStarArray,
            srcFavoriteId,
            destFavoriteId,
            succeedCallback,
            failCallback,
            fn: ({srcNoteStar, destNoteStar, noteStarIndex, destFavoriteId, sign}) => {
                context.commit("copyNoteStarToOtherFavorite", {
                    srcNoteStar,
                    destNoteStar,
                    noteStarIndex,
                    destFavoriteId,
                    sign,
                });
            }
        });
    },
    // 移动笔记到其他收藏夹
    moveNoteStarToOtherFavorite(context, {
        selectedNoteStarArray,
        srcFavoriteId,
        destFavoriteId,
        succeedCallback,
        failCallback
    }) {
        context.dispatch("copyOrMoveNoteStarToOtherFavorite", {
            selectedNoteStarArray,
            srcFavoriteId,
            destFavoriteId,
            succeedCallback,
            failCallback,
            fn: ({srcNoteStar, destNoteStar, noteStarIndex, destFavoriteId, sign}) => {
                context.commit("moveNoteStarToOtherFavorite", {
                    srcNoteStar,
                    destNoteStar,
                    noteStarIndex,
                    destFavoriteId,
                    sign,
                });
            }
        });
    },
    // 复制或移动收藏到其他收藏夹, fn 附加函数
    copyOrMoveNoteStarToOtherFavorite(context, {
        selectedNoteStarArray,
        srcFavoriteId,
        destFavoriteId,
        succeedCallback,
        failCallback,
        fn
    }) {
        srcFavoriteId = String(srcFavoriteId);
        destFavoriteId = String(destFavoriteId);
        let srcNoteStar = context.state.noteStarDivide.get(srcFavoriteId);
        let destNoteStar = context.state.noteStarDivide.get(destFavoriteId);
        // 选择了多个收藏
        for (let index = selectedNoteStarArray.length - 1; index >= 0; index--) {
            let noteStarIndex = selectedNoteStarArray[index];
            let sign = true;
            if (0 <= noteStarIndex && noteStarIndex < srcNoteStar.length) {
                for (let noteStar of destNoteStar) {
                    // 在目标收藏夹下存在同样的笔记收藏
                    if (noteStar.noteId === srcNoteStar[noteStarIndex].noteId) {
                        sign = false;
                        break;
                    }
                }
                console.log(noteStarIndex, sign)
                // 符合条件执行函数
                fn({srcNoteStar, destNoteStar, noteStarIndex, destFavoriteId, sign});
            } else {
                failCallback && failCallback();
            }
        }
        succeedCallback && succeedCallback();
    }
};
const mutations = {
    // 复制收藏到其他收藏夹
    copyNoteStarToOtherFavorite(state, {srcNoteStar, destNoteStar, noteStarIndex, destFavoriteId, sign}) {
        if (sign) {
            // 复制
            let noteStar = {...srcNoteStar[noteStarIndex]};
            // 改变目录
            noteStar.favoriteId = destFavoriteId;
            destNoteStar.push(noteStar);
        }
    },
    // 移动收藏到其他收藏夹
    moveNoteStarToOtherFavorite(state, {srcNoteStar, destNoteStar, noteStarIndex, destFavoriteId, sign}) {
        let noteStar = srcNoteStar[noteStarIndex];
        // 删除
        srcNoteStar.splice(noteStarIndex, 1);
        if(sign) {
            // 改变目录
            noteStar.favoriteId = destFavoriteId;
            destNoteStar.push(noteStar);
        }
    },
    // 取消收藏
    cancelNoteStar(state, {favoriteId, index}) {
        state.noteStarDivide.get(favoriteId).splice(index, 1);
    },
    // 建立新的收藏夹
    buildNewFavorite(state, {favoriteName, favoriteCanvases, isPublic}) {
        state.noteStarCatalogue.push({
            favoriteId: Math.floor(10000 * Math.random()),
            favoriteName,
            number: 0,
            favoriteCanvases,
            // 是否允许操作
            allowOperate: true,
            isPublic,
        });
    },
    // 删除收藏夹
    deleteFavorite(state, deleteIndex) {
        state.noteStarCatalogue.splice(deleteIndex, 1);
    },
    // 修改收藏夹信息
    modifyFavoriteInfer(state, {favoriteName, favoriteCanvases, isPublic, modifyIndex}) {
        state.noteStarCatalogue[modifyIndex].favoriteName = favoriteName;
        state.noteStarCatalogue[modifyIndex].favoriteCanvases = favoriteCanvases;
        state.noteStarCatalogue[modifyIndex].isPublic = isPublic;
    }
};
const getters = {
    // 用户的称呼, 我, 他, 她
    call(state) {
        return state.me ? '我' : state.user.sex === '2' ? '她' : '他';
    }
};

Vue.use(Vuex);

export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters,
})