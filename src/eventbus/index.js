import Vue from "vue";
import {HUADIAO_MIDDLE_TIP_EVENT_NAME, HUADIAO_POPUP_WINDOW_EVENT_NAME} from "@/eventbus/event-name";

export const eventBus = new Vue();

export function huadiaoMiddleTip(message) {
  eventBus.$emit(HUADIAO_MIDDLE_TIP_EVENT_NAME, message);
}

export function huadiaoPopupWindow(iconType, operationType, tip, confirmFn, cancelFn) {
  return new Promise((resolve, reject) => {
    let confirmCallback = () => {
      confirmFn && confirmFn(...arguments);
      resolve();
    };
    let cancelCallback = () => {
      cancelFn && cancelFn(...arguments);
      reject();
    }
    eventBus.$emit(HUADIAO_POPUP_WINDOW_EVENT_NAME, iconType, operationType, tip, confirmCallback, cancelCallback);
  });
}
