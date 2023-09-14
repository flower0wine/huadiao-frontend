<template>
  <div class="note-star-board">
    <div class="note-star-board-header">
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
               @click="allChoose"
               ref="chooseAll"
          >
            <input type="checkbox" id="choose-all" ref="chooseAllInput">
            <span>全选</span>
          </div>
          <div class="tool"
               @click="cancelNoteStar"
               ref="cancelNoteStar"
          >
            <span v-html="svg.cancelStar"></span>
            <span>取消收藏</span>
          </div>
          <div class="tool" @click="clickToCopyFavorite">
            <span v-html="svg.copyTo"></span>
            <span>复制到</span>
          </div>
          <div class="tool" @click="clickToMoveFavorite">
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
        <note-star-item v-for="(item, index) in afterHandleNoteStar"
                        :key="item.noteId"
                        :noteStar="item"
                        :uid="getAuthorUid()"
                        :index="index"
                        :selectedNoteStarArray="selectedNoteStarArray"
                        :clickPatch="clickPatch"
                        ref="noteStarItem"
        />
      </div>
    </div>
  </div>
</template>

<script>
import NoteStarItem from "@/pages/star/components/NoteStarItem";
import {mapState} from "vuex";

export default {
  name: "NotesStarBoard",
  data() {
    return {
      clickPatch: false,
      uid: null,
      choseNoteStar: 0,
      svg: {
        batch: `<svg t="1679106025781" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5186" width="200" height="200"><path d="M745.01688889 201.31081482A77.6722963 77.6722963 0 0 1 822.68918518 278.98311111v673.15990164a77.6722963 77.6722963 0 0 1-77.67229629 77.6722963h-673.15990164A77.6722963 77.6722963 0 0 1-5.81530905 952.14301275v-673.15990164A77.6722963 77.6722963 0 0 1 71.85698725 201.31081482zM719.12612386 304.87387614H97.74775349v621.37837037h621.37837037V304.87387614z m-92.63715911 141.10467201a51.78153127 51.78153127 0 0 1 10.61521423 67.67846044l-3.83183409 5.28171614-236.79693984 285.05732741a51.78153127 51.78153127 0 0 1-74.87609364 5.07459084l-4.34964858-4.60855706-131.36974461-154.15361658a51.78153127 51.78153127 0 0 1 74.35827912-71.82098371l4.50499319 4.66033778 91.39440116 107.29133154 197.4429772-237.67722666a51.78153127 51.78153127 0 0 1 72.90839586-6.73159821zM951.93588622-5.81530905a77.6722963 77.6722963 0 0 1 77.36160711 70.21575586l0.31068919 7.45654044v646.9066655a51.78153127 51.78153127 0 0 1-103.20059142 6.0584391l-0.36246991-6.0584391V97.74775349H304.87387614a51.78153127 51.78153127 0 0 1-51.41906015-45.72309216L253.09234608 45.96622222a51.78153127 51.78153127 0 0 1 45.72309094-51.41906014L304.87387614-5.81530905h647.06201008z" p-id="5187"></path></svg>`,
        copyTo: `<svg t="1679106082163" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5330" width="200" height="200"><path d="M832 738.56V320a128 128 0 0 0-128-128H128a128 128 0 0 0-128 128v576a128 128 0 0 0 128 128h576a128 128 0 0 0 128-128v-157.44z m-92.8 128a64 64 0 0 1-64 64H156.16a64 64 0 0 1-64-64V349.44a64 64 0 0 1 64-64h517.76a64 64 0 0 1 64 64v390.4z" p-id="5331"></path><path d="M1024 704a128 128 0 0 1-128 128h-64v-93.44h36.48a64 64 0 0 0 64-64V156.8a64 64 0 0 0-64-64H349.44a64 64 0 0 0-64 64V192H192V128a128 128 0 0 1 128-128h576a128 128 0 0 1 128 128z" p-id="5332"></path><path d="M225.030844 732.388867m33.941125-33.941126l203.646753-203.646753q33.941125-33.941125 67.882251 0l0 0q33.941125 33.941125 0 67.882251l-203.646753 203.646753q-33.941125 33.941125-67.882251 0l0 0q-33.941125-33.941125 0-67.882251Z" p-id="5333"></path><path d="M334.08 435.84m48 0l160 0q48 0 48 48l0 0q0 48-48 48l-160 0q-48 0-48-48l0 0q0-48 48-48Z" p-id="5334"></path><path d="M493.44 691.2m0-48l0-160q0-48 48-48l0 0q48 0 48 48l0 160q0 48-48 48l0 0q-48 0-48-48Z" p-id="5335"></path></svg>`,
        moveTo: `<svg t="1679106124185" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5478" width="200" height="200"><path d="M832 738.56V320a128 128 0 0 0-128-128H128a128 128 0 0 0-128 128v576a128 128 0 0 0 128 128h576a128 128 0 0 0 128-128v-157.44z m-92.8 128a64 64 0 0 1-64 64H156.16a64 64 0 0 1-64-64V349.44a64 64 0 0 1 64-64h517.76a64 64 0 0 1 64 64v390.4z" p-id="5479"></path><path d="M1024 704a128 128 0 0 1-128 128h-64v-93.44h36.48a64 64 0 0 0 64-64V156.8a64 64 0 0 0-64-64H349.44a64 64 0 0 0-64 64V192H192V128a128 128 0 0 1 128-128h576a128 128 0 0 1 128 128z" p-id="5480"></path><path d="M189.44 560m48 0l288 0q48 0 48 48l0 0q0 48-48 48l-288 0q-48 0-48-48l0 0q0-48 48-48Z" p-id="5481"></path><path d="M476.431222 427.126384m33.941126 33.941125l113.137084 113.137085q33.941125 33.941125 0 67.882251l0 0q-33.941125 33.941125-67.882251 0l-113.137084-113.137085q-33.941125-33.941125 0-67.882251l0 0q33.941125-33.941125 67.882251 0Z" p-id="5482"></path><path d="M407.746697 720.206504m33.941125-33.941126l113.137085-113.137085q33.941125-33.941125 67.882251 0l0 0q33.941125 33.941125 0 67.882251l-113.137085 113.137085q-33.941125 33.941125-67.882251 0l0 0q-33.941125-33.941125 0-67.882251Z" p-id="5483"></path></svg>`,
        cancelStar: `<svg t="1679106225012" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5626" width="200" height="200"><path d="M800.56471703 740.13809778l-14.0659674-86.22838519L1005.8258963 429.1090963c10.1702163-10.41294222 13.65333333-25.64399408 9.02940445-39.45509927s-16.57818075-23.85995852-30.95969186-26.05662814l-301.53841778-46.06938074-135.19834074-288.0671289C540.76302222 15.83179852 527.0611437 7.13007408 512 7.13007408s-28.76302222 8.70172445-35.15885037 22.33078517l-135.19834074 288.0671289-301.53841778 46.06938074c-14.39364741 2.19666963-26.33576297 12.25765925-30.95969186 26.05662814s-1.14081185 29.03002075 9.02940445 39.45509927l219.32714667 224.80061629-51.85839407 317.88600889a38.83978903 38.83978903 0 0 0 15.95922962 37.9987437c6.67496297 4.70888297 14.51501037 7.08759703 22.36719408 7.08759704 6.44437333 0 12.92515555-1.60199111 18.78698667-4.84238222L512 863.18800592l95.47624297 52.7686163c18.77485037 10.37653333 42.40421925 3.56807111 52.78075258-15.20677925 10.37653333-18.77485037 3.56807111-42.40421925-15.20677925-52.7807526l-114.26322963-63.15728592a38.80095289 38.80095289 0 0 0-37.57397334 0L275.18445037 905.33736297l42.13722074-258.29679408a38.83736178 38.83736178 0 0 0-10.53430519-33.37481481L126.53909333 428.96346075l247.31344592-37.78029038a38.8179437 38.8179437 0 0 0 29.28488297-21.89387852l108.86257778-231.92462222 108.85044148 231.91248592a38.86527525 38.86527525 0 0 0 29.28488297 21.89387853l247.31344592 37.78029037-180.224 184.73870222a38.87377067 38.87377067 0 0 0-10.53430519 33.37481481l17.22140445 105.57364149c3.45884445 21.16570075 23.42305185 35.52293925 44.57661629 32.07623111 21.17783703-3.44670815 35.53507555-23.41091555 32.07623111-44.5766163zM955.27822222 900.36148148l50.20785778-50.20785778c15.17037037-15.17037037 15.17037037-39.75850667 0-54.91674073-15.17037037-15.17037037-39.75850667-15.17037037-54.91674075 0L900.36148148 845.44474075l-50.20785778-50.20785778c-15.17037037-15.17037037-39.75850667-15.17037037-54.91674073 0-15.17037037 15.17037037-15.17037037 39.75850667 0 54.91674073L845.44474075 900.36148148l-50.20785778 50.20785777c-15.17037037 15.17037037-15.17037037 39.75850667 0 54.91674075 7.58518518 7.58518518 17.52481185 11.37170963 27.46443851 11.37170963s19.87925333-3.78652445 27.46443852-11.37170963L900.36148148 955.27822222l50.20785777 50.20785778c7.58518518 7.58518518 17.52481185 11.37170963 27.46443853 11.37170963s19.87925333-3.78652445 27.46443852-11.37170963c15.17037037-15.17037037 15.17037037-39.75850667 0-54.91674075L955.27822222 900.36148148z" p-id="5627"></path></svg>`,
      },
      // 已选择的笔记收藏
      selectedNoteStarArray: [],
      favoriteId: null,
    }
  },
  computed: {
    ...mapState(["noteStar"]),
    afterHandleNoteStar() {
      return this.$store.state.noteStarDivide.get(this.favoriteId);
    }
  },
  watch: {
    "selectedNoteStarArray.length": {
      handler(newValue) {
        this.choseNoteStar = newValue;
        this.$refs.chooseAll.children[0].checked = newValue === this.afterHandleNoteStar.length && this.afterHandleNoteStar.length !== 0;
      }
    },
    "$route.params.favoriteId": {
      immediate: true,
      handler(newValue) {
        this.selectedNoteStarArray = [];
        this.favoriteId = newValue;
        this.clickPatch = false;
      }
    }
  },
  methods: {
    // 获取作者 uid
    getAuthorUid() {
      if (!this.uid) {
        // let uid = window.location.href.split(/\//);
        this.uid = "http://localhost:9090/1/note/1".split(/\//)[3];
      }
      return this.uid;
    },
    // 全选
    allChoose(e) {
      if(this.afterHandleNoteStar.length === 0) {
        this.huadiaoMiddleTip("没有可以选择的笔记收藏!");
      } else {
        // 改变 input 选项, 如果点击目标不是 input, 因为 input:checkbox 有默认点击事件
        if(e.target !== this.$refs.chooseAllInput) {
          this.$refs.chooseAll.children[0].checked = !this.$refs.chooseAll.children[0].checked;
        }
        if(this.$refs.chooseAll.children[0].checked) {
          let arr = [];
          // 全部添加样式
          this.$refs.noteStarItem.forEach((item, index) => {
            if(String(item.noteStar.favoriteId) === this.favoriteId) {
              item.addClickNoteStarStyle();
              arr.push(index);
            }
          });
          this.selectedNoteStarArray = arr;
        } else {
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
      if(this.selectedNoteStarArray.length === 0) {
        this.huadiaoMiddleTip("请选择要取消收藏的笔记收藏!");
      } else {
        this.huadiaoPopupWindow("warning", "confirmOrCancel", "确认取消收藏吗？确认后将无法恢复!", () => {
          this.$store.dispatch("cancelNoteStar", {
            selectedNoteStarArray: this.selectedNoteStarArray,
            favoriteId: this.$route.params.favoriteId,
            callback: () => {
              this.huadiaoMiddleTip("取消收藏成功!");
              this.selectedNoteStarArray = [];
            },
          });
        });
      }
    },
    // 复制笔记到其他收藏夹
    clickToCopyFavorite() {
      if(this.selectedNoteStarArray.length === 0) {
        this.huadiaoMiddleTip("请选择要复制的笔记收藏!");
      } else {
        this.$bus.$emit("copyOMoveNoteStarToOtherFavorite", {
          confirmFn: (destFavoriteId) => {
            this.$store.dispatch("copyNoteStarToOtherFavorite", {
              selectedNoteStarArray: this.selectedNoteStarArray,
              srcFavoriteId: this.favoriteId,
              destFavoriteId,
              callback: () => {
                this.huadiaoMiddleTip("复制成功!");
                this.allNoteStarRemoveStyle();
              },
            });
          },
          favoriteId: this.favoriteId,
          amount: this.selectedNoteStarArray.length,
          copy: true,
        });
      }
    },
    // 移动收藏到其他收藏夹
    clickToMoveFavorite() {
      if(this.selectedNoteStarArray.length === 0) {
        this.huadiaoMiddleTip("请选择要移动的笔记收藏!");
      } else {
        this.$bus.$emit("copyOMoveNoteStarToOtherFavorite", {
          confirmFn: (destFavoriteId) => {
            this.$store.dispatch("moveNoteStarToOtherFavorite", {
              selectedNoteStarArray: this.selectedNoteStarArray,
              srcFavoriteId: this.favoriteId,
              destFavoriteId,
              callback: () => {
                this.huadiaoMiddleTip("移动成功!");
                this.allNoteStarRemoveStyle();
              },
            });
          },
          favoriteId: this.favoriteId,
          amount: this.selectedNoteStarArray.length,
          copy: false,
        });
      }
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
  width: 1000px;
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
</style>