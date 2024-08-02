/**
 * 功能描述：
 * 创建日期：2024 年 05 月 10 日
 */

// 使用严格模式
'use strict';


/**
 * Main button pressed, usually the left button or the un-initialized state
 * @param event {MouseEvent}
 * @return {boolean}
 */
export function isMainMouseButton(event) {
    return event.button === 0;
}

/**
 * Auxiliary button pressed, usually the wheel button or the middle button (if present)
 * @param event {MouseEvent}
 * @return {boolean}
 */
export function isAuxMouseButton(event) {
    return event.button === 1;
}

/**
 * Secondary button pressed, usually the right button
 * @param event{MouseEvent}
 * @return {boolean}
 */
export function isSecondaryMouseButton(event) {
    return event.button === 2;
}

/**
 * Fourth button pressed, typically the Browser Back button
 * @param event{MouseEvent}
 * @return {boolean}
 */
export function isFourthMouseButton(event) {
    return event.button === 3;
}

/**
 * Fifth button pressed, typically the Browser Forward button
 * @param event{MouseEvent}
 * @return {boolean}
 */
export function isFifthMouseButton(event) {
    return event.button === 4;
}