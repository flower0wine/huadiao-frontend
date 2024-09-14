import {get} from "@/util/request";

export function getAccountInfo() {
    return get("/userinfo/account");
}