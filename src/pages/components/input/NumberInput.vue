<template>
  <div class="number-input">
    <label :for="inputId">
      <slot></slot>
    </label>
    <div class="input-container">
      <div class="input-box">
        <input type="text"
               :id="inputId"
               autocomplete="off"
               :value="modelValue"
               @input="$emit('update', parseInt($event.target.value))">
        <div class="unit-text">{{ unit }}</div>
      </div>
      <div class="tools" @mouseup="mouseupHandler($event)">
        <div class="tool increase-tool"
             @mousedown="mousedownHandler($event, 1)">
          <AddIcon/>
        </div>
        <div class="tool decrease-tool"
             @mousedown="mousedownHandler($event, -1)">
          <ReduceIcon/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Generator, MouseButtonHandler} from "@/util";
import AddIcon from "@/pages/components/input/AddIcon";
import ReduceIcon from "@/pages/components/input/ReduceIcon";

const {randomAlphaString} = Generator;
const {isMainMouseButton} = MouseButtonHandler;

let mousedown = false;
let timer;

export default {
  name: "NumberInput",
  components: {ReduceIcon, AddIcon},
  props: {
    modelValue: {
      type: Number,
      required: true,
    },

    unit: {
      type: String,
      default: "",
    },
  },

  emits: ["update"],

  computed: {
    inputId() {
      return randomAlphaString(10);
    },
  },

  methods: {
    updateModelValue(value) {
      this.$emit("update", value);
    },

    mousedownHandler(event, incr) {
      if (isMainMouseButton(event)) {
        mousedown = true;

        let fn = () => {
          // 节流, 同时使用异步防止页面卡顿
          window.setTimeout(() => {
            if (mousedown) {
              this.updateModelValue(this.modelValue + incr);
              fn();
            }
          }, 30);
        };

        // 鼠标持续按下 500 ms 后执行
        timer = window.setTimeout(fn, 300);

        this.updateModelValue(this.modelValue + incr);
      }
    },

    mouseupHandler(event) {
      if (isMainMouseButton(event)) {
        mousedown = false;

        timer && window.clearTimeout(timer);
      }
    }
  },
}
</script>

<style scoped lang="scss">
$borderRadius: 5px;
$borderColor: #ccc;
$inputBgColor: #fff;

.number-input {
  display: flex;
  align-items: center;
  background-color: #{$inputBgColor};
}

.input-container {
  display: flex;
  height: 30px;
}

.input-box {
  position: relative;

  input {
    width: 100px;
    height: 100%;
    margin-left: 20px;
    border: 1px solid #{$borderColor};
    border-top-left-radius: #{$borderRadius};
    border-bottom-left-radius: #{$borderRadius};
    padding-left: 10px;
  }
}

.unit-text {
  position: absolute;
  top: 50%;
  right: 10px;
  // 减去 3px 是为了让文字居中, 因为单位文字都是小写的, 所以正常居中会显示偏下
  transform: translateY(calc(-50% - 3px));
  font-size: 14px;
}

.tools {
  display: flex;
  align-items: center;
  height: 100%;
  user-select: none;

  .tool {
    display: grid;
    place-items: center;
    height: 100%;
    aspect-ratio: 1;
    border: 1px solid #{$borderColor};
    border-left: 0;

    &:hover {
      background-color: darken($inputBgColor, 5%);
    }

    svg {
      width: 14px;
      height: 14px;
    }

    &:last-child {
      border-top-right-radius: #{$borderRadius};
      border-bottom-right-radius: #{$borderRadius};
    }
  }
}
</style>