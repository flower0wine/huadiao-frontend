<template>
  <div class="note-list" ref="noteList">
    <note-display v-for="(item, index) in noteList"
                  :key="`${getPerformanceNow()}/${item.id}/${item.author.uid}`"
                  :note-item="item"
                  :index="index"/>
    <content-loading-observer :loading="loading" :options="contentLoadingObserverOptions"/>
  </div>
</template>

<script>
import ContentLoadingObserver from "@/pages/components/ContentLoadingObserver";
import {apis} from "@/assets/js/constants/request-path";
import RequestPager from "@/assets/js/utils/request-pager";
import NoteDisplay from "@/pages/index/components/forum/note/NoteDisplay";
import {debounce} from "@/util";

const debounceGetNote = debounce(function() {
  if (!pager.hasNext() || this.accessing) {
    return;
  }

  this.accessing = true;

  pager.requestModel((params) => {
    this.sendRequest({
      path: apis.index.forum.note.recommend,
      method: "post",
      params: {
        ...params,
      },
    }).then((response) => {
      let res = response.data;
      console.log(res);


      pager.requestCallback(res).succeed((data) => {
        this.noteList.push(...data);
      });

      const scrollTop = document.documentElement.scrollTop;

      this.$nextTick(() => {
        document.documentElement.scrollTop = scrollTop;
      });
    }).catch(
        pager.errorCallback
    ).finally(() => {
      this.accessing = false;
    });
  });
}, 500);

let pager = new RequestPager();

export default {
  name: "NoteList",
  components: {NoteDisplay, ContentLoadingObserver},
  data() {
    return {
      noteList: [],
      accessing: false,
      loading: true,
      debounceGetNote: debounceGetNote.bind(this),
    }
  },
  computed: {
    contentLoadingObserverOptions() {
      return {
        noMoreText: `本站就这么点内容, 呜呜呜~~~`,
      };
    },
  },
  mounted() {
    pager.setCompleteCallback(() => {
      this.loading = false;
      this.removeScroll();
    });

    this.debounceGetNote();
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      const { height, top } = this.$refs.noteList.getBoundingClientRect();
      if (-top + window.innerHeight >= height) {
        this.debounceGetNote();
      }
    },
    /**
     * 获取当前的时间
     * @return {DOMHighResTimeStamp}
     */
    getPerformanceNow() {
      return performance.now();
    },
    removeScroll() {
      window.removeEventListener("scroll", this.handleScroll);
    },
  },
  beforeDestroy() {
    this.removeScroll();
  },
}
</script>

<style scoped lang="scss">

</style>