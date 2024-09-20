import {get} from "@/util/request";

export function validateUser() {
  return get("/common/validate");
}
