<template>
  <div class="anime-editor">
    <div class="anime-container">
      <AnimeContainer></AnimeContainer>
    </div>
    <Teleport to="body">
      <TaskBar :task-bar-id="defaultTaskBarId"/>
      <ComponentBoard/>
      <AdjustBoard/>
    </Teleport>
  </div>
</template>

<script>
import AnimeContainer from "@/pages/singleanime/edit/content/AnimeContainer";
import ComponentBoard from "@/pages/singleanime/edit/aside/component/ComponentBoard";
import AdjustBoard from "@/pages/singleanime/edit/aside/adjust/AdjustBoard";
import Teleport from "@/pages/components/Teleport";
import TaskBar from "@/pages/components/window/taskbar/TaskBar";
import {Generator} from "@/util";
import {generateUniqueTaskBarId} from "@/pages/components/window/window-manager";
import {DEFAULT_TASK_BAR_NAME} from "@/pages/singleanime/edit/task-bar-config";
import {mapMutations} from "vuex";

const {randomAlphaString} = Generator;

export default {
  name: "AnimeEditor",

  computed: {
    // 默认的任务栏 ID
    defaultTaskBarId() {
      return generateUniqueTaskBarId(`task-bar-${randomAlphaString(8)}`);
    },
  },

  created() {
    // 由于任务栏和窗口是多对多的关系, 所以这里需要进行集中管理
    this.addTaskBar({
      barName: DEFAULT_TASK_BAR_NAME,
      barId: this.defaultTaskBarId
    });
  },

  methods: {
    ...mapMutations("taskWindow", [
        "addTaskBar",
    ]),
  },


  components: {
    TaskBar,
    Teleport,
    AdjustBoard,
    AnimeContainer,
    ComponentBoard,
  },
}
</script>

<style scoped lang="scss">
$taskBarHeight: 40px;

.anime-editor {
  height: calc(100vh - #{$taskBarHeight});
  user-select: none;
  transform: translateZ(0);
  overflow: auto;
}

.anime-container {
  height: 100%;
}

.aside-board::v-deep {
  height: calc(100vh - #{$taskBarHeight});
}

.task-bar::v-deep {
  height: #{$taskBarHeight};
}
</style>