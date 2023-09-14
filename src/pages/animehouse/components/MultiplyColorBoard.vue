<template>
  <div class="multiply-board" :style="multiplyOptions.moreOperate ? `padding-bottom: 10px;` : ``">
    <div class="multiply-title">{{multiplyOptions.title}}</div>
    <div class="multiply-core">
      <div class="multiply-left-board">
        <div class="angle">
          <div>角度</div>
          <input type="text"
                 name="angle"
                 id="angle"
                 @focus="preAngle = angle"
                 @blur="angleInputBlur"
                 v-model="angle"
                 autocomplete="off">
        </div>
        <div>
          <div class="add-color"
               @click="addColor">添加多色渐变</div>
          <div class="remove-color"
               @click="removeColor">删除多色渐变</div>
        </div>
        <div class="add-tip">最多为三色渐变</div>
        <div>
          <div class="confirm" @click="confirmOperate">确认</div>
          <div class="cancel" @click="cancelOperate">取消</div>
        </div>
      </div>
      <div class="multiply-right-board">
        <div v-for="(item, index) in multiplyRightInput"
             class="multiply-color-item"
             :key="item.placeholder">
          <label for="colorBoard"
                 @click="chooseColor(index)"
                 v-html="svg.palette"
                 class="palette"></label>
          <input type="text"
                 ref="colorInput"
                 @focus="preMultiplyColor[index].color = item.color"
                 @blur="multiplyColorInputBlur(index)"
                 v-model="multiplyRightInput[index].color"
                 :placeholder="`渐变色${item.placeholder}`"
                 autocomplete="off">
        </div>
      </div>
    </div>
    <div class="more-operation" v-if="multiplyOptions.moreOperate">
      <label for="picture">或者你可以上传图片作为页面背景</label>
      <input type="file" id="picture" ref="imageInput" @change="pictureChange">
    </div>
  </div>
</template>

<script>
import {svg} from "@/assets/js/constants/svgs";

export default {
  name: "MultiplyColorBoard",
  props: ["realTimeCallback", "confirmCallback", "background", "options"],
  data() {
    return {
      svg,
      // 背景类型, color: 单色, gradient: 渐变色, image: 图片
      backgroundType: "",
      // 数据是否有错误, 0: 角度, 1: 渐变色
      hasError: [],
      errorTip: ["角度应为 0 ~ 360 之间的数字", "渐变色一仅支持颜色进制表示法", "渐变色二仅支持颜色进制表示法", "渐变色三仅支持颜色进制表示法"],
      // 最终结果
      finallyResult: "",
      // 之前的角度
      preAngle: "",
      angle: "",
      // 之前的渐变色
      preMultiplyColor: [{color: ""}],
      multiplyRightInput: [{
        placeholder: "一",
        color: "",
      }],
      multiplyOptions: {
        title: "",
        moreOperate: false,
      },
    }
  },
  watch: {
    background: {
      immediate: true,
      handler(newValue) {
        this.reset();
        if(newValue) {
          let color = newValue.startsWith("#");
          let image = newValue.startsWith("url");
          let gradient = newValue.startsWith("-webkit-linear-gradient");
          if(color) {
            this.backgroundType = "color";
            this.initialColor(newValue);
          }
          else if(gradient) {
            this.backgroundType = "gradient";
            let colorSplit = newValue.split(/[(),]/);
            this.initialGradient(colorSplit[1], colorSplit[2], colorSplit[3], colorSplit[4]);
          }
          else if(image) {
            this.backgroundType = "image";
          }
        }
      }
    },
    options: {
      immediate: true,
      handler(newValue) {
        this.modifySrcObject(this.multiplyOptions, newValue);
      },
    },
  },
  methods: {
    initialColor(color) {
      this.multiplyRightInput[0].color = color;
    },
    initialGradient(angle, ...colorSplit) {
      this.angle = angle.split("deg")[0];
      for(let index = 1, length = colorSplit.length; index < length; index++) {
        colorSplit[index] && this.addColor();
      }
      for(let index = 0, length = colorSplit.length; index < length; index++) {
        this.multiplyRightInput[index].color = colorSplit[index].trim();
      }
    },
    // 判断数据是否改变
    angleInputBlur() {
      if(this.preAngle !== this.angle)
        this.angleChange();
    },
    multiplyColorInputBlur(index) {
      if(this.multiplyRightInput[index].color !== this.preMultiplyColor[index].color)
        this.colorInputChange(index);
    },
    // 角度改变
    angleChange() {
      let angle = this.angle;
      let reg = /^\d+$/;
      if(reg.test(angle)) {
        angle = parseInt(angle);
        if(0 <= angle && angle <= 360) {
          this.hasError[0] = false;
          this.flush();
          return;
        }
      }
      this.hasError[0] = true;
      this.huadiaoMiddleTip(this.errorTip[0]);
    },
    // 渐变色改变
    colorInputChange(index) {
      if(this.multiplyRightInput.length === 1) {
        this.backgroundType = "color";
      }
      else if(this.multiplyRightInput.length > 1) {
        this.backgroundType = "gradient";
      }
      let color = this.multiplyRightInput[index].color;
      // index++: 因为 errorTip 第一个存储角度错误信息
      index++;
      if(color.startsWith("#")) {
        let reg = /^[0-9a-fA-F]+$/;
        color = color.substring(1);
        if((color.length === 3 || 6 === color.length || color.length === 8) && reg.test(color)) {
          this.hasError[index] = false;
          this.flush();
          return;
        }
      }
      this.hasError[index] = true;
      this.huadiaoMiddleTip(this.errorTip[index]);
    },
    // 图片改变
    pictureChange() {
      this.backgroundType = "image";
      this.flush();
    },
    // 从调色板选择颜色
    chooseColor(index) {
      this.$bus.$emit("modifyColorChangeCallback", (value) => {
        this.judgeBackgroundType();
        this.multiplyRightInput[index].color = value;
        this.flush();
      });
    },
    addColor() {
      if(this.multiplyRightInput.length === 1) {
        this.multiplyRightInput.splice(1, 1, {placeholder: "二", color: "",});
        this.preMultiplyColor.splice(1, 1, {color: ""});
      } else if(this.multiplyRightInput.length === 2) {
        this.multiplyRightInput.splice(2, 1, {placeholder: "三", color: "",});
        this.preMultiplyColor.splice(2, 1, {color: ""});
      }
      this.judgeBackgroundType();
    },
    removeColor() {
      if(this.multiplyRightInput.length > 1) {
        this.multiplyRightInput.pop();
        this.preMultiplyColor.pop();
        this.hasError.splice(this.multiplyRightInput.length - 1, 1);
      }
      this.judgeBackgroundType();
    },
    confirmOperate() {
      if(this.checkError()) {
        return;
      }
      if(this.backgroundType === "image") {
        this.confirmCallback && this.confirmCallback(this.$refs.imageInput.files[0]);
      }
      else {
        this.confirmCallback && this.confirmCallback(this.finallyResult);
      }
      this.closeMultiplyColorBoard();
    },
    cancelOperate() {
      this.closeMultiplyColorBoard();
      this.realTimeCallback && this.realTimeCallback(this.background);
    },
    closeMultiplyColorBoard() {
      this.$bus.$emit("closeMultiplyColorBoard");
    },
    // 判断背景类型
    judgeBackgroundType() {
      if(this.multiplyRightInput.length === 1) {
        this.backgroundType = "color";
      }
      else if(this.multiplyRightInput.length > 1) {
        this.backgroundType = "gradient";
      }
    },
    checkError() {
      for(let index = 0, length = this.hasError.length; index < length; index++) {
        if(this.hasError[index] === true) {
          this.huadiaoMiddleTip(this.errorTip[index]);
          return true;
        }
      }
      return false;
    },
    flush() {
      if(this.checkError()) {
        return;
      }
      if(this.backgroundType === "color")
        this.handleBackgroundColor();
      else if(this.backgroundType === "gradient")
        this.handleGradientBackgroundColor();
      else if(this.backgroundType === "image")
        this.handleBackgroundImage();
      // 实时响应
      this.realTimeCallback && this.realTimeCallback(this.finallyResult);
    },
    // 处理单色
    handleBackgroundColor() {
      this.finallyResult = this.multiplyRightInput[0].color;
    },
    // 处理背景渐变色
    handleGradientBackgroundColor() {
      let colors = "";
      for (let index = 0, length = this.multiplyRightInput.length; index < length; index++) {
        colors += `, ${this.multiplyRightInput[index].color}`;
      }
      this.finallyResult = `-webkit-linear-gradient(${this.angle}deg${colors})`;
    },
    // 处理背景图片
    handleBackgroundImage() {
      this.finallyResult = this.getImgPath(this.$refs.imageInput);
    },
    // 重置数据
    reset() {
      this.hasError = [];
      this.preAngle = "";
      this.preMultiplyColor = [{color: ""}];
      this.angle = "0";
      this.multiplyRightInput = [{
        placeholder: "一",
        color: "",
      }];
    }
  },
  beforeDestroy() {
  }
}
</script>

<style scoped>
.multiply-board {
  position: absolute;
  z-index: 5;
  top: 160px;
  left: 300px;
  width: 320px;
  padding: 30px;
  letter-spacing: 2px;
  border-radius: 8px;
  background-color: #fff;
  transition: opacity 500ms;
}

.multiply-title {
  text-align: center;
  padding-bottom: 10px;
  font-size: 20px;
  color: rgb(32, 169, 233);
}

.angle div {
  color: #333;
  font-size: 14px;
}

input::-webkit-input-placeholder{
  color: #bdbdbd;
  letter-spacing: 2px;
}

.angle input,
.multiply-right-board input {
  width: 100px;
  padding: 5px 10px;
  border: 0;
  border-radius: 6px;
  background-color: rgb(228, 228, 228);
}

.multiply-core {
  display: flex;
}

.multiply-left-board,
.multiply-right-board {
  width: 130px;
}

.multiply-left-board {
  border-right: 1px solid rgb(153, 153, 153);
}

.multiply-right-board {
  padding: 24px 0 0 30px;
}

.add-color,
.remove-color {
  width: 100px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  margin-top: 10px;
  font-size: 12px;
  border-radius: 6px;
}

.add-color,
.confirm {
  color: #fff;
  background-color: rgb(52, 171, 226);
}

.add-color:hover,
.confirm:hover {
  background-color: rgb(50, 161, 213);
}

.remove-color,
.cancel {
  color: rgb(102, 102, 102);
  background-color: rgb(224, 224, 224);
}

.remove-color:hover,
.cancel:hover {
  background-color: rgb(217, 217, 217);
}

.add-tip {
  margin: 10px 0;
  font-size: 12px;
  color: rgb(196, 73, 73);
}

.confirm,
.cancel {
  display: inline-block;
  width: 50px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border-radius: 6px;
  font-size: 16px;
}

.confirm {
  margin-right: 10px;
}

.multiply-color-item {
  position: relative;
  height: 50px;
}

.palette {
  position: absolute;
  top: 0px;
  right: 5px;
}

.palette /deep/ svg {
  width: 16px;
  height: 16px;
  fill: rgb(150, 150, 150);
}

.more-operation {
  padding-top: 10px;
  text-align: center;
  font-size: 12px;
  color: rgb(141, 141, 141);
  cursor: pointer;
}
</style>