/**
 * 功能描述：
 * 创建日期：2023 年 12 月 20 日
 */

// 使用严格模式
'use strict';

export const mixin = {
    data() {
        return {
            headerItemActiveClassName: "active",
        }
    },
    computed: {
        routePath() {
            return this.$route.path;
        },
    },
    methods: {
        /**
         * 判断头部子项是否激活
         * @param alias {[string]} 头部子项的别名
         */
        judgeHeaderItemActive(alias = []) {
            if(alias.includes(this.routePath)) {
                return this.headerItemActiveClassName;
            }
        },
    }
}