<template>
  <aside class="anime-aside aside-board" :class="{closed: !isOpen}">
    <div class="scroll-board">
      <header class="aside-board-header">
        <div class="title">番剧组件</div>
      </header>
      <main class="aside-board-main">
        <AsideList/>
      </main>
    </div>
    <CommonButton @click.native="switchAside">
      <AccessIcon :class="{rotate: isOpen}"/>
    </CommonButton>
  </aside>
</template>

<script>
import CommonButton from "@/pages/singleanime/edit/aside/component/CommonButton";
import AccessIcon from "@/pages/components/svg/AccessIcon";
import AsideList from "@/pages/singleanime/edit/aside/component/AsideList";

export default {
  name: "ComponentBoard",

  components: {AsideList, AccessIcon, CommonButton},

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

.right-radius {
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
}

.anime-aside::v-deep {
  @extend .right-radius;
  left: 0;

  &.closed {
    transform: translateX(-100%);
  }

  .common-button {
    @extend .right-radius;
    right: 0;
    transform: translate(100%, -50%);

    svg {
      transform: rotate(-90deg);

      &.rotate {
        transform: rotate(90deg);
      }
    }
  }

  .aside-board-header {
    border-top-right-radius: 6px;
  }
}
</style>