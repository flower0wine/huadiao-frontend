/**
 * 功能描述：自制全屏滚动插件
 * 创建日期：2023 年 03 月 05 日
 */

// 使用严格模式
'use strict';

export default {
    install(Vue) {
        Vue.directive("huadiao-full-page", {
            bind(element) {
                element.addEventListener("mousewheel",  (e) => {
                    // 文档上移
                    if(e.wheelDeltaY && e.wheelDeltaY < 0) {
                        if(window.scrollY < element.children[0].clientHeight &&
                            window.scrollY > element.children[0].clientHeight - window.innerHeight) {
                            window.scrollTo({
                                top: element.children[0].clientHeight,
                                behavior: "smooth"
                            });
                        }
                    }
                    // 文档下移
                    else if(e.wheelDeltaY && e.wheelDeltaY > 0) {
                        // 指定区域文档自动滚动到指定位置
                        if(element.children[0].clientHeight - 20 < window.scrollY &&
                            window.scrollY < element.children[0].clientHeight + 200) {
                            window.scrollTo({
                                top: element.children[0].clientHeight,
                                behavior: "smooth"
                            });
                        }
                        // 平滑滚动到第一屏
                        else if(window.scrollY < element.children[0].clientHeight - 20) {
                            // 滚至文档底部
                            window.scrollTo({
                                top: 0,
                                behavior: "smooth"
                            });
                        }
                    }
                })
            },
        });
    }
}
