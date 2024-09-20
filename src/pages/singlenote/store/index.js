/**
 * 功能描述：
 * 创建日期：2023 年 03 月 20 日
 */

// 使用严格模式
'use strict';

import Vuex from "vuex";
import Vue from "vue";
import global from "@/common/global-store";

const state = {
  // 获取数据的页码
  page: {
    comment: 0,
  },
  // 当前用户信息
  user: {
    login: null,
    nickname: null,
    userId: null,
    uid: null,
    fan: null,
    follow: null,
    userAvatar: null
  },
  author: {
    me: false,
    authorInfo: {
      nickname: null,
      userAvatar: null,
      userId: null,
      uid: null,
      follow: null,
      fan: null,
    },
  },
  noteInfo: {
    // 作者与我的关系
    authorAndMeRelation: {
      followed: false,
      following: false,
    },
    // 我与笔记的渊源
    noteAndMeRelation: {
      me: false,
      myLike: false,
      myStar: false,
      myUnlike: false,
    },
    publishTime: null,
    // 置顶？
    topping: false,
    // 精选？
    concentration: false,
    viewCount: null,
    likeCount: null,
    starCount: null,
    commentCount: null,
    // 原创？
    original: false,
    noteTitle: null,
    noteContent: null,
    commentList: [{
      userAvatar: null,
      nickname: null,
      uid: null,
      commentId: null,
      commentDate: null,
      commentContent: null,
      likeNumber: null,
      myLike: false,
      myUnlike: false,
      commentList: [{
        uid: null,
        commentDate: null,
        userAvatar: null,
        nickname: null,
        commentId: null,
        commentContent: null,
        likeNumber: null,
        myLike: false,
        myUnlike: false,
      }],
    }],
  }
};
const actions = {};
const mutations = {
  // 初始化当前用户信息
  initialUser(state, {user}) {
    state.user = user;
  },
  // 初始化笔记信息
  initialNoteInfo(state, {noteInfo}) {
    noteInfo.commentList = [];
    state.noteInfo = noteInfo;
  },
  setAuthorInfo(state, {authorInfo}) {
    state.author.authorInfo = authorInfo;
  },
  // 添加笔记评论
  addNoteComment(state, {comment}) {
    state.noteInfo.commentList.push(...comment);
  },
  // 给页码加一
  pageIncrement(state, {pageName}) {
    state.page[pageName] += 1;
  },
  // 给评论喜欢
  clickToLikeComment(state, {rootIndex, subIndex, incr}) {
    if (Number.isInteger(subIndex)) {
      let myLike = state.noteInfo.commentList[rootIndex].commentList[subIndex].myLike;
      state.noteInfo.commentList[rootIndex].commentList[subIndex].myLike = !myLike;
      state.noteInfo.commentList[rootIndex].commentList[subIndex].likeCount += incr;
    } else {
      let myLike = state.noteInfo.commentList[rootIndex].myLike;
      state.noteInfo.commentList[rootIndex].myLike = !myLike;
      state.noteInfo.commentList[rootIndex].likeCount += incr;
    }
  },
  // 给评论不喜欢
  clickToUnlikeComment(context, {rootIndex, subIndex}) {
    if (Number.isInteger(subIndex)) {
      state.noteInfo.commentList[rootIndex].commentList[subIndex].myUnlike = !state.noteInfo.commentList[rootIndex].commentList[subIndex].myUnlike;
    } else {
      state.noteInfo.commentList[rootIndex].myUnlike = !state.noteInfo.commentList[rootIndex].myUnlike;
    }
  },
  // 添加根评论
  addRootCommentByCurrentUser(state, {comment}) {
    state.noteInfo.commentList.unshift(comment);
    state.noteInfo.commentCount++;
  },
  // 添加子评论
  addSubCommentByCurrentUser(state, {comment, rootCommentIndex}) {
    state.noteInfo.commentList[rootCommentIndex].commentList.unshift(comment);
    state.noteInfo.commentCount++;
  },
  // 删除根评论
  deleteRootComment(state, {rootIndex}) {
    let commentList = state.noteInfo.commentList[rootIndex].commentList;
    let length = commentList && commentList.length !== 0 ? commentList.length + 1 : 1;
    console.log(length)
    state.noteInfo.commentList.splice(rootIndex, 1);
    state.noteInfo.commentCount -= length;
  },
  // 删除子评论
  deleteSubComment(state, {rootIndex, subIndex}) {
    state.noteInfo.commentList[rootIndex].commentList.splice(subIndex, 1);
    state.noteInfo.commentCount--;
  },
  // 笔记点赞
  clickNoteLikeIcon(state, {confirm, cancel}) {
    let myLike = state.noteInfo.noteAndMeRelation.myLike;
    state.noteInfo.noteAndMeRelation.myLike = !myLike;
    if (!myLike) {
      state.noteInfo.likeCount += 1;
      confirm && confirm();
    } else {
      state.noteInfo.likeCount -= 1;
      cancel && cancel();
    }
  },
  // 笔记不喜欢
  clickNoteUnLikeIcon(state, {confirm, cancel}) {
    let myUnlike = state.noteInfo.noteAndMeRelation.myUnlike;
    state.noteInfo.noteAndMeRelation.myUnlike = !myUnlike;
    if (!myUnlike) {
      confirm && confirm();
    } else {
      cancel && cancel();
    }
  },
  // 笔记收藏
  clickNoteStarIcon(state, {confirm, cancel}) {
    let myStar = state.noteInfo.noteAndMeRelation.myStar;
    state.noteInfo.noteAndMeRelation.myStar = !myStar;
    if (!myStar) {
      state.noteInfo.starCount += 1;
      confirm && confirm();
    } else {
      state.noteInfo.starCount -= 1;
      cancel && cancel();
    }
  },
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
});
