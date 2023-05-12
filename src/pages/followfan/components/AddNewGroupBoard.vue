<template>
  <transition name="fade">
    <div class="add-new-group-mark"
         v-if="visible.render"
         v-show="visible.show">
      <div class="add-new-group-board">
        <div class="add-new-group-header">{{ modify ? "修改组名" : "新建分组" }}</div>
        <div class="new-group-name">
          <input type="text"
                 placeholder="请输入组名"
                 v-model="tempGroupName"
                 maxlength="16"
          >
          <div class="group-name-require">{{ groupNameWordNumber }}/16</div>
        </div>
        <div class="confirm-or-cancel">
          <!-- 这里方法的括号不加不起作用 -->
          <div class="confirm-operation" @click="modify ? modifyGroupName() : addNewGroup()">确认</div>
          <div class="cancel-operation" @click="closeBoard">取消</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "AddNewGroupBoard",
  data() {
    return {
      visible: {
        render: false,
        show: false,
      },
      // 修改组名？
      modify: false,
      // 组名, 原本的组名
      groupName: null,
      // 修改后的组名
      tempGroupName: null,
      groupId: null,
      groupNameWordNumber: 0,
      // 待修改组名的索引
      modifyIndex: null,
    }
  },
  watch: {
    tempGroupName: {
      handler(newValue) {
        this.groupNameWordNumber = newValue.length;
      }
    },
  },
  beforeMount() {
    // 打开新建关注分组面板
    this.$bus.$on("openAddNewGroupBoard", () => {
      this.modify = false;
      this.visible.render = true;
      this.visible.show = true;
    });
    // 打开修改已创建关注分组面板
    this.$bus.$on("openModifyGroupBoard", (modifyIndex, groupName, groupId) => {
      this.modifyIndex = modifyIndex;
      this.groupName = this.tempGroupName = groupName;
      this.groupId = groupId;
      this.modify = true;
      this.visible.render = true;
      this.visible.show = true;
    });
  },
  methods: {
    // 修改组名
    modifyGroupName() {
      // 相同的组名不发送请求
      if (this.groupName === this.tempGroupName) {
        this.visible.show = false;
        return;
      }
      this.sendRequest({
        path: "relation/modifyFollowGroupName",
        params: {
          groupName: this.tempGroupName,
          groupId: this.groupId,
        },
        thenCallback: (response) => {
          let res = response.data;
          console.log(res);
          // 发出更改
          this.$store.dispatch("modifyGroupName", {
            modifyIndex: this.modifyIndex,
            groupName: this.tempGroupName,
            succeedCallback: () => {
              this.visible.show = false;
              this.huadiaoMiddleTip("组名修改成功!");
            },
          });
        },
        errorCallback: (error) => {
          console.log(error);
        }
      })
    },
    // 添加新组
    addNewGroup() {
      if (this.groupName.length !== 0 && this.groupName.length <= 16) {
        this.$store.commit("addNewFollowGroup", {groupName: this.groupName});
        // 关闭面板
        this.visible.show = false;
        this.groupName = "";
      } else if (this.groupName.length === 0) {
        this.huadiaoMiddleTip("组名不能为空哦!");
      } else if (this.groupName.length > 16) {
        this.huadiaoMiddleTip("组名长度最大为 16 个字符!");
      }
    },
    // 关闭面板
    closeBoard() {
      this.visible.show = false;
      this.groupName = "";
    }
  },
  beforeDestroy() {
  }
}
</script>

<style scoped>
.add-new-group-mark {
  position: fixed;
  z-index: 99;
  width: 100%;
  height: 100vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.3);
  transition: var(--transition-500ms);
}

.add-new-group-board {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  border-radius: 6px;
  background-color: #eeeded;
  box-shadow: var(--box-shadow-min);
}

.add-new-group-header {
  height: 50px;
  padding-left: 20px;
  line-height: 50px;
  font-size: 20px;
  font-weight: 700;
  border-bottom: 1px solid #fa9e9e;
}

.new-group-name {
  position: relative;
  padding: 30px 40px;
}

.new-group-name input {
  width: 100%;
  height: 34px;
  padding-left: 10px;
  border-radius: 6px;
  border: 1px solid #fa9e9e;
  color: #646262;
  background-color: transparent;
  transition: var(--transition-500ms);
}

.new-group-name input:focus {
  background-color: #f8e1e1;
}

.group-name-require {
  position: absolute;
  top: 37px;
  right: 51px;
  color: #838282;
}

.confirm-or-cancel {
  display: flex;
  justify-content: space-between;
  padding: 30px 70px;
  color: #fff;
}

.confirm-operation,
.cancel-operation {
  width: 80px;
  height: 40px;
  border-radius: 6px;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
}

.confirm-operation {
  background-color: #ec4e4e;
}

.confirm-operation:hover {
  background-color: #dc4a4a;
}

.cancel-operation {
  background-color: #b9b9b9;
}

.cancel-operation:hover {
  background-color: #a6a5a5;
}
</style>