<template>
  <div class="add-anime-container">
    <div class="add-anime-board">
      <div class="anime-picture"></div>
      <div class="add-anime-info">
        <div class="close-add-anime" v-html="svg.fork" @click="closeAddAnimeBoard"></div>
        <div class="add-anime-header">新增番剧</div>
        <div class="anime-title-container">
          <div>
            <label for="animeNameInput">
              <span class="must">*</span>
              <span class="anime-name">番剧名称</span>
            </label>
          </div>
          <div>
            <input type="text"
                   v-model="animeName"
                   id="animeNameInput"
                   class="anime-name-input"
                   minlength="1"
                   maxlength="15"
                   placeholder="你喜欢的番剧是？"
                   @blur="checkAnimeName">
          </div>
        </div>
        <div class="anime-cover-container">
          <div>
            <span class="must">*</span>
            <span class="anime-cover">番剧封面</span>
          </div>
          <div class="anime-cover-box">
            <div>
              <label for="animeCover">
                <span v-if="animeCover" class="cat-img">
                  <img :src="animeCover" alt="">
                </span>
                <span v-else class="choose-anime-cover">
                  <span v-html="svg.add"></span>
                </span>
              </label>
              <input type="file"
                     class="hidden-input"
                     id="animeCover"
                     accept="image/*"
                     @change="animeCoverInputChange"
                     ref="animeCoverInput">
            </div>
            <div class="anime-cover-require">
              <div>* 图片要求:</div>
              <div>图片大小最佳为 1033 * 580 像素, 为 jpg、jpeg 等格式，大小不超过2M</div>
            </div>
          </div>
        </div>
        <div class="add-btn" @click="confirmAddAnime">添加</div>
        <div class="add-single-container">
          <a href="javascript:void(0)" target="_blank" class="add-single-page">想为该番剧单独制作页面？</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {svg} from "@/assets/js/constants/svgs";
import {apis} from "@/assets/js/constants/request-path";
import {statusCode} from "@/assets/js/constants/status-code";

export default {
  name: "AddAnimeBoard",
  data() {
    return {
      svg,
      animeName: "",
      animeCover: "",
    }
  },
  mounted() {
  },
  methods: {
    animeCoverInputChange() {
      this.animeCover = this.getImgPath(this.$refs.animeCoverInput);
    },
    closeAddAnimeBoard() {
      this.$bus.$emit("closeAddAnimeBoard");
      this.animeName = "";
      this.animeCover = "";
      this.$refs.animeCoverInput.value = "";
    },
    checkAnimeName() {
      if(!(0 < this.animeName.length && this.animeName.length <= 15)) {
        this.huadiaoMiddleTip("番剧名称长度应在 1 ~ 15 字符之间");
        return false;
      }
      return true;
    },
    checkAnimeCover() {
      if(this.animeCover === "") {
        this.huadiaoMiddleTip("为番剧选个封面吧");
        return false;
      }
      let size = this.$refs.animeCoverInput.files[0].size;
      // 2 << 20 为 2M 的字节数
      if(size > 2 << 20) {
        this.huadiaoMiddleTip("选择的图片大于 2 M")
        return false;
      }
      return true;
    },
    confirmAddAnime() {
      if(this.checkAnimeName() && this.checkAnimeCover()) {
        this.requestAddAnime();
      }
    },
    // 添加番剧 vuex
    addAnime(animeId) {
      this.$store.commit("addAnime", {
        title: this.animeName,
        cover: this.animeCover,
        addTime: new Date().getTime(),
        animeId,
      });
      this.closeAddAnimeBoard();
    },
    // 发送添加番剧请求
    requestAddAnime() {
      let formData = new FormData();
      formData.append("animeCover", this.$refs.animeCoverInput.files[0]);
      this.sendRequest({
        path: apis.huadiaoHouse.addAnime,
        method: "post",
        params: {
          animeTitle: this.animeName,
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
        thenCallback: (response) => {
          let res = response.data;
          console.log(res);
          if(res.code === statusCode.succeed) {
            let animeId = res.data.animeId;
            this.addAnime(animeId);
          }
        },
      })
    },
  },
  beforeDestroy() {
  }
}
</script>

<style scoped>
.add-anime-container {
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 50;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(2px);
  background-color: rgba(0, 0, 0, 0.28);
  transition: opacity 500ms;
}

.add-anime-board {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 700px;
  height: 500px;
  border-radius: 8px;
  overflow: hidden;
}

.anime-picture {
  float: left;
  width: 300px;
  height: 500px;
  background: url("~@/../public/img/huadiaohouse/addAnimePicture.jpeg") no-repeat;
  background-size: 350px;
}

.add-anime-info {
  float: left;
  width: 400px;
  height: 500px;
  padding: 0 40px;
  font-family: STXingkai, serif;
  background-color: #fff;
}

.add-anime-header {
  text-align: center;
  margin-top: 20px;
  font-size: 50px;
  color: #740000;
}

.close-add-anime {
  position: absolute;
  top: 20px;
  right: 20px;
}

.close-add-anime /deep/ svg {
  width: 20px;
  height: 20px;
  fill: #aaaaaa;
}

.close-add-anime:hover /deep/ svg {
  fill: #7e7d7d;
}

.anime-title-container {
  margin-top: 30px;
}

.anime-name,
.anime-cover {
  font-size: 20px;
  color: #555454;
}

.anime-cover-container {
  margin-top: 30px;
}

.must {
  padding-top: 2px;
  margin-right: 5px;
  color: #cb1e1e;
}

.anime-name-input {
  width: 320px;
  height: 40px;
  margin-top: 10px;
  padding: 0 10px;
  border: 0;
  border-radius: 7px;
  background-color: #ededed;
}

input::-webkit-input-placeholder{
  color: #bdbdbd;
  letter-spacing: 2px;
}

.choose-anime-cover {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  border-radius: 5px;
  background-color: #ededed;
}

.cat-img {
  display: inline-block;
  width: 100px;
  height: 56px;
  overflow: hidden;
}

.cat-img img {
  width: 100px;
}

.choose-anime-cover:hover {
  background-color: #e3e3e3;
}

.choose-anime-cover:hover /deep/ svg {
  fill: #c5c5c5;
}

.anime-cover-box {
  display: flex;
  justify-content: space-between;
  height: 100px;
  margin-top: 20px;
}

.choose-anime-cover /deep/ svg {
  width: 40px;
  height: 40px;
  fill: #d5d4d4;
}

.anime-cover-require {
  font-family: 微软雅黑, serif;
  font-size: 12px;
  color: #6e6e6e;
}

.anime-cover-require > div:first-child {
  width: 60px;
}

.anime-cover-require > div:nth-child(2) {
  width: 160px;
  margin: 8px 0 0 21px;
}

.add-btn {
  width: 75px;
  height: 40px;
  margin: 30px auto 0;
  text-align: center;
  line-height: 40px;
  border-radius: 8px;
  font-size: 20px;
  color: #fff;
  background-color: #d51b1b;
  cursor: default;
}

.add-btn:hover {
  background-color: #b92323;
}

.add-single-container {
  margin-top: 50px;
  text-align: center;
}

.add-single-page {
  font-size: 16px;
  color: #707070;
}
</style>