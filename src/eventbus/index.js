import Vue from "vue";
import {HUADIAO_MIDDLE_TIP_EVENT_NAME} from "@/eventbus/event-name";

export const eventBus = new Vue();

export function huadiaoMiddleTip(message) {
  eventBus.$emit(HUADIAO_MIDDLE_TIP_EVENT_NAME, message);
}
