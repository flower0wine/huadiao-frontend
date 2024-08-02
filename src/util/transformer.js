/**
 * 功能描述：
 * 创建日期：2024 年 05 月 19 日
 */

// 使用严格模式
'use strict';


/**
 * 将 RGB 颜色转换为 十六进制颜色
 * @param color{string}
 * @return {string}
 */
export function colorToHex(color) {
    if (color.startsWith("rgba") || color.startsWith("rgb")) {
        const parts = color.replace("rgba(", "").replace("rgb(", "").replace(")", "").split(',').map(Number);

        // 如果是RGBA，则保留alpha通道
        const hexParts = parts.map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        });

        // 如果RGBA有4个部分，则添加透明度（alpha）
        if (parts.length === 4) {
            hexParts.splice(3, 1, (parts[3] * 255).toString(16).padStart(2, '0'));
            return '#' + hexParts.join(''); // 返回#RRGGBBAA格式
        } else {
            // 如果没有透明度信息，则只返回RGB的十六进制
            return '#' + hexParts.slice(0, 3).join('');
        }
    } else {
        return color;
    }
}