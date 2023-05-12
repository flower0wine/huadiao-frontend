<template>
  <div class="huadiao-follow-fan-board">
    <div class="follow-fan-group">
      <div class="follow-group">
        <div class="group-header">
          <span>{{ $store.getters.call }}的关注</span>
          <img src="/svg/add.svg"
               title="新建分组"
               v-if="me"
               @click="openAddNewGroupBoard"
               ref="addNewGroup"
               alt>
        </div>
        <router-link :to="{
          path: `/followfan/follow/${item.groupId}`,
        }"
                     v-for="(item, index) in followGroup"
                     class="group-link"
                     active-class="group-link-active"
                     @mouseenter.native="me && item.allowOperate ? $refs.navigator[index].$el.classList.add('group-link-hover') : ''"
                     @mouseleave.native="me && item.allowOperate ? $refs.navigator[index].$el.classList.remove('group-link-hover') : ''"
                     ref="navigator"
                     :title="item.groupName"
                     :key="item.groupId"
                     tag="div"
        >
          <span class="group-name">{{ item.groupName }}</span>
          <span class="group-number">{{ item.count }}</span>
          <span class="group-more"
                v-if="item.allowOperate && me"
                @mouseenter="visible.groupMore.splice(index, 1, true)"
                @mouseleave="visible.groupMore.splice(index, 1, false)"
                @click="visible.groupMore.splice(index, 1, false)"
                ref="GroupMore"
          >
            <img src="/svg/more.svg" title="更多操作" alt="">
            <transition name="fade">
              <div class="group-more-board"
                   title=""
                   v-show="visible.groupMore[index]">
                <div @click="modifyGroupName(index, item.groupName, item.groupId)">修改组名</div>
                <div @click="deleteGroup(index, item.groupId)">删除分组</div>
              </div>
            </transition>
          </span>
        </router-link>
      </div>
      <div class="fan-group">
        <div class="group-header">我的粉丝</div>
        <router-link :to="{name: item.to}"
                     v-for="(item, index) in fanGroup"
                     class="group-link"
                     :title="item.groupName"
                     active-class="group-link-active"
                     :key="index">
          <span class="group-name">{{ item.groupName }}</span>
          <span class="group-number">{{ item.count }}</span>
        </router-link>
      </div>
    </div>
    <div class="follow-fan-exhibit">
      <keep-alive>
        <router-view name="followFanExhibit"></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "HuadiaoFollowFanBoard",
  computed: {
    ...mapState(["followGroup", "fanGroup"]),
    me() {
      return this.$store.state.me;
    },
  },
  data() {
    return {
      viewedUid: 1,
      visible: {
        groupMore: [],
      },
      loadingCircleStyle: {
        circleColor: "#a6a6a6",
      }
    }
  },
  created() {
    this.getCurrentUserFollowFanInfo();
  },
  methods: {
    // 获取当前用户的关注与粉丝信息
    getCurrentUserFollowFanInfo() {
      this.getFollowFanCount();
      // 先判断当前用户是否为本人访问
      this.sendRequest({
        path: "share",
        thenCallback: (response) => {
          let res = response.data;
          // 仅当当前用户为本人才获取关注分组
          if (this.viewedUid === res.uid) {
            this.getUserFollowGroup();
          }
        },
        errorCallback: (error) => {
          console.log(error);
        }
      });
    },
    // 获取用户关注分组
    getUserFollowGroup() {
      this.sendRequest({
        path: "relation/follow/group",
        thenCallback: (response) => {
          let res = response.data;
          this.$store.commit("initialFollowGroup", {followGroup: res});
          this.initial();
        },
        errorCallback: (error) => {
          console.log(error);
        }
      });
    },
    // 获取用户关注和粉丝统计信息
    getFollowFanCount() {
      this.sendRequest({
        path: "relation/stat",
        params: {
          viewedUid: this.viewedUid,
        },
        thenCallback: (response) => {
          let res = response.data;
          this.$store.commit("initialFollowFanCount", {stat: res});
        },
        errorCallback: (error) => {
          console.log(error);
        }
      })
    },
    // 初始化
    initial() {
      // 全部填充为 false, 与关注分组操作面板显示有关
      let array = new Array(this.followGroup.length);
      this.visible.groupMore = array.fill(false);
    },
    // 打开新建面板
    openAddNewGroupBoard() {
      this.$bus.$emit('openAddNewGroupBoard');
    },
    // 修改组名
    modifyGroupName(modifyIndex, groupName, groupId) {
      this.$bus.$emit("openModifyGroupBoard", modifyIndex, groupName, groupId);
    },
    // 删除分组
    deleteGroup(deleteIndex, groupId) {
      this.sendRequest({
        path: "relation/deleteFollowGroup",
        params: {
          groupId,
        },
        thenCallback: (response) => {
          let res = response.data;
          console.log(res);
          this.huadiaoPopupWindow(
              "warning",
              "confirmOrCancel",
              "确认删除吗？删除后该收藏夹下的所有收藏都将删除!",
              () => {
                this.$store.dispatch("deleteFollowGroup", {
                  deleteIndex,
                  succeedCallback: () => {
                    this.huadiaoMiddleTip("删除成功!");
                  },
                  failCallback: () => {
                    this.huadiaoMiddleTip("分组不存在或不允许删除")
                  },
                });
              });
        },
        errorCallback: (error) => {
          console.log(error);
        }
      })
    },
  },
  beforeDestroy() {
    this.clearAllRefsEvents();
  }
}
</script>

<style scoped>
.huadiao-follow-fan-board {
  display: flex;
  position: relative;
  z-index: 1;
  width: 1200px;
  height: 800px;
  margin: 0 auto;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.747);
}

/* 关注、粉丝组 */
.follow-fan-group {
  width: 20%;
  height: 100%;
  border-right: 1px solid #c1c1c1;
}

.follow-group {
  height: 70%;
}

.fan-group {
  border-top: 1px solid #c1c1c1;
}

.group-header {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  font-size: 20px;
}

/* 添加分组 */
.group-header img {
  width: 20px;
  margin-left: 30px;
  cursor: pointer;
}

.group-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 40px;
  padding: 0 30px 0 30px;
  font-size: 18px;
  cursor: pointer;
}

.group-link:hover {
  background-color: rgba(236, 109, 109, 0.31);
}

.group-link-active {
  background-color: rgba(236, 109, 109, 0.31);
}

.group-more img {
  height: 16px;
  transform: translateX(3px);
}

.group-more {
  position: relative;
  display: none;
  width: 20px;
  height: 30px;
  padding: 4px 0 0 4px;
}

/* 管理分组 */
.group-more-board {
  position: absolute;
  z-index: 2;
  top: 30px;
  right: -51px;
  width: 120px;
  font-size: 14px;
  border-radius: 6px;
  box-shadow: var(--box-shadow-min);
  background-color: #fff;
  transition: var(--transition-500ms);
  overflow: hidden;
}

.group-more-board div {
  padding: 10px;
  text-align: center;
}

.group-more-board div:hover {
  color: #fff;
  background-color: #f68383;
}

.group-more-board div:nth-child(n + 2) {
  border-top: 1px solid #f19c9c;
}

/* 鼠标进入导航 */
.group-link-hover .group-number {
  display: none;
}

.group-link-hover .group-more {
  display: block;
}

/* 内容展示 */
.follow-fan-exhibit {
  width: 80%;
}

/* /deep/ 使得子组件可以引用父类的样式 */
/deep/ .follow-fan-board-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
}

/deep/ .active-group-name {
  margin-left: 20px;
  font-size: 20px;
  font-weight: 700;
}
</style>