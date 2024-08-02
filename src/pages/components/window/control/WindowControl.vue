<template>
  <div class="controls">
    <div class="control minimize"
         @click="$emit('minimize')"
         title="最小化">
      <MinimizeIcon/>
    </div>
    <div class="control maximize"
         v-if="!isMaximized"
         @click="maximize"
         title="最大化">
      <MaximizeIcon/>
    </div>
    <div class="control restore"
         v-else
         @click="restore"
         title="向下还原">
      <RestoreDownIcon/>
    </div>
    <div class="control close"
         @click="$emit('close')"
         title="关闭">
      <CloseIcon/>
    </div>
  </div>
</template>

<script>
import CloseIcon from "@/pages/components/window/icon/CloseIcon";
import MaximizeIcon from "@/pages/components/window/icon/MaximizeIcon";
import MinimizeIcon from "@/pages/components/window/icon/MinimizeIcon";
import RestoreDownIcon from "@/pages/components/window/icon/RestoreDownIcon";
import {WINDOW_CONTROL_EMIT_EVENTS} from "@/pages/components/window/window-config";

export default {
  name: "WindowControl",

  props: {
    isMaximized: {
      type: Boolean,
      default: false,
    }
  },

  emits: [...WINDOW_CONTROL_EMIT_EVENTS],

  methods: {
    maximize() {
      this.$emit('maximize');
    },

    restore() {
      this.$emit('restore');
    },
  },

  components: {RestoreDownIcon, CloseIcon, MaximizeIcon, MinimizeIcon},
}
</script>

<style scoped lang="scss">
.controls {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  display: flex;
  align-items: center;
}

.control::v-deep {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 100%;
  cursor: pointer;

  &:hover {
    background-color: #919191A9;
  }

  &.close:hover {
    background-color: #ec4646;
  }

  svg {
    width: 18px;
    height: 18px;
    fill: #fff;
    vertical-align: -2px;
  }
}
</style>