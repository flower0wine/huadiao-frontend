<template>
  <div class="whisper-left-container">
    <div class="whisper-user-header">近期消息</div>
    <div class="whisper-left-board">
      <div class="user-list">
        <router-link class="latest-user-item"
                     v-for="(item, index) in whisperUsers"
                     :key="item.uid"
                     @click.native="clickLatestUserItem(index)"
                     :to="{
                       name: messageChatBoardRouteName,
                       params: {
                         uid: item.uid,
                       },
                     }"
                     tag="div"
                     active-class="latest-user-item-active"
                     :title="huadiaoNickname(item.nickname, item.userId)"
        >
          <user-avatar-box :options="{ userAvatar: item.avatar, scale: '40px' }"/>
          <div class="user-info">
            <div class="nickname">{{ huadiaoNickname(item.nickname, item.userId) }}</div>
            <div class="latest-message"
                 :title="item.latestMessage"
                 v-html="item.latestMessage"
            ></div>
          </div>
          <div class="delete-latest-user"
               @click="deleteLatestUser(index)">
            <div class="delete-icon" v-html="forkSvg"></div>
          </div>
          <div class="unread-dot" v-if="item.unreadCount"></div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import UserAvatarBox from "@/pages/components/UserAvatarBox";
import {svg} from "@/assets/js/constants/svgs";
import {apis} from "@/assets/js/constants/request-path";
import {ResponseHandler} from "@/assets/js/utils";
import {mapGetters, mapMutations, mapState} from "vuex";
import {MESSAGE_CHAT_BOARD_ROUTE_NAME, WHISPER_ROUTE_PATH} from "@/pages/message/config";
import {huadiaoNickname} from "@/util/huadiao-tool";
import {huadiaoMiddleTip} from "@/pages/components/HuadiaoMiddleTip";
import useChat from "@/pages/message/hook/useChat";

export default {
  name: "WhisperPersonBoard",
  components: {UserAvatarBox},
  mixins: [useChat],
  data() {
    return {
      offset: 0,
      row: 10,
      hasNext: true,
      accessing: false,
      observer: null,
      visible: {
        unfollowUser: true,
      },
    }
  },
  computed: {
    ...mapState("whisperUserStore", ["whisperUsers"]),

    ...mapState("unreadCountStore", ["count"]),

    ...mapGetters("whisperUserStore", ["userUnreadCount", "userExist"]),

    forkSvg() {
      return svg.fork;
    },

    currentRoutePath() {
      return this.$route.path;
    },

    messageChatBoardRouteName() {
      return MESSAGE_CHAT_BOARD_ROUTE_NAME;
    },
  },
  watch: {
    chatUid() {
      this.getSingleLatestUser();
      this.clearUnreadCount();
    },
  },
  created() {
    this.getSingleLatestUser();
    this.getLatestUser();
  },
  mounted() {
    this.getIntersectionObserver(this.getLatestUser);
  },
  methods: {
    ...mapMutations("whisperUserStore", [
      "unshiftWhisperUser",
      "removeOneWhisperUser",
      "setSelectedLatestUserIndex",
      "addWhisperUsers",
    ]),

    ...mapMutations("unreadCountStore", ["setWhisperCount"]),

    huadiaoNickname,

    jumpFirstUser() {
      let path;
      let whisper = this.whisperUsers;
      if(whisper.length !== 0) {
        path = `${WHISPER_ROUTE_PATH}/${whisper[0].uid}`
      }

      if (this.currentRoutePath !== path) {
        this.$router.replace({
          path,
        }).catch((err) => {
          console.log(err)
        });
      }
    },

    // 查找当前 uid 对应的索引
    findCurrentUid() {
      if (this.whisperUsers.length === 0) return;
      let index = this.whisperUsers.findIndex((val) => {
        return val.uid === this.chatUid;
      });
      if (index !== -1) {
        this.setSelectedLatestUserIndex(index);
      }
      // 查找不到跳转到第一个用户
      else {
        this.setSelectedLatestUserIndex(0);
        this.jumpFirstUser();
      }
      this.clearUnreadCount();
    },

    getSingleLatestUser() {
      const exist = this.userExist(this.chatUid);
      if (exist) {
        return;
      }

      this.sendRequest({
        path: apis.message.latestSingleUserGet,
        params: {
          uid: this.chatUid,
        },
      }).then((response) => {
        let res = response.data;
        console.log(res);

        new ResponseHandler(res).succeed((data) => {
          this.unshiftWhisperUser(data);
        });
      }).catch((error) => {
        console.log(error);
      });
    },
    getLatestUser() {
      if (!this.hasNext || this.accessing) return;
      this.accessing = true;

      this.sendRequest({
        path: apis.message.latestUserGet,
        params: {
          offset: this.offset,
          row: this.row,
        }
      }).then((response) => {
        let res = response.data;
        console.log(res);

        new ResponseHandler(res).succeed((data) => {
          let users = data;
          this.addWhisperUsers(users);

          if (this.offset === 0 && this.whisperUsers.length !== 0) {
            this.findCurrentUid();
          }
          this.offset += users.length;
          if (users.length < this.row) {
            this.hasNext = false;
          }
        }).notExist(() => {
          this.hasNext = false;
        });
      }).catch((error) => {
        console.log(error);
      }).finally(() => {
        this.accessing = false;
      });
    },
    deleteLatestUser(index) {
      this.sendRequest({
        path: apis.message.latestUserDelete,
        params: {
          uid: this.whisperUsers[index].uid,
        }
      }).then((response) => {
        let res = response.data;
        console.log(res);
        new ResponseHandler(res)
            .succeed(() => {
              this.removeOneWhisperUser(index);
            })
            .error((err) => {
              huadiaoMiddleTip(err.message);
              console.log(err);
            });
      })
    },

    clearUnreadCount() {
      const userUnreadCount = this.userUnreadCount(this.chatUid, true);
      if (userUnreadCount > 0) {
        this.setWhisperCount(this.count.whisper - userUnreadCount);
      }
    },

    clickLatestUserItem(index) {
      this.setSelectedLatestUserIndex(index);
    },
  },
}
</script>

<style lang="scss" scoped>
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

.whisper-user-header {
  font-size: 12px;
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

  &::v-deep .emote {
    width: 16px;
    height: 16px;
  }
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

.delete-icon::v-deep svg {
  width: 12px;
  height: 12px;
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