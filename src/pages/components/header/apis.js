import {get} from "@/util/request";

export function getHeader() {
  return get("/header");
}
