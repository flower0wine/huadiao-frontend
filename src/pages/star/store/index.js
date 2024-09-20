/**
 * 功能描述：
 * 创建日期：2023 年 03 月 16 日
 */

// 使用严格模式
'use strict';

import Vue from "vue";
import Vuex from "vuex";
import global from "@/common/global-store";

const state = {
  // 用户信息
  user: {
    login: null,
    nickname: null,
    userId: null,
    uid: null,
    fan: null,
    follow: null,
    userAvatar: null
  },
  me: false,
  viewedUid: null,
  viewedUser: {},
  // 笔记收藏目录
  noteStarCatalogue: [],
  // 笔记收藏
  noteStar: new Map(),
};
const actions = {
  // 修改收藏夹信息
  modifyFavoriteInfer(context, {
    favoriteName,
    favoriteCanvases,
    isPublic,
    modifyIndex,
    succeedCallback,
  }) {
    context.commit("modifyFavoriteInfer", {favoriteName, favoriteCanvases, isPublic, modifyIndex});
    succeedCallback && succeedCallback();
  },
  // 删除收藏夹
  deleteFavorite(context, {deleteIndex, mapKey, succeedCallback}) {
    context.commit("deleteFavorite", {deleteIndex, mapKey});
    succeedCallback && succeedCallback();
  },
  // 取消收藏
  cancelNoteStar(context, {selectedNoteStarArray, mapKey, callback}) {
    for (let index = selectedNoteStarArray.length - 1; index >= 0; index--) {
      context.commit("cancelNoteStar", {
        mapKey,
        index: selectedNoteStarArray[index],
      });
    }
    callback && callback();
  },
};
const mutations = {
  initialUser(state, {user}) {
    state.user = user;
  },
  initialMe(state, {me}) {
    state.me = me;
  },
  initialViewedUid(state, {viewedUid}) {
    state.viewedUid = viewedUid;
  },
  setNoteStarCatalogue(state, {catalogues}) {
    state.noteStarCatalogue = [];
    state.noteStarCatalogue.push(...catalogues);
  },
  // 添加笔记收藏
  addNoteStar(state, {mapKey, noteStar, hasNext}) {
    let map = state.noteStar;
    if (map.has(mapKey)) {
      let item = map.get(mapKey);
      item.noteStar.push(...noteStar);
      item.offset += noteStar.length;
      item.hasNext = hasNext;
    } else {
      let offset = noteStar.length;
      map.set(mapKey, {noteStar: [...noteStar], offset, hasNext});
    }
  },
  // 删除笔记收藏
  deleteNoteStar(state, {mapKey}) {
    let map = state.noteStar;
    map.delete(mapKey);
  },
  // 取消收藏
  cancelNoteStar(state, {mapKey, index}) {
    state.noteStar.get(mapKey).noteStar.splice(index, 1);
  },
  // 移动收藏
  moveNoteStarToOtherGroup(state, {selectedNoteStarArray, srcMapKey, callback}) {
    let srcMap = state.noteStar.get(srcMapKey);
    for (let index = selectedNoteStarArray.length - 1; index >= 0; index--) {
      srcMap.noteStar.splice(selectedNoteStarArray[index], 1);
    }
    callback();
  },
  // 建立新的收藏夹
  buildNewFavorite(state, {groupName, groupDescription, open, groupId, createTime}) {
    state.noteStarCatalogue.push({
      groupName,
      count: 0,
      groupDescription,
      // 是否允许操作
      allowOperate: true,
      groupId,
      open,
      createTime
    });
  },
  // 删除收藏夹
  deleteFavorite(state, {deleteIndex, mapKey}) {
    state.noteStar.delete(mapKey);
    state.noteStarCatalogue.splice(deleteIndex, 1);
  },
  // 修改收藏夹信息
  modifyFavoriteInfer(state, {favoriteName, favoriteCanvases, isPublic, modifyIndex}) {
    state.noteStarCatalogue[modifyIndex].groupName = favoriteName;
    state.noteStarCatalogue[modifyIndex].groupDescription = favoriteCanvases;
    state.noteStarCatalogue[modifyIndex].open = isPublic;
  }
};
const getters = {};

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    global,
  },
  state,
  actions,
  mutations,
  getters,
})
