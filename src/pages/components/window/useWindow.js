/**
 * 功能描述：
 * 创建日期：2024 年 05 月 11 日
 */

// 使用严格模式
'use strict';

import {WINDOW_CONTROL_EMIT_EVENTS, WINDOW_MIN_WIDTH, WINDOW_MIN_HEIGHT} from "@/pages/components/window/window-config";
import {
    eachAllWindowTask,
    handleMapping,
    transferMappingToMaxPosition
} from "@/pages/components/window/window-manager";
import {isMainMouseButton} from "@/util/mouse-button";

const props = {
    getWindowNode: {
        type: Function,
        default: () => {
        },
    },

    width: {
        type: Number,
        default: 400,
    },

    height: {
        type: Number,
        default: 260,
    },

    // getWindowId
    id: {
        type: Symbol,
        default: Symbol(),
    },

    taskBarId: {
        type: Symbol,
        required: true,
    },

    name: {
        type: String,
        default: "Window",
    },

    icon: {
        type: String,
        default: "DefaultWindowIcon",
    },

    getWindowApis: {
        type: Function,
        default: () => {
        },
    }
};


const emits = [...WINDOW_CONTROL_EMIT_EVENTS];


/**
 * 处理窗口显示层级
 */
function handleWindowRank() {
    if (transferMappingToMaxPosition(this.id)) {
        handleMapping((map) => {
            eachAllWindowTask((info) => {
                info.el.style.zIndex = map.get(info.id);
            });
        });
    }
}


function handleHeaderMouseDown(e) {
    const {clientX: mousedownX, clientY: mousedownY} = e;
    let top = this.top;
    let left = this.left;

    // 鼠标主键按下, 通常是左键
    // https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent/button
    if (isMainMouseButton(e)) {
        const mousemove = (e) => {
            // 最大化时移动头部恢复窗口
            if (this.isMaximized) {
                this.restoreWindow(false);

                // 按照按下的 x 与窗口宽度的比例计算窗口的 left
                left = mousedownX - mousedownX * (this.windowWidth / window.innerWidth);
                top = 0;
            }

            const {clientX: mousemoveX, clientY: mousemoveY} = e;

            this.top = top + (mousemoveY - mousedownY);
            this.left = left + (mousemoveX - mousedownX);
        };
        const mouseup = () => {
            document.removeEventListener("mousemove", mousemove);
            document.removeEventListener("mouseup", mouseup);
        };

        document.addEventListener("mousemove", mousemove);
        document.addEventListener("mouseup", mouseup);
    }
}


/**
 * 浏览器窗口大小变化时更新窗口大小
 */
function handleBrowserResize() {
    if (this.isMaximized) {
        const {innerWidth, innerHeight} = window;
        setWidth.call(this, innerWidth);
        setHeight.call(this, innerHeight);
    }
}

/**
 * 设置窗口宽度
 * @param width{number}
 * @return {boolean} 达到最小宽度则返回 false
 */
function setWidth(width) {
    let succeed = true;

    if (width < WINDOW_MIN_WIDTH) {
        width = WINDOW_MIN_WIDTH;
        succeed = false;
    }
    this.windowWidth = width;
    return succeed;
}

function setHeight(height) {
    let succeed = true;

    if (height < WINDOW_MIN_HEIGHT) {
        height = WINDOW_MIN_HEIGHT;
        succeed = false;
    }
    this.windowHeight = height;
    return succeed;
}

export default function useWindow() {

    return {
        props,
        emits,
        handleWindowRank,
        handleHeaderMouseDown,
        handleBrowserResize,
        setWidth,
        setHeight,
    }
}