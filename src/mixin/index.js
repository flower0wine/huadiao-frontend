/**
 * 功能描述：
 * 创建日期：2023 年 02 月 28 日
 */

// 使用严格模式
'use strict';
import axios, {HttpStatusCode} from "axios";
import {apis} from "@/assets/js/constants/request-path.js";
import {statusCode} from "@/assets/js/constants/status-code";

const excludeInterceptors = [
    /\//,
    /^\/search\/(user|note)\/.*/,
    /^\/note\/(get|all)/,
    /^\/common\/.*/,
    /^\/forum\/.*/,
    /^\/userinfo/,
    /^\/homepage\/info/,
    /^\/huadiaohouse\/info/,
];

function isExcludeInterceptors(pathname) {
    for (let i = 0; i < excludeInterceptors.length; i++) {
        if (excludeInterceptors[i].test(pathname)) {
            return true;
        }
    }
    return false;
}

axios.interceptors.response.use((resp) => {
    if(resp.status === HttpStatusCode.Ok) {
        // 未登录跳转主页
        if(resp.data.code === statusCode.NOT_AUTHORITATIVE && !isExcludeInterceptors(window.location.pathname)) {
            window.location.href = "/";
        }
        // 页面不存在
        else if(resp.data.code === statusCode.PAGE_NOT_EXIST) {
            window.location.href = "/error/404";
        }
    }
    return resp;
});

export const mixin = {
    data() {
        return {
            // 是否获取了数据
            getDataCompleted: false,
            userAvatarImagePath: `${apis.imageHost}userAvatar/`,
            huadiaoHouseImagePath: `${apis.imageHost}huadiaoHouse/`,
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
            return new Promise((resolve, reject) => {
                let confirmCallback = () => {
                    confirmFn && confirmFn(...arguments);
                    resolve();
                };
                let cancelCallback = () => {
                    cancelFn && cancelFn(...arguments);
                    reject();
                }
                this.$bus.$emit("huadiaoPopupWindow", iconType, operationType, tip, confirmCallback, cancelCallback);
            });
        },
        // 发送请求, 由于请求 url 由 http://localhost:9090/huadiao/ 和 path 组成, 故 path 不需要加斜杆
        // 使用 axios 作为请求工具
        sendRequest({path, method, params, data, headers, thenCallback, errorCallback}) {
            axios.defaults.withCredentials = true;
            // 可以选择的文本类型
            let ContentType = {
                formData: "application/x-www-form-urlencoded",
                json: "application/json",
            };
            // 请求头
            let headersProp = {};
            if (typeof headers === "string") {
                headersProp = headers ? {"Content-Type": ContentType[headers]} : {};
            } else if (typeof headers === "object") {
                headersProp = {...headers};
            }
            let srcObj = {
                url: apis.huadiaoHost + path,
                method: "get",
                params: {},
                data: {},
                headers: headersProp,
            };
            // 修改对象属性
            this.modifySrcObject(srcObj, {params, method});
            srcObj.data = data;

            let defaultThenCallback = (response) => {
                thenCallback && thenCallback(response);
            };

            let defaultErrorCallback = (error) => {
                // 发送请求但无响应
                if (!error.response) {
                    this.huadiaoWarningTip("连接服务器失败!可能是网络原因");
                }
                console.log(error);
                // 额外的错误执行函数
                errorCallback && errorCallback(error);
            };
            if (typeof thenCallback === "function") {
                // 发送请求
                return axios(srcObj)
                    .then(defaultThenCallback)
                    .catch(defaultErrorCallback);
            } else {
                return axios(srcObj);
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
        // 修改源对象指定属性为提供的对象的属性, generate: 是否允许创建新属性
        /**
         *
         * @param targetConfig {Object} 要粘贴属性到的目标对象
         * @param srcConfig {Object}  要复制属性源对象
         * @param option {{generate: boolean, proto: boolean, arrayCover: boolean}}
         * 配置对象:
         * 1. generate: 是否允许创建新属性, 默认为 true
         * 2. proto: 是否复制原型的属性, 默认为 false
         * 3. arrayCover: 如果 srcConfig 的某个属性为数组, 并且 targetConfig 对应属性也为数组, 则直接覆盖, 否则添加至 targetConfig 的数组中, 默认为 true (覆盖)
         */
        modifySrcObject(targetConfig,
                        srcConfig,
                        option = {generate: true, proto: false, arrayCover: true}) {
            for (let c in srcConfig) {
                // 不修改原型并且源对象上没有此属性
                if (!option.proto && !Object.prototype.hasOwnProperty.call(srcConfig, c)) {
                    continue;
                }
                // 可能为 对象 或者 null(属于对象)
                if (typeof srcConfig[c] === "object") {
                    if(Array.isArray(srcConfig[c]) && Array.isArray(targetConfig[c])) {
                        // 若能覆盖
                        if(option.arrayCover) {
                            targetConfig[c] = srcConfig[c];
                        } else {
                            targetConfig[c].push(...srcConfig[c]);
                        }
                    } else {
                        // 如果 targetConfig 不存在对应的属性
                        if (!targetConfig[c]) {
                            // 是否生成新属性
                            if (!option.generate) continue;
                            targetConfig[c] = srcConfig[c] === null ? null : {};
                        }
                        // 递归
                        if (srcConfig[c] !== null) {
                            this.modifySrcObject(targetConfig[c], srcConfig[c], option);
                        }
                    }
                } else {
                    // 如果不能生成, 则 continue
                    if (!targetConfig[c] && !option.generate) continue;
                    // 赋值 或者 生成新属性
                    if (srcConfig[c] != null) {
                        targetConfig[c] = srcConfig[c]
                    }
                }
            }
        },
        // 判断我和他人的关系
        judgeRelation(fan, follow) {
            if (follow && fan) {
                return "已互粉";
            } else if (follow && !fan) {
                return "已关注";
            } else {
                return "关注";
            }
        },
        // 判断我和他人的关系
        judgeMeAndOtherRelation(relation) {
            this.follow = relation.following;
            this.fan = relation.followed;
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
            for (let index = 0; index < len; index++) {
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
        /**
         * 将时间戳转换为年月日
         * @param timestamp {number} 时间戳
         * @param type {string} 格式化类型, 允许 date 和 datetime
         * @returns {string} 返回格式为 (xxxx年xx月xx日 xx:xx)
         */
        huadiaoDateFormat(timestamp, type = "datetime") {
            let date = new Date(timestamp);
            if (type === "date") {
                return `${date.getFullYear()}年${this.numberFormat(date.getMonth() + 1)}月${this.numberFormat(date.getDate())}日`;
            } else if (type === "datetime") {
                return `${date.getFullYear()}年${this.numberFormat(date.getMonth() + 1)}月${this.numberFormat(date.getDate())}日 ${this.numberFormat(date.getHours())}:${this.numberFormat(date.getMinutes())}`;
            }
        },
        /**
         * 将 一位数转换为两位数, 如 1 返回 01, 10 返回 10
         * @param number {number} 数字型
         * @returns {string} 返回两个字符的字符串
         */
        numberFormat(number) {
            return (number + "").padStart(2, "0");
        },
        /**
         * 将数字转换为千单位, 如 1000 返回 1.0k, 保留一位小数
         * @param number {number} 数字
         * @returns {string} 返回数字字符串
         */
        numberFormatThousand(number) {
            if(number > 1000) {
                return `${(number / 1000).toFixed(1)}k`;
            }
            return `${number}`;
        },
        /**
         * 截断指定长度的字符串
         * @param string 字符串
         * @param length 指定截断长度, 数字型
         * @param charAdjust 是否要开启调整字符串, 传入参数类型为 bool, 即中文占两个英文的大小, 传入 true 将会得到改善,
         * 如截断长度为 10, 6 个中文字符将截断为 5 个字符, 不会保留 6个
         * @returns {string} 返回截断的字符串
         */
        cutStringByLength(string, length, charAdjust) {
            let count = length;
            if (charAdjust === true) {
                count = 0;
                let zhReg = /[\u4E00-\u9FA5]/;
                for (let c of string) {
                    // 一个中文字符占两个英文字符大小, 故 length -= 2
                    if (zhReg.test(c)) {
                        length -= 2;
                    } else {
                        length -= 1;
                    }
                    // 计算截取长度
                    count++;
                    if (length <= 0) {
                        break;
                    }
                }
            }
            return string.substring(0, count) + (count < string.length ? "..." : "");
        },
        // 将带文件的 input 传入，返回的 url 可以放在 img 标签的 src 或者 任何盒子的 background-image 中
        getImgPath: function (obj) {
            let fileObj = obj.files[0];
            let url;
            if (window.createObjectURL != undefined) {
                url = window.createObjectURL(fileObj);
            } else if (window.URL != undefined) {
                url = window.URL.createObjectURL(fileObj);
            } else if (window.webkitURL != undefined) {
                url = window.webkitURL.createObjectURL(fileObj);
            }
            return url;
        },
        // 如果没有昵称则用 userId 代替
        getNickname(obj) {
            return obj.nickname ?? obj.userId;
        },
        // 头像
        generateUserAvatar(avatar) {
            if (!avatar) {
                return '';
            }
            return this.packageBackgroundUrl(`${this.userAvatarImagePath}${avatar}`);
        },
        packageBackgroundUrl(url) {
            return `background-image: url('${url}')`;
        },
        homepage(uid) {
            return `/homepage/${uid}`;
        },
        noteLink(authorUid, noteId) {
            return `/singlenote/${authorUid}/${noteId}`;
        },
        followLink(uid) {
            return `/followfan/${uid}/follow`;
        },
        fanLink(uid) {
            return `/followfan/${uid}/fan`;
        },
        getKey(args, split = '/') {
            return args.join(split);
        },
        getIntersectionObserver(intersectionCallback = () => {
        }) {
            this.observer = new IntersectionObserver((entries) => {
                let entry = entries[0];
                if (entry.isIntersecting) {
                    intersectionCallback();
                }
            }, {
                threshold: 0.1
            });
        },
        /**
         * 在新标签页开启网页, 返回窗口对象
         * @param url 网页 url
         * @return {WindowProxy} 窗口对象
         */
        openNewPage(url) {
            return window.open(url, "_blank");
        }
    },
}