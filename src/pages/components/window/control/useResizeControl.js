/**
 * 功能描述：
 * 创建日期：2024 年 05 月 10 日
 */

// 使用严格模式
'use strict';

import {
    RESIZE_WINDOW_BOTTOM_LEFT_CORNER_KEY,
    RESIZE_WINDOW_BOTTOM_RIGHT_CORNER_KEY,
    RESIZE_WINDOW_BOTTOM_SIDE_KEY,
    RESIZE_WINDOW_LEFT_SIDE_KEY,
    RESIZE_WINDOW_RIGHT_SIDE_KEY,
    RESIZE_WINDOW_TOP_LEFT_CORNER_KEY,
    RESIZE_WINDOW_TOP_RIGHT_CORNER_KEY,
    RESIZE_WINDOW_TOP_SIDE_KEY
} from "@/pages/components/window/window-config";
import useWindow from "@/pages/components/window/useWindow";

const {setWidth, setHeight} = useWindow();

export default function useResizeControl() {
    let topCache = 0;
    let leftCache = 0;

    let widthCache = 0;
    let heightCache = 0;

    let mousedownX = 0;
    let mousedownY = 0;

    function handleResizeControlMouseDown(e) {
        topCache = this.top;
        leftCache = this.left;
        mousedownX = e.clientX;
        mousedownY = e.clientY;
        widthCache = this.windowWidth;
        heightCache = this.windowHeight;
    }

    function handleResize(e, key) {
        const {clientX, clientY} = e;
        const leftIncr = clientX - mousedownX;
        const topIncr = clientY - mousedownY;

        switch (key) {
            case RESIZE_WINDOW_LEFT_SIDE_KEY: {
                // 达到最小宽度时不设置 left, 否则窗口会随着鼠标向左移动
                if (setWidth.call(this, widthCache - leftIncr)) {
                    this.left = leftCache + leftIncr;
                }
                break;
            }


            case RESIZE_WINDOW_RIGHT_SIDE_KEY:
                setWidth.call(this, widthCache + leftIncr);
                break;

            case RESIZE_WINDOW_TOP_SIDE_KEY:
                if (setHeight.call(this, heightCache - topIncr)) {
                    this.top = topCache + topIncr;
                }
                break;

            case RESIZE_WINDOW_BOTTOM_SIDE_KEY:
                setHeight.call(this, heightCache + topIncr);
                break;

            case RESIZE_WINDOW_TOP_LEFT_CORNER_KEY:
                if (setWidth.call(this, widthCache - leftIncr)) {
                    this.left = leftCache + leftIncr;
                }

                if (setHeight.call(this, heightCache - topIncr)) {
                    this.top = topCache + topIncr;
                }
                break;

            case RESIZE_WINDOW_TOP_RIGHT_CORNER_KEY:
                setWidth.call(this, widthCache + leftIncr);

                if (setHeight.call(this, heightCache - topIncr)) {
                    this.top = topCache + topIncr;
                }
                break;

            case RESIZE_WINDOW_BOTTOM_LEFT_CORNER_KEY:
                if (setWidth.call(this, widthCache - leftIncr)) {
                    this.left = leftCache + leftIncr;
                }

                setHeight.call(this, heightCache + topIncr);
                break;

            case RESIZE_WINDOW_BOTTOM_RIGHT_CORNER_KEY:
                setWidth.call(this, widthCache + leftIncr);
                setHeight.call(this, heightCache + topIncr);
                break;
        }
    }

    return {
        handleResizeControlMouseDown,
        handleResize,
    };
}
