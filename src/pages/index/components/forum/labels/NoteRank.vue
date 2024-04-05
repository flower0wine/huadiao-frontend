<template>
  <div class="note-rank">
    <div class="note-rank-header" :title="`文章排行榜更新于 ${huadiaoDateFormat(noteRankUpdateTime)}`">
      <div class="line-one">
        <span class="note-rank-icon" v-html="svg.article"></span>
        <span>文章榜</span>
      </div>
      <div class="line-two">
        <div class="update-time">更新于 {{ huadiaoDateFormat(noteRankUpdateTime, "date") }}</div>
      </div>
    </div>
    <div class="article-list">
      <template v-if="getNoteListCompleted">
        <a class="article-item"
           :href="noteLink(item.article.noteId, item.article.uid)"
           :title="`第 ${index + 1} 名 —— 《${item.article.title}》`"
           v-for="(item, index) in currentArticle"
           :key="index">
          <span class="rank-medal" v-html="getRankMedal(item.index)"></span>
          <span class="article-title">{{ item.article.title }}</span>
        </a>
      </template>
      <template v-else>
        <content-loading :options="contentLoadingOptions"/>
      </template>
    </div>
    <div class="pager">
      <div class="pager-control" @click="prePage">上一页</div>
      <div class="pager-control" @click="nextPage">下一页</div>
    </div>
  </div>
</template>

<script>
import {svg} from "@/assets/js/constants/svgs";
import {apis} from "@/assets/js/constants/request-path";
import {ResponseHandler} from "@/assets/js/utils";
import ContentLoading from "@/pages/components/ContentLoading";

export default {
  name: "NoteRank",
  components: {ContentLoading},
  data() {
    return {
      getNoteListCompleted: false,
      svg: {
        article: svg.article,
        rankNo1: svg.rankNo1,
        rankNo2: svg.rankNo2,
        rankNo3: svg.rankNo3,
      },
      articleList: [],
      pageLength: 5,
      pageIndex: 0,
      realPageCount: 0,
      updateTime: new Date(),
    }
  },
  computed: {
    contentLoadingOptions() {
      return {
        line: [{
          width: "100%",
          height: "30px"
        }, {
          width: "100%",
          height: "30px"
        }, {
          width: "100%",
          height: "30px"
        }]
      };
    },
    noteRankUpdateTime() {
      return this.updateTime.getTime();
    },
    currentArticle() {
      let pageLength = this.pageLength;
      let start = this.pageIndex * pageLength;
      return this.articleList.slice(start, start + pageLength).map((item, index) => {
        return {
          index: start + index,
          article: item,
        }
      });
    }
  },
  created() {
    this.getNoteRank();
  },
  methods: {
    getNoteRank() {
      this.sendRequest({
        path: apis.index.forum.note.rank,
      }).then((response) => {
        let res = response.data;
        console.log(res);
        new ResponseHandler(res).succeed((data) => {
          this.getNoteListCompleted = true;
          let noteRank = data.noteRank;
          this.articleList = noteRank;
          this.updateTime = new Date(data.updateTime);
          this.realPageCount = Math.ceil(noteRank.length / this.pageLength);
        });
      });
    },
    prePage() {
      if(this.pageIndex <= 0) {
        this.pageIndex = this.realPageCount - 1;
      } else {
        this.pageIndex--;
      }
    },
    nextPage() {
      this.pageIndex = (this.pageIndex + 1) % this.realPageCount;
    },
    /**
     * 根据索引获取排名勋章
     * @param index {number} 索引
     * @return {string | number}
     */
    getRankMedal(index) {
      if (index < 3) {
        switch (index) {
          case 0: {
            return this.svg.rankNo1;
          }
          case 1: {
            return this.svg.rankNo2;
          }
          case 2: {
            return this.svg.rankNo3;
          }
        }
      }
      return index + 1;
    }
  },
  beforeDestroy() {
  }
}
</script>

<style lang="scss">
.note-rank-header {
  svg {
    width: 28px;
    height: 28px;
    fill: #3079a1;
    vertical-align: -9px;
  }
}

.rank-medal {
  svg {
    width: 20px;
    height: 20px;
  }
}

$medalColors: (#d2a201, #bdb90a, #a36404);

@each $item in $medalColors {
  .article-item:nth-child(#{index($medalColors, $item)}) {
    svg {
      fill: $item;
    }
  }
}

</style>

<style scoped lang="scss">
@import "../../../scss/forum/variables/index.scss";

.note-rank {
  border-radius: $forumBorderRadius;
  background-color: $forumBackgroundColor;
}

.note-rank-header {
  text-align: center;
  padding: 10px 0 5px 0;
  border-bottom: 1px solid $forumBorderColor;
  color: $labelHeaderTextColor;

  .line-one {
    margin-bottom: 6px;
  }
}

.pager {
  display: flex;
  justify-content: space-around;
  border-top: 1px solid $forumBorderColor;
  padding: 10px 0;

  .pager-control {
    font-size: 14px;
    padding: 3px 8px;
    border-radius: $forumBorderRadius;
    color: #a7a7a7;
    background-color: #7b7b7b42;
    cursor: pointer;

    &:hover {
      background-color: #72727282;
    }
  }
}

.note-rank-icon {
  margin-right: 10px;
}

.update-time {
  font-size: 12px;
  color: #727272;
}

.article-list {
  max-height: 240px;
}

.note-rank :has(.article-item:hover) {
  overflow: hidden;
}

.article-item {
  display: flex;
  height: 36px;
  padding: 0 14px;
  line-height: 36px;
  color: $labelHeaderTextColor;

  &:nth-child(n + 2) {
    border-top: 1px solid #535353;
  }

  &:hover {
    background-color: $forumHoverBackgroundColor;
  }
}

.rank-medal {
  width: 26px;
  text-align: center;
  color: #898989;
  margin-right: 10px;
  font-family: sans-serif, serif;
}

.article-title {
  width: 175px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>