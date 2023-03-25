<template>
  <transition name="fade">
    <div class="transfer-note-favorite-mark" v-if="isShow">
      <div class="transfer-note-favorite-board">
        <div class="transfer-note-favorite-header">
          <div>
            <span>你正在{{isCopy ? "复制" : "移动"}} {{selectedAmount}} 个笔记到</span>
            <span v-html="svg.close" class="close-icon" @click="isShow = false"></span>
          </div>
          <div>{{clickedFavoriteDirectoryName}}</div>
        </div>
        <div class="favorite-list">
          <div class="favorite-item"
               v-for="(item, index) in noteStarCatalogue"
               :key="item.favoriteId"
               :class="[clickedFavoriteDirectoryIndex === index ? 'click-input-checked-box' : '', String(item.favoriteId) === srcFavoriteId ? 'disable' : '']"
               @click="String(item.favoriteId) !== srcFavoriteId && clickFavoriteItem(index, item.favoriteName)"
               ref="favoriteDirectory"
          >
            <div class="input-checked-box">
              <div></div>
            </div>
            <div class="favorite-infer">
              <div class="favorite-name">{{item.favoriteName}}</div>
              <div class="favorite-public">{{item.isPublic ? "公开" : "私密"}}</div>
            </div>
            <div class="favorite-number">{{item.number}}</div>
          </div>
        </div>
        <div class="transfer-note-favorite-footer">
          <div class="confirm-transfer" @click="clickToConfirmOperation">确认</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "TransferNoteFavorite",
  data() {
    return {
      // 已点击的收藏夹的索引
      clickedFavoriteDirectoryIndex: null,
      clickedFavoriteDirectoryName: "请选择一个收藏夹",
      // 选择收藏的数量
      selectedAmount: null,
      // 源收藏夹
      srcFavoriteId: null,
      // 目标收藏夹
      destFavoriteId: null,
      isShow: false,
      // 是否是复制
      isCopy: true,
      svg: {
        close: `<svg t="1677680621221" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4916" width="200" height="200"><path d="M644.30990222 512l363.7248 363.7248c18.27726222 18.27726222 18.27726222 47.84128 0 66.11854222l-66.11854222 66.11854223c-18.27726222 18.27726222-47.84128 18.27726222-66.11854222 0L512 644.30990222l-363.7248 363.7248c-18.27726222 18.27726222-47.84128 18.27726222-66.11854222 0l-66.11854223-66.11854222c-18.27726222-18.27726222-18.27726222-47.91409778 0-66.11854222L379.69009778 512 15.96529778 148.2752c-18.27726222-18.27726222-18.27726222-47.84128 0-66.11854222l66.11854222-66.11854223c18.27726222-18.27726222 47.91409778-18.27726222 66.11854222 0L512 379.69009778l363.7248-363.7248c18.27726222-18.27726222 47.91409778-18.27726222 66.11854222 0l66.11854223 66.11854222c18.27726222 18.27726222 18.27726222 47.91409778 0 66.11854222L644.30990222 512z" p-id="4917"></path></svg>`,
      },
      // 确认后调用函数
      confirmFn: null,
    }
  },
  computed: {
    ...mapState(["noteStarCatalogue"]),
  },
  watch: {
    isShow: {
      immediate: true,
      handler(newValue) {
        if(!newValue) {
          this.clickedFavoriteDirectoryIndex = -1;
        }
      }
    }
  },
  beforeMount() {
    // 打开面板
    this.$bus.$on("copyOMoveNoteStarToOtherFavorite", ({confirmFn, favoriteId, amount, copy}) => {
      this.confirmFn = confirmFn;
      this.srcFavoriteId = favoriteId;
      this.selectedAmount = amount;
      this.isCopy = copy;
      this.isShow = true;
    });
  },
  methods: {
    // 点击收藏夹
    clickFavoriteItem(index, favoriteName) {
      this.clickedFavoriteDirectoryIndex = index;
      this.clickedFavoriteDirectoryName = favoriteName;
      this.destFavoriteId = this.noteStarCatalogue[index].favoriteId;
    },
    // 确认保存的收藏夹
    clickToConfirmOperation() {
      if(this.destFavoriteId) {
        this.confirmFn(this.destFavoriteId);
        this.isShow = false;
      } else {
        this.huadiaoMiddleTip("请选择一个收藏夹再点击确认!");
      }
    },
  },
  beforeDestroy() {
  }
}
</script>

<style scoped>
.transfer-note-favorite-mark {
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 20;
  width: 100%;
  height: 100vh;
  backdrop-filter: blur(2px);
  background-color: #00000023;
  transition: var(--transition-500ms);
}

.transfer-note-favorite-board {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  height: 440px;
  border-radius: 6px;
  font-size: 18px;
  color: #383737;
  background-color: #fff;
  box-shadow: var(--box-shadow-min);
  transform: translate(-50%, -50%);
}

.transfer-note-favorite-header,
.transfer-note-favorite-footer {
  text-align: center;
  padding: 10px;
}

.transfer-note-favorite-header {
  border-bottom: 1px solid #b2b2b2;
}

.transfer-note-favorite-footer {
  border-top: 1px solid #b2b2b2;
}

.transfer-note-favorite-header /deep/ svg {
  width: 20px;
  height: 20px;
  fill: #a1a0a0;
  vertical-align: -6px;
}

.transfer-note-favorite-header span {
  font-size: 20px;
}

.transfer-note-favorite-header div {
  font-size: 16px;
}

.close-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  display: inline-block;
  text-align: center;
  width: 30px;
  height: 30px;
  border-radius: 4px;
  transition: var(--transition-500ms);
  cursor: pointer;
}

.close-icon:hover {
  background-color: #ece9e9;
}

.favorite-list {
  height: calc(100% - 136px);
  overflow-y: auto;
}

.confirm-transfer {
  width: 100px;
  height: 46px;
  margin: 0 auto;
  text-align: center;
  line-height: 46px;
  border-radius: 6px;
  color: #fff;
  background-color: #e34343;
  cursor: pointer;
  transition: var(--transition-500ms);
}

.confirm-transfer:hover {
  background-color: #d23f3f;
}

.input-checked-box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
  margin-right: 10px;
  border-radius: 50%;
  border: 1px solid #646262;
  transition: var(--transition-500ms);
}

.favorite-item:hover .input-checked-box {
  border: 1px solid #e35353;
}

.favorite-item.disable:hover .input-checked-box,
.favorite-item.disable .input-checked-box {
  border: 1px solid #9b9b9b;
}

.click-input-checked-box .input-checked-box {
  border: 1px solid #e35353;
}

.input-checked-box div {
  display: none;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #e35353;
}

.click-input-checked-box .input-checked-box div {
  display: block;
}

.favorite-item {
  display: flex;
  align-items: center;
  padding: 0 30px;
  height: 50px;
}

.favorite-item.disable {
  cursor: not-allowed;
}

.favorite-item:hover {
  background-color: rgba(234, 234, 234, 0.44);
}

.favorite-item.disable:hover {
  background-color: #fff;
}

.favorite-infer {
  margin-right: auto;
}

.favorite-public {
  font-size: 14px;
  color: #9b9b9b;
}

.favorite-number {
  color: #676666;
}

.favorite-item.disable .favorite-number,
.favorite-item.disable .favorite-name {
  color: #9b9b9b;
}
</style>