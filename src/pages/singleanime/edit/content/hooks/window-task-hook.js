/**
 * 功能描述：
 * 创建日期：2024 年 05 月 16 日
 */

// 使用严格模式
'use strict';

import {DEFAULT_TASK_BAR_NAME} from "@/pages/singleanime/edit/task-bar-config";
import {mapGetters} from "vuex";
import subscribeCenter from "@/pages/singleanime/edit/content/hooks/subscribe-center";


const {
    subscribeRemoveComponent,
    unsubscribeRemoveComponent,
} = subscribeCenter;

const windowSet = new Set();

const windowApis = new Map();

let callback;

export default {
    data() {
        return {
            windows: [],

            windowVisible: {},
        };
    },

    computed: {
        ...mapGetters("taskWindow", [
            "getTaskBarId",
        ]),

        defaultTaskBarId() {
            return this.getTaskBarId(DEFAULT_TASK_BAR_NAME);
        },

        windowApis() {
            return windowApis;
        },
    },

    created() {
        callback = this.patchDeleteTask.bind(this);

        // 删除组件将连带窗口删除
        subscribeRemoveComponent(callback);
    },

    beforeDestroy() {
        unsubscribeRemoveComponent(callback);
    },

    methods: {
        showWindow(windowId, windowInfo) {
            if (!windowId) {
                return;
            }

            if (!windowSet.has(windowId)) {
                this.addWindow(windowId, windowInfo);
            }

            let apis = windowApis.get(windowId);
            if (apis) {
                apis.show();
            }
        },

        addWindow(windowId, windowInfo) {
            windowSet.add(windowId);
            this.windows.push(windowInfo);
        },

        removeWindow(windowId) {
            if (!windowId || !windowSet.has(windowId)) {
                return false;
            }

            windowSet.delete(windowId);

            const index = this.windows.findIndex((windowInfo) => windowInfo.id === windowId);
            if (index >= 0) {
                this.windows.splice(index, 1);
            }
            return true;
        },

        setWindowVisible(windowId, visible) {
            // $set 使得新增属性具有响应式
            this.$set(this.windowVisible, windowId, visible);
        },

        deleteWindowVisible(windowId) {
            this.removeWindow(windowId);
            // windowVisible 得保持响应式
            this.$delete(this.windowVisible, windowId);
        },

        /**
         * 批量删除任务
         * @param windowIds{[Symbol]}
         */
        patchDeleteTask(windowIds) {
            for(const windowId of windowIds) {
                this.deleteTask(windowId);
            }
        },

        deleteTask(windowId) {
            this.windowApis.delete(windowId);
            this.deleteWindowVisible(windowId);

            const index = this.windows.findIndex((windowInfo) => windowInfo.windowId === windowId);
            if (index >= 0) {
                this.windows.splice(index, 1);
            }
        },

        /**
         * 获取窗口的 API
         * @return {function}
         */
        getWindowApis(windowId) {
            return (apis) => {
                windowApis.set(windowId, apis);
            }
        },

        closeWindow(cancel, windowId) {
            this.deleteTask(windowId);
            this.setWindowVisible(windowId, false);
            this.removeWindowMapping(windowId);
        },

    },
}