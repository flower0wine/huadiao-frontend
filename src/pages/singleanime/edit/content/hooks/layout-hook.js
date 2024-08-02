/**
 * 功能描述：
 * 创建日期：2024 年 05 月 16 日
 */

// 使用严格模式
'use strict';

import {mapState} from "vuex";
import {Checker} from "@/util";
import {ACTIVE_CLASS_NAME} from "@/constant";

const {isNumber} = Checker;

export default {
    data() {
        return {
        };
    },

    computed: {
        ...mapState("pageLayout", [
            "layoutList",
            "layoutRows",
            "layoutCols",
            "activeLayoutIndex",
        ]),

        // 页面布局生成
        pageLayout() {
            let arr = new Array(this.layoutRows).fill(null).map(() => new Array(this.layoutCols).fill("."));
            let gridTemplateAreas = "";
            let gridTemplateRows = `repeat(${this.layoutRows}, auto)`;
            let gridTemplateColumns = `repeat(${this.layoutCols}, 1fr)`;

            for (let i = 0, length = this.layoutList.length; i < length; i++) {
                let {startX, startY, endX, endY} = this.layoutList[i].position;

                for (let row = startY; row <= endY; row++) {
                    for (let col = startX; col <= endX; col++) {
                        arr[row][col] = this.layoutList[i].name;
                    }
                }
            }

            gridTemplateAreas = arr.map(row => `"${row.join(" ")}"`).join(" \n  ");

            return {
                display: "grid",
                gridTemplateAreas,
                gridTemplateRows,
                gridTemplateColumns
            };
        }
    },

    watch: {
        layoutList: {
            immediate: true,
            handler(val) {
                const arr = [];
                for (let i = 0; i < val.length; i++) {
                    arr.push(val[i].name);
                }
                this.handleLayout(arr);
            },
        },

        activeLayoutIndex(index) {
            if (isNumber(index)) {
                const componentContainer = this.$refs.componentContainerList[index].$el;

                const classList = componentContainer.classList;
                const callback = () => {
                    componentContainer.removeEventListener("animationend", callback);
                    classList.remove(ACTIVE_CLASS_NAME);
                };

                classList.add(ACTIVE_CLASS_NAME);
                componentContainer.addEventListener("animationend", callback);
            }
        },
    },

    methods: {
        handleLayout(layoutName) {
            this.handleComponentLayout(layoutName);
        },
    },
}