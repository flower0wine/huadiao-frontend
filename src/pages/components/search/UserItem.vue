<template>
  <div class="user-item search-item">
    <a :href="`/${pageLinkStart.homepage}/${item.uid}`"
       class="link"
       target="_blank">
      <div class="user-item-content">
        <div class="user-item-left">
          <user-avatar-box :options="{scale: `40px`, userAvatar: item.avatar ? `${userAvatarImagePath}${item.avatar}` : ''}"/>
        </div>
        <div class="user-item-right">
          <div class="nickname" v-html="item.nickname">花凋大总管</div>
          <div class="canvases">{{item.canvases}}</div>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
import {apis} from "@/assets/js/constants/request-path";
import UserAvatarBox from "@/pages/components/UserAvatarBox";

export default {
  name: "UserItem",
  props: ["item"],
  components: {UserAvatarBox},
  data() {
    return {
      pageLinkStart: apis.pageLinkStart,
    }
  },
  methods: {},
  beforeDestroy() {
  }
}
</script>

<style scoped>
.user-item {
  width: 300px;
  height: 60px;
  border-radius: 4px;
  background-color: #fff;
}

.user-item-content {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-left: 10px;
}

.user-item-right {
  margin-left: 14px;
}

.nickname {
  font-size: 14px;
  color: #545454;
}

.canvases {
  margin-top: 5px;
  font-size: 12px;
  color: #a4a4a4;
}
</style>