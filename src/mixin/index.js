/**
 * 功能描述：
 * 创建日期：2023 年 02 月 28 日
 */

// 使用严格模式
'use strict';
import axios from "axios";
import constants from "@/assets/js/constants";

export const mixin = {
    data() {
        return {
            // 是否获取了数据
            getDataCompleted: false,
        }
    },
    watch: {
        // 监听 user 来判断是否获取了数据
        user: {
            deep: true,
            handler(newValue) {
                this.login = newValue.login;
                this.getDataCompleted = true;
            }
        }
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
        sendRequest({path, method, params, data, headers, thenCallback, errorCallback}) {
            axios.defaults.withCredentials = true;
            // 可以选择的文本类型
            let ContentType = {
                formData: "application/x-www-form-urlencoded",
                json: "application/json",
            };
            // 请求头
            let headersProp = headers ? {"Content-Type": ContentType[headers]} : {};
            let srcObj = {
                url: constants.url + path,
                method: "get",
                params: {},
                data: {},
                headers: headersProp,
            };
            // 修改对象属性
            this.modifySrcObject(srcObj, {params, method, data});

            let defaultThenCallback = (response) => {
                thenCallback && thenCallback(response);
            };

            let defaultErrorCallback = (error) => {
                // 发送请求但无响应
                if (!error.response) {
                    this.huadiaoWarningTip("连接服务器失败!可能是网络原因");
                }
                // 额外的错误执行函数
                errorCallback && errorCallback(error);
            };
            // 发送请求
            axios(srcObj)
                .then(defaultThenCallback)
                .catch(defaultErrorCallback);
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
                }
                // 如果是 Element 实例对象
                else if (el instanceof Element) {
                    this.$(el[0]).off();
                }
            }
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
                        array.splice(index, 1, array[index - 1]);
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
        // 修改源对象指定属性为提供的对象的属性
        modifySrcObject(srcConfig, config) {
            for (let c in config) {
                if (typeof config[c] === "object") {
                    if (!srcConfig[c]) {
                        srcConfig[c] = {};
                    }
                    this.modifySrcObject(srcConfig[c], config[c]);
                } else {
                    if (config[c]) {
                        srcConfig[c] = config[c]
                    }
                }
            }
        },
        // 判断我和他人的关系
        judgeMeAndOtherRelation(relation) {
            if(relation === "friend") {
                this.follow = this.fan = true;
            } else if(relation === "follow") {
                this.follow = true;
                this.fan = false;
            } else if(relation === "fan") {
                this.follow = false;
                this.fan = true;
            } else if(relation === "stranger") {
                this.follow = this.fan = false;
            }
        },
        // 获取指定长度的随机字符串, 可能包含字母, 数字, !, _, :, =
        getUniqueString(length) {
            let len = length ? length : 10;
            let chars = [
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
                'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
                'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
            ];
            let charsIndex;
            let res = "";
            for (let index = 0; index <= len; index++) {
                charsIndex = (Math.random() * chars.length).toFixed(0);
                res += chars[charsIndex];
            }
            return res;
        },
        // 添加背景
        addBackground(url) {
            return "url('" + url + "')";
        },
        // 根据性别以及是否是我来更新称呼, 他, 她, 我
        accordingSexToSetName(me, sex) {
            if (me) {
                return "我的";
            } else {
                // 陌生人
                if (sex === "0") {
                    return "";
                } else if (sex === "1") {
                    return "他的";
                } else if (sex === "2") {
                    return "她的";
                }
            }
        },
        // 如果数字大于一万
        numberGreaterThenTenThousand(number) {
            return number > 10000 ? number.toFixed(1) + "万" : number;
        },
    },
}