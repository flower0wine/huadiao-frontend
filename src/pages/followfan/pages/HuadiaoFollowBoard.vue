<template>
  <div class="huadiao-follow-board">
    <div class="follow-fan-board-header">
      <div class="active-group-name">{{ groupName }}</div>
      <div class="patch-board">
        <transition name="right-slide" mode="out-in">
          <div class="patch-enter"
               v-if="!visible.patch"
               @click="clickPatch"
               key="patchEnter"
          >
            <span v-html="svg.patch"></span>
            <span>批量处理</span>
          </div>
          <div class="group-tools"
               v-if="visible.patch"
               key="groupTools"
          >
            <div class="selected-count">已选择 {{ selectFollowArray.length }} 个关注</div>
            <div class="copy-tool tool" @click="copyFollowToOtherGroup">
              <span v-html="svg.copyTo"></span>
              <span>复制到</span>
            </div>
            <div class="move-tool tool" v-if="visible.patchMove" @click="moveFollowToOtherGroup">
              <span v-html="svg.moveTo"></span>
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
                             :addFollow="addFollowToSelectArray"
                             :removeFollow="removeFollowToSelectArray"
                             :patch="visible.patch"
                             :groupId="groupId"
                             :mapKey="getMapKey(viewedUid, groupId)"
                             type="follow"
    >
      <template v-slot:relation="props">
        <div :class="props.className"
             @click="props.changeFollowStatus(item.uid)"
        >{{ props.follow ? item.friend ? "已互粉" : "已关注" : "关注" }}
        </div>
      </template>
      <template v-slot:toolMenu>
        <div>设置分组</div>
      </template>
    </huadiao-follow-fan-item>
  </div>
</template>

<script>
import HuadiaoFollowFanItem from "@/pages/followfan/components/HuadiaoFollowFanItem";
import {statusCode} from "@/assets/js/constants/status-code";
import {apis} from "@/assets/js/constants/request-path";
import {svg} from "@/assets/js/constants/svgs";

export default {
  name: "HuadiaoFollowBoard",
  data() {
    return {
      svg,
      visible: {
        patch: false,
        patchMove: false,
      },
      // 获取信息中, 节流 (主要是)
      accessing: false,
      groupId: null,
      follow: [],
      // 批处理已选择的, 内容为索引
      selectFollowArray: [],
      // 改变了关注状态的关注索引
      followArray: [],
      offset: 0,
      row: 10,
      hasNext: true,
    }
  },
  computed: {
    viewedUid() {
      return this.$route.params.viewedUid;
    },
    groupName() {
      let followGroup = this.$store.state.followGroup;
      for (let i = 0; i < followGroup.length; i++) {
        if (followGroup[i].groupId === this.groupId) {
          return followGroup[i].groupName;
        }
      }
      return "";
    }
  },
  watch: {
    "$store.state.followGroup": {
      deep: true,
      handler() {
        // 关注分组获取成功后才进行渲染
        this.visible.render = true;
      }
    },
    "$route.params.groupId": {
      immediate: true,
      deep: true,
      handler(newValue) {
        if (!newValue) return;
        this.groupId = +newValue;
        this.resetFollow();
        this.resetPatch();
        this.getFollowInfo(true);

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
          this.deleteNumberFromArray(this.followArray, index);
        } else {
          this.insertOrderArray(this.followArray, index);
        }
      });
    },
    setFollow() {
      this.follow = this.$store.state.follow.get(this.getMapKey(this.viewedUid, this.groupId))?.follow;
    },
    // 打开批处理面板
    clickPatch() {
      this.visible.patch = true;
    },
    addFollowToSelectArray(index) {
      this.insertOrderArray(this.selectFollowArray, index);
    },
    removeFollowToSelectArray(index) {
      this.deleteNumberFromArray(this.selectFollowArray, index);
    },
    // 重置关注
    resetFollow() {
      this.follow = [];
      this.offset = 0;
      this.hasNext = true;
    },
    // 重置批处理
    resetPatch() {
      this.visible.patch = false;
      this.selectFollowArray = [];
    },
    // 获取关注信息
    getFollowInfo(changeGroup = false) {
      return new Promise((resolve, reject) => {
        // 是否正在访问
        if (this.accessing || !this.hasNext) {
          resolve();
          return;
        }
        // 正在访问
        this.accessing = true;
        if (changeGroup) {
          this.offset = 0;
          this.follow = [];
        }

        this.sendRequest({
          path: apis.followFan.followGet,
          params: {
            uid: this.viewedUid,
            groupId: this.groupId,
            offset: this.offset,
            row: this.row,
          },
          thenCallback: (response) => {
            let res = response.data;
            console.log(res);
            if (res.code === statusCode.succeed) {
              this.follow.push(...res.data.follow);
              this.offset += res.data.offset;
              resolve();
            } else if (res.code === statusCode.notExist) {
              this.hasNext = false;
              resolve();
            }
            this.accessing = false;
          },
          errorCallback: (error) => {
            console.log(error);
            this.accessing = false;
            reject();
          }
        });
      });
    },
    checkSelectFollowArray() {
      if (this.selectFollowArray.length === 0) {
        this.huadiaoMiddleTip("未选择任何关注");
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
    // 请求复制
    requestCopyFollow(groupId) {
      this.sendRequest({
        path: apis.followFan.followCopy,
        method: "post",
        params: {
          uid: this.getSelectFollowerUid().join(","),
          srcGroupId: this.groupId,
          destGroupId: groupId,
        },
        thenCallback: (response) => {
          let res = response.data;
          console.log(res);
          if (res.code === statusCode.succeed) {
            this.getFollowGroup();
            this.selectFollowArray = [];
            this.visible.patch = false;
          }
        }
      });
    },
    // 请求移动
    requestMoveFollow(groupId) {
      this.sendRequest({
        path: apis.followFan.followMove,
        method: "post",
        params: {
          uid: this.getSelectFollowerUid().join(","),
          srcGroupId: this.groupId,
          destGroupId: groupId,
        },
        thenCallback: (response) => {
          let res = response.data;
          console.log(res);
          if (res.code === statusCode.succeed) {
            this.getFollowGroup();
            this.removeFollow().then(() => {
              this.visible.patch = false;
              this.selectFollowArray = [];
            });
          }
        }
      });
    },
    removeFollow() {
      return new Promise((resolve) => {
        let array = this.selectFollowArray;
        for (let index = array.length - 1; index >= 0; index--) {
          this.follow.splice(array[index], 1);
        }
        resolve();
      });
    }
  },
  beforeDestroy() {
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