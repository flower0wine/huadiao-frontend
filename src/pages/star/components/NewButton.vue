<template>
  <div class="add-group">
    <div @click="newGroup">新建</div>
  </div>
</template>

<script>
import {apis} from "@/assets/js/constants/request-path";
import {statusCode} from "@/assets/js/constants/status-code";

export default {
  name: "NewButton",
  props: ["groupName", "groupDescription", "open", "access", "viewedUid"],
  data() {
    return {}
  },
  methods: {
    // 建立新的收藏夹
    newGroup() {
      if(this.access()) {
        this.sendRequest({
          path: apis.star.noteGroupAdd,
          params: {
            groupName: this.groupName,
            groupDescription: this.groupDescription,
            open: this.open ? 1 : 0,
          },
          thenCallback: (response) => {
            let res = response.data;
            console.log(res);
            if (res.code === statusCode.succeed) {
              this.buildGroupSucceed(res.data.groupId);
            }
          },
          errorCallback: (error) => {
            console.log(error);
          }
        });
      }
    },
    buildGroupSucceed(groupId) {
      this.$store.commit("buildNewFavorite", {
        groupName: this.groupName,
        groupDescription: this.groupDescription,
        open: this.open,
        groupId,
        createTime: new Date(),
      });
      this.$bus.$emit("closeBoard");
      this.$nextTick(() => {
        this.$router.replace({path: `/star/${this.viewedUid}/note/${groupId}`});
      });
    }
  },
  beforeDestroy() {
  }
}
</script>

<style scoped>
.add-group div {
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

.add-group div:hover {
  background-color: #7464e3;
}
</style>