<template>
  <transition name="fade">
    <div class="transfer-group-mark"
         v-if="visible">
      <div class="transfer-board">
        <div class="transfer-board-header">
          <div class="operation-tip">你正在{{copy ? '复制' : '移动'}}{{selectFollowArray.length}}个关注到</div>
          <div class="selected-group-name">{{selectedGroupName}}</div>
        </div>
        <div class="transfer-body">
          <div class="group-item"
               v-for="(item, index) in followGroup"
               :key="item.groupId"
               :class="classList(item.groupId, index)"
               @click="clickChooseGroup(index)">
            <div class="click-input-box">
              <div class="click-input">
                <div class="click-circle"></div>
              </div>
            </div>
            <div class="group-info">
              <div class="group-name">{{item.groupName}}</div>
            </div>
            <div class="follow-number">{{item.count}}</div>
          </div>
        </div>
        <div class="transfer-foot">
          <div class="confirm-operate"
               @click="confirmOperation"
               :class="Number.isSafeInteger(this.destGroupId) && 'select-group'">确认</div>
        </div>
        <div class="close-icon" v-html="svg.fork" @click="closeTransferFollowGroupBoard"></div>
      </div>
    </div>
  </transition>
</template>

<script>
import {mapState} from "vuex";
import {svg} from "@/assets/js/constants/svgs";

export default {
  name: "TransferFollowGroup",
  data() {
    return {
      svg,
      visible: false,
      copy: false,
      srcGroupId: null,
      destGroupId: null,
      selectedGroupName: "请选择一个关注分组",
      selectedGroupIndex: null,
      selectFollowArray: [],
      confirmCallback: null,
    }
  },
  computed: {
    ...mapState("follow", {
      followGroup(state) {
        return state.followGroup.slice(1);
      },
    }),
  },
  created() {
    this.initial();
  },
  methods: {
    initial() {
      this.$bus.$on("copyFollow", this.resetProperty);
      this.$bus.$on("moveFollow", this.resetProperty);
    },
    reset() {
      this.srcGroupId = null;
      this.destGroupId = null;
      this.confirmCallback = null;
      this.selectFollowArray = null;
      this.selectedGroupIndex = null;
      this.selectedGroupName = "请选择一个关注分组";

    },
    openTransferFollowGroupBoard() {
      this.visible = true;
    },
    closeTransferFollowGroupBoard() {
      this.visible = false;
      this.reset();
    },
    confirmOperation() {
      if(this.destGroupId && this.srcGroupId !== this.destGroupId) {
        this.confirmCallback && this.confirmCallback(this.destGroupId);
        this.closeTransferFollowGroupBoard();
      }
    },
    resetProperty({copy = true, groupId, confirmCallback, selectFollowArray}) {
      this.copy = copy;
      this.srcGroupId = groupId;
      this.confirmCallback = confirmCallback;
      this.selectFollowArray = selectFollowArray;
      this.openTransferFollowGroupBoard();
    },
    classList(groupId, index) {
      let classList = [];
      classList.push(this.srcGroupId === groupId ? 'disable' : '');
      classList.push(this.selectedGroupIndex === index ? 'click-group-item' : '');
      return classList;
    },
    clickChooseGroup(index) {
      if(this.srcGroupId === this.followGroup[index].groupId) return;
      this.selectedGroupIndex = index;
      this.destGroupId = this.followGroup[index].groupId;
      this.selectedGroupName = this.followGroup[index].groupName;
    },
  },
  beforeDestroy() {
  }
}
</script>

<style scoped>
.transfer-group-mark {
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 99;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 500ms;
}

.transfer-board {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 350px;
  height: 400px;
  border-radius: 6px;
  background-color: #fff;
}

.close-icon {
  position: absolute;
  top: 20px;
  right: 14px;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 6px;
  transition: all 300ms;
}

.close-icon:hover {
  background-color: #e8e8e8;
}

.close-icon /deep/ svg {
  width: 18px;
  height: 18px;
  fill: #a9a9a9;
  vertical-align: -8px;
}

.transfer-board-header {
  height: 80px;
  text-align: center;
  padding: 20px;
  border-bottom: 1px solid #d2d2d2;
}

.operation-tip {
  font-weight: 700;
}

.group-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  padding: 0 20px;
  color: #4b4b4b;
  cursor: pointer;
}

.group-item:hover {
  background-color: #f6f6f6;
}

.click-input-box {
  flex: 1;
}

.click-input {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
  border: 1px solid #4b4b4b;
  border-radius: 50%;
}

.click-group-item .click-input {
  border: 1px solid #e73434;
}

.click-group-item .click-circle {
  display: block;
}

.click-circle {
  display: none;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #e73434;
}

.group-info {
  flex: 5;
}

.follow-number {
  flex: 1;
  text-align: center;
}

.disable {
  color: #cccccc;
  cursor: not-allowed;
}

.disable .click-input {
  border: 1px solid #cccccc;
}

.transfer-body {
  height: 240px;
}

.transfer-foot {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  border-top: 1px solid #d2d2d2;
}

.confirm-operate {
  width: 120px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  border-radius: 6px;
  color: #898989;
  background-color: #cdcdcd;
  cursor: not-allowed;
}

.select-group {
  color: #fff;
  background-color: #e03d3d;
  cursor: pointer;
}

.select-group:hover {
  background-color: #d33a3a;
}

.selected-group-name {
  margin-top: 10px;
  font-size: 12px;
}
</style>
