<template>
  <div class="task-bar">
    <VueDraggable v-bind="options"
                  class="task-list"
                  v-model="taskList">

      <WindowTask v-for="item in taskList"
                  :key="item.id"
                  :info="item"
                  :custom-menu-position="customMenuPosition"
                  :apis="item.apis">

        <template #default>
          <div class="icon-container">
            <component :is="item.icon"/>
          </div>
        </template>

        <template #menu>
        </template>
      </WindowTask>
    </VueDraggable>
  </div>
</template>

<script>
import {addTaskBar, removeTaskBar, getTaskMapById, subscribe} from "@/pages/components/window/window-manager";
import WindowTask from "@/pages/components/window/taskbar/WindowTask";
import DefaultWindowIcon from "@/pages/components/window/icon/DefaultWindowIcon";
import WindowTaskContextMenu from "@/pages/components/window/taskbar/WindowTaskContextMenu";
import {VueDraggable} from "vue-draggable-plus";

let unsubscribe;

export default {
  name: "TaskBar",

  components: {
    VueDraggable,
    WindowTaskContextMenu,
    DefaultWindowIcon,
    WindowTask,
  },

  props: {
    // 这里的 taskBarId 表示这是哪个任务栏
    taskBarId: {
      type: Symbol,
      default: Symbol(),
    },
  },

  computed: {
    options() {
      return {
        group: "task-list",
        animation: 200,
      };
    },
  },

  data() {
    return {
      time: null,
      taskList: null,
    };
  },

  created() {
    addTaskBar(this.taskBarId);

    this.updateTaskList();

    // Subscribe to task list changes
    unsubscribe = subscribe(this.updateTaskList);
  },

  beforeDestroy() {
    removeTaskBar(this.taskBarId);

    // Unsubscribe from task list changes
    unsubscribe();
  },

  methods: {
    updateTaskList() {
      const taskMap = getTaskMapById(this.taskBarId);
      if (taskMap) {
        this.taskList = Array.from(taskMap.values());
      }
    },

    customMenuPosition(menuRect, windowTaskRect) {
      const {width: menuWidth, height: menuHeight} = menuRect;
      const {top: taskTop, left: taskLeft, width: taskWidth} = windowTaskRect;
      const between = 5;

      return {
        top: taskTop - menuHeight - between,
        left: taskLeft + taskWidth / 2 - menuWidth / 2,
      };
    },
  },
}
</script>

<style scoped lang="scss">
.task-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(3px);
  background-color: #949494a3;
  user-select: none;
}

.task-list::v-deep {
  height: 100%;
  display: flex;
  align-items: center;
  padding: 2px;

  .window-task {
    height: 100%;
    aspect-ratio: 1 / 1;
    padding: 6px;
    background-color: #fff;
    border-radius: 5px;
    margin-inline: 2px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);

    &:hover {
      background-color: #f2f2f2;
    }

    &:active .icon-container svg {
      animation: pressDown 0.1s linear;
    }
  }
}

@keyframes pressDown {
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(2px, 2px);
  }
  100% {
    transform: translate(0, 0);
  }
}

.icon-container::v-deep {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  svg {
    width: 20px;
    height: 20px;
  }
}
</style>