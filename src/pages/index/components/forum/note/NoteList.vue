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
import NoteDisplay from "@/pages/index/components/forum/note/NoteDisplay";
import {debounce, flatPromise} from "@/util";
import {getNoteList} from "@/pages/index/components/forum/apis";
import {requestPager} from "@/util/request";
import {responseHandler} from "@/assets/js/constants/status-code";

export default {
  name: "NoteList",

  components: {NoteDisplay, ContentLoadingObserver},

  props: {
    tagId: {
      type: Number,
      required: false,
    },
  },

  data() {
    return {
      noteList: [],
      loading: true,
    }
  },

  computed: {
    contentLoadingObserverOptions() {
      return {
        noMoreText: `本站就这么点内容, 呜呜呜~~~`,
      };
    },

    pager() {
      return requestPager(({page, size}) => {
        return getNoteList({page, size, tagId: this.tagId});
      });
    },

    debounceGetNote() {
      const {fetch, setHasNext, getSize} = this.pager;

      return debounce(async function() {
        let [err, res] = await flatPromise(fetch());

        if (err) {
          console.error(err);
          return;
        }

        responseHandler(res)
          .succeed((res) => {
            if (res.data.length < getSize()) {
              setHasNext(false);
              this.loading = false;
            }

            this.noteList.push(...res.data);

            const scrollTop = document.documentElement.scrollTop;

            this.$nextTick(() => {
              document.documentElement.scrollTop = scrollTop;
            });
          })
          .emptyData(() => {
            setHasNext(false);
            this.loading = false;
          });
      }, 500);
    },
  },

  mounted() {
    this.debounceGetNote();
    window.addEventListener("scroll", this.handleScroll);
  },

  watch: {
    tagId() {
      this.noteList = [];
      this.loading = true;
      this.pager.reset();
      this.debounceGetNote();
    },
  },

  methods: {
    handleScroll() {
      const { height, top } = this.$refs.noteList.getBoundingClientRect();
      if (-top + window.innerHeight >= height) {
        this.debounceGetNote();
      }
    },

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
