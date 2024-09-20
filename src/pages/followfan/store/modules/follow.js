
const state = {
  me: false,
  viewedUid: null,
  // 用户信息
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
};

const mutations = {
  // 初始化 user
  initialUser(state, {user}) {
    state.user = user;
  },
  initialViewedUid(state, {viewedUid}) {
    state.viewedUid = viewedUid;
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
  identity(state) {
    if (state.me) {
      return "我";
    }

    const sexMapping = {
      0: '他',
      1: '他',
      2: '她',
    };

    return sexMapping[state.user?.sex];
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
