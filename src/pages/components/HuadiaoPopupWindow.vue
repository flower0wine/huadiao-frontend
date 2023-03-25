<template>
  <transition name="upright-slide">
    <div class="huadiao-popup-window-container" v-if="isShow">
      <div class="huadiao-popup-window">
        <div class="popup-window-header">
          <div class="tip-type">
            <img :src="'/svg/' + config.icon[iconType] + '.svg'" alt="">
          </div>
          <div class="tip-title">{{config.tipTitle[iconType]}}</div>
        </div>
        <div class="tip-container">{{tip}}</div>
        <div class="operation-options">
          <div class="confirm-or-cancel" v-if="config.operation.confirmOrCancel">
            <div class="confirm"
                 @click="clickConfirm"
                 ref="confirm"
            >确认</div>
            <div class="cancel"
                 @click="clickCancel"
                 ref="cancel"
            >取消</div>
          </div>
          <div class="has-read" v-else-if="config.operation.hasRead" @click="isShow = false">已阅</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import {Timer} from "@/assets/js/utilsClass";

export default {
  name: "HuadiaoPopupWindow",
  data() {
    return {
      isShow: false,
      // 默认值
      iconType: "warning",
      operationType: "confirmOrCancel",
      tip: "",
      // 操作类型
      operation: {
        confirmOrCancel: false,
        hasRead: false,
      },
      // 配置
      config: {
        // 图标选择
        icon: {
          warning: "warning",
          completed: "completed",
          error: "error",
          info: "info-color",
        },
        // 选择的操作类型类型
        operation: {
          confirmOrCancel: "confirmOrCancel",
          hasRead: "hasRead",
          none: "none",
        },
        // 提示标题
        tipTitle: {
          warning: "警告",
          completed: "成功",
          error: "错误",
          info: "信息",
        },
      },
      // 回调函数
      callback: {
        confirmCallback: null,
        cancelCallback: null,
      },
      timer: new Timer(),
    }
  },
  beforeMount() {
    this.$bus.$on("huadiaoPopupWindow", this.modifyTipType);
  },
  methods: {
    /**
     * 修改提示类型
     * @param iconType 图标类型
     * @param operationType 操作类型
     * @param tip 提示
     * @param confirmCallback 确认回调
     * @param cancelCallback 取消回调
     */
    modifyTipType(iconType, operationType, tip, confirmCallback, cancelCallback) {
      this.isShow = true;
      // 如果是字符串
      if(typeof iconType === "string") {
        this.iconType = iconType;
        this.operationType = operationType;
        this.tip = tip;
        // 回调函数
        this.callback.confirmCallback = confirmCallback;
        this.callback.cancelCallback = cancelCallback;
      }
      // 如果是 对象
      else if(typeof iconType === "object") {
        this.operationType = iconType.operationType ? iconType.operationType : this.operationType;
        this.tip = iconType.tip;
        this.callback.confirmCallback = iconType.confirmCallback;
        this.callback.cancelCallback = iconType.cancelCallback;
        this.iconType = iconType.iconType ? iconType.iconType : this.iconType;
      }

      // 确认或取消
      if(operationType === this.config.operation.confirmOrCancel) {
        this.operation.confirmOrCancel = true;
      }
      // 已阅
      else if(operationType === this.config.operation.hasRead) {
        this.operation.hasRead = true;
      }
      // 不选择操作类型
      else if(operationType === this.config.operation.none) {
        this.timer.timeout(() => {
          this.isShow = false;
        }, 2000);
      }
    },
    // 点击确认
    clickConfirm() {
      this.isShow = false;
      this.callback.confirmCallback && this.callback.confirmCallback();
    },
    // 点击取消
    clickCancel() {
      this.isShow = false;
      this.callback.cancelCallback && this.callback.cancelCallback();
    },
  },
  beforeDestroy() {
    this.clearAllRefsEvents();
  }
}
</script>

<style scoped>
.huadiao-popup-window-container {
  position: fixed;
  z-index: 1000;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100vh;
  background-color: transparent;
  transition: var(--transition-500ms);
}

.huadiao-popup-window {
  position: absolute;
  top: 30px;
  left: 50%;
  width: 400px;
  transform: translate(-50%, 0);
  border-radius: 8px;
  color: #fff;
  background-color: rgba(215, 78, 78, 0.28);
  backdrop-filter: blur(2px);
  box-shadow: var(--box-shadow-min);
  transition: var(--transition-500ms);
}

/* 竖直方向上的移动 */
.upright-slide-enter .huadiao-popup-window,
.upright-slide-leave-to .huadiao-popup-window {
  transform: translate(-50%, -80%);
  opacity: 0;
}

.upright-slide-enter-to .huadiao-popup-window,
.upright-slide-leave .huadiao-popup-window {
  transform: translate(-50%, 0);
  opacity: 1;
}

.popup-window-header {
  display: flex;
  align-items: center;
  height: 50px;
  padding-left: 30px;
  font-size: 20px;
  font-weight: 700;
}

.tip-type img {
  width: 20px;
}

.tip-title {
  margin-left: 10px;
}

.tip-container {
  padding: 0 40px;
  text-indent: 1em;
}

.confirm,
.cancel,
.has-read {
  width: 60px;
  height: 36px;
  text-align: center;
  line-height: 36px;
  border-radius: 6px;
  cursor: pointer;
  transition: var(--transition-500ms);
}

.has-read {
  margin: 20px auto;
  background-color: #a170de;
}

.confirm {
  background-color: #a170de;
}

.has-read:hover,
.confirm:hover {
  background-color: #8f63c7;
  transform: translateY(-3px);
  box-shadow: var(--box-shadow-min);
}

.confirm-or-cancel {
  display: flex;
  justify-content: space-between;
  padding: 20px 100px;
}

.cancel {
  background-color: #afaeae;
}

.cancel:hover {
  background-color: #a19f9f;
  transform: translateY(-3px);
  box-shadow: var(--box-shadow-min);
}

</style>