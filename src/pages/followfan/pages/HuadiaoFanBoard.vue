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
import {responseHandler} from "@/assets/js/constants/status-code";
import {deleteFan, getFan} from "@/pages/followfan/apis";
import {requestPager} from "@/util/request";
import {flatPromise} from "@/util";
import {huadiaoMiddleTip, huadiaoPopupWindow} from "@/eventbus";

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
    viewedUid() {
      return parseInt(this.$route.params.viewedUid);
    },

    pager() {
      return requestPager(getFan);
    },
  },

  created() {
    this.getFanInfo();
  },

  methods: {
    // 获取关注信息
    async getFanInfo() {
      const promiseRes = await this.pager.fetch({
        uid: this.viewedUid,
      });

      const [err, res] = await flatPromise(promiseRes);

      if (err) {
        console.log(err);
        return;
      }

      responseHandler(res)
        .succeed((res) => {
          this.fan.push(...res.data);

          this.pager.setHasNext(this.pager.getSize() <= res.data.length);
        });
    },
    // 请求删除粉丝
    async requestDeleteFan(index) {
      const [err, res] = await flatPromise(deleteFan({uid: this.fan[index].uid}));

      if (err) {
        console.log(err);
        return;
      }

      responseHandler(res)
        .succeed(() => {
          this.fan.splice(index, 1);
        })
        .error(() => {
          huadiaoMiddleTip("删除粉丝失败");
        });
    },

    // 删除粉丝
    deleteFan(index) {
      huadiaoPopupWindow("warning", "confirmOrCancel","确认删除粉丝吗?")
          .then(this.requestDeleteFan.bind(this, index));
    },
  },

  components: {
    HuadiaoFollowFanItem,
  },
}
</script>

<style scoped>

</style>
