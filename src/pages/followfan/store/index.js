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
        count: 0,
        groupId: -1,
        // 允许删除, 修改名称?
        allowOperate: false,
    }],
    // 粉丝分组
    fanGroup: [{
        to: "fanBoard",
        groupName: "全部粉丝",
        count: 0,
    }],
    follow: [],
    fan: [],
    // 已经被删除的用户
    deletedFollow: [],
    deletedFan: [],
};
const actions = {
    // 刷新用户关注数量
    flushUserFollow(context, {follow, followUid}) {
        // 根据 uid 获取 index
        let followIndex;
        state.follow.forEach((item, index) => {
            if (item.uid === followUid) {
                followIndex = index;
            }
        });
        let uid = state.follow[followIndex].uid;
        let increment = follow ? -1 : 1;
        // 取关用户, 如果在粉丝中找得到该用户, 说明之前是互粉
        if (increment === -1) {
            if (state.followGroup[0].number === 0) {
                // return;
            }
            state.fan.forEach((item) => {
                if (item.uid === uid) {
                    item.friend = false;
                }
            });
            // 添加到已经被删除的用户当中
            state.deletedFollow.push(state.follow[followIndex]);
            // 调用原生的 splice 方法, 因为这不需要响应式
            Array().splice.call(state.follow, followIndex, 1);
        } else {
            // 重新关注, 将在已删除的用户中以 uid 进行检索
            let item, targetIndex;
            for (let index = 0; index < state.deletedFollow.length; index++) {
                if (state.deletedFollow[index].uid === uid) {
                    targetIndex = index;
                    item = state.deletedFollow[index];
                    break;
                }
            }
            // 添加到头部, 让用户更快看见
            state.follow.unshift(item);
            state.deletedFollow.splice(targetIndex, 1);
        }
        context.commit("flushUserFollow", increment);
    },
    // 刷新用户粉丝数量
    flushUserFan(context, increment) {
        context.commit("flushUserFan", increment);
    },
    // 删除关注分组
    deleteFollowGroup(context, {deleteIndex, succeedCallback}) {
        context.commit("deleteFollowGroup", deleteIndex);
        succeedCallback && succeedCallback();
    },
    // 修改组名
    modifyGroupName(context, {modifyIndex, groupName, succeedCallback}) {
        context.commit("modifyGroupName", {modifyIndex, groupName});
        succeedCallback && succeedCallback();
    },
    // 根据索引删除粉丝
    deleteFan(context, {index}) {
        let fan = context.state.followFan.fan;
        if (0 <= index && index <= fan.length) {
            context.commit("deleteFan", {index});
        }
    },
};
const mutations = {
    // 初始化 user
    initialUser(state, {user}) {
        state.user = user;
    },
    // 初始化全部关注和粉丝数量
    initialFollowFanCount(state, {stat}) {
        state.followGroup[0].count = stat.followCount;
        state.fanGroup[0].count = stat.fanCount;
    },
    // 初始化关注分组
    initialFollowGroup(state, {followGroup}) {
        for (let group of followGroup) {
            group.allowOperate = group.groupId > 10;
            state.followGroup.push(group);
        }
    },
    // 添加用户关注
    addFollow(state, {follow}) {
        state.follow.push(...follow.follow);
        state.me = follow.me;
    },
    // 添加用户粉丝
    addFan(state, {fan}) {
        state.fan.push(...fan.fan);
        state.me = fan.me;
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
    addNewFollowGroup(state, {groupName}) {
        state.followGroup.push({
            number: 0,
            groupName,
            to: "asas",
            allowOperate: true,
        });
    },
    // 删除关注分组
    deleteFollowGroup(state, deleteIndex) {
        // 删除
        state.followGroup.splice(deleteIndex, 1);
    },
    // 清空被删除的关注
    clearDeletedFollow(state) {
        state.deletedFollow = [];
    },
    // 清空被删除的粉丝
    clearDeletedFan(state) {
        state.deletedFan = [];
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
    getters,
    state,
    actions,
    mutations,
})