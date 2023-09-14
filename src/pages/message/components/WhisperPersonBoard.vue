<template>
  <div class="whisper-left-container">
    <div class="message-left-board-header">近期消息</div>
    <div class="whisper-left-board">
      <div class="user-list">
        <router-link class="latest-user-item"
                     v-for="(item, index) in whisper"
                     :key="item.user.uid"
                     :to="{
                       name: 'messageChatBoard',
                       params: {
                         uid: item.user.uid,
                         latestUserIndex: index,
                       },
                     }"
                     tag="div"
                     active-class="latest-user-item-active"
                     :title="item.user.nickname"
        >
          <user-avatar-box :options="{ userAvatar: item.user.userAvatar, scale: '40px' }"/>
          <div class="user-info">
            <div class="nickname">{{ item.user.nickname }}</div>
            <div class="latest-message"
                 :title="item.messageList[0] ? item.messageList[0].messageContent : ''"
                 v-text="item.messageList[0] ? item.messageList[0].messageContent : ''"
            ></div>
          </div>
          <div class="delete-latest-user"
               v-if="item.allowDelete"
               @click="deleteLatestUser(index)"
          >
            <div class="delete-icon" v-html="svg.close"></div>
          </div>
          <div class="unread-dot" v-if="false"></div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import UserAvatarBox from "@/pages/components/UserAvatarBox";
export default {
  name: "WhisperPersonBoard",
  components: {UserAvatarBox},
  data() {
    return {
      svg: {
        close: `<svg t="1680591017449" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5216" width="200" height="200"><path d="M557.311759 513.248864l265.280473-263.904314c12.54369-12.480043 12.607338-32.704421 0.127295-45.248112-12.512727-12.576374-32.704421-12.607338-45.248112-0.127295L512.127295 467.904421 249.088241 204.063755c-12.447359-12.480043-32.704421-12.54369-45.248112-0.063647-12.512727 12.480043-12.54369 32.735385-0.063647 45.280796l262.975407 263.775299-265.151458 263.744335c-12.54369 12.480043-12.607338 32.704421-0.127295 45.248112 6.239161 6.271845 14.463432 9.440452 22.687703 9.440452 8.160624 0 16.319527-3.103239 22.560409-9.311437l265.216826-263.807983 265.440452 266.240344c6.239161 6.271845 14.432469 9.407768 22.65674 9.407768 8.191587 0 16.352211-3.135923 22.591372-9.34412 12.512727-12.480043 12.54369-32.704421 0.063647-45.248112L557.311759 513.248864z" p-id="5217"></path></svg>`,
        avatar: `<svg t="1657536982283" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3627" width="200" height="200"><path d="M510.77050482 2.21923328c281.4240859 0 509.56537287 228.14128697 509.56537173 509.56653682 0 281.42757888-228.14128697 509.56653682-509.56537173 509.56653681-281.42757888 0-509.56886585-228.14012302-509.56886585-509.56653681 0-281.4240859 228.14128697-509.56653682 509.56886585-509.56653682z" fill="#EEEEEE" p-id="3628"></path><path d="M510.77050482 516.51164387c90.0558939 0 163.05952199-73.30168832 163.05952199-163.72549973 0-90.42264633-73.00362809-163.72433465-163.05952199-163.72433465-90.05705785 0-163.06301497 73.30168832-163.06301497 163.72433465-0.00116395 90.42497536 73.00479317 163.72549859 163.06301497 163.72549973z m251.51800206 200.09807531l1.21552441-0.45756757c-39.85964146-100.90130205-137.98992099-172.25861689-252.73352647-172.25861689-113.31967317 0-210.42537358 69.60155875-251.2141221 168.51890176l0.56235463 0.22820181a39.9609344 39.9609344 0 0 0-2.9188881 15.01940622c0 22.15886393 17.97555086 40.12510094 40.15420757 40.12509981 16.79146325 0 31.16701469-10.30401138 37.16196921-24.92522837l0.65433486 0.26545948c28.69987328-68.84360192 96.50958109-117.22355485 175.60014393-117.22355484 79.76934741 0 148.05874461 49.21940878 176.32433493 119.00725475l0.2875813-0.10828003c6.4338944 13.58499499 20.27037696 22.98434901 36.30970538 22.98434901 22.17516373 0 40.15187968-17.96507307 40.15187968-40.12509981a40.14256469 40.14256469 0 0 0-1.55549923-11.05032533z" fill="#CCCCCC" p-id="3629"></path></svg>`,
      }
    }
  },
  computed: {
    whisper() {
      return this.$store.state.message.whisper;
    }
  },
  mounted() {
    this.initialRouter();
  },
  methods: {
    // 删除最近聊天对象
    deleteLatestUser(latestUserIndex) {
      this.$store.commit("deleteLatestUser", {latestUserIndex});
    },
    // 初始化路由
    initialRouter() {
      // 有两种情况：
      // 1. 如果用户是直接复制 url 打开该页面, latestUserIndex 为 undefined
      // 2. 如果用户是正常点击我的消息, latestUserIndex 为 undefined, 则默认打开第一个用户界面
      if (!this.$route.params.latestUserIndex) {
        // 判断 uid 是否存在, 存在获取它在数组中的索引, 不存在或者匹配第一个用户都将返回 0
        let uid = this.$route.params.uid;
        // 没有用户返回 -1, 找不到用户返回第一个用户, 0, 找到的返回索引
        let index = this.$store.getters.accordingUidGetIndex(parseInt(uid));

        if (index !== -1) {
          // 获取 index 对应的用户的 uid
          let tempUid = this.$store.state.message.whisper[index].user.uid;

          // 如果当前路由 uid 与 查找到的 tempUid 不同, 说明给定的 uid 在数组中不存在
          if (parseInt(uid) !== tempUid) {
            this.$router.push({
              name: 'messageChatBoard',
              params: {
                uid: tempUid,
                latestUserIndex: String(index),
              },
            });
          }
        }
      }
    }
  },
  beforeDestroy() {
  }
}
</script>

<style scoped>
.whisper-left-container {
  height: 100%;
  border-right: 1px solid #bebebe;
  overflow-y: hidden;
}

.whisper-left-board {
  width: 260px;
  height: calc(100% - 31px);
  overflow-y: auto;
}

.whisper-left-board::-webkit-scrollbar {
  width: 10px;
}

.whisper-left-board::-webkit-scrollbar-track {
  border-radius: 5px;
  background-color: #e1e1e1;
}

.whisper-left-board::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: #a6a6a6;
}

.message-left-board-header {
  font-size: 14px;
  text-align: center;
  line-height: 30px;
  border-bottom: 1px solid #bebebe;
}

.user-list {
  overflow-y: auto;
}

.latest-user-item {
  position: relative;
  display: flex;
  align-items: center;
  padding: 10px 24px;
  height: 80px;
  cursor: pointer;
}

.latest-user-item:hover,
.latest-user-item-active {
  background: -webkit-linear-gradient(top right, #ffffff8a, #5b7ad038);
}

.user-info {
  margin-left: 10px;
}

.nickname {
  font-size: 14px;
  color: #404040;
  margin-bottom: 10px;
}

.latest-message {
  font-size: 12px;
  color: #7a7a7a;
}

.latest-message,
.nickname {
  width: 160px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.delete-latest-user {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 24px;
  height: 80px;
  transform: translateX(-100%);
  transition: var(--transition-500ms);
}

.latest-user-item:hover .delete-latest-user {
  transform: translateX(0);
}

.delete-icon {
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 80px;
}

.delete-icon /deep/ svg {
  width: 20px;
  height: 20px;
  fill: #6e5f9a;
}

.unread-dot {
  position: absolute;
  top: 50%;
  right: 17px;
  transform: translateY(-50%);
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #ee4747;
}
</style>