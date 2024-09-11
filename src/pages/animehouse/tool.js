import {HUADIAO_HOUSE_IMAGE_HOST} from "@/util/request";

export function getHuadiaoHouseImageUrl(url) {
    url += "";

    if (url.startsWith("blob") || url.startsWith("http")) {
        return url;
    }

    return `${HUADIAO_HOUSE_IMAGE_HOST}${url}`;
}

export function getHuadiaoHouseCardBorderImageStyle(cardBorderImage) {
    return `border-image-source: url('${HUADIAO_HOUSE_IMAGE_HOST}${cardBorderImage.borderImageSource}'); border-image-slice: ${cardBorderImage.borderImageSlice}; border-image-outset: ${cardBorderImage.borderImageOutset}; border-image-width: ${cardBorderImage.borderImageWidth}`;
}

export function backgroundTransform(background) {
    let singleColor = background.startsWith("#");
    let gradientColor = background.startsWith("-webkit-linear-gradient");
    // 是否是图片
    if(!singleColor && !gradientColor) {
        // 是否是本地图片
        let nativePicture = background.startsWith("blob");
        background = nativePicture ? `url('${background}')` : `url('${HUADIAO_HOUSE_IMAGE_HOST}${background}')`;
    }
    background = singleColor ? `background-color: ${background};` : `background-image: ${background};`;
    return background;
}