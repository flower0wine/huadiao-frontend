/**
 * 功能描述：
 * 创建日期：2024 年 07 月 13 日
 */

// 使用严格模式
'use strict';

export default {
    data() {
        return {
            observer: null,
            observerOptions: {
                threshold: 0.1,
                callback: null,
            },

            elements: [],
        };
    },

    watch: {
        "observerOptions.threshold": {
            deep: true,
            handler() {
                this.observeElements(this.elements);
            },
        },
    },

    methods: {
        setObserverCallback(callback) {
            this.observerOptions.callback = callback;
        },

        /**
         * 观察元素
         * @param elements {Element|Array<Element>}
         */
        observeElements(elements) {
            if (!Array.isArray(elements)) {
                elements = [elements];
            }

            const {callback, threshold} = this.observerOptions;

            this.unobserveElements();
            this.observer = new IntersectionObserver((entries) => {
                for (let entry of entries) {
                    callback && callback(entry);
                }
            }, {
                threshold,
            });

            const arr = [];

            for (let element of elements) {
                if (element instanceof HTMLElement) {
                    this.observer.observe(element);
                    arr.push(element);
                }
            }

            this.elements = arr;
        },

        unobserveElements() {
            if (this.observer) {
                return;
            }

            for (let element of this.elements) {
                this.observer.unobserve(element);
            }

            this.observer = null;
            this.elements = [];
        },
    },
}