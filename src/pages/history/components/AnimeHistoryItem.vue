<template>
  <div class="anime-history-item">
    <div class="last-time">
      <div class="left-blank"></div>
      <div class="triangle"></div>
      <div class="visited-date">{{huadiaoDateFormat(animeItem.visitTime)}}</div>
    </div>
    <div class="anime-history-info">
      <a :href="`/animehouse/${animeItem.uid}`">
        <div class="anime-cover" :style="`background-image: url('${huadiaoHouseImagePath}${animeItem.animeCover}')`">
          <div class="no-anime-cover" v-if="!animeItem.animeCover">对方番剧馆无番剧</div>
        </div>
      </a>
      <div class="anime-info">
        <div class="anime-title">
          <a :href="`/animehouse/${animeItem.uid}`">{{animeItem.animeTitle}}</a>
        </div>
        <div class="anime-author-info">
          <user-avatar-box :options="userAvatarOptions"/>
          <a :href="`/homepage/${animeItem.uid}`">
            <div class="author-name">{{animeItem.nickname || animeItem.userId}}</div>
          </a>
        </div>
      </div>
    </div>
    <div class="delete-icon" v-html="svg.deleteTrashcan" @click="deleteAnimeHistory(animeItem.uid)"></div>
  </div>
</template>

<script>
import UserAvatarBox from "@/pages/components/UserAvatarBox";
import {svg} from "@/assets/js/constants/svgs";
import {apis} from "@/assets/js/constants/request-path";
import {statusCode} from "@/assets/js/constants/status-code";

export default {
  name: "AnimeHistoryItem",
  components: {UserAvatarBox},
  props: ["animeItem"],
  data() {
    return {
      svg,
      userAvatarOptions: {
        scale: "25px",
        userAvatar: this.animeItem.userAvatar,
        href: `/homepage/${this.animeItem.uid}`,
      }
    }
  },
  created() {
  },
  methods: {
    deleteAnimeHistory(uid) {
      this.sendRequest({
        path: apis.history.animeDelete,
        params: {
          uid,
        },
        thenCallback: (response) => {
          let res = response.data;
          console.log(res);
          if(res.code === statusCode.succeed) {
            this.$store.commit("deleteAnimeHistory", {uid});
          }
        },
        errorCallback: (error) => {
          console.log(error);
        }
      })
    },
  },
  beforeDestroy() {
  }
}
</script>

<style scoped>
.anime-history-item {
  position: relative;
  min-height: 150px;
  transition: all 500ms;
}

.last-time {
  position: absolute;
  width: 100px;
  height: 100%;
}

.left-blank {
  width: 70px;
  height: 100%;
  border-right: 1px solid #c9c8c8;
}

.triangle {
  position: absolute;
  top: 51px;
  right: 14px;
  border-top: 8px solid transparent;
  border-left: 8px solid #c9c8c8;
  border-right: 8px solid transparent;
  border-bottom: 8px solid transparent;
}

.visited-date {
  position: absolute;
  top: 51px;
  left: 91px;
  font-size: 12px;
  white-space: nowrap;
  color: #a1a1a1;
}

.anime-history-info {
  display: flex;
  margin-left: 260px;
}

.anime-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 0;
  margin-left: 30px;
}

.anime-author-info {
  display: flex;
}

.anime-cover {
  width: 226px;
  height: 130px;
  border-radius: 6px;
  background: no-repeat center/cover;
  border: 1px solid #eeeeee;
}

.no-anime-cover {
  font-size: 14px;
  text-align: center;
  line-height: 130px;
  color: #a8a8a8;
}

.anime-title a {
  color: #606060;
}

.anime-title:hover a,
.author-name:hover {
  color: #d22626;
}

.author-name {
  font-size: 14px;
  margin-left: 20px;
  color: #8c8c8c;
}

.delete-icon {
  position: absolute;
  top: 49px;
  right: 27px;
  width: 26px;
  height: 26px;
  border-radius: 6px;
  text-align: center;
  transition: var(--transition-500ms);
  cursor: pointer;
  fill: #c0c0c0;
}

.delete-icon:hover {
  background-color: #ececec;
}

.delete-icon:hover /deep/ svg {
  fill: #e54d4d;
}

.delete-icon /deep/ svg {
  width: 20px;
  height: 20px;
  transition: var(--transition-500ms);
}
</style>