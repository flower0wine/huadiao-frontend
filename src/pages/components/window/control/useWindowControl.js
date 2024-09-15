/**
 * 功能描述：
 * 创建日期：2024 年 05 月 11 日
 */

// 使用严格模式
'use strict';


import {
    WINDOW_CONTROL_EMIT_CLOSE_EVENT,
    WINDOW_CONTROL_EMIT_MAXIMIZE_EVENT,
    WINDOW_CONTROL_EMIT_MINIMIZE_EVENT,
    WINDOW_CONTROL_EMIT_RESTORE_EVENT
} from "@/pages/components/window/window-config";
import useWindow from "@/pages/components/window/useWindow";
import {AnimationHandler} from "@/util";


const {transition} = AnimationHandler;

const {handleWindowRank} = useWindow();

const WINDOW_TRANSITION = "all 0.2s ease";


export default function useWindowControl() {
    let cache;

    function minimizeWindow() {
        if (checkCancelEvent.call(this, WINDOW_CONTROL_EMIT_MINIMIZE_EVENT)) {
            return;
        }

        this.hideWindow();
    }

    function maximizeWindow() {
        if (checkCancelEvent.call(this, WINDOW_CONTROL_EMIT_MAXIMIZE_EVENT)) {
            return;
        }

        this.isMaximized = true;
        this.transition = WINDOW_TRANSITION;

        this.storeInfo();
        setMaximizedWindowStyle.call(this);
    }

    function setMaximizedWindowStyle() {
        const {innerWidth, innerHeight} = window;
        this.top = 0;
        this.left = 0;
        this.windowWidth = innerWidth;
        this.windowHeight = innerHeight;
    }

    function closeWindow() {
        if (checkCancelEvent.call(this, WINDOW_CONTROL_EMIT_CLOSE_EVENT)) {
            return;
        }

        this.hideWindow();
        this.$destroy();
    }

    /**
     * 恢复窗口
     * @param useTransition{boolean} 是否使用过渡动画
     */
    function restoreWindow(useTransition = true) {
        if (checkCancelEvent.call(this, WINDOW_CONTROL_EMIT_RESTORE_EVENT)) {
            return;
        }

        this.isMaximized = false;

        if(useTransition) {
            // 在过渡结束后去除过渡
            transition(this.window, {}, () => {
                this.transition = "";
            });
        } else {
            this.transition = "";
        }

        this.restoreInfo();
        this.showWindow();
    }

    function restoreInfo() {
        if (!cache) return;
        this.top = cache.top;
        this.left = cache.left;
        this.windowWidth = cache.windowWidth;
        this.windowHeight = cache.windowHeight;
    }

    function storeInfo() {
        if (!cache) {
            cache = {};
        }
        cache.top = this.top;
        cache.left = this.left;
        cache.windowWidth = this.windowWidth;
        cache.windowHeight = this.windowHeight;
    }

    function showWindow() {
        handleWindowRank.call(this);
        this.windowVisible = true;
    }

    function hideWindow() {
        this.windowVisible = false;
    }

    /**
     * 检查是否取消事件, 如果取消事件, 则返回 true, 否则返回 false.
     */
    function checkCancelEvent(eventName) {
        let cancel = false;
        this.$emit(eventName, () => {
            cancel = true;
        });

        return cancel;
    }

    function exposeWindowApis() {
        return {
            minimize: minimizeWindow.bind(this),
            maximize: maximizeWindow.bind(this),
            close: closeWindow.bind(this),
            restore: restoreWindow.bind(this),
            show: showWindow.bind(this),
            hide: hideWindow.bind(this),
        };
    }

    return {
        exposeWindowApis,

        restoreInfo,
        storeInfo,

        closeWindow,
        maximizeWindow,
        minimizeWindow,
        restoreWindow,

        showWindow,
        hideWindow,
    }
}