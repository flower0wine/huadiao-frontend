<template>
  <div class="aside-list">
    <VueDraggable v-model="components"
                  @remove="removeItem"
                  v-bind="options">
      <AsideItem v-for="(item, index) in components"
                 :class="{disabled: item.remainingQuantity === 0}"
                 :key="index">
        <component :is="item.name"></component>
        <span>{{ item.text }}</span>
        <RemainingQuantity :remaining-quantity="item.remainingQuantity"/>
      </AsideItem>
    </VueDraggable>
  </div>
</template>

<script>
import {VueDraggable} from "vue-draggable-plus";
import AsideItem from "@/pages/singleanime/edit/aside/component/AsideItem";
import PictureIcon from "@/pages/components/svg/PictureIcon";
import NavigationIcon from "@/pages/components/svg/NavigationIcon";
import VideoIcon from "@/pages/components/svg/VideoIcon";
import RemainingQuantity from "@/pages/singleanime/edit/aside/component/RemainingQuantity";
import {VUE_DRAGGABLE_GROUP_ANIME_CONTAINER_NAME} from "@/pages/singleanime/edit/vuedraggable-config";
import {mapMutations, mapState} from "vuex";

export default {
  name: "AsideList",

  components: {
    RemainingQuantity,
    VideoIcon,
    NavigationIcon,
    PictureIcon,
    AsideItem,
    VueDraggable
  },

  methods: {
    ...mapMutations("component", [
        "decrementRemainingQuantity",
    ]),

    removeItem(e) {
      this.decrementRemainingQuantity(this.components[e.oldIndex].name);
    },
  },

  computed: {
    ...mapState("component", [
        "components",
    ]),

    options() {
      return {
        group: {
          name: VUE_DRAGGABLE_GROUP_ANIME_CONTAINER_NAME,
          put: false,
          pull: "clone"
        },
        filter: ".disabled",
        sort: false,
        animation: 200,
        fallbackOnBody: true,
      };
    }
  },

}
</script>

<style scoped lang="scss">

$color: #505050;
$disabledColor: #9e9e9e;

.aside-list::v-deep {
  padding: 0 20px;

  .aside-item {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    height: 40px;
    padding: 0 10px;
    margin: 10px 0;
    border-radius: 6px;
    border: 1px solid #e5e5e5;
    cursor: pointer;
    color: #{$color};
    user-select: none;

    &:hover {
      background-color: #f5f5f54f;
      cursor: grab;
    }

    &:active {
      cursor: grabbing;
    }

    &.disabled {
      color: #{$disabledColor};
      cursor: not-allowed !important;

      .remaining-quantity {
        background-color: #{$disabledColor};
      }

      svg {
        fill: #{$disabledColor};
      }
    }

    .remaining-quantity {
      $size: 18px;

      position: absolute;
      z-index: 2;
      top: 0;
      right: 0;
      min-width: #{$size};
      height: #{$size};
      text-align: center;
      line-height: #{$size};
      font-size: 12px;
      padding: 0 6px;
      border-radius: #{$size / 2};
      color: #fff;
      background-color: #ff5722;
      transform: translate(50%, -50%);
    }

    svg {
      $size: 20px;

      width: #{$size};
      height: #{$size};
      fill: #{$color};
      margin-right: 10px;
    }
  }
}

</style>