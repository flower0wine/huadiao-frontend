<template>
  <transition name="fade">
    <div class="add-new-favorite-board-container"
         v-if="isShow"
    >
      <div class="add-new-favorite-board">
        <div class="new-favorite-board-header">
          <div>新建收藏夹</div>
          <div class="close-add-favorite-board-btn">
            <img src="/svg/starClose.svg"
                 @click="openOrCloseAddFavoriteBoard"
                 ref="closeFavoriteBoardBtn"
                 alt="">
          </div>
        </div>
        <div class="favorite-name">
          <div>收藏夹名称</div>
          <input type="text" id="favorite-name"
                 v-model="favoriteName"
                 placeholder="收藏夹名称"
                 autocomplete="off"
                 maxlength="16"
          >
          <div class="favorite-name-word-number">{{ wordNumber.favoriteName }}/16</div>
        </div>
        <div class="favorite-canvases">
          <div>简介</div>
          <textarea id="favorite-canvases"
                    v-model="favoriteCanvases"
                    placeholder="可以对你的收藏夹说明一下"
                    maxlength="100"
          ></textarea>
          <div class="favorite-canvases-word-number">{{ wordNumber.favoriteCanvases }}/100</div>
        </div>
        <label class="public-favorite" for="public-favorite">
          <input type="checkbox" id="public-favorite" ref="publicFavorite" :checked="modify ? isPublic : true">
          <span>公开收藏夹</span>
        </label>
        <div class="build-favorite">
          <div @click="modify ? modifyFavoriteInfer() : buildNewFavorite()">{{ modify ? '修改' : '建立' }}</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "AddNewFavoriteBoard",
  data() {
    return {
      isShow: false,
      modify: false,
      modifyIndex: null,
      favoriteName: "",
      favoriteCanvases: "",
      isPublic: true,
      wordNumber: {
        favoriteName: 0,
        favoriteCanvases: 0,
      }
    }
  },
  watch: {
    favoriteName: {
      handler(newValue) {
        this.wordNumber.favoriteName = newValue.length;
      },
    },
    favoriteCanvases: {
      handler(newValue) {
        this.wordNumber.favoriteCanvases = newValue.length;
      },
    }
  },
  beforeMount() {
    this.$bus.$on("openOrCloseAddFavoriteBoard", this.openOrCloseAddFavoriteBoard);
    this.$bus.$on("modifyFavoriteInfer", (favoriteName, favoriteCanvases, isPublic, modifyIndex) => {
      this.modify = true;
      this.favoriteName = favoriteName;
      this.favoriteCanvases = favoriteCanvases;
      this.isPublic = isPublic;
      this.modifyIndex = modifyIndex;
      this.isShow = true;
    });
  },
  methods: {
    // 打开或关闭
    openOrCloseAddFavoriteBoard() {
      this.isShow = !this.isShow;
      if (!this.isShow) {
        this.flushBoard();
      }
    },
    // 刷新面板
    flushBoard() {
      this.favoriteName = "";
      this.favoriteCanvases = "";
      this.isPublic = true;
    },
    // 修改收藏夹信息
    modifyFavoriteInfer() {
      if(this.checkFavoriteInfer()) {
        this.$store.dispatch("modifyFavoriteInfer", {
          favoriteName: this.favoriteName,
          favoriteCanvases: this.favoriteCanvases,
          isPublic: this.$refs.publicFavorite.checked,
          modifyIndex: this.modifyIndex,
          succeedCallback: () => {
            this.isShow = false;
            this.flushBoard();
            this.huadiaoMiddleTip("修改成功!");
          },
          failCallback: () => {
            this.huadiaoMiddleTip("收藏夹不存在或不允许操作!");
          },
        });
      }
    },
    // 检查收藏夹名称, 简介是否合理
    checkFavoriteInfer() {
      if (typeof this.favoriteName === "string" && typeof this.favoriteCanvases === "string") {
        if (0 < this.favoriteName.length && this.favoriteName.length <= 16 && this.favoriteCanvases.length <= 100) {
          this.huadiaoMiddleTip("收藏夹添加成功!");
          return true;
        } else if (this.favoriteName.length === 0) {
          this.huadiaoMiddleTip("收藏夹名称不能为空!");
        } else if (this.favoriteCanvases.length > 16) {
          this.huadiaoMiddleTip("收藏夹名称长度最大为 16 个字符!");
        } else if (this.favoriteCanvases.length > 100) {
          this.huadiaoMiddleTip("收藏夹简介长度最大为 100 个字符!");
        }
      } else {
        this.huadiaoMiddleTip("请检查输入是否有误!");
      }
      return false;
    },
    // 建立新的收藏夹
    buildNewFavorite() {
      if (this.checkFavoriteInfer()) {
        this.isShow = false;
        this.flushBoard();
        this.$store.commit("buildNewFavorite", {
          favoriteName: this.favoriteName,
          favoriteCanvases: this.favoriteCanvases,
          isPublic: this.$refs.publicFavorite.checked,
        });
      }
    },
  },
  beforeDestroy() {
    this.clearAllRefsEvents();
  }
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