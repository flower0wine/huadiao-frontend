/**
 * 功能描述：
 * 创建日期：2024 年 07 月 13 日
 */

// 使用严格模式
'use strict';

import {huadiaoEmoteLink} from "@/util/huadiao-tool";

const MIN_MESSAGE_LENGTH = 1;
const MAX_MESSAGE_LENGTH = 300;

export default {
    data() {
        return {
            realContent: "",
            wordNumber: 0,
            // 输入法合成中
            compositing: false,
        }
    },

    methods: {
        resetRichText() {
            this.wordNumber = 0;
        },

        checkMessageContent() {
            return MIN_MESSAGE_LENGTH <= this.wordNumber && this.wordNumber <= MAX_MESSAGE_LENGTH;
        },

        // 输入中, 输入法输入也可以
        messageEntering(e) {
            // 删除时 e.data 为 null
            if (!e.data || (this.wordNumber + e.data.length > MAX_MESSAGE_LENGTH) || this.compositing) {
                return;
            }
            this.wordNumber += e.data.length;
        },

        // 输入法合成开始
        compositionstart() {
            this.compositing = true;
        },

        // 输入法合成结束
        compositionend(e) {
            this.wordNumber += e.data.length;
            this.compositing = false;
        },

        increaseWordNumber(incr) {
            this.wordNumber += incr;
        },

        insertEmote(emote, inputEl) {
            const img = document.createElement("img");
            img.src = huadiaoEmoteLink(emote.filename);
            img.alt = emote.name;
            img.classList.add("emote");

            if (this.range) {
                let range = this.range;
                range.insertNode(img);
                // 移动光标到图片后面
                range.setStartAfter(img);
                range.collapse(true);

                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
            } else {
                inputEl.appendChild(img);
            }

            this.increaseWordNumber(emote.name.length);
            this.calculateWordNumber();
        },
    },
}
