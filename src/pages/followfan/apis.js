import {get, post} from "@/util/request";

export function getFollow(params) {
  return get("/relation/follow", {params});
}

export function getFan(params) {
  return get("/relation/fan", {params});
}

export function copyFollow(params) {
  return post("/relation/follow/copy", params);
}

export function moveFollow(params) {
  return post("/relation/follow/move", params);
}

export function getFollowGroup() {
  return get("/relation/follow/group");
}

export function deleteFollowGroup(params) {
  return get("/relation/follow/group/delete", {params});
}

export function createFollowGroup(params) {
  return get("/relation/follow/group/add", {params});
}

/**
 * 获取关注/粉丝数量
 */
export function getRelationCount(params) {
  return get("/relation/count", {params});
}

/**
 * 建立关注关系
 */
export function addFollow(params) {
  return get("/relation/friend", {params});
}

export function deleteFollow(params) {
  return get("/relation/friend/cancel", {params});
}

export function deleteFan(params) {
  return get("/relation/fan/remove", {params});
}

export function modifyFollowGroup(params) {
  return get("/relation/follow/group/modify", {params});
}
