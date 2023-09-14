/**
 * 功能描述：
 * 创建日期：2023 年 09 月 12 日
 */

// 使用严格模式
'use strict';

export default {
    install(Vue) {
        Vue.directive("huadiao-vue-ref-pro", {
            bind(element, binging, vNode) {
                let vueInstance = vNode.context;
                vueInstance.refPro.push(element);
            }
        })
    }
}