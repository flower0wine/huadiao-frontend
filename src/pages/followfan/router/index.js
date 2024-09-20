/**
 * 功能描述：VueRouter
 * 创建日期：2023 年 02 月 27 日
 */

// 使用严格模式
'use strict';
import VueRouter from "vue-router";

export default new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/followfan/:viewedUid(\\d+)/follow",
      redirect: to => {
        const viewedUid = to.params.viewedUid;
        return `/followfan/${viewedUid}/follow/-1`;
      },
    },
    {
      name: "followBoard",
      path: "/followfan/:viewedUid(\\d+)/follow/:groupId(-?\\d+)",
      component: () => import("@/pages/followfan/pages/HuadiaoFollowBoard"),
    },
    {
      name: "fanBoard",
      path: "/followfan/:viewedUid(\\d+)/fan",
      component: () => import("@/pages/followfan/pages/HuadiaoFanBoard"),
    },
  ],
});
