<template>
  <div class="note-history-list">
    <transition-group name="right-slide">
      <note-history-item v-for="(item) in noteHistory"
                         :key="`${item.uid}/${item.noteId}`"
                         :noteHistory="item"/>
    </transition-group>
    <simple-loading :option="{loadedText: `去发现更多有意思的人吧!`}"
                    :observe-callback="observeCallback"
                    :get-hooks="getHooks"/>
  </div>
</template>

<script>
import NoteHistoryItem from "@/pages/history/components/NoteHistoryItem";
import {mapState} from "vuex";
import {apis} from "@/assets/js/constants/request-path";
import SimpleLoading from "@/pages/components/loading/SimpleLoading";
import RequestPager from "@/assets/js/utils/request-pager";

let pager = new RequestPager();

export default {
  name: "NoteHistoryList",
  components: {SimpleLoading, NoteHistoryItem},
  data() {
    return {
      searchContent: "",
      searchContentChange: false,
    }
  },
  computed: {
    ...mapState(["noteHistory"]),
  },
  created() {
    this.initial();
  },
  mounted() {
    this.searchNoteHistory();
  },
  methods: {
    initial() {
      this.pager = new RequestPager();
      this.$bus.$on("searchNoteHistory", this.chooseRequestType);
    },
    getHooks({unobserve}) {
      pager.setCompleteCallback(unobserve);
    },
    observeCallback() {
      this.searchNoteHistory();
    },
    chooseRequestType(searchContent) {
      this.searchContent = searchContent;
      pager.reset();
      // 清空笔记记录
      this.$store.commit("clearNoteHistory");
      this.searchNoteHistory(searchContent);
    },
    searchNoteHistory(searchContent) {
      pager.requestModel((params) => {
        this.sendRequest({
          path: apis.search.history.note.title,
          params: {
            title: searchContent,
            ...params,
          },
        }).then((response) => {
          let res = response.data;
          console.log(res);
          pager.requestCallback(res).succeed((data) => {
            data = Array.isArray(data) ? data : [];
            this.$store.commit("addNoteHistory", {history: data});
          });
        }).catch(pager.errorCallback);
      });
    },
  },
  beforeDestroy() {
  },
}
</script>

<style scoped>
.note-history-list {
  width: 1200px;
  margin: 0 auto 100px;
  transition: var(--transition-500ms);
}
</style>