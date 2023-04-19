/**
 * 功能描述：
 * 创建日期：2023 年 03 月 09 日
 */

// 使用严格模式
'use strict';
import Vuex from "vuex";
import Vue from "vue";

const state = {
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
        number: 0,
        groupId: -1,
        // 允许删除, 修改名称?
        allowOperate: false,
    }, {
        groupName: "特别关注",
        number: 0,
        groupId: -2,
        allowOperate: false,
    }, {
        groupName: "默认关注",
        number: 0,
        groupId: -3,
        allowOperate: false,
    }, {
        groupId: 1,
        groupName: "我好喜欢",
        number: 0,
        allowOperate: true,
    }],
    // 粉丝分组
    fanGroup: [{
        to: "fanBoard",
        groupName: "全部粉丝",
        number: 0,
    }],
    // 已经被删除的用户
    deletedFollow: [],
    deletedFan: [],
    // 关注及粉丝数据
    followFan: {
        me: true,
        follow: [{
            canvases: "我是新来的小伙伴，请多多关照！",
            nickname: "我乃国服第一干将",
            friend: true,
            uid: "1",
            userAvatar: "https://img0.baidu.com/it/u=981218435,2998857702&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1677690000&t=d8a591b46edf38a8a1d31e5193e384a9",
        }, {
            canvases: "我是新来的小伙伴，请多多关照！",
            nickname: "我乃国服第一干将",
            friend: false,
            uid: "2",
            userAvatar: "https://img0.baidu.com/it/u=981218435,2998857702&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1677690000&t=d8a591b46edf38a8a1d31e5193e384a9",
        }, {
            canvases: "我是新来的小伙伴，请多多关照！",
            nickname: "我乃国服第一干将",
            friend: true,
            uid: "3",
            userAvatar: "https://img0.baidu.com/it/u=981218435,2998857702&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1677690000&t=d8a591b46edf38a8a1d31e5193e384a9",
        }],
        fan: [{
            canvases: "我是新来的小伙伴，请多多关照！",
            nickname: "我乃国服第一干将",
            friend: true,
            uid: "1",
            userAvatar: "https://img0.baidu.com/it/u=981218435,2998857702&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1677690000&t=d8a591b46edf38a8a1d31e5193e384a9",
        }, {
            canvases: "我是新来的小伙伴，请多多关照！",
            nickname: "我乃国服第一干将",
            friend: true,
            uid: "3",
            userAvatar: "https://img0.baidu.com/it/u=981218435,2998857702&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1677690000&t=d8a591b46edf38a8a1d31e5193e384a9",
        }, {
            canvases: "我是新来的小伙伴，请多多关照！",
            nickname: "我乃国服第一干将",
            friend: false,
            uid: "29",
            userAvatar: "https://img0.baidu.com/it/u=981218435,2998857702&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1677690000&t=d8a591b46edf38a8a1d31e5193e384a9",
        }]
    }
};
const actions = {
    // 判断关注和粉丝是否为同一用户, 相同用户为互粉
    searchSameUser(context) {
        let follows = context.state.followFan.follow;
        let fans = context.state.followFan.fan;
        follows.forEach(function (fol) {
            fans.forEach(function (fan) {
                if (fol.uid === fan.uid) {
                    context.commit("modifyRelationToFriend", {fol, fan});
                }
            });
        });
    },
    // 刷新用户关注数量
    flushUserFollow(context, {increment, followUid}) {
        if (Math.abs(increment) === 1) {
            // 根据 uid 获取 index
            let followIndex;
            state.followFan.follow.forEach((item, index) => {
                if (item.uid === followUid) {
                    followIndex = index;
                }
            });
            let uid = state.followFan.follow[followIndex].uid;
            // 取关用户, 如果在粉丝中找得到该用户, 说明之前是互粉
            if (increment === -1) {
                if (state.followGroup[0].number === 0) {
                    // return;
                }
                if (typeof followIndex === "number") {
                    state.followFan.fan.forEach((item) => {
                        if (item.uid === uid) {
                            item.friend = false;
                        }
                    });
                    // 添加到已经被删除的用户当中
                    state.deletedFollow.push(state.followFan.follow[followIndex]);
                    // 调用原生的 splice 方法, 因为这不需要响应式
                    Array().splice.call(state.followFan.follow, followIndex, 1);
                }
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
                state.followFan.follow.unshift(item);
                state.deletedFollow.splice(targetIndex, 1);
            }
            context.commit("flushUserFollow", increment);
        }
    },
    // 刷新用户粉丝数量
    flushUserFan(context, increment) {
        if (Math.abs(increment) === 1) {
            context.commit("flushUserFan", increment);
        }
    },
    // 删除关注分组
    deleteFollowGroup(context, {deleteIndex, succeedCallback, failCallback}) {
        context.dispatch("checkFollowGroupOperation", deleteIndex).then(res => {
            if(res) {
                context.commit("deleteFollowGroup", deleteIndex);
                succeedCallback && succeedCallback();
            } else {
                failCallback && failCallback();
            }
        });
    },
    // 修改组名
    modifyGroupName(context, {modifyIndex, groupName, succeedCallback, failCallback}) {
        context.dispatch("checkFollowGroupOperation", modifyIndex).then(res => {
           if(res) {
               context.commit("modifyGroupName", {modifyIndex, groupName});
               succeedCallback && succeedCallback();
           } else {
               failCallback && failCallback();
           }
        });
    },
    // 检测操作关注分组是否合理
    checkFollowGroupOperation(context, index) {
        // 索引范围正确
        if(0 <= index && index < context.state.followGroup.length) {
            // 允许操作
            if(context.state.followGroup[index].allowOperate) {
                return true;
            }
        }
        return false;
    },
    // 根据索引删除粉丝
    deleteFan(context, {index}) {
        let fan = context.state.followFan.fan;
        if(0 <= index && index <= fan.length) {
            context.commit("deleteFan", {index});
        }
    },
};
const mutations = {
    // 初始化 user
    initialUser(state, {user}) {
        state.user = user;
    },
    // 删除粉丝
    deleteFan(state, {index}) {
        state.followFan.fan.splice(index, 1);
    },
    // 修改组名
    modifyGroupName(state, {modifyIndex, groupName}) {
        state.followGroup[modifyIndex].groupName = groupName;
    },
    // 添加新的关注分组
    addNewFollowGroup(state, groupName) {
        state.followGroup.push({
            number: 0,
            groupName,
            to: "asas",
        });
    },
    // 删除关注分组
    deleteFollowGroup(state, deleteIndex) {
        // 删除
        state.followGroup.splice(deleteIndex, 1);
    },
    // 修改关系
    modifyRelationToFriend(state, data) {
        data.fol.friend = true;
        data.fan.friend = true;
    },
    // 设置用户账号信息
    setUserAccountInfer(state, data) {
        state.user = data;
        state.isLogin = state.user.isLogin;
    },
    // 设置用户关注信息
    setUserFollowInfer(state, followFan) {
        state.followFan = followFan;
        state.followGroup[0].number = state.followFan.follow.length;
        state.fanGroup[0].number = state.followFan.fan.length;
    },
    // 刷新用户关注数量
    flushUserFollow(state, increment) {
        state.followGroup[0].number += increment;
    },
    // 刷新用户粉丝数量
    flushUserFan(state, increment) {
        state.fanGroup[0].number += increment;
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
        return state.followFan.me ? '我' : state.user.sex === '2' ? '她' : '他';
    }
};

Vue.use(Vuex);

export default new Vuex.Store({
    getters,
    state,
    actions,
    mutations,
})