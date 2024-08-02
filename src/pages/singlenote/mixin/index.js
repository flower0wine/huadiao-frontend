/**
 * 功能描述：
 * 创建日期：2023 年 03 月 28 日
 */

// 使用严格模式
'use strict';

import {mapState} from "vuex";
import {apis} from "@/assets/js/constants/request-path";

export const mixin = {
    data() {
        return {
            config: {
                commentIdLength: 20,
            },
        };
    },
    computed: {
        authorUid() {
            return this.$route.params.authorUid;
        },
        noteId() {
            return this.$route.params.noteId;
        },
        ...mapState({
            me(state) {
                return state.noteInfo.noteAndMeRelation.me;
            }
        })
    },
    methods: {
        // 包装评论
        packageComment(commentContent) {
            let user = this.$store.state.user;
            let date = new Date();

            return {
                userAvatar: user.userAvatar,
                nickname: user.nickname,
                uid: user.uid,
                commentDate: date,
                commentContent,
                likeNumber: 0,
                myLike: false,
                myUnlike: false,
                commentList: [],
            };
        },
        /**
         * 添加评论
         * @param comment 评论
         * @param root 是否是父评论, bool
         * @param rootCommentIndex 父评论的 index
         * @param succeedCallback 成功回调
         * @param failCallback 失败回调
         */
        addComment({
                       comment,
                       root,
                       repliedUid,
                       rootCommentIndex,
                       succeedCallback,
                       failCallback
        }) {
            let commentContent = comment.commentContent;
            let rootCommentId = comment.commentId;

            if (commentContent) {
                this.sendRequest({
                    path: apis.note.comment.add,
                    method: "post",
                    params: {
                        uid: this.$route.params.authorUid,
                        noteId: this.$route.params.noteId,
                        repliedUid
                    },
                    data: {
                        rootCommentId,
                        commentContent,
                    },
                    thenCallback: (response) => {
                        let res = response.data;
                        console.log(res);
                        if(res.code === 1000) {
                            if(root) {
                                comment.commentId = res.data.rootCommentId;
                                this.$store.commit("addRootCommentByCurrentUser", {comment});
                            } else {
                                comment.commentId = res.data.subCommentId;
                                this.$store.commit("addSubCommentByCurrentUser", {comment, rootCommentIndex});
                            }
                            succeedCallback && succeedCallback();
                        } else {
                            failCallback && failCallback();
                        }
                    },
                    errorCallback: (error) => {
                        console.log(error);
                        failCallback && failCallback();
                    }
                });
            } else {
                failCallback && failCallback();
            }
        },
    }
}