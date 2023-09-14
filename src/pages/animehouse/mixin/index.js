/**
 * 功能描述：
 * 创建日期：2023 年 09 月 10 日
 */

// 使用严格模式
'use strict';

import constants from "@/assets/js/constants";
import {mapState} from "vuex";

export const animeHouseMixin = {
    data() {
        return {
            huadiaoHouseImageHost: `${constants.imageHost}huadiaoHouse/`,
        }
    },
    computed: {
        ...mapState({
            me(state) {
                let viewedUid = parseInt(this.$route.params.viewedUid);
                return state.user.uid === viewedUid;
            },
        }),
    },
    methods: {
        // 背景格式转换
        backgroundTransform(background) {
            let singleColor = background.startsWith("#");
            let gradientColor = background.startsWith("-webkit-linear-gradient");
            // 是否是图片
            if(!singleColor && !gradientColor) {
                // 是否是本地图片
                let nativePicture = background.startsWith("blob:http://localhost");
                background = nativePicture ? `url('${background}')` : `url('${this.huadiaoHouseImageHost}${background}')`;
            }
            background = singleColor ? `background-color: ${background};` : `background-image: ${background};`;
            return background;
        },
        // 本地图片 url 调整
        nativeUrlReject(url) {
            let nativePicture = url.startsWith("blob:http://localhost");
            let backgroundImage = nativePicture ? url : `${this.huadiaoHouseImageHost}${url}`;
            return `background-image: url('${backgroundImage}')`;
        },
        // 生成边框图片
        generateBorderImage(cardBorderImage) {
            return `border-image-source: url('${this.huadiaoHouseImageHost}${cardBorderImage.borderImageSource}'); border-image-slice: ${cardBorderImage.borderImageSlice}; border-image-outset: ${cardBorderImage.borderImageOutset}; border-image-width: ${cardBorderImage.borderImageWidth}`;
        }
    }
}