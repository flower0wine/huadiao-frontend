<template>
  <div class="anime-container"
       :style="pageLayout">

    <!-- 布局解释：每个 VueDraggable 组件对应一个布局，每个 AnimeComponent 组件对应布局中的一个组件 -->
    <VueDraggable v-for="(layout, layoutIndex) in layoutList"
                  :key="layout.name"
                  v-model="componentMap[layout.name]"
                  :style="`grid-area: ${layout.name};`"
                  class="component-container"
                  v-bind="options"
                  @add="addComponent($event, layout.name)"
                  ref="componentContainerList">

      <AnimeComponent v-for="(component, componentIndex) in componentMap[layout.name]"
                      :key="component.id"
                      :mapping="component.mapping"
                      :style-obj="componentStyle[component.id]?.style"
                      @beforeDestroy="removeComponent(component)"
                      @contextmenu.native.prevent="handleContextMenu($event, component, layout.name, layoutIndex, componentIndex)">
      </AnimeComponent>
    </VueDraggable>

    <Window v-for="windowInfo in windows"
            :key="windowInfo.windowId"
            :get-window-apis="getWindowApis(windowInfo.windowId)"
            :id="windowInfo.windowId"
            :name="windowInfo.text"
            :task-bar-id="defaultTaskBarId"
            @close="closeWindow($event, windowInfo.windowId)">

      <EditComponent :data="componentStyle[windowInfo.componentId].style"/>
    </Window>

    <ComponentContextMenu v-if="showContextMenu"
                          :top="contextMenu.top"
                          :left="contextMenu.left"
                          @delete="removeContextMenuComponent"
                          @edit="editComponent"/>
  </div>
</template>

<script>
import ComponentContextMenu from "@/pages/singleanime/edit/content/ComponentContextMenu";
import {VueDraggable} from "vue-draggable-plus";
import {VUE_DRAGGABLE_GROUP_ANIME_CONTAINER_NAME} from "@/pages/singleanime/edit/vuedraggable-config";
import AnimeComponent from "@/pages/singleanime/edit/content/AnimeComponent";
import Window from "@/pages/components/window/Window";
import EditComponent from "@/pages/singleanime/edit/content/EditComponent";
import windowTaskMixin from "@/pages/singleanime/edit/content/hooks/window-task-hook";
import layoutMixin from "@/pages/singleanime/edit/content/hooks/layout-hook";
import componentMenuMixin from "@/pages/singleanime/edit/content/hooks/component-menu-hook";
import componentStyleHookMixin from "@/pages/singleanime/edit/content/hooks/component-style-hook";

export default {
  name: "AnimeContainer",

  mixins: [
    windowTaskMixin,
    layoutMixin,
    componentMenuMixin,
    componentStyleHookMixin,
  ],

  computed: {
    options() {
      return {
        animation: 200,
        group: VUE_DRAGGABLE_GROUP_ANIME_CONTAINER_NAME,
      };
    },

  },

  components: {
    EditComponent,
    AnimeComponent,
    ComponentContextMenu,
    VueDraggable,
    Window,
  }
}
</script>

<style scoped lang="scss">
@import "~@/pages/singleanime/edit/aside/animation.scss";

@include flicker-animation(6);

.anime-container::v-deep {
  min-height: 100%;

  $color: #505050;

  .aside-item {
    position: relative;
    display: flex;
    align-items: center;
    height: 40px;
    padding: 0 10px;
    margin: 10px 0;
    border-radius: 6px;
    border: 1px solid #e5e5e5;
    color: #{$color};
    cursor: pointer;
    user-select: none;

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
  }

  svg {
    $size: 20px;

    width: #{$size};
    height: #{$size};
    fill: #{$color};
    margin-right: 10px;
  }
}

.component-container {
  position: relative;
  min-height: 20px;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -999;
    transition: background-color 0.3s linear;
  }

  &.active::before {
    z-index: 999;
    background-color: #e06d6d;
    animation: flicker 2s 0.3s linear forwards;
  }
}

</style>