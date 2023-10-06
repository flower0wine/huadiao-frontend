<template>
  <div class="huadiao-fan-board">
    <div class="follow-fan-board-header">
      <div class="active-group-name">全部粉丝</div>
    </div>
    <huadiao-follow-fan-item v-for="(item, index) in fan"
                             :key="item.uid"
                             :item="item"
                             :uid="item.uid"
                             type="fan">
      <template v-slot:relation="props">
        <div :class="props.className"
             @click="props.changeFollowStatus(item.uid)"
        >{{props.follow ? "已互粉" : "关注"}}</div>
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
import {apis} from "@/assets/js/constants/request-path";
import {statusCode} from "@/assets/js/constants/status-code";

export default {
  name: "HuadiaoFanBoard",
  data() {
    return {
      fan: [],
      hasNext: true,
      offset: 0,
      row: 10,
    }
  },
  computed: {
    ...mapState(["fan"]),
    viewedUid() {
      return this.$route.params.viewedUid;
    },
  },
  watch: {
    "$route.params.groupId": {
      immediate: true,
      handler(val) {
        if(typeof val === "undefined") {
          this.resetFan();
          this.getFanInfo();
        }
      },
    },
  },
  created() {

  },
  methods: {
    resetFan() {
      this.fan = [];
      this.offset = 0;
      this.hasNext = true;
    },
    // 获取关注信息
    getFanInfo() {
      if(!this.hasNext) {
        return;
      }
      this.sendRequest({
        path: apis.followFan.fanGet,
        params: {
          uid: this.viewedUid,
          offset: this.offset,
          row: this.row,
        },
        thenCallback: (response) => {
          let res = response.data;
          console.log(res);
          if(res.code === statusCode.succeed) {
            this.fan.push(...res.data);
            this.offset += res.data.length;
          } else if(res.code === statusCode.notExist) {
            this.hasNext = false;
          }
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
            path: apis.followFan.deleteFan,
            thenCallback: (response) => {
              let res = response.data;
              console.log(res);
              if(res.code === statusCode.succeed) {
                this.$store.dispatch("deleteFan", {index});
              }
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