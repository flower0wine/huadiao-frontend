<template>
  <div class="huadiao-follow-board">
    <div class="follow-fan-board-header">
      <div class="active-group-name">{{ groupName }}</div>
      <div class="group-tools">123</div>
    </div>
    <huadiao-follow-fan-item v-for="item in follow"
                             :key="item.uid"
                             :item="item"
                             :uid="item.uid"
                             type="follow"
    >
      <template v-slot:relation="props">
        <div :class="props.className"
             @click="props.changeFollowStatus(item.uid)"
        >{{ props.follow ? (item.friend ? "已互粉" : "已关注") : "关注" }}
        </div>
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
  data() {
    return {
      visible: {
        render: false
      },
      // 已访问过的关注分组, 为的是不重复获取相同的关注分组
      accessedFollowGroup: new Set(),
      // 获取信息中, 节流 (主要是)
      accessing: false,
    }
  },
  created() {
    console.log(this.$route.params.viewedUid)
  },
  computed: {
    viewedUid() {
      return this.$route.params.viewedUid;
    },
    ...mapState({
      // 所有的关注, 根据 groupId 来查找
      follow(state) {
        let follow = [];
        let followers = state.follow;
        let groupId = parseInt(this.groupId);
        // groupId 为 null 或为 -1 默认为查看全部关注
        if (!groupId || groupId === -1) {
          for (let index = 0; index < followers.length; index++) {
            follow.push({index, ...followers[index]});
          }
        }
        // 否则找出与当前选择分组对应的用户
        else {
          for (let index = 0; index < followers.length; index++) {
            if (groupId === followers[index].groupId) {
              follow.push({index, ...followers[index]});
            }
          }
        }
        return follow;
      },
      groupName(state) {
        let groupId = parseInt(this.groupId);
        if (!groupId) {
          // 如果是直接输入 url, 就默认找全部关注 (全部关注的 groupId = -1)
          groupId = -1;
        }
        // 挑出与当前选择分组对应的关注分组名称
        for (let folGroup of state.followGroup) {
          if (groupId === folGroup.groupId) {
            return folGroup.groupName;
          }
        }
        return "";
      },
    }),
    groupId() {
      return this.$route.params.groupId;
    },
  },
  watch: {
    "$store.state.followGroup": {
      deep: true,
      handler() {
        // 关注分组获取成功后才进行渲染
        this.visible.render = true;
      }
    },
    "$route.query.groupId": {
      deep: true,
      immediate: true,
      handler() {
        // 每次更换 groupId 都获取关注分组, 实在做不出来了, 放一放
        this.getFollowInfo();
      },
    },
  },
  methods: {
    // 获取关注信息
    getFollowInfo() {
      // 是否访问过该关注分组
      if(this.accessedFollowGroup.has(this.groupId)) {
        return;
      }
      // 是否正在访问
      if(this.accessing) {
        return;
      }
      // 正在访问
      this.accessing = true;
      this.sendRequest({
        path: `relation/follow`,
        params: {
          viewedUid: this.viewedUid,
          groupId: this.groupId,
        },
        thenCallback: (response) => {
          let res = response.data;
          console.log(res);
          this.$store.commit("addFollow", {follow: res});
          this.accessedFollowGroup.add(this.groupId);
          this.accessing = false;
        },
        errorCallback: (error) => {
          console.log(error);
          this.accessing = false;
        }
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