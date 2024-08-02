/**
 * 功能描述：
 * 创建日期：2024 年 05 月 10 日
 */

// 使用严格模式
'use strict';

/**
 * 拖动左边
 */
export const RESIZE_WINDOW_LEFT_SIDE_KEY = "resizeWindowLeftSide";

/**
 * 拖动右边
 */
export const RESIZE_WINDOW_RIGHT_SIDE_KEY = "resizeWindowRightSide";

/**
 * 拖动上边
 */
export const RESIZE_WINDOW_TOP_SIDE_KEY = "resizeWindowTopSide";

/**
 * 拖动下边
 */
export const RESIZE_WINDOW_BOTTOM_SIDE_KEY = "resizeWindowBottomSide";

/**
 * 拖动左上角
 */
export const RESIZE_WINDOW_TOP_LEFT_CORNER_KEY = "resizeWindowTopLeftCorner";

/**
 * 拖动右上角
 */
export const RESIZE_WINDOW_TOP_RIGHT_CORNER_KEY = "resizeWindowTopRightCorner";

/**
 * 拖动左下角
 */
export const RESIZE_WINDOW_BOTTOM_LEFT_CORNER_KEY = "resizeWindowBottomLeftCorner";

/**
 * 拖动右下角
 */
export const RESIZE_WINDOW_BOTTOM_RIGHT_CORNER_KEY = "resizeWindowBottomRightCorner";

export const WINDOW_RESIZE_KEY = {
    RESIZE_WINDOW_LEFT_SIDE_KEY,
    RESIZE_WINDOW_RIGHT_SIDE_KEY,
    RESIZE_WINDOW_TOP_SIDE_KEY,
    RESIZE_WINDOW_BOTTOM_SIDE_KEY,
    RESIZE_WINDOW_TOP_LEFT_CORNER_KEY,
    RESIZE_WINDOW_TOP_RIGHT_CORNER_KEY,
    RESIZE_WINDOW_BOTTOM_LEFT_CORNER_KEY,
    RESIZE_WINDOW_BOTTOM_RIGHT_CORNER_KEY
};

export const WINDOW_CONTROL_EMIT_MINIMIZE_EVENT = "minimize";

export const WINDOW_CONTROL_EMIT_MAXIMIZE_EVENT = "maximize";

export const WINDOW_CONTROL_EMIT_CLOSE_EVENT = "close";

export const WINDOW_CONTROL_EMIT_RESTORE_EVENT = "restore";

/**
 * 窗口控制按钮点击事件
 */
export const WINDOW_CONTROL_EMIT_EVENTS = [
    WINDOW_CONTROL_EMIT_MINIMIZE_EVENT,
    WINDOW_CONTROL_EMIT_MAXIMIZE_EVENT,
    WINDOW_CONTROL_EMIT_CLOSE_EVENT,
    WINDOW_CONTROL_EMIT_RESTORE_EVENT
];


export const WINDOW_MIN_WIDTH = 220;

export const WINDOW_MIN_HEIGHT = 40;
