/**
 * 功能描述：
 * 创建日期：2024 年 07 月 06 日
 */

// 使用严格模式
'use strict';

import {apis} from "@/assets/js/constants/request-path";
import {HUADIAO_HOST_IP} from "@/util/request";

export const userAvatarImagePath = `${apis.imageHost}userAvatar/`;

export function backgroundUrl(url) {
    return `background-image: url('${url}')`;
}

// 头像
export function huadiaoAvatarLink(avatar) {
    if (!avatar) {
        return '';
    }
    return backgroundUrl(`${userAvatarImagePath}${avatar}`);
}

export function homepageLink(uid) {
    return `/homepage/${uid}`;
}

export function noteLink(authorUid, noteId) {
    return `/singlenote/${authorUid}/${noteId}`;
}

export function followLink(uid) {
    return `/followfan/${uid}/follow`;
}

export function fanLink(uid) {
    return `/followfan/${uid}/fan`;
}

export function huadiaoWhisperLink(uid) {
    return `/message#/whisper/${uid}`;
}

export function huadiaoStarLink(uid) {
    return `/star/${uid}`;
}

export  function huadiaoAnimeHouseLink(uid) {
    return `/animehouse/${uid}`;
}

export function huadiaoNotesLink(uid) {
    return `/notes/${uid}`;
}

export function huadiaoAccountInfoLink() {
    return '/account/info';
}

export function huadiaoNickname(nickname, userId) {
    return nickname || userId;
}

export function huadiaoImageLink(imgName) {
    return `http://${HUADIAO_HOST_IP}/images/${imgName}`;
}

export function huadiaoEmoteLink(emoteName) {
    return huadiaoImageLink(`emote/${emoteName}`);
}

export function getAvatarUrl(url) {
    url += "";
    if (url.startsWith('http')) {
        return url;
    }
    if (url.startsWith('/')) {
        url = url.substr(1);
    }
    return `${userAvatarImagePath}${url}`;
}


