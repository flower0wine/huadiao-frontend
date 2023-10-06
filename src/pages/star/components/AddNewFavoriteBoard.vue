<template>
  <transition name="fade">
    <div class="add-new-favorite-board-container"
         v-if="visible.render"
         v-show="visible.show"
    >
      <div class="add-new-favorite-board">
        <div class="new-favorite-board-header">
          <div>{{modify ? '修改' : '新建'}}收藏夹</div>
          <div class="close-add-favorite-board-btn">
            <img src="/svg/starClose.svg"
                 @click="closeBoard"
                 ref="closeFavoriteBoardBtn"
                 alt="">
          </div>
        </div>
        <div class="favorite-name">
          <div>收藏夹名称</div>
          <input type="text" id="favorite-name"
                 v-model="groupName"
                 placeholder="收藏夹名称"
                 autocomplete="off"
                 maxlength="16"
          >
          <div class="favorite-name-word-number">{{ wordNumber.groupName }}/16</div>
        </div>
        <div class="favorite-canvases">
          <div>简介</div>
          <textarea id="favorite-canvases"
                    v-model="groupDescription"
                    placeholder="可以对你的收藏夹说明一下"
                    maxlength="100"
          ></textarea>
          <div class="favorite-canvases-word-number">{{ wordNumber.groupDescription }}/100</div>
        </div>
        <label class="public-favorite" for="public-favorite">
          <input type="checkbox" id="public-favorite" ref="publicFavorite" :checked="open">
          <span>公开收藏夹</span>
        </label>
        <modify-button v-if="modify"
                       :group-name="groupName"
                       :group-id="groupId"
                       :group-description="groupDescription"
                       :modify-index="modifyIndex"
                       :viewedUid="viewedUid"
                       :access="checkFavoriteInfer"></modify-button>
        <new-button v-else
                    :group-name="groupName"
                    :group-description="groupDescription"
                    :open="open"
                    :viewedUid="viewedUid"
                    :access="checkFavoriteInfer"></new-button>
      </div>
    </div>
  </transition>
</template>

<script>
import ModifyButton from "@/pages/star/components/ModifyBotton";
import NewButton from "@/pages/star/components/NewButton";

export default {
  name: "AddNewFavoriteBoard",
  components: {NewButton, ModifyButton},
  data() {
    return {
      modify: false,
      visible: {
        render: false,
        show: false,
      },
      modifyIndex: null,
      groupName: "",
      groupDescription: "",
      groupId: null,
      open: true,
      viewedUid: null,
      wordNumber: {
        groupName: 0,
        groupDescription: 0,
      }
    }
  },
  watch: {
    groupName: {
      handler(newValue) {
        this.wordNumber.groupName = newValue.length;
      },
    },
    groupDescription: {
      handler(newValue) {
        this.wordNumber.groupDescription = newValue?.length ?? 0;
      },
    }
  },
  beforeMount() {
    this.$bus.$on("addGroup", (viewedUid) => {
      this.flushBoard();
      this.viewedUid = viewedUid;
      this.visible.show = this.visible.render = true;
    });
    this.$bus.$on("modifyGroup", (groupName, groupDescription, groupId, isPublic, modifyIndex) => {
      this.modify = true;
      this.groupName = groupName;
      this.groupDescription = groupDescription;
      this.groupId = groupId;
      this.open = isPublic;
      this.modifyIndex = modifyIndex;
      this.visible.render = this.visible.show = true;
    });
    this.$bus.$on("closeBoard", () => {
      this.visible.show = false;
      this.flushBoard();
    });
  },
  methods: {
    closeBoard() {
      this.visible.show = false;
      this.flushBoard();
    },
    // 刷新面板
    flushBoard() {
      this.groupName = "";
      this.groupDescription = "";
      this.groupId = null;
      this.open = true;
    },
    // 检查收藏夹名称, 简介是否合理
    checkFavoriteInfer() {
      this.groupName = this.groupName ?? "";
      this.groupDescription = this.groupDescription ?? "";
      if (0 < this.groupName.length && this.groupName.length <= 16 && this.groupDescription.length <= 50) {
        return true;
      } else if (this.groupName.length === 0) {
        this.huadiaoMiddleTip("收藏夹名称不能为空!");
      } else if (this.groupDescription.length > 16) {
        this.huadiaoMiddleTip("收藏夹名称长度最大为 16 个字符!");
      } else if (this.groupDescription.length > 50) {
        this.huadiaoMiddleTip("收藏夹简介长度最大为 50 个字符!");
      }
      return false;
    },
  },
}
</script>

<style scoped>
.add-new-favorite-board-container {
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 10;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.18);
  backdrop-filter: blur(2px);
  transition: var(--transition-500ms);
}

.add-new-favorite-board {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  height: 450px;
  padding: 0 40px;
  transform: translate(-50%, -50%);
  border-radius: 8px;
  color: #797878;
  font-size: 18px;
  box-shadow: var(--box-shadow-min);
  background-color: #fff;
}

.new-favorite-board-header {
  text-align: center;
  font-size: 23px;
  padding: 10px 0 20px 0;
}

.new-favorite-board-header img {
  width: 18px;
  vertical-align: -1px;
}

.close-add-favorite-board-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 30px;
  height: 30px;
  border-radius: 4px;
  transition: var(--transition-500ms);
}

.close-add-favorite-board-btn:hover {
  background-color: #e5e3e3;
}

.favorite-name,
.favorite-canvases {
  position: relative;
}

#favorite-name,
#favorite-canvases {
  width: 100%;
  height: 36px;
  border-radius: 6px;
  margin-top: 6px;
  color: #797878;
  background-color: #e7e7e7;
}

#favorite-name {
  height: 36px;
  padding: 0 10px;
}

#favorite-name:focus,
#favorite-canvases:focus {
  color: #818080;
  background-color: #e9e6f6;
}

#favorite-canvases {
  padding: 10px;
  height: 170px;
}

#favorite-name::placeholder,
#favorite-canvases::placeholder {
  color: #b4b2b2;
}

#favorite-name:focus::placeholder,
#favorite-canvases:focus::placeholder {
  color: #bdbbc7;
}

.favorite-canvases {
  margin-top: 20px;
}

.favorite-name-word-number,
.favorite-canvases-word-number {
  position: absolute;
  font-size: 14px;
}

.favorite-name-word-number {
  top: 38px;
  right: 11px;
}

.favorite-canvases-word-number {
  top: 170px;
  right: 12px;
}

.public-favorite {
  display: inline-block;
  font-size: 16px;
  height: 26px;
  line-height: 26px;
}

.build-favorite div {
  width: 80px;
  height: 30px;
  margin: 20px auto 0;
  border-radius: 6px;
  text-align: center;
  line-height: 30px;
  color: #fff;
  background-color: #7f6df8;
  cursor: pointer;
}

.build-favorite div:hover {
  background-color: #7464e3;
}
</style>