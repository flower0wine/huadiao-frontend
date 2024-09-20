<template>
  <div class="huadiao-follow-board">
    <div class="follow-fan-board-header">
      <div class="active-group-name">{{ groupName }}</div>
      <div class="patch-board" v-if="me">
        <transition name="right-slide" mode="out-in">
          <div class="patch-enter"
               v-if="!visible.patch"
               @click="clickPatch"
               key="patchEnter"
          >
            <span v-html="icons.patch"></span>
            <span>批量处理</span>
          </div>
          <div class="group-tools"
               v-if="visible.patch"
               key="groupTools"
          >
            <div class="selected-count">已选择 {{ selectFollowArray.length }} 个关注</div>
            <div class="copy-tool tool" @click="copyFollowToOtherGroup">
              <span v-html="icons.copyTo"></span>
              <span>复制到</span>
            </div>
            <div class="move-tool tool" v-if="visible.patchMove" @click="moveFollowToOtherGroup">
              <span v-html="icons.moveTo"></span>
              <span>移动到</span>
            </div>
            <div class="cancel tool" @click="visible.patch = false">取消</div>
          </div>
        </transition>
      </div>
    </div>
    <huadiao-follow-fan-item v-for="(item, index) in follow"
                             :key="item.uid"
                             :item="item"
                             :index="index"
                             @addFollow="addFollowToSelectArray"
                             @removeFollow="removeFollowToSelectArray"
                             :patch="visible.patch"
                             :groupId="groupId"
                             type="follow"
    >
      <template v-slot:relation="props">
        <div :class="props.className"
             @click="props.changeFollowStatus(item.uid)"
        >{{ props.follow ? item.friend ? "已互粉" : "已关注" : "关注" }}
        </div>
      </template>
      <template v-slot:toolMenu>
        <div @click="changeFollowGroup(index)">设置分组</div>
      </template>
    </huadiao-follow-fan-item>
  </div>
</template>

<script>
import HuadiaoFollowFanItem from "@/pages/followfan/components/HuadiaoFollowFanItem";
import {responseHandler} from "@/assets/js/constants/status-code";
import {svg} from "@/assets/js/constants/svgs";
import {requestPager} from "@/util/request";
import {copyFollow, getFollow, moveFollow} from "@/pages/followfan/apis";
import {flatPromise} from "@/util";
import {mapState} from "vuex";
import {huadiaoMiddleTip} from "@/eventbus";
import {deleteNumberFromArray, insertOrderArray} from "@/util/algorithm";

export default {
  name: "HuadiaoFollowBoard",
  data() {
    return {
      visible: {
        patch: false,
        patchMove: false,
      },
      follow: [],
      // 批处理已选择的, 内容为索引
      selectFollowArray: [],
      // 改变了关注状态的关注索引
      followArray: [],
    }
  },
  computed: {
    ...mapState("follow", ["followGroup", "me"]),

    icons() {
      return {
        patch: svg.patch,
        copyTo: svg.copyTo,
        moveTo: svg.moveTo,
      };
    },

    viewedUid() {
      return parseInt(this.$route.params.viewedUid);
    },

    groupName() {
      let followGroup = this.followGroup;
      for (let i = 0; i < followGroup.length; i++) {
        if (followGroup[i].groupId === this.groupId) {
          return followGroup[i].groupName;
        }
      }
      return "";
    },

    groupId() {
      return parseInt(this.$route.params.groupId);
    },

    pager() {
      return requestPager(getFollow);
    },
  },
  watch: {
    followGroup() {
      this.visible.render = true;
    },

    groupId: {
      immediate: true,
      deep: true,
      handler() {
        this.follow = [];
        this.pager.reset();

        this.resetPatch();
        this.getFollowInfo();

        this.visible.patchMove = this.groupId !== -1;

        if (this.followArray.length > 0) {
          let array = this.followArray;
          for (let index = array.length - 1; index >= 0; index--) {
            this.follow.splice(array[index], 1);
          }
          this.followArray = [];
        }
      }
    }
  },

  created() {
    this.initial();
  },

  methods: {
    initial() {
      this.$bus.$on("changeFollowStatus", (index) => {
        if (this.followArray.includes(index)) {
          deleteNumberFromArray(this.followArray, index);
        } else {
          insertOrderArray(this.followArray, index);
        }
      });
    },

    // 打开批处理面板
    clickPatch() {
      this.visible.patch = true;
    },

    addFollowToSelectArray(index) {
      insertOrderArray(this.selectFollowArray, index);
    },

    removeFollowToSelectArray(index) {
      deleteNumberFromArray(this.selectFollowArray, index);
    },

    // 重置批处理
    resetPatch() {
      this.visible.patch = false;
      this.selectFollowArray = [];
    },

    // 获取关注信息
    async getFollowInfo() {
      const promiseRes = this.pager.fetch({
        uid: this.viewedUid,
        groupId: this.groupId,
      });

      const [err, res] = await flatPromise(promiseRes);

      if (err) {
        console.error(err);
        return;
      }

      responseHandler(res)
        .succeed(({data}) => {
          this.follow.push(...data.follow);

          if (this.pager.getSize() > data.follow.length) {
            this.pager.setHasNext(false);
          }
        });
    },
    checkSelectFollowArray() {
      if (this.selectFollowArray.length === 0) {
        huadiaoMiddleTip("未选择任何关注");
        return false;
      }
      return true;
    },

    // 复制
    copyFollowToOtherGroup() {
      if (!this.checkSelectFollowArray()) {
        return;
      }
      this.$bus.$emit("copyFollow", {
        copy: true,
        groupId: this.groupId,
        confirmCallback: this.requestCopyFollow,
        selectFollowArray: this.selectFollowArray,
      });
    },

    // 移动
    moveFollowToOtherGroup() {
      if (!this.checkSelectFollowArray()) {
        return;
      }
      this.$bus.$emit("moveFollow", {
        copy: false,
        groupId: this.groupId,
        confirmCallback: this.requestMoveFollow,
        selectFollowArray: this.selectFollowArray,
      });
    },

    getFollowGroup() {
      this.$bus.$emit("flushFollowFanGroup");
    },

    getSelectFollowerUid() {
      let uidArray = [];
      this.selectFollowArray.forEach((item) => {
        uidArray.push(this.follow[item].uid);
      });
      return uidArray;
    },

    async requestCopyFollow(groupId) {
      const [err, res] = await flatPromise(copyFollow({
        uidList: this.getSelectFollowerUid(),
        srcGroupId: this.groupId,
        destGroupId: groupId,
      }));

      if (err) {
        console.error(err);
        return;
      }

      responseHandler(res)
        .succeed(() => {
          this.getFollowGroup();
          this.selectFollowArray = [];
          this.visible.patch = false;
        });
    },

    async requestMoveFollow(groupId) {
      const [err, res] = await flatPromise(moveFollow({
        uidList: this.getSelectFollowerUid(),
        srcGroupId: this.groupId,
        destGroupId: groupId,
      }));

      if (err) {
        console.error(err);
        return;
      }

      responseHandler(res)
        .succeed(() => {
          this.getFollowGroup();
          this.removeFollow();
          this.visible.patch = false;
          this.selectFollowArray = [];
        });
    },

    removeFollow() {
      let array = this.selectFollowArray;
      for (let index = array.length - 1; index >= 0; index--) {
        this.follow.splice(array[index], 1);
      }
    },

    // 单独设置关注分组
    changeFollowGroup(index) {
      this.selectFollowArray = [];
      this.selectFollowArray.push(index);

      this.$bus.$emit("moveFollow", {
        copy: false,
        groupId: this.groupId,
        selectFollowArray: this.selectFollowArray,
        confirmCallback: this.requestMoveFollow,
      });
    },
  },

  components: {
    HuadiaoFollowFanItem
  },
}
</script>

<style scoped>
.patch-board {
  overflow: hidden;
}

.group-tools {
  display: flex;
  align-items: center;
  height: 100%;
  transition: all 300ms;
}

.selected-count {
  font-size: 14px;
  color: #7e7e7e;
  margin-right: 10px;
}

.tool,
.patch-enter {
  width: 110px;
  height: 36px;
  text-align: center;
  line-height: 36px;
  margin-right: 10px;
  border-radius: 6px;
  font-size: 14px;
  color: #7e7e7e;
  cursor: pointer;
  transition: all 300ms;
}

.tool:hover,
.patch-enter:hover {
  color: #c44141;
  background-color: rgba(148, 147, 147, 0.2);
}

.tool:hover /deep/ svg,
.patch-enter:hover /deep/ svg {
  fill: #c44141;
}

.tool /deep/ svg,
.patch-enter /deep/ svg {
  width: 20px;
  height: 20px;
  margin-right: 10px;
  vertical-align: -6px;
  fill: #7e7e7e;
}

.cancel {
  width: 70px;
}

</style>
