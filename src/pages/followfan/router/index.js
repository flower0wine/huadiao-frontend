/**
 * 功能描述：
 * 创建日期：2023 年 02 月 27 日
 */

// 使用严格模式
'use strict';
import VueRouter from "vue-router";

export default new VueRouter({
    mode: "history",
    routes: [
        {
            path: "/followfan",
            redirect: "/followfan/follow/-1",
        },
        {
            name: "followBoard",
            path: "/followfan/follow/:groupId(-?\\d+)",
            components: {
                followFanExhibit: () => import("@/pages/followfan/pages/HuadiaoFollowBoard"),
            },
            beforeRouteLeave() {
                this.$store.commit("clearDeletedFollow");
            }
        },
        {
            name: "fanBoard",
            path: "/followfan/fan",
            components: {
                followFanExhibit: () => import("@/pages/followfan/pages/HuadiaoFanBoard"),
            },
            beforeRouteLeave() {
                this.$store.commit("clearDeletedFan");
            }
        }
    ]
})