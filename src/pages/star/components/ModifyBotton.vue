<template>
  <div class="modify-group">
    <div @click="modifyGroup">修改</div>
  </div>
</template>

<script>
import {apis} from "@/assets/js/constants/request-path";
import {statusCode} from "@/assets/js/constants/status-code";

export default {
  props: ["groupName", "groupDescription", "groupId", "modifyIndex", "open", "access"],
  name: "ModifyButton",
  data() {
    return {}
  },
  methods: {
    // 修改收藏夹信息
    modifyGroup() {
      if (this.access()) {
        this.sendRequest({
          path: apis.star.noteGroupModify,
          params: {
            groupName: this.groupName,
            groupDescription: this.groupDescription,
            groupId: this.groupId,
            open: this.open ? 1 : 0,
          },
          thenCallback: (response) => {
            let res = response.data;
            console.log(res);
            if (res.code === statusCode.succeed) {
              this.modifyGroupInfoSucceed();
            }
          },
          errorCallback: (error) => {
            console.log(error);
          }
        });
      }
    },
    modifyGroupInfoSucceed() {
      this.$store.dispatch("modifyFavoriteInfer", {
        favoriteName: this.groupName,
        favoriteCanvases: this.groupDescription,
        isPublic: this.open,
        modifyIndex: this.modifyIndex,
        succeedCallback: () => {
          this.$bus.$emit("closeBoard");
          this.huadiaoMiddleTip("修改成功!");
        },
      });
    },
  },
  beforeDestroy() {
  }
}
</script>

<style scoped>
.modify-group div {
  width: 80px;
  height: 30px;
  margin: 20px auto 0;
  border-radius: 6px;
  text-align: center;
  line-height: 30px;
  color: #fff;
  background-color: #7f6df8;
  cursor: pointer;
}

.modify-group div:hover {
  background-color: #7464e3;
}
</style>