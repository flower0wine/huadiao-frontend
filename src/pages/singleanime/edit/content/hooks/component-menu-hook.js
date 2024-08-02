/**
 * 功能描述：
 * 创建日期：2024 年 05 月 16 日
 */

// 使用严格模式
'use strict';

import {
    mapMutations,
    mapState,
} from "vuex";
import {
    DomHandler,
    Generator,
    MouseEventHandler,
} from "@/util";
import {ACTIVE_CLASS_NAME} from "@/constant";
import {generateUniqueWindowId} from "@/pages/components/window/window-manager";
import {EDIT_COMPONENT_NAME} from "@/pages/singleanime/edit/content/anime-component-config";
import subscribeCenter from "@/pages/singleanime/edit/content/hooks/subscribe-center";


const {addOrRemoveClassNames} = DomHandler;
const {randomAlphaString} = Generator;
const {addClickCallback, removeClickCallback} = MouseEventHandler;

const {
    notifyAddComponent,
    notifyRemoveComponent,
} = subscribeCenter;

let clickCallback = null;

const EDIT_WINDOW = Symbol("edit-window");

/**
 * 组件与窗口的映射, 通过组件寻找窗口, 例子
 * <p>
 * <p>let componentId: string; </p>
 * <p>let windowId: Symbol;</p>
 * <p>
 * let obj = {
 *     [componentId]: {
 *         EDIT_WINDOW: windowId,
 *     }
 * }
 * </p>
 * </p>
 * @type {Map<string, Map<Symbol, Symbol>>}
 */
const componentFindWindowMap = new Map();

/**
 * 组件与窗口的映射, 通过窗口寻找组件
 * @type {Map<Symbol, string>}
 */
const windowFindComponentMap = new Map();

/**
 * 组件集合, 防止 id 重复
 * @type {Set<string>}
 */
const componentSet = new Set();


export default {
    data() {
        return {
            componentMap: {},
            showContextMenu: false,
            activeComponentNode: null,
            contextMenu: {
                top: 0,
                left: 0,
            },
        };
    },

    computed: {
        ...mapState("component", [
            "contextMenuComponentInfo",
        ]),
    },

    created() {
        clickCallback = this.hideContextMenu.bind(this);
        addClickCallback(clickCallback);
    },

    beforeDestroy() {
        removeClickCallback(clickCallback);
    },

    methods: {
        ...mapMutations("component", [
            "incrementRemainingQuantity",
            "setContextMenuComponentInfo",
        ]),

        /**
         * 获取窗口 id
         * @param componentId{string}
         * @param componentType{symbol}
         * @return {symbol}
         */
        getWindowId(componentId, componentType) {
            let windowId;

            // 设置组件与窗口的映射, 没有就添加
            let windowMap;
            if (componentFindWindowMap.has(componentId)) {
                windowMap = componentFindWindowMap.get(componentId);
            } else {
                windowMap = new Map();
                componentFindWindowMap.set(componentId, windowMap);
            }

            // 获取窗口 id
            if (!windowMap.has(componentType)) {
                windowId = generateUniqueWindowId(`anime-component-window-${randomAlphaString(8)}`);

                windowMap.set(componentType, windowId);
                windowFindComponentMap.set(windowId, componentId);
            } else {
                windowId = windowMap.get(componentType);
            }

            return windowId;
        },

        /**
         * 如果没有该布局, 则创建该布局
         */
        handleComponentLayout(layoutNames) {
            // 没有该布局, 则创建该布局
            layoutNames.forEach(layoutName => {
                if (!(layoutName in this.componentMap)) {
                    // 使其具有响应式, 填充数组是因为 VueDraggable需要数组
                    this.$set(this.componentMap, layoutName, []);
                }
            });

            // 多余的布局则删除
            for (let layoutName in this.componentMap) {
                if (!layoutNames.includes(layoutName)) {
                    this.$delete(this.componentMap, layoutName);
                }
            }
        },

        /**
         * 新增组件到布局中
         * @param evt{Object} 由 sortablejs 传递的拖动信息
         * @param layoutName{string} 布局名称
         */
        addComponent(evt, layoutName) {
            const index = evt.newIndex;
            let id = randomAlphaString(8);

            // 使用循环来避免重复 id
            while (componentSet.has(id)) {
                id = randomAlphaString(8);
            }
            componentSet.add(id);

            // 设置组件唯一标识
            this.componentMap[layoutName][index].id = id;
            notifyAddComponent(id);
        },

        /**
         * 根据指定的参数移除组件
         * @param componentInfo{Object}
         */
        removeComponent(componentInfo) {

            // 增加组件数量
            this.incrementRemainingQuantity(componentInfo.name);

            // 通知组件移除
            const map = componentFindWindowMap.get(componentInfo.id);
            if (map) {
                const windowIds = Array.from(map.values());
                notifyRemoveComponent(windowIds);
            }
        },

        /**
         * 移除右键选中的组件
         */
        removeContextMenuComponent() {
            const info = this.contextMenuComponentInfo;
            const index = info.componentIndex;

            const componentArr = this.componentMap[info.name];
            componentArr.splice(index, 1);
        },

        removeWindowMapping(windowId) {
            const componentId = windowFindComponentMap.get(windowId);

            if (componentId) {
                windowFindComponentMap.delete(windowId);
                componentFindWindowMap.get(componentId).delete(windowId);
                return true;
            }
            return false;
        },

        editComponent() {
            const {id: componentId, info} = this.contextMenuComponentInfo;

            const windowId = this.getWindowId(componentId, EDIT_WINDOW);

            // 对要传递的数据进行处理
            const obj = {
                ...info,
            };
            obj.componentId = obj.id;
            obj.text = `编辑${obj.text}`;
            delete obj.id;

            obj.windowId = windowId;
            obj.component = EDIT_COMPONENT_NAME;

            // 获取组件样式
            const style = this.getComponentStyle(this.activeComponentNode);
            const transferData = {};
            transferData.style = style;
            transferData.componentId = componentId;
            transferData.windowId = windowId;

            this.addComponentStyle(componentId, transferData);

            obj.transferData = transferData;

            // 展示编辑窗口
            this.showWindow(windowId, obj);
        },

        handleContextMenu(e, componentInfo, layoutName, layoutIndex, componentIndex) {

            // 右键出菜单时再右键出其他菜单时，先隐藏掉当前菜单
            if (this.activeComponentNode !== null) {
                this.hideContextMenu();
            }

            this.showContextMenu = true;

            // 记录当前点击的组件信息
            this.setContextMenuComponentInfo({
                id: componentInfo.id,
                name: layoutName,
                info: componentInfo,
                layoutIndex,
                componentIndex
            });

            // 被右键的 AnimeComponent 组件元素
            this.activeComponentNode = e.currentTarget;

            const {clientX, clientY} = e;

            addOrRemoveClassNames(e.currentTarget, ACTIVE_CLASS_NAME);

            this.contextMenu.top = clientY;
            this.contextMenu.left = clientX;
        },

        hideContextMenu() {
            this.showContextMenu = false;
            addOrRemoveClassNames(this.activeComponentNode, ACTIVE_CLASS_NAME, false);

            // 清空右键节点信息
            this.activeComponentNode = null;
        },


    },
}