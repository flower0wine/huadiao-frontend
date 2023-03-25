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
                             :type="'fan'"
    >
      <template v-slot:relation="props">
        <div :class="props.className"
             @click="props.changeFollowStatus"
        >{{props.follow ? (item.isFriend ? "已互粉" : "已关注") : "关注"}}</div>
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
  data() {
    return {}
  },
  computed: {
    ...mapState({
      fan(state) {
        return state.followFan.fan;
      }
    })
  },
  methods: {
    // 删除粉丝
    deleteFan(index) {
      this.huadiaoPopupWindow({
        tip: "确认删除粉丝吗?",
        confirmCallback: () => {
          this.$store.dispatch("deleteFan", {index});
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