<template>
  <div class="huadiao-fan-board">
    <div class="follow-fan-board-header">
      <div class="active-group-name">全部粉丝</div>
      <div class="group-tools">123</div>
    </div>
    <huadiao-follow-fan-item v-for="(item, index) in fan"
                             :key="item.uid"
                             :item="item"
                             :uid="item.uid"
                             type="fan"
    >
      <template v-slot:relation="props">
        <div :class="props.className"
             @click="props.changeFollowStatus"
        >{{props.follow ? (item.friend ? "已互粉" : "已关注") : "关注"}}</div>
      </template>
      <template v-slot:toolMenu>
        <div @click="deleteFan(index)">移除粉丝</div>
      </template>
    </huadiao-follow-fan-item>
  </div>
</template>

<script>
import HuadiaoFollowFanItem from "@/pages/followfan/components/HuadiaoFollowFanItem";
import {mapState} from "vuex";

export default {
  name: "HuadiaoFanBoard",
  props: ["viewedUid"],
  data() {
    return {
    }
  },
  computed: {
    ...mapState(["fan"]),
  },
  created() {
    this.getFanInfo();
  },
  methods: {
    // 获取关注信息
    getFanInfo() {
      this.sendRequest({
        path: `relation/fan`,
        params: {
          viewedUid: this.viewedUid,
        },
        thenCallback: (response) => {
          let res = response.data;
          console.log(res);
          this.$store.commit("addFan", {fan: res});
        },
        errorCallback: (error) => {
          console.log(error);
        }
      });
    },
    // 删除粉丝
    deleteFan(index) {
      this.huadiaoPopupWindow({
        tip: "确认删除粉丝吗?",
        confirmCallback: () => {
          this.sendRequest({
            path: "relation/removeFan",
            thenCallback: (response) => {
              let res = response.data;
              console.log(res);
              this.$store.dispatch("deleteFan", {index});
              this.huadiaoMiddleTip("移除粉丝成功");
            },
            errorCallback: (error) => {
              console.log(error);
              this.huadiaoMiddleTip("移除粉丝失败");
            }
          })
        },
      });
    },
  },
  beforeDestroy() {
  },
  components: {
    HuadiaoFollowFanItem
  },
}
</script>

<style scoped>

</style>