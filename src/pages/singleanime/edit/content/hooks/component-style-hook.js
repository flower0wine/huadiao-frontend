/**
 * 功能描述：
 * 创建日期：2024 年 05 月 18 日
 */

// 使用严格模式
'use strict';

import subscribeCenter from "@/pages/singleanime/edit/content/hooks/subscribe-center";
import {colorToHex} from "@/util/transformer";

const {
    subscribeRemoveComponent,
    unsubscribeRemoveComponent,
} = subscribeCenter;

let removeComponentCallback = null;


export default {
    data() {
        return {
            componentStyle: {}
        };
    },

    created() {
        removeComponentCallback = this.patchRemoveComponentStyle.bind(this);

        subscribeRemoveComponent(removeComponentCallback);
    },

    beforeDestroy() {
        unsubscribeRemoveComponent(removeComponentCallback);
    },

    methods: {
        addComponentStyle(componentId, style) {
            this.$set(this.componentStyle, componentId, style);
        },

        patchRemoveComponentStyle(componentIds) {
            for (const componentId of componentIds) {
                this.$delete(this.componentStyle, componentId);
            }
        },

        getComponentStyle(element) {
            const style = {};
            const computedStyle = window.getComputedStyle(element);
            const rect = element.getBoundingClientRect();

            style.width = rect.width << 0;
            style.height = rect.height << 0;
            style.backgroundColor = computedStyle.backgroundColor;
            style.borderTopLeftRadius = computedStyle.borderTopLeftRadius;
            style.borderTopRightRadius = computedStyle.borderTopRightRadius;
            style.borderBottomLeftRadius = computedStyle.borderBottomLeftRadius;
            style.borderBottomRightRadius = computedStyle.borderBottomRightRadius;
            style.boxShadow = computedStyle.boxShadow;

            return style;
        }
    },
}