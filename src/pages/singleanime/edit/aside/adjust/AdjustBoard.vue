<template>
  <div class="adjust-board aside-board" :class="{closed: !isOpen}">
    <div class="scroll-board">
      <header class="aside-board-header">
        <div class="title">调整</div>
      </header>
      <main class="aside-board-main">
        <KeepAlive>
          <RouterView/>
        </KeepAlive>
      </main>
    </div>
    <CommonButton @click.native="switchAside">
      <AccessIcon :class="{rotate: isOpen}"/>
    </CommonButton>
  </div>
</template>

<script>
import AccessIcon from "@/pages/components/svg/AccessIcon";
import CommonButton from "@/pages/singleanime/edit/aside/component/CommonButton";

export default {
  name: "AdjustBoard",

  components: {
    AccessIcon, CommonButton
  },

  data() {
    return {
      isOpen: true,
    }
  },

  methods: {
    switchAside() {
      this.isOpen = !this.isOpen;
    }
  },
}
</script>

<style scoped lang="scss">
@import "../aside-board";

.left-radius {
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
}

.adjust-board::v-deep {
  @extend .left-radius;
  right: 0;

  &.closed {
    transform: translateX(100%);
  }

  .common-button {
    @extend .left-radius;
    left: 0;
    transform: translate(-100%, -50%);

    svg {
      transform: rotate(90deg);

      &.rotate {
        transform: rotate(-90deg);
      }
    }
  }

  .aside-board-header {
    border-top-left-radius: 6px;
  }
}
</style>