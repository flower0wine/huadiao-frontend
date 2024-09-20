<template>
  <div class="huadiao-follow-fan-board">
    <div class="follow-fan-group">
      <div class="follow-group">
        <div class="group-header">
          <span>{{ identity }}的关注</span>
          <span v-html="svg.add"
                title="新建分组"
                v-if="me"
                @click="openAddNewGroupBoard"
                ref="addNewGroup"></span>
        </div>
        <router-link :to="followLink(viewedUid, item.groupId)"
                     v-for="(item, index) in followGroup"
                     class="group-link"
                     :class="me && item.allowOperate ? 'group-link-hover' : ''"
                     active-class="group-link-active"
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
            <span v-html="svg.more" title="更多操作"></span>
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
        <router-link :to="`/followfan/${viewedUid}/fan`"
                     v-for="(item, index) in fanGroup"
                     class="group-link"
                     :title="item.groupName"
                     active-class="group-link-active"
                     :key="index"
                     tag="div">
          <span class="group-name">{{ item.groupName }}</span>
          <span class="group-number">{{ item.count }}</span>
        </router-link>
      </div>
    </div>
    <div class="follow-fan-exhibit">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";
import {responseHandler} from "@/assets/js/constants/status-code";
import {svg} from "@/assets/js/constants/svgs";
import {flatPromise} from "@/util";
import {deleteFollowGroup, getFollowGroup, getRelationCount} from "@/pages/followfan/apis";
import {followLink} from "@/util/huadiao-tool";
import {huadiaoMiddleTip, huadiaoPopupWindow} from "@/eventbus";

export default {
  name: "HuadiaoFollowFanBoard",

  data() {
    return {
      svg: {
        add: svg.circleAdd,
        more: svg.more,
      },
      visible: {
        followFanBoard: false,
        groupMore: [],
      },
      loadingCircleStyle: {
        circleColor: "#a6a6a6",
      },
      followFanArray: [],
    }
  },

  computed: {
    ...mapState(["user"]),
    ...mapState("follow", ["followGroup", "fanGroup"]),

    ...mapGetters("follow", ["identity"]),

    viewedUid() {
      return parseInt(this.$route.params.viewedUid);
    },

    me() {
      return this.user.uid === this.viewedUid;
    },
  },

  watch: {
    user() {
      this.initial();
    },
  },

  methods: {
    followLink,

    ...mapMutations("follow", [
      "initialMe",
      "initialViewedUid",
      "initialFollowGroup",
      "initialFollowFanCount",
      "deleteFollowGroup",
    ]),

    ...mapActions("follow", ["deleteFollowGroup"]),

    // 初始化
    initial() {
      this.$bus.$on("getFollowGroup", this.getUserFollowGroup);
      this.$bus.$on("flushFollowFanGroup", this.getCurrentUserFollowFanInfo);

      this.initialMe({me: this.me});
      this.initialViewedUid({viewedUid: this.viewedUid});

      this.getCurrentUserFollowFanInfo();
    },

    setGroupMore() {
      let array = new Array(this.followGroup.length);
      this.visible.groupMore = array.fill(false);
    },

    // 获取当前用户的关注与粉丝信息
    getCurrentUserFollowFanInfo() {
      this.getFollowFanCount();

      if (this.me) {
        this.getUserFollowGroup();
      }
    },

    // 获取用户关注分组
    async getUserFollowGroup() {
      const [err, res] = await flatPromise(getFollowGroup());

      if (err) {
        console.error(err);
        return;
      }

      responseHandler(res)
        .succeed((res) => {
          this.initialFollowGroup({followGroup: res.data});
          this.setGroupMore();
        });
    },

    // 获取用户关注和粉丝总数数量
    async getFollowFanCount() {
      const [err, res] = await flatPromise(getRelationCount({uid: this.viewedUid}));

      if (err) {
        console.error(err);
        return;
      }

      responseHandler(res)
        .succeed((res) => {
          this.initialFollowFanCount({stat: res.data});
        });
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
      const count = this.followGroup[deleteIndex].count;
      if (count > 0) {
        huadiaoMiddleTip("该分组下存在关注，无法删除");
        return;
      }

      huadiaoPopupWindow(
          "warning",
          "confirmOrCancel",
          "确认删除吗？删除后该收藏夹下的所有收藏都将删除!",
          () => {
            this.requestDeleteGroup(groupId, deleteIndex);
          });
    },

    // 请求删除
    async requestDeleteGroup(groupId, deleteIndex) {
      const [err, res] = await flatPromise(deleteFollowGroup({groupId}));

      if (err) {
        console.error(err);
        return;
      }

      responseHandler(res)
        .succeed(() => {
          this.deleteFollowGroup({
            deleteIndex,
          });
          this.getCurrentUserFollowFanInfo();
          this.$router.replace(followLink(this.viewedUid, -1));
        });
    },
  },
}
</script>

<style scoped>
.huadiao-follow-fan-board {
  display: flex;
  position: relative;
  z-index: 1;
  width: 100%;
  min-width: 600px;
  height: 100%;
  min-height: 400px;
  margin: 0 auto;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.747);
}

/* 关注、粉丝组 */
.follow-fan-group {
  width: 240px;
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
  gap: 10%;
  width: 100%;
  height: 50px;
  font-size: 20px;
}

/* 添加分组 */
.group-header /deep/ svg {
  width: 20px;
  height: 20px;
  fill: #646464;
  vertical-align: -3px;
  cursor: pointer;
}

.group-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 40px;
  padding: 0 20px;
  font-size: 18px;
  cursor: pointer;
}

.group-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  -webkit-line-clamp: 1;
  margin-right: 20px;
}

.group-link:hover {
  background-color: rgba(236, 109, 109, 0.31);
}

.group-link-active {
  background-color: rgba(236, 109, 109, 0.31);
}

.group-more /deep/ svg {
  width: 16px;
  height: 16px;
  transform: translateX(3px);
  fill: #747373;
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
.group-number {
  display: block;
}

.group-link-hover:hover .group-number {
  display: none;
}

.group-more {
  display: none;
}

.group-link-hover:hover .group-more {
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
