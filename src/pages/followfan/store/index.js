/**
 * 功能描述：
 * 创建日期：2023 年 03 月 09 日
 */

// 李时珍：明代, 药圣, 字东壁, 晚年自号濒湖山人, 湖北蕲州（今湖北蕲春县蕲州镇）, 著作：《本草纲目》《奇经八脉考》《濒湖脉学》传世,
// 还有《命门考》, 《濒湖医案》, 《五脏图论》, 《三焦客难》, 《天傀论》, 《白花蛇传》等, 皆佚

// 使用严格模式
'use strict';
import Vuex from "vuex";
import Vue from "vue";

const state = {
    me: false,
    viewedUid: 1,
    // 用户信息
    user: {
        login: false,
        nickname: null,
        userId: null,
        uid: null,
        fans: null,
        follows: null,
        userAvatar: null,
    },
    // 关注分组
    followGroup: [{
        groupName: "全部关注",
        groupId: -1,
        count: 0,
        allowOperate: false,
    }],
    // 粉丝分组
    fanGroup: [{
        to: "fanBoard",
        groupName: "全部粉丝",
        count: 0,
    }],
    follow: new Map(),
    fan: [],
    // 已经被删除的用户
    deletedFollow: [],
    deletedFan: [],
};
const actions = {
    // 删除关注分组
    deleteFollowGroup(context, {deleteIndex}) {
        context.commit("deleteFollowGroup", deleteIndex);
    },
    // 修改组名
    modifyGroupName(context, {modifyIndex, groupName, succeedCallback}) {
        context.commit("modifyGroupName", {modifyIndex, groupName});
        succeedCallback && succeedCallback();
    },
    // 根据索引删除粉丝
    deleteFan(context, {index}) {
        context.commit("deleteFan", {index});
    },
};
const mutations = {
    // 初始化 user
    initialUser(state, {user}) {
        state.user = user;
    },
    initialMe(state, {me}) {
        state.me = me;
    },
    // 初始化全部关注和粉丝数量
    initialFollowFanCount(state, {stat: {followCount, fanCount}}) {
        state.followGroup[0].count = followCount;
        state.fanGroup[0].count = fanCount;
    },
    // 初始化关注分组
    initialFollowGroup(state, {followGroup}) {
        state.followGroup.splice(1);
        state.followGroup.push(...followGroup);
    },
    // 删除关注
    removeFollow(state, {array, mapKey, callback}) {
        let follow = state.follow.get(mapKey).follow;
        for (let index = array.length - 1; index >= 0; index--) {
            follow.splice(array[index], 1);
        }
        callback && callback();
    },
    // 添加用户关注
    addFollow(state, {follow, mapKey, hasNext, offset}) {
        let map = state.follow;
        if (state.follow.has(mapKey)) {
            let item = map.get(mapKey);
            item.follow.push(...follow);
            item.offset += offset;
            item.hasNext = hasNext;
        } else {
            map.set(mapKey, {
                hasNext,
                follow: [...follow],
                offset: offset,
            });
        }
    },
    // 添加用户粉丝
    addFan(state, {fan}) {
        state.fan.push(...fan);
    },
    // 删除粉丝
    deleteFan(state, {index}) {
        state.fan.splice(index, 1);
    },
    // 修改组名
    modifyGroupName(state, {modifyIndex, groupName}) {
        state.followGroup[modifyIndex].groupName = groupName;
    },
    // 添加新的关注分组
    addNewFollowGroup(state, {groupName, groupId}) {
        state.followGroup.push({
            count: 0,
            groupName,
            groupId,
            allowOperate: true,
        });
    },
    // 删除关注分组
    deleteFollowGroup(state, deleteIndex) {
        // 删除
        state.followGroup.splice(deleteIndex, 1);
    },
};

const getters = {
    // 用户的称呼, 我, 他, 她
    call(state) {
        return state.me ? '我' : state.user.sex === '2' ? '她' : '他';
    }
};

Vue.use(Vuex);

export default new Vuex.Store({
    getters,
    state,
    actions,
    mutations,
})