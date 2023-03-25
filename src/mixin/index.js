/**
 * 功能描述：
 * 创建日期：2023 年 02 月 28 日
 */

// 使用严格模式
'use strict';
import axios from "axios";
import constants from "@/assets/js/constants";

// axios.defaults.withCredentials = true;

export const mixin = {
    data() {
        return {}
    },
    mounted() {

    },
    methods: {
        // 警告提示
        huadiaoWarningTip(message) {
            this.$bus.$emit("huadiaoWarningTip", message);
        },
        // 屏中提示
        huadiaoMiddleTip(message) {
            this.$bus.$emit("huadiaoMiddleTip", message);
        },
        // 弹窗提示
        huadiaoPopupWindow(iconType, operationType, tip, confirmFn, cancelFn) {
            this.$bus.$emit("huadiaoPopupWindow", iconType, operationType, tip, confirmFn, cancelFn);
        },
        // 发送请求
        sendRequest(params, data = {}, headers = {}, fn, errorFn) {
            axios({
                url: constants.url + "dispatcherServlet",
                method: "post",
                headers,
                params,
                data,
            }).then(fn).catch(errorFn ? errorFn : (error) => {
                if (error.request) {
                    // 联网但没有连上服务器
                    if (!this.isConnectServer) {
                        this.huadiaoWarningTip("无法连接至服务器!");
                    }
                    // 没有联网
                    else if (!this.isOnLine) {
                        this.huadiaoWarningTip("请检查网络连接!");
                    }
                }
            });
        },
        // 清除 this 的 ref 的事件
        clearAllRefsEvents() {
            if (!this.$refs) {
                return;
            }
            for (let elName in this.$refs) {
                let el = this.$refs[elName];
                // 如果是 VueComponent 实例对象
                if (el instanceof this.__proto__.constructor) {
                    this.$(el).off();
                    // 如果是 Element 实例对象
                } else if (el instanceof Element) {
                    this.$(el[0]).off();
                }
            }
        },
        // 检查是否联网, 如果已联网或服务器出现问题
        checkOnlineIfConnectingOrBadServer(connectingCallback, badServerCallback) {
            this.checkOnline(connectingCallback, null, badServerCallback);
        },
        // 检查是否联网, 并根据联网状态执行回调函数
        checkOnline(connectingCallback, disConnectCallback, badServerCallback) {
            if (navigator.onLine) {
                this.sendRequest({}, {}, {}, () => {
                    // 联网回调
                    connectingCallback && connectingCallback();
                }, (error) => {
                    if (error.request) {
                        this.huadiaoWarningTip("无法连接至服务器!");
                    } else {
                        this.huadiaoWarningTip("网络出现未知错误!");
                    }

                    // 向服务器发送请求, 但没有收到响应
                    badServerCallback && badServerCallback();
                });
            } else {
                this.huadiaoWarningTip("当前设备未联网!");

                // 未联网回调
                disConnectCallback && disConnectCallback();
            }
        },
        // 服务器未响应请求通用处理, error.request
        serverNoResponseError(error) {
            if (error.request) {
                this.huadiaoWarningTip("服务器未响应请求!");
            }
        },
        // 服务器错误信息, 及一般信息响应
        messageResponse(responseData) {
            if (Object.hasOwnProperty.call(responseData, "code")) {
                if (responseData.code === 0) {
                    this.huadiaoWarningTip("不可识别的的请求!");
                }
                return true;
            }
            return false;
        },
        // 将数字按照顺序插入有序数组中
        insertOrderArray(array, number) {
            if (array && Array.isArray(array) &&
                typeof number === "number" && Number.isInteger(number)) {
                if (array.length === 0) {
                    array.push(number);
                } else {
                    let search = this.binarySearchPosition(array, number);
                    for (let index = array.length; index > search; index--) {
                        array[index] = array[index - 1];
                        array.splice(index, 1, array[index- 1]);
                    }
                    array.splice(search, 1, number);
                }
            }
        },
        // 将数字从数组中剔除
        deleteNumberFromArray(array, number) {
            if (array && Array.isArray(array) &&
                typeof number === "number" && Number.isInteger(number)) {
                let left = 0, right = array.length - 1, mid;
                while (left <= right) {
                    mid = left + ((right - left) >> 1);
                    if (array[mid] === number) {
                        array.splice(mid, 1);
                    } else if (array[mid] > number) {
                        right = mid - 1;
                    } else {
                        left = mid + 1;
                    }
                }
            }
        },
        // 二分查找数组中某个数的索引
        binarySearchPosition(array, number) {
            let left = 0, right = array.length - 1, mid = left + ((right - left) >> 1);
            while (left <= right) {
                if (array[mid] === number) {
                    return mid;
                } else if (array[mid] > number) {
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
                mid = left + ((right - left) >> 1);
            }
            if (array[mid] > number) {
                return mid;
            } else {
                return mid + 1;
            }
        },
    },
}