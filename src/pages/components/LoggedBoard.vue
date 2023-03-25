<template>
  <div class="logged-bar-container">
    <h1 class="logged-bar-nickname">{{user.nickname}}</h1>
    <div class="logged-bar">
      <a :href="'/' + user.uid + '/follow/follows'" class="logged-bar-follows">
        <em>{{user.follows}}</em>
        <span>关注</span>
      </a>
      <a :href="'/' + user.uid + '/follow/fans'" class="logged-bar-fans">
        <em>{{user.fans}}</em>
        <span>粉丝</span>
      </a>
    </div>
    <div class="logged-bar-links">
      <a :href="'/homepage/' + user.uid" class="logged-bar-homepage">
        <span>个人主页</span>
        <img src="/svg/access.svg" class="entry-icon" alt>
      </a>
      <a :href="'/' + user.uid + '/notes'" class="logged-bar-notes">
        <span>我的笔记</span>
        <img src="/svg/access.svg" class="entry-icon" alt>
      </a>
      <a :href="'/huadiaohouse/' + user.uid" class="logged-bar-like-fanju">
        <span>我喜欢的番剧</span>
        <img src="/svg/access.svg" class="entry-icon" alt>
      </a>
    </div>
    <div class="logged-bar-logout">
      <div>退出登录</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoggedBoard",
  props: ["user"],
  data() {
    return {
    }
  },
  computed: {
  },
  methods: {},
  beforeDestroy() {
  }
}
</script>

<style scoped>

/* 用户面板 */
.logged-bar-container {
  position: absolute;
  z-index: 1;
  top: 69px;
  right: -8px;
  width: 224px;
  height: 310px;
  border-radius: 18px;
  background: -webkit-linear-gradient(left bottom, #454440b9, #84041bb6);
  transition: var(--transition-400ms);
}

/* 用户昵称 */
.logged-bar-nickname {
  font-size: 20px;
  color: #dad5d5;
  font-weight: 700;
  text-align: center;
  margin-top: 37px;
}

/* 用户关注及粉丝 */
.logged-bar {
  display: block;
  height: 70px;
  padding: 10px 0 10px 0;
  margin: 0 40px 0 40px;
  border-bottom: 1px solid #bebec5;
}

/* 关注 */
.logged-bar a {
  display: flex;
  flex-direction: column;
}

.logged-bar .logged-bar-follows {
  float: left;
}

.logged-bar .logged-bar-fans {
  float: right;
}

/* 关注粉丝 */
.logged-bar-follows span,
.logged-bar-fans span {
  font-size: 14px;
}

/* 数量 */
.logged-bar-follows em,
.logged-bar-fans em {
  font-size: 21px;
}

/* 共同样式 */
.logged-bar-follows span,
.logged-bar-follows em,
.logged-bar-fans span,
.logged-bar-fans em {
  text-align: center;
  color: #dad5d5;
}

/* 下面是面板的各种链接 */
.logged-bar-links {
  margin: 10px 40px 0 40px;
  border-bottom: 1px solid #bebec5;
}

/* 每个链接 */
.logged-bar-links a {
  display: block;
  color: #dad5d5;
  margin: 15px 0 15px 0;
}

.logged-bar-links a span {
  font-size: 18px;
}

.logged-bar-links .entry-icon {
  /* 旋转是有要求的 ，加浮动 或 display：inline-block*/
  float: right;
  color: #dad5d5;
  width: 15px;
  height: 15px;
  transform: rotate(-90deg);
}

.logged-bar-logout div {
  text-align: center;
  margin-top: 10px;
  color: #dad5d5;
}
</style>