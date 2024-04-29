<template>
  <div class="note-star-board">
    <div class="note-star-board-header" v-if="me">
      <transition name="right-slide">
        <div class="note-star-patch"
             v-if="!clickPatch"
             @click="clickPatch = true"
             ref="noteStarPatch"
        >
          <span v-html="svg.batch"></span>
          <span>批量处理</span>
        </div>
      </transition>
      <transition name="right-slide">
        <div class="patch-tools"
             v-if="clickPatch"
        >
          <div class="chose-note-star">已选择 {{ choseNoteStar }} 个笔记</div>
          <div class="tool"
               @click="clickToChooseAll"
               ref="chooseAll"
          >
            <input type="checkbox" id="choose-all" ref="chooseAllInput" :checked="chooseAll">
            <span>全选</span>
          </div>
          <div class="tool"
               @click="cancelNoteStar"
               ref="cancelNoteStar"
          >
            <span v-html="svg.cancelStar"></span>
            <span>取消收藏</span>
          </div>
          <div class="tool" @click="clickToCopyGroup">
            <span v-html="svg.copyTo"></span>
            <span>复制到</span>
          </div>
          <div class="tool" @click="clickToMoveGroup">
            <span v-html="svg.moveTo"></span>
            <span>移动到</span>
          </div>
          <div @click="clickPatch = false"
               class="tool"
               ref="cancelPatch"
          >取消
          </div>
        </div>
      </transition>
    </div>
    <div class="note-star-container">
      <div class="note-star-list">
        <note-star-item v-for="(item, index) in noteStarList"
                        :key="`${item.uid}/${item.noteId}/${item.groupId}`"
                        :noteStar="item"
                        :index="index"
                        :addStarToArray="addStarToArray"
                        :removeStarFromArray="removeStarFromArray"
                        :selectedNoteStarArray="selectedNoteStarArray"
                        :clickPatch="clickPatch"
                        ref="noteStarItem"
        />
        <div class="no-note-star" v-if="!noteStarList || noteStarList.length === 0">收藏夹现在非常干净</div>
      </div>
    </div>
  </div>
</template>

<script>
import NoteStarItem from "@/pages/star/components/NoteStarItem";
import {mapState} from "vuex";
import {apis} from "@/assets/js/constants/request-path";
import {statusCode} from "@/assets/js/constants/status-code";

export default {
  name: "NotesStarBoard",
  data() {
    return {
      clickPatch: false,
      uid: null,
      chooseAll: null,
      choseNoteStar: 0,
      svg: {
        batch: `<svg t="1679106025781" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5186" width="200" height="200"><path d="M745.01688889 201.31081482A77.6722963 77.6722963 0 0 1 822.68918518 278.98311111v673.15990164a77.6722963 77.6722963 0 0 1-77.67229629 77.6722963h-673.15990164A77.6722963 77.6722963 0 0 1-5.81530905 952.14301275v-673.15990164A77.6722963 77.6722963 0 0 1 71.85698725 201.31081482zM719.12612386 304.87387614H97.74775349v621.37837037h621.37837037V304.87387614z m-92.63715911 141.10467201a51.78153127 51.78153127 0 0 1 10.61521423 67.67846044l-3.83183409 5.28171614-236.79693984 285.05732741a51.78153127 51.78153127 0 0 1-74.87609364 5.07459084l-4.34964858-4.60855706-131.36974461-154.15361658a51.78153127 51.78153127 0 0 1 74.35827912-71.82098371l4.50499319 4.66033778 91.39440116 107.29133154 197.4429772-237.67722666a51.78153127 51.78153127 0 0 1 72.90839586-6.73159821zM951.93588622-5.81530905a77.6722963 77.6722963 0 0 1 77.36160711 70.21575586l0.31068919 7.45654044v646.9066655a51.78153127 51.78153127 0 0 1-103.20059142 6.0584391l-0.36246991-6.0584391V97.74775349H304.87387614a51.78153127 51.78153127 0 0 1-51.41906015-45.72309216L253.09234608 45.96622222a51.78153127 51.78153127 0 0 1 45.72309094-51.41906014L304.87387614-5.81530905h647.06201008z" p-id="5187"></path></svg>`,
        copyTo: `<svg t="1679106082163" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5330" width="200" height="200"><path d="M832 738.56V320a128 128 0 0 0-128-128H128a128 128 0 0 0-128 128v576a128 128 0 0 0 128 128h576a128 128 0 0 0 128-128v-157.44z m-92.8 128a64 64 0 0 1-64 64H156.16a64 64 0 0 1-64-64V349.44a64 64 0 0 1 64-64h517.76a64 64 0 0 1 64 64v390.4z" p-id="5331"></path><path d="M1024 704a128 128 0 0 1-128 128h-64v-93.44h36.48a64 64 0 0 0 64-64V156.8a64 64 0 0 0-64-64H349.44a64 64 0 0 0-64 64V192H192V128a128 128 0 0 1 128-128h576a128 128 0 0 1 128 128z" p-id="5332"></path><path d="M225.030844 732.388867m33.941125-33.941126l203.646753-203.646753q33.941125-33.941125 67.882251 0l0 0q33.941125 33.941125 0 67.882251l-203.646753 203.646753q-33.941125 33.941125-67.882251 0l0 0q-33.941125-33.941125 0-67.882251Z" p-id="5333"></path><path d="M334.08 435.84m48 0l160 0q48 0 48 48l0 0q0 48-48 48l-160 0q-48 0-48-48l0 0q0-48 48-48Z" p-id="5334"></path><path d="M493.44 691.2m0-48l0-160q0-48 48-48l0 0q48 0 48 48l0 160q0 48-48 48l0 0q-48 0-48-48Z" p-id="5335"></path></svg>`,
        moveTo: `<svg t="1679106124185" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5478" width="200" height="200"><path d="M832 738.56V320a128 128 0 0 0-128-128H128a128 128 0 0 0-128 128v576a128 128 0 0 0 128 128h576a128 128 0 0 0 128-128v-157.44z m-92.8 128a64 64 0 0 1-64 64H156.16a64 64 0 0 1-64-64V349.44a64 64 0 0 1 64-64h517.76a64 64 0 0 1 64 64v390.4z" p-id="5479"></path><path d="M1024 704a128 128 0 0 1-128 128h-64v-93.44h36.48a64 64 0 0 0 64-64V156.8a64 64 0 0 0-64-64H349.44a64 64 0 0 0-64 64V192H192V128a128 128 0 0 1 128-128h576a128 128 0 0 1 128 128z" p-id="5480"></path><path d="M189.44 560m48 0l288 0q48 0 48 48l0 0q0 48-48 48l-288 0q-48 0-48-48l0 0q0-48 48-48Z" p-id="5481"></path><path d="M476.431222 427.126384m33.941126 33.941125l113.137084 113.137085q33.941125 33.941125 0 67.882251l0 0q-33.941125 33.941125-67.882251 0l-113.137084-113.137085q-33.941125-33.941125 0-67.882251l0 0q33.941125-33.941125 67.882251 0Z" p-id="5482"></path><path d="M407.746697 720.206504m33.941125-33.941126l113.137085-113.137085q33.941125-33.941125 67.882251 0l0 0q33.941125 33.941125 0 67.882251l-113.137085 113.137085q-33.941125 33.941125-67.882251 0l0 0q-33.941125-33.941125 0-67.882251Z" p-id="5483"></path></svg>`,
        cancelStar: `<svg t="1679106225012" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5626" width="200" height="200"><path d="M800.56471703 740.13809778l-14.0659674-86.22838519L1005.8258963 429.1090963c10.1702163-10.41294222 13.65333333-25.64399408 9.02940445-39.45509927s-16.57818075-23.85995852-30.95969186-26.05662814l-301.53841778-46.06938074-135.19834074-288.0671289C540.76302222 15.83179852 527.0611437 7.13007408 512 7.13007408s-28.76302222 8.70172445-35.15885037 22.33078517l-135.19834074 288.0671289-301.53841778 46.06938074c-14.39364741 2.19666963-26.33576297 12.25765925-30.95969186 26.05662814s-1.14081185 29.03002075 9.02940445 39.45509927l219.32714667 224.80061629-51.85839407 317.88600889a38.83978903 38.83978903 0 0 0 15.95922962 37.9987437c6.67496297 4.70888297 14.51501037 7.08759703 22.36719408 7.08759704 6.44437333 0 12.92515555-1.60199111 18.78698667-4.84238222L512 863.18800592l95.47624297 52.7686163c18.77485037 10.37653333 42.40421925 3.56807111 52.78075258-15.20677925 10.37653333-18.77485037 3.56807111-42.40421925-15.20677925-52.7807526l-114.26322963-63.15728592a38.80095289 38.80095289 0 0 0-37.57397334 0L275.18445037 905.33736297l42.13722074-258.29679408a38.83736178 38.83736178 0 0 0-10.53430519-33.37481481L126.53909333 428.96346075l247.31344592-37.78029038a38.8179437 38.8179437 0 0 0 29.28488297-21.89387852l108.86257778-231.92462222 108.85044148 231.91248592a38.86527525 38.86527525 0 0 0 29.28488297 21.89387853l247.31344592 37.78029037-180.224 184.73870222a38.87377067 38.87377067 0 0 0-10.53430519 33.37481481l17.22140445 105.57364149c3.45884445 21.16570075 23.42305185 35.52293925 44.57661629 32.07623111 21.17783703-3.44670815 35.53507555-23.41091555 32.07623111-44.5766163zM955.27822222 900.36148148l50.20785778-50.20785778c15.17037037-15.17037037 15.17037037-39.75850667 0-54.91674073-15.17037037-15.17037037-39.75850667-15.17037037-54.91674075 0L900.36148148 845.44474075l-50.20785778-50.20785778c-15.17037037-15.17037037-39.75850667-15.17037037-54.91674073 0-15.17037037 15.17037037-15.17037037 39.75850667 0 54.91674073L845.44474075 900.36148148l-50.20785778 50.20785777c-15.17037037 15.17037037-15.17037037 39.75850667 0 54.91674075 7.58518518 7.58518518 17.52481185 11.37170963 27.46443851 11.37170963s19.87925333-3.78652445 27.46443852-11.37170963L900.36148148 955.27822222l50.20785777 50.20785778c7.58518518 7.58518518 17.52481185 11.37170963 27.46443853 11.37170963s19.87925333-3.78652445 27.46443852-11.37170963c15.17037037-15.17037037 15.17037037-39.75850667 0-54.91674075L955.27822222 900.36148148z" p-id="5627"></path></svg>`,
      },
      // 已选择的笔记收藏
      selectedNoteStarArray: [],
      groupId: null,
      noteStarList: null,
    }
  },
  computed: {
    ...mapState(["noteStar", "viewedUid", "me"]),
    mapKey() {
      return this.getMapKey(this.viewedUid, this.groupId);
    },
  },
  watch: {
    "selectedNoteStarArray.length": {
      deep: true,
      handler(newValue) {
        this.chooseAll = newValue === this.noteStarList.length;
      }
    },
    "$route.params.groupId": {
      immediate: true,
      deep: true,
      handler(newValue) {
        this.groupId = +newValue;
        this.getNoteStarByGroupId().then(this.setNoteStarList).catch(() => {});

        this.resetPitch();
      }
    }
  },
  created() {
    this.initial();
  },
  methods: {
    initial() {
      this.$bus.$on("resetNoteStarList", this.setNoteStarList);
    },
    resetPitch() {
      this.clickPatch = false;
      this.chooseAll = false;
    },
    setNoteStarList() {
      this.noteStarList = this.$store.state.noteStar.get(this.mapKey)?.noteStar;
    },
    // 点击选择
    addStarToArray(index) {
      this.insertOrderArray(this.selectedNoteStarArray, index);
      this.choseNoteStar++;
    },
    // 移除选择
    removeStarFromArray(index) {
      this.deleteNumberFromArray(this.selectedNoteStarArray, index);
      this.choseNoteStar--;
    },
    // 根据 groupId 获取笔记收藏
    getNoteStarByGroupId() {
      return new Promise((resolve, reject) => {
        if (!this.groupId) {
          reject();
          return;
        }
        let mapKey = this.mapKey;
        let noteStarGroup = this.noteStar.get(mapKey);
        // 第一次获取未初始化, map.get() 得到的是 undefined, 若已经全部获取则返回
        if (noteStarGroup && !noteStarGroup.hasNext) {
          resolve();
          return;
        }
        // 如果是第一次获取则为 undefined, 则 offset 为 0
        let offset = this.noteStar.get(mapKey)?.offset ?? 0;

        this.sendRequest({
          path: apis.star.noteGet,
          params: {
            uid: this.viewedUid,
            groupId: this.groupId,
            offset,
            row: 10,
          },
          thenCallback: (response) => {
            let res = response.data;
            console.log(res);
            if (res.code === statusCode.SUCCEED) {
              this.$store.commit("addNoteStar", {mapKey, noteStar: res.data, hasNext: true});
              resolve();
            } else if (res.code === statusCode.NOT_EXIST) {
              this.$store.commit("addNoteStar", {mapKey, noteStar: [], hasNext: false});
              resolve();
            }
          },
          errorCallback: (error) => {
            console.log(error);
            reject();
          }
        });
      });
    },
    // 全选
    clickToChooseAll(e) {
      if (this.noteStarList.length === 0) {
        this.huadiaoMiddleTip("没有可以选择的笔记收藏!");
      } else {
        if (e.target === this.$refs.chooseAllInput) {
          this.chooseAll = this.$refs.chooseAllInput.checked;
        } else {
          this.chooseAll = !this.chooseAll;
        }
        if (this.chooseAll) {
          let arr = [];
          // 全部添加样式
          this.$refs.noteStarItem.forEach((item, index) => {
            item.addClickNoteStarStyle();
            arr.push(index);
          });
          this.choseNoteStar = this.$refs.noteStarItem.length;
          this.selectedNoteStarArray = arr;
        } else {
          this.choseNoteStar = 0;
          this.allNoteStarRemoveStyle();
        }
      }
    },
    // 笔记全部移除样式, 并清除已选择的笔记
    allNoteStarRemoveStyle() {
      // 全部移除样式
      this.$refs.noteStarItem.forEach((item) => {
        item.removeClickNoteStarStyle();
      });
      this.selectedNoteStarArray = [];
    },
    // 取消收藏
    cancelNoteStar() {
      if (this.selectedNoteStarArray.length === 0) {
        this.huadiaoMiddleTip("请选择要取消收藏的笔记收藏!");
      } else {
        // 取消收藏成功, 重新获取收藏目录
        this.getCatalogueInfo((resolve) => {
          this.huadiaoPopupWindow("warning", "confirmOrCancel", "确认取消收藏吗？确认后将无法恢复!", () => {
            // 确认删除, 发送请求, 成功则执行相应回调
            this.requestCancelNoteStar().then(() => {
              this.$store.dispatch("cancelNoteStar", {
                selectedNoteStarArray: this.selectedNoteStarArray,
                mapKey: this.mapKey,
              }).then(() => {
                resolve();
                this.huadiaoMiddleTip("取消收藏成功!");
                this.selectedNoteStarArray = [];
              });
            })
          });
        });
      }
    },
    // 请求取消收藏
    requestCancelNoteStar() {
      let uid = [];
      let noteId = [];
      for (let noteStarListKey of this.noteStarList) {
        uid.push(noteStarListKey.uid);
        noteId.push(noteStarListKey.noteId);
      }
      return new Promise((resolve) => {
        this.sendRequest({
          path: apis.star.noteDelete,
          params: {
            groupId: this.groupId,
            uid: uid.join(","),
            noteId: noteId.join(","),
          },
          thenCallback: (response) => {
            let res = response.data;
            console.log(res);
            if (res.code === statusCode.SUCCEED) {
              resolve();
            }
          },
          errorCallback: (error) => {
            console.log(error);
          }
        });
      });
    },
    // 复制笔记到其他收藏夹
    clickToCopyGroup() {
      if (this.selectedNoteStarArray.length === 0) {
        this.huadiaoMiddleTip("请选择要复制的笔记收藏!");
      } else {
        this.getCatalogueInfo((resolve) => {
          this.$bus.$emit("copyOrMoveStarToOtherGroup", {
            confirmFn: (destGroupId) => {
              // 发送请求到服务器, 复制
              this.requestCopyToOtherGroup(destGroupId).then(() => {
                this.allNoteStarRemoveStyle();
                this.$store.commit("deleteNoteStar", {mapKey: this.getMapKey(this.viewedUid, destGroupId)});
                resolve();
              });
            },
            groupId: this.groupId,
            count: this.selectedNoteStarArray.length,
            copy: true,
          });
        });
      }
    },
    // 请求复制到其他收藏夹
    requestCopyToOtherGroup(destGroupId) {
      let uid = [];
      let noteId = [];
      for (let index = 0, length = this.selectedNoteStarArray.length; index < length; index++) {
        uid.push(this.noteStarList[this.selectedNoteStarArray[index]].uid);
        noteId.push(this.noteStarList[this.selectedNoteStarArray[index]].noteId);
      }

      return new Promise((resolve) => {
        this.sendRequest({
          path: apis.star.noteCopy,
          method: "post",
          params: {
            uid: uid.join(","),
            noteId: noteId.join(","),
            srcGroupId: this.groupId,
            destGroupId
          },
          thenCallback: (response) => {
            let res = response.data;
            console.log(res);
            if (res.code === statusCode.SUCCEED) {
              resolve(res);
            }
          },
          errorCallback: (error) => {
            console.log(error);
          },
        })
      })
    },
    // 移动收藏到其他收藏夹
    clickToMoveGroup() {
      if (this.selectedNoteStarArray.length === 0) {
        this.huadiaoMiddleTip("请选择要移动的笔记收藏!");
      } else {
        this.getCatalogueInfo((resolve) => {
          this.$bus.$emit("copyOrMoveStarToOtherGroup", {
            confirmFn: (destGroupId) => {
              this.requestMoveNoteStar(destGroupId).then(() => {
                this.$store.commit("moveNoteStarToOtherGroup", {
                  selectedNoteStarArray: this.selectedNoteStarArray,
                  srcMapKey: this.mapKey,
                  callback: () => {
                    this.allNoteStarRemoveStyle();
                    this.$store.commit("deleteNoteStar", {mapKey: this.getMapKey(this.viewedUid, destGroupId)});
                    resolve();
                  },
                });
              });
            },
            groupId: this.groupId,
            count: this.selectedNoteStarArray.length,
            copy: false,
          });
        })
      }
    },
    // 请求移动收藏
    requestMoveNoteStar(destGroupId) {
      let uid = [];
      let noteId = [];
      for (let index = 0, length = this.selectedNoteStarArray.length; index < length; index++) {
        uid.push(this.noteStarList[this.selectedNoteStarArray[index]].uid);
        noteId.push(this.noteStarList[this.selectedNoteStarArray[index]].noteId);
      }

      return new Promise((resolve) => {
        this.sendRequest({
          path: apis.star.noteMove,
          method: "post",
          params: {
            uid: uid.join(","),
            noteId: noteId.join(","),
            srcGroupId: this.groupId,
            destGroupId,
          },
          thenCallback: (response) => {
            let res = response.data;
            console.log(res);
            if (res.code === statusCode.SUCCEED) {
              resolve();
            }
          },
          errorCallback: (error) => {
            console.log(error);
          }
        })
      });
    },
    // 处理完获取目录信息
    getCatalogueInfo(fn) {
      new Promise((resolve, reject) => {
        fn(resolve, reject);
      }).then(() => {
        this.resetPitch();
        this.setNoteStarList();
        this.$bus.$emit("flushNoteStarCatalogue");
      });
    },
  },
  beforeDestroy() {
  },
  components: {
    NoteStarItem
  },
}
</script>

<style scoped>
.note-star-board {
  flex-shrink: 0;
  width: 70vw;
  min-width: 800px;
  min-height: 600px;
  border-radius: 6px;
  box-shadow: var(--box-shadow-min);
  background-color: #FFFFFFB7;
  font-size: 18px;
  backdrop-filter: blur(3px);
}

.note-star-board-header {
  display: flex;
  justify-content: end;
  padding: 6px;
  overflow: hidden;
}

.note-star-patch,
.patch-tools .tool,
.chose-note-star {
  border-radius: 6px;
  text-align: center;
  line-height: 36px;
  padding: 0 13px;
  color: var(--note-star-color);
  transition: var(--transition-500ms);
  cursor: pointer;
}

.note-star-patch:hover,
.patch-tools .tool:hover {
  color: var(--note-star-color);
  background-color: #FFFFFF8C;
}

.note-star-patch /deep/ svg,
.patch-tools /deep/ svg {
  width: 18px;
  height: 18px;
  margin-right: 8px;
  fill: var(--note-star-color);
}

.patch-tools /deep/ svg {
  vertical-align: -3px;
}

.note-star-patch:hover /deep/ svg,
.patch-tools .tool:hover /deep/ svg {
  fill: var(--note-star-color);
}

.patch-tools {
  display: flex;
  transition: var(--transition-500ms);
}

.patch-tools .tool {
  padding: 0 13px;
  margin-left: 15px;
}

.note-star-list {
  margin-bottom: 40px;
}

.note-star-list::after {
  content: "";
  display: block;
  clear: both;
}

.right-slide-enter {
  opacity: 0;
  transform: translateX(100%);
}

.right-slide-enter-to {
  opacity: 1;
  transform: translateX(0);
}

.right-slide-leave-active {
  display: none;
}

.no-note-star {
  color: #9d7edb;
  text-align: center;
  margin-top: 50px;
}
</style>