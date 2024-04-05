<template>
  <div class="system-message-board">
    <div class="system-message-list">
      <div class="system-message-item"
           v-for="(item, index) in message"
           :key="item.messageId">
        <div class="authority-png">
          <img src="../../../assets/img/authority.webp" alt="">
        </div>
        <div class="message-content-box">
          <div>
            <div class="message-header">
              <div class="message-title" :title="item.messageTitle">花凋</div>
              <div class="message-date">{{ huadiaoDateFormat(item.sendTime) }}</div>
            </div>
            <div class="message-content"
                 v-html="item.messageContent"
                 ref="messageContent"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {apis} from "@/assets/js/constants/request-path";
import {statusCode} from "@/assets/js/constants/status-code";

export default {
  name: "SystemMessageBoard",
  data() {
    return {
      visible: false,
      offset: 0,
      row: 10,
      hasNext: true,
      observer: null,
      accessing: false,
      svg: {
        site: `<svg t="1680331167619" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6131" width="200" height="200"><path d="M163.744 445.376c50.784-174.08 161.92-298.304 365.28-315.904 13.984-1.28 33.536-0.192 49.6-3.168 13.792-2.688 30.592-12.704 46.464-19.2 64.416-26.528 206.688-72.96 278.56-16 62.336 49.632 50.88 170.24 12.384 249.024a428.928 428.928 0 0 1 40.224 245.824c-180.608 7.36-391.04 0.96-566.528 3.232 5.856 93.568 64.512 165.28 151.648 175.36 85.152 9.92 144-38.24 182.688-92.544h216.576c-56.288 162.016-199.36 287.584-420.928 271.36-50.336-3.776-89.664-18.496-133.12-35.2-72.64 39.808-233.216 98.88-297.184 16-48.544-62.976-17.312-177.472 9.28-252.064 53.952-151.296 156.544-301.12 256.96-386.304 0.512-2.592 3.04-3.232 3.04-6.4C279.392 320 225.92 387.104 163.744 445.376z m730.72-241.44c-2.88-104.8-137.696-94.464-208.96-52.288 79.52 31.84 137.6 85.888 185.024 150.784 10.368-32.896 24.96-60.224 23.936-98.496z m-516.48 255.488h331.36c-9.568-214.08-320.896-196.768-331.328 0zM133.344 834.976c16.608 94.816 149.12 67.136 208.96 24.608-78.56-44.16-127.648-118.816-167.2-203.2-18.368 45.664-52.8 116.032-41.76 178.56z" p-id="6132"></path></svg>`,
      }
    }
  },
  computed: {
    message() {
      return this.$store.state.message.systemMessage;
    },
  },
  created() {
    this.getSystemMessage();
  },
  mounted() {
    this.initial();
  },
  methods: {
    initial() {
      this.getIntersectionObserver(this.getSystemMessage);
    },
    // 获取系统消息
    getSystemMessage() {
      if (!this.hasNext || this.accessing) return;
      this.accessing = true;
      return this.sendRequest({
        path: apis.message.systemGet,
        params: {
          offset: this.offset,
          row: this.row,
        }
      }).then((response) => {
        let res = response.data;
        console.log(res);
        if (res.code === statusCode.succeed) {
          this.$store.commit("addSystemMessage", {message: res.data});
          this.offset += res.data.length;
          this.addSiteIconForMessageLink();
          if (res.data.length < this.row) {
            this.hasNext = false;
          }
        } else if (res.code === statusCode.notExist) {
          this.hasNext = false;
        }
        this.accessing = false;
      }).catch((error) => {
        console.log(error);
        this.accessing = false;
      });
    },
    // 为每个 a 标签添加一个 svg 链接图标
    addSiteIconForMessageLink(count) {
      let messageContent, links, link, siteIcon;
      for (let index = this.offset, length = this.offset + count; index < length; index++) {
        messageContent = this.$refs.messageContent[index];
        links = messageContent.children;
        for (link of links) {
          siteIcon = this.$(this.svg.site)[0];
          link.prepend(siteIcon);
        }
      }
    },
  },
  beforeDestroy() {
  }
}
</script>

<style scoped>
.system-message-board {
  height: 100%;
  overflow-y: auto;
}

.system-message-list {
  padding: 10px;
}

.system-message-item {
  display: flex;
  justify-content: space-between;
  width: 100%;
  min-height: 100px;
  margin: 0 auto;
  padding: 10px;
  border-radius: 6px;
  background-color: #fff;
  box-shadow: var(--box-shadow-min);
}

.authority-png {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  text-align: center;
  line-height: 40px;
  background-color: #fff;
  box-shadow: var(--box-shadow-min);
}

.authority-png img {
  width: 30px;
  height: 30px;
}

.message-content-box {
  width: calc(100% - 50px);
}

.message-header {
  display: flex;
}

.message-date {
  margin-left: 20px;
  line-height: 21px;
}

.message-date {
  color: #949494;
  font-size: 12px;
  margin-bottom: 3px;
}

.message-content {
  color: #5f5f5f;
  font-size: 14px;
}

.message-content /deep/ a {
  color: #b53232;
  border-radius: 4px;
  margin: 0 4px;
  padding: 0 3px;
}

.message-content /deep/ a svg {
  fill: #b53232;
  width: 20px;
  height: 20px;
  vertical-align: -4px;
  margin-right: 2px;
}

.message-content /deep/ a:hover {
  background-color: #ffe2e2;
}
</style>