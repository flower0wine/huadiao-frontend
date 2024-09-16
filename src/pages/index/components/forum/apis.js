import {post} from "@/util/request";

export function getNoteList({tagId, page, size}) {
  return post("/forum/note", {tagId, page, size});
}
