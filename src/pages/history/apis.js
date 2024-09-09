import {get} from "@/util/request";

export function deleteOneNoteHistory(uid, noteId) {
    return get(`history/note/delete?uid=${uid}&noteId=${noteId}`);
}