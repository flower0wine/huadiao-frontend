<template>
  <div class="whisper-left-container">
    <div class="whisper-user-header">近期消息</div>
    <div class="whisper-left-board">
      <div class="user-list">
        <router-link class="latest-user-item"
                     v-for="(item, index) in whisper"
                     :key="item.uid"
                     @click="loadOver"
                     :to="{
                       name: 'messageChatBoard',
                       params: {
                         uid: item.uid,
                       },
                     }"
                     tag="div"
                     active-class="latest-user-item-active"
                     :title="getNickname(item)"
        >
          <user-avatar-box :options="{ userAvatar: item.avatar, scale: '40px' }"/>
          <div class="user-info">
            <div class="nickname">{{ getNickname(item) }}</div>
            <div class="latest-message"
                 :title="item.latestMessage"
                 v-text="item.latestMessage"
            ></div>
          </div>
          <div class="delete-latest-user"
               @click="deleteLatestUser(index)">
            <div class="delete-icon" v-html="svg.fork"></div>
          </div>
          <div class="unread-dot" v-if="false"></div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import UserAvatarBox from "@/pages/components/UserAvatarBox";
import {svg} from "@/assets/js/constants/svgs";
import {apis} from "@/assets/js/constants/request-path";
import {statusCode} from "@/assets/js/constants/status-code";
import {ResponseHandler} from "@/assets/js/utils";

export default {
  props: ["loadOver"],
  name: "WhisperPersonBoard",
  components: {UserAvatarBox},
  data() {
    return {
      svg,
      offset: 0,
      row: 10,
      hasNext: true,
      accessing: false,
      observer: null,
      existedUid: null,
      visible: {
        unfollowUser: true,
      },
    }
  },
  computed: {
    whisper() {
      return this.$store.state.message.whisper;
    },
    chatUid() {
      return parseInt(this.$route.params.uid);
    },
    currentRoute() {
      return this.$route.path;
    }
  },
  watch: {
    "$route.params.uid": {
      deep: true,
      handler(newValue, oldValue) {
        let fullPath = this.$route.fullPath;
        // 如果是从其他页面跳转到私信页面, 就跳转至第一个用户
        if(!oldValue && !newValue && fullPath.startsWith("/whisper")) {
          this.jumpFirstUser();
        }
        // 如果是在不同用户之间跳转
        else if(oldValue && newValue) {
          this.findCurrentUid();
        }
      }
    }
  },
  created() {
    if(Number.isNaN(this.chatUid)) {
      this.getLatestUser();
    }
    else {
      this.getSingleLatestUser()
          .then(this.getLatestUser)
          .catch(this.jumpFirstUser);
    }
  },
  mounted() {
    this.initial();
  },
  methods: {
    initial() {
      this.getIntersectionObserver(this.getLatestUser);
    },
    jumpFirstUser() {
      let path;
      let whisper = this.$store.state.message.whisper;
      let whisperPath = "/whisper";
      if(whisper.length !== 0) {
        path = `${whisperPath}/${whisper[0].uid}`
      }
      if(whisperPath !== this.currentRoute) {
        this.$router.replace({
          path,
        }).catch((err) => {
          console.log(err)
        });
      }
    },
    // 查找当前 uid 对应的索引
    findCurrentUid() {
      if (this.whisper.length === 0) return;
      let index = this.whisper.findIndex((val) => {
        return val.uid === this.chatUid;
      });
      if (index !== -1) {
        this.$store.commit("setLatestUserIndex", {index});
      }
      // 查找不到跳转到第一个用户
      else {
        this.jumpFirstUser();
      }
      this.loadOver();
    },
    // 最近消息用户获取完毕
    notExistCallback() {
      this.hasNext = false;
    },
    // 当页面以路径 whisper/:uid(\\d+) 访问, 下面的函数会被执行
    getSingleLatestUser() {
      // 路径不匹配访回
      return new Promise((resolve, reject) => {
        if (Number.isNaN(this.chatUid)) {
          resolve();
          return;
        } else {
          this.existedUid = this.chatUid;
        }
        this.sendRequest({
          path: apis.message.latestSingleUserGet,
          params: {
            uid: this.chatUid,
          }
        }).then((response) => {
          let res = response.data;
          console.log(res);
          if (res.code === statusCode.SUCCEED) {
            this.$store.commit("addLatestSingleUser", {user: res.data});
            resolve();
          } else if (res.code === statusCode.NOT_EXIST) {
            reject();
          }
        }).catch((error) => {
          console.log(error);
          reject();
        })
      })
    },
    getLatestUser() {
      if (!this.hasNext || this.accessing) return;
      this.accessing = true;
      return new Promise((resolve) => {
        this.sendRequest({
          path: apis.message.latestUserGet,
          params: {
            offset: this.offset,
            row: this.row,
          }
        }).then((response) => {
          let res = response.data;
          console.log(res);

          new ResponseHandler((data) => {
            let users = data;
            // 如果 existUid 存在, 则过滤掉
            if (this.existedUid !== null) {
              users = users.filter((item) => item.uid !== this.existedUid);
            }
            this.$store.commit("addLatestUser", {users});

            /**
             * 由于一个用户刚创建后可以通过输入 url 匹配到 ChatMessageWindow 组件,
             * 所以这里需要判断 <获取的最近消息> 中是否有值, 来决定是否允许展示 ChatMessageWindow 组件,
             * 当然首次获取数据需要设置 latestUserIndex, 后面由 watch 来监听 $route.params.uid 来改变
             */
            if (this.offset === 0 && this.whisper.length !== 0) {
              this.existedUid = this.chatUid || null;
              this.findCurrentUid();
            }
            this.offset += users.length;
            if (users.length < this.row) {
              this.notExistCallback();
            }
          }).notExist(() => {
            this.notExistCallback();
          });
          this.accessing = false;
          resolve();
        }).catch((error) => {
          console.log(error);
          this.accessing = false;
          resolve();
        });
      });
    },
    deleteLatestUser(index) {
      this.sendRequest({
        path: apis.message.latestUserDelete,
        params: {
          uid: this.whisper[index].uid,
        }
      }).then((response) => {
        let res = response.data;
        console.log(res);
        new ResponseHandler(res)
            .succeed(() => {
              this.$store.commit("deleteLatestUser", {index});
            });
      })
    },
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