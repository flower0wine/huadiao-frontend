<template>
  <div class="comment-infer">
    <div class="user-nickname">{{item.nickname}}</div>
    <div class="comment-content" v-html="item.commentContent"></div>
    <div class="comment-details">
      <div class="comment-send-date">{{sendDate}}</div>
      <div class="like-comment"
           @click="clickToLikeComment"
      >
        <span v-html="svg.like"
              class="like-icon"
              :class="item.myLike ? 'active-icon' : ''"
        ></span>
        <span>{{item.likeNumber}}</span>
      </div>
      <div class="unlike-comment"
           @click="clickToUnlikeComment"
      >
        <span v-html="svg.like"
              class="unlike-icon"
              :class="item.myUnlike ? 'active-icon' : ''"
        ></span>
      </div>
      <div class="reply-comment-user" @click="replyCommentUser">回复</div>
      <div class="comment-operations">
        <span v-html="svg.more"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CommentInfer",
  props: ["item", "rootIndex", "subIndex"],
  data() {
    return {
      svg: {
        more: `<svg t="1678338951667" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5121" width="200" height="200"><path d="M512 512m-97.62413458 0a97.62413458 97.62413458 0 1 0 195.24826916 0 97.62413458 97.62413458 0 1 0-195.24826916 0Z" p-id="5122"></path><path d="M512 121.50346165m-97.62413458 0a97.62413458 97.62413458 0 1 0 195.24826916 0 97.62413458 97.62413458 0 1 0-195.24826916 0Z" p-id="5123"></path><path d="M512 902.49653835m-97.62413458 0a97.62413458 97.62413458 0 1 0 195.24826916 0 97.62413458 97.62413458 0 1 0-195.24826916 0Z" p-id="5124"></path></svg>`,
        like: `<svg t="1679919648906" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5216" width="200" height="200"><path d="M121.44576285 462.74069451c17.53211062 0 31.72347024-14.2224079 31.72347024-31.72222749 0-17.53086786-14.19135963-31.75451731-31.72347024-31.75451731-0.32910723 0-0.59487756 0.1813199-0.89417805 0.18131991l-75.84745729 0.17759406c-1.72998778-0.23720513-3.51958661-0.35891276-5.3079439-0.35891276-23.88077834 0-43.23105178 19.58996287-43.23105178 43.82965397L-4.25091011 968.99232805c0 24.2111271 19.37883743 43.20248779 43.29066284 43.2024878 2.32610687 0 4.622407 0.35518813 6.85661176 0l74.05910122 0.02732244c0.12046609 0 0.18007715 0.05836951 0.30054324 0.05836952 0.11798179 0 0.17759406-0.05836951 0.2968174-0.05836952l0.89417803 0 0-0.18007715c16.27901861-0.65573137 29.33899386-13.86225239 29.33899386-30.29278416 0-16.45661147-13.05873371-29.6631337-29.33899386-30.31886386l0-0.4781373-61.83369173 0 1.7597933-488.2140644L121.44576285 462.73821021z" p-id="5217"></path><path d="M1015.07667892 417.27419643c-23.40264103-38.1627973-57.45221693-53.60849047-98.65522199-55.27638289-2.1485128-0.2993017-4.29205701-0.47689577-6.52998762-0.47689577l-249.33673521-0.83580852c16.33862966-47.40388545 27.54815227-103.87374687 27.54815227-156.94324744 0-34.40600557-3.87601628-67.91783188-10.97355902-100.17656741l-0.59487755 0.05961228c-12.91094516-56.5294749-62.78872481-98.68626907-122.53600033-98.68626906-69.49754804 0-115.86070847 58.43705552-115.86070847 128.79773453 0 3.9343858-0.35767122 7.75203135 0 11.56843535-3.63632686 131.54112368-110.73160018 237.32369393-238.1582609 251.84416078l0 66.60637035-0.95379031 269.70165279 0 278.82475793 12.99787988 0 606.84548445 0.26949496 10.61464505-0.29557586c23.49205883 0.05961228 36.6998214-5.84693502 58.01604618-19.55891458 20.24693578-13.05997524 35.48274506-30.94851433 45.50002947-51.16191872 2.74338915-4.05485189 4.88941887-8.58659833 6.19715455-13.59399899l93.47147002-417.88194937c1.281656-4.91922439 1.63684413-9.92910814 1.281656-14.75891473C1035.85515414 468.85091434 1029.95481699 441.54245151 1015.07667892 417.27419643zM975.39501929 481.46255903l-100.7118327 446.35284486-0.12046609-0.05961226c-3.10106158 7.45397241-8.34939321 14.07337782-15.62204569 18.72310606-5.06949601 3.30970271-10.64817642 5.28062145-16.28026015 6.02452787-1.81816283-0.23720513-3.69718067 0-5.60724439 0l-578.93593512-0.65573137-0.20864114-494.44350878c108.40549452-48.8681029 187.92032575-96.69051218 228.88612568-210.76038026 0.08817627 0.02980554 0.15151316 0.05961228 0.23720512 0.08817626 3.64005149-11.0890565 7.66261354-25.16367587 10.55503277-40.24921475 6.73738721-35.4206497 6.3822003-70.54075616 6.3822003-70.54075615-5.99223805-46.09366547 31.48253806-64.2802647 53.84197097-64.28026471 30.71006766 1.04445087 61.00160907 40.84657539 61.00160906 63.50530878 0 0 6.79699949 33.45221526 6.85661178 69.40813024 0.05836951 45.3485163-5.66437357 68.99208829-5.66437358 68.99208829l-0.56631357 0c-7.12734826 37.47601886-19.67813913 72.98608637-36.9730434 105.54288082l0.44708901 0.41604195c-2.8626137 5.84445072-4.50194091 12.40424387-4.50194091 19.34903191 0 24.17883728 23.16667745 26.38696236 47.04745579 26.38696234l289.7685102 0.32786569c0 0 17.79912127 0.56507082 17.82892802 0.56507081l0 0.12170764c14.7241406-0.7749547 29.39612182 6.32010373 37.74427226 19.91534425 6.68025924 10.94251073 7.81288516 23.79260208 4.2312032 35.18096027L975.39501929 481.46255903z" p-id="5218"></path><path d="M212.02357089 1012.40221545c0.38747796 0.02980554 0.53526528 0.02980554 0.35891276-0.02980554 0.29557586-0.05836951 0.44584748-0.09065935-0.35891276-0.09065935s-0.65448861 0.03228982-0.32910723 0.09065935C211.54667634 1012.43202097 211.66589967 1012.43202097 212.02357089 1012.40221545z" p-id="5219"></path></svg>`,
      }
    }
  },
  computed: {
    sendDate() {
      let date = this.item.commentDate.split(/[:]/);
      return date[0] + ":" + date[1];
    }
  },
  methods: {
    // 回复评论者
    replyCommentUser(e) {
      // 隐藏其他根评论的输入框, 打开该回复按钮的根评论对应的输入框
      this.$bus.$emit("judgeClickObject", {
        pointerEvent: e,
        rootIndex: this.rootIndex,
        subIndex: this.subIndex,
      });
    },
    // 点击喜欢评论
    clickToLikeComment() {
      this.$store.dispatch("clickToLikeComment", {
        rootIndex: this.rootIndex,
        subIndex: this.subIndex,
        succeedCallback: () => {
          this.huadiaoMiddleTip("点赞成功!");
        },
        cancelSucceedCallback: () => {
          this.huadiaoMiddleTip("取消点赞成功!");
        },
        failCallback: () => {
          this.huadiaoMiddleTip("点赞失败!");
        },
        cancelFailCallback: () => {
          this.huadiaoMiddleTip("取消点赞失败!");
        },
      });
    },
    // 点击不喜欢评论
    clickToUnlikeComment() {
      this.$store.dispatch("clickToUnlikeComment", {
        rootIndex: this.rootIndex,
        subIndex: this.subIndex,
        succeedCallback: () => {
          this.huadiaoMiddleTip("不喜欢成功!");
        },
        cancelSucceedCallback: () => {
          this.huadiaoMiddleTip("取消不喜欢成功!");
        },
        failCallback: () => {
          this.huadiaoMiddleTip("不喜欢失败!");
        },
        cancelFailCallback: () => {
          this.huadiaoMiddleTip("取消不喜欢失败!");
        },
      });
    },
  },
  beforeDestroy() {
    this.clearAllRefsEvents();
  }
}
</script>

<style scoped>

.comment-infer {
  max-width: 100%;
  padding-left: 20px;
  color: #3a3a3a;
}

.user-nickname {
  font-size: 14px;
}

.comment-content {
  word-break: break-all;
  padding: 10px 50px 10px 0;
}

.comment-content /deep/ a {
  margin: 0 3px;
  padding: 0 3px;
  color: #d00101!important;
  border-radius: 4px;
}

.comment-content /deep/ a:hover {
  background-color: #e7e7e7;
}

.comment-details {
  display: flex;
  color: #858585;
  font-size: 13px;
}

.comment-details>div {
  margin-right: 20px;
}

.comment-details /deep/ svg {
  width: 13px;
  height: 13px;
  fill: #858585;
  vertical-align: -1px;
}

.like-icon,
.unlike-icon {
  display: inline-block;
  width: 22px;
  height: 22px;
  text-align: center;
  line-height: 22px;
  margin-right: 3px;
  border-radius: 4px;
  cursor: pointer;
}

.comment-operations {
  width: 18px;
  height: 21px;
  text-align: center;
  line-height: 21px;
  border-radius: 4px;
  cursor: pointer;
}

.reply-comment-user {
  text-align: center;
  line-height: 22px;
  margin-right: 3px;
  padding: 0 3px;
  border-radius: 4px;
  cursor: pointer;
}

.like-icon:hover,
.unlike-icon:hover,
.reply-comment-user:hover,
.comment-operations:hover {
  background-color: #ececec;
}

.unlike-icon {
  transform: rotateX(-180deg);
}

.like-comment:hover /deep/ svg,
.unlike-comment:hover /deep/ svg,
.comment-operations:hover /deep/ svg,
.reply-comment-user:hover,
.active-icon /deep/ svg {
  fill: #e74444;
  color: #e74444;
}

.comment-operations /deep/ svg {
  vertical-align: -2px;
}
</style>