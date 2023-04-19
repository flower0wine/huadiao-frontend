<template>
  <div class="huadiao-follow-board">
    <div class="follow-fan-board-header">
      <div class="active-group-name">全部关注</div>
      <div class="group-tools">123</div>
    </div>
    <huadiao-follow-fan-item v-for="item in follow"
                             :key="item.uid"
                             :item="item"
                             :uid="item.uid"
                             :type="'follow'"
    >
      <template v-slot:relation="props">
        <div :class="props.className"
             @click="props.changeFollowStatus"
        >{{props.follow ? (item.friend ? "已互粉" : "已关注") : "关注"}}</div>
      </template>
      <template v-slot:toolMenu>
        <div>设置分组</div>
      </template>
    </huadiao-follow-fan-item>
  </div>
</template>

<script>
import {mapState} from "vuex";
import HuadiaoFollowFanItem from "@/pages/followfan/components/HuadiaoFollowFanItem";

export default {
  name: "HuadiaoFollowBoard",
  computed: {
    ...mapState({
      follow(state) {
        return state.followFan.follow;
      }
    }),
  },
  data() {
    return {
    }
  },
  beforeCreate() {

  },
  methods: {
    // 获取关注信息
    getFollowInfo() {},
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