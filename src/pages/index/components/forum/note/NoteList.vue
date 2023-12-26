<template>
  <div class="note-list">
    <note-item-container v-for="(item, index) in noteList"
                         :key="`${getPerformanceNow()}/${item.id}/${item.author.uid}`"
                         :note-item="item"
                         :index="index"/>
    <content-loading :observe-callback="observeCallback" :get-hooks="getHooks"/>
  </div>
</template>

<script>
import ContentLoading from "@/pages/index/components/forum/ContentLoading";
import NoteItemContainer from "@/pages/index/components/forum/note/NoteItemContainer";
import {apis} from "@/assets/js/constants/request-path";
import RequestPager from "@/assets/js/utils/request-pager";

let pager = new RequestPager();

export default {
  name: "NoteList",
  components: {NoteItemContainer, ContentLoading},
  data() {
    return {
      noteList: [],
    }
  },
  mounted() {
    pager.reset();
    this.getNote();
  },
  methods: {
    getNote() {
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
        }).catch(pager.errorCallback);
      });
    },
    observeCallback() {
      this.getNote();
    },
    getHooks({unobserve}) {
      pager.setCompleteCallback(unobserve);
    },
    /**
     * 获取当前的时间
     * @return {DOMHighResTimeStamp}
     */
    getPerformanceNow() {
      return performance.now();
    }
  },
  beforeDestroy() {
  }
}
</script>

<style scoped>

</style>