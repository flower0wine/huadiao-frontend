/**
 * 功能描述：
 * 创建日期：2024 年 05 月 18 日
 */

// 使用严格模式
'use strict';

import {useSubscribe} from "@/util";

const {subscribe: subscribeAddComponent, unsubscribe: unsubscribeAddComponent, notify: notifyAddComponent} = useSubscribe();
const {subscribe: subscribeRemoveComponent, unsubscribe: unsubscribeRemoveComponent, notify: notifyRemoveComponent} = useSubscribe();


export default {
    subscribeAddComponent,
    unsubscribeAddComponent,
    notifyAddComponent,

    subscribeRemoveComponent,
    unsubscribeRemoveComponent,
    notifyRemoveComponent,
}