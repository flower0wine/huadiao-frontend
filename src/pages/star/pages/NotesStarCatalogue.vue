<template>
  <div class="note-star-catalogue-container">
    <div class="note-star-catalogue" ref="noteStarCatalogue">
      <div class="catalogue-header">收藏夹列表</div>
      <div class="add-new-favorites"
           v-if="me"
           @click="addNewFavorite"
           ref="addNewFavorite"
      >
        <span v-html="svg.addFavorite" class="add-favorite-icon"></span>
        <span>新建收藏夹</span>
      </div>
      <div class="note-star-favorite-list">
        <router-link class="note-star-favorite"
                     :class="groupItem.allowOperate ? 'favorite-link-hover' : ''"
                     v-for="(groupItem, index) in noteStarCatalogue"
                     :to="`/star/${viewedUid}/note/${groupItem.groupId}`"
                     active-class="note-star-favorite-active"
                     :title="groupItem.groupName"
                     ref="navigator"
                     :key="groupItem.groupId"
                     tag="div"
        >
          <div>
            <span v-html="svg.favorite" class="favorite-icon"></span>
            <span>{{ groupItem.groupName }}</span>
          </div>
          <div class="favorite-number">
            <span>{{ groupItem.count }}</span>
          </div>
          <div class="favorite-more"
               v-if="groupItem.allowOperate && me"
               @mouseenter="isShow.favoriteMore.splice(index, 1, true)"
               @mouseleave="isShow.favoriteMore.splice(index, 1, false)"
               @click="isShow.favoriteMore.splice(index, 1, false)"
               ref="favoriteMore"
          >
            <span v-html="svg.favoriteMore" title="更多操作"></span>
            <transition name="fade">
              <div class="favorite-more-board"
                   v-show="isShow.favoriteMore[index]"
                   title="">
                <div @click="modifyGroupInfo(index)">修改信息</div>
                <div @click="deleteGroup(index)">删除分组</div>
              </div>
            </transition>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import {Timer} from "@/assets/js/utils";
import {apis} from "@/assets/js/constants/request-path";
import {statusCode} from "@/assets/js/constants/status-code";

export default {
  name: "NotesStarCatalogue",
  data() {
    return {
      timer: new Timer(),
      isShow: {
        favoriteMore: [],
      },
      svg: {
        favorite: `<svg fill="#4943d8" t="1678970943881" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5186" width="200" height="200"><path d="M194.89519923 929.80941295H40.29355903a34.40798299 34.40798299 0 0 1-34.38265506-34.36999112V101.80162783a34.42064695 34.42064695 0 0 1 34.38265506-34.38265508h154.6016402a34.42064695 34.42064695 0 0 1 34.38265508 34.38265508v793.637794a34.40798299 34.40798299 0 0 1-34.38265508 34.36999112z m-154.6016402-842.15342996a14.13298087 14.13298087 0 0 0-14.1203169 14.12031692v793.66312192a14.13298087 14.13298087 0 0 0 14.1203169 14.10765295h154.6016402a14.13298087 14.13298087 0 0 0 14.12031692-14.10765295V101.80162783a14.13298087 14.13298087 0 0 0-14.12031692-14.12031691z" fill="" p-id="5187"></path><path d="M180.7495544 421.31337275h-122.71378551V217.85416966h122.71378551z m-102.45144735-20.26233816h82.18910918V238.11650783h-82.18910918zM463.09257275 929.80941295H308.4782686A34.40798299 34.40798299 0 0 1 274.09561353 895.43942183V101.80162783a34.42064695 34.42064695 0 0 1 34.38265507-34.38265508h154.61430415a34.42064695 34.42064695 0 0 1 34.36999111 34.38265508v793.637794a34.40798299 34.40798299 0 0 1-34.36999111 34.36999112z m-154.61430415-842.15342996A14.13298087 14.13298087 0 0 0 294.35795169 101.80162783v793.637794a14.13298087 14.13298087 0 0 0 14.12031691 14.10765295h154.61430415a14.13298087 14.13298087 0 0 0 14.10765295-14.10765295V101.80162783a14.13298087 14.13298087 0 0 0-14.10765295-14.12031691z" fill="" p-id="5188"></path><path d="M448.93426397 421.31337275h-122.71378551V217.85416966h122.71378551z m-102.45144736-20.26233816h82.18910919V238.11650783h-82.18910919zM846.50666667 929.83474087a34.59794241 34.59794241 0 0 1-12.66396136-2.4568085 34.19269565 34.19269565 0 0 1-18.91995826-18.27409623l-315.58591691-728.17777779a34.42064695 34.42064695 0 0 1 17.90684136-45.21034202l141.83636715-61.48353237a34.45863884 34.45863884 0 0 1 45.21034202 17.88151343l315.59858087 728.17777777a34.43331092 34.43331092 0 0 1-17.86884946 45.223006l-141.83636715 61.4708684a34.05339209 34.05339209 0 0 1-13.67707826 2.84939131zM672.70646106 91.67045874a13.93035748 13.93035748 0 0 0-5.55947904 1.15242048l-141.83636715 61.48353237a14.12031691 14.12031691 0 0 0-7.33243361 18.56536735l315.5859169 728.17777778a14.19630068 14.19630068 0 0 0 18.55270338 7.33243362l141.83636716-61.47086841a14.15830878 14.15830878 0 0 0 7.34509758-18.57803131L685.67435748 100.16797682a14.2849484 14.2849484 0 0 0-13.00588829-8.49751808z" fill="" p-id="5189"></path><path d="M674.27679227 453.36585894l-80.94804096-186.6794543L705.93669565 217.89216155l80.91004909 186.6794543z m-54.29040232-176.14303845l64.78882628 149.49806377 75.41388986-32.68568426-64.80149024-149.43474397z" fill="" p-id="5190"></path></svg>`,
        favoriteMore: `<svg fill="#4943d8" t="1678338951667" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5121" width="200" height="200"><path d="M512 512m-97.62413458 0a97.62413458 97.62413458 0 1 0 195.24826916 0 97.62413458 97.62413458 0 1 0-195.24826916 0Z" p-id="5122"></path><path d="M512 121.50346165m-97.62413458 0a97.62413458 97.62413458 0 1 0 195.24826916 0 97.62413458 97.62413458 0 1 0-195.24826916 0Z" p-id="5123"></path><path d="M512 902.49653835m-97.62413458 0a97.62413458 97.62413458 0 1 0 195.24826916 0 97.62413458 97.62413458 0 1 0-195.24826916 0Z" p-id="5124"></path></svg>`,
        addFavorite: `<svg fill="#5b55c7" t="1678324062874" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4976" width="200" height="200"><path d="M763.37440099 480.57820044h-219.95260143V260.62559901c0-18.85308003-12.56871953-31.42179956-31.42179956-31.42179958s-31.42179956 12.56871953-31.42179956 31.42179958v219.95260143H260.62559901c-18.85308003 0-31.42179956 12.56871953-31.42179958 31.42179956s12.56871953 31.42179956 31.42179958 31.42179956h219.95260143V763.37440099c0 18.85308003 12.56871953 31.42179956 31.42179956 31.42179958s31.42179956-12.56871953 31.42179956-31.42179958v-219.95260143H763.37440099c18.85308003 0 31.42179956-12.56871953 31.42179958-31.42179956s-12.56871953-31.42179956-31.42179958-31.42179956z" p-id="4977"></path><path d="M512 9.2511995c-276.51184005 0-502.7488005 226.23696045-502.7488005 502.7488005s226.23696045 502.7488005 502.7488005 502.7488005 502.7488005-226.23696045 502.7488005-502.7488005-226.23696045-502.7488005-502.7488005-502.7488005z m0 942.65400185c-245.09004048 0-439.90520135-194.81516087-439.90520135-439.90520135s194.81516087-439.90520135 439.90520135-439.90520135 439.90520135 194.81516087 439.90520135 439.90520135-194.81516087 439.90520135-439.90520135 439.90520135z" p-id="4978"></path></svg>`,
      }
    }
  },
  computed: {
    ...mapState(["noteStarCatalogue", "me"]),
    viewedUid() {
      return this.$route.params.viewedUid;
    },
  },
  created() {
    this.initialCatalogue();
    this.getNoteStarCatalogue();
  },
  mounted() {
  },
  methods: {
    initialCatalogue() {
      // 再次获取笔记收藏目录
      this.$bus.$on("flushNoteStarCatalogue", () => {
        this.getNoteStarCatalogue();
      });
    },
    setCatalogue() {
      if(!this.me) return;
      // 全部填充为 false
      let array = new Array(this.noteStarCatalogue.length);
      this.isShow.favoriteMore = array.fill(false);
    },
    // 获取笔记收藏目录
    getNoteStarCatalogue() {
      this.sendRequest({
        path: apis.star.noteGroupGet,
        params: {
          uid: this.$route.params.viewedUid,
        },
        thenCallback: (response) => {
          let res = response.data;
          console.log(res);
          if(res.code === statusCode.succeed) {
            this.$store.commit("setNoteStarCatalogue", {catalogues: res.data});
            this.setCatalogue();
          }
        },
        errorCallback: (error) => {
          console.log(error);
        }
      })
    },
    modifyGroupInfo(index) {
      this.$bus.$emit("modifyGroup",
          this.noteStarCatalogue[index].groupName,
          this.noteStarCatalogue[index].groupDescription,
          this.noteStarCatalogue[index].groupId,
          this.noteStarCatalogue[index].open,
          index,
      );
    },
    // 删除收藏夹
    deleteGroup(index) {
      this.huadiaoPopupWindow(
          "warning",
          "confirmOrCancel",
          "确认删除吗？删除之后该收藏夹下所有的收藏都将删除, 不可恢复!",
          () => {
            this.requestDeleteGroup(index);
          }
      );
    },
    requestDeleteGroup(index) {
      let group = this.noteStarCatalogue[index];
      this.sendRequest({
        path: apis.star.noteGroupDelete,
        params: {
          groupId: group.groupId,
        },
        thenCallback: (response) => {
          let res = response.data;
          console.log(res);
          if(res.code === statusCode.succeed) {
            this.$store.dispatch("deleteFavorite", {
              deleteIndex: index,
              mapKey: this.getMapKey(this.viewedUid, group.groupId),
              succeedCallback: () => {
                this.huadiaoMiddleTip("删除成功!");
                this.$bus.$emit("resetNoteStarList");
                this.$router.replace({path: `/star/${this.viewedUid}/note/-1`});
              },
            });
          }
        },
        errorCallback: (error) => {
          console.log(error);
        }
      })
    },
    // 添加新的收藏夹
    addNewFavorite() {
      // 打开新建面板
      this.$bus.$emit("addGroup", this.viewedUid);
    },
  },
  beforeDestroy() {
    this.clearAllRefsEvents();
  }
}
</script>

<style scoped>
.note-star-catalogue-container {
  flex-shrink: 0;
  width: 250px;
  height: 600px;
  margin-right: 10px;
  color: var(--note-star-color);
  font-size: 18px;
}

.note-star-catalogue {
  position: fixed;
  z-index: 1;
  width: 250px;
  height: 600px;
  margin-right: 0;
  border-radius: 6px;
  background-color: #FFFFFFB7;
  box-shadow: var(--box-shadow-min);
  backdrop-filter: blur(3px);
}

.catalogue-header {
  text-align: center;
  font-size: 24px;
  padding: 10px 0;
}

.add-new-favorites {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 0;
  cursor: pointer;
}

.add-new-favorites/deep/.add-favorite-icon svg {
  width: 20px;
  height: 20px;
  margin-right: 10px;
  vertical-align: text-top;
}

.note-star-favorite-list {
  height: 516px;
  overflow-y: auto;
}

.note-star-favorite {
  display: flex;
  justify-content: space-between;
  padding: 10px 30px;
  cursor: pointer;
}

.add-new-favorites:hover,
.note-star-favorite:hover {
  background-color: #FFFFFF4C;
}

/* 路由活动链接, 两个类名增加优先级 */
.note-star-favorite-active.note-star-favorite-active {
  background-color: rgba(178, 133, 252, 0.275);
}

.note-star-favorite/deep/.favorite-icon svg {
  width: 20px;
  height: 20px;
  margin-right: 5px;
  vertical-align: text-top;
}

.favorite-more {
  display: none;
  position: relative;
}

.favorite-number {
  display: block;
}

.favorite-link-hover:hover .favorite-more {
  display: block;
}

.favorite-link-hover:hover .favorite-number {
  display: none;
}

.favorite-more/deep/svg {
  width: 18px;
  height: 18px;
  transform: translateX(4px);
}

.favorite-more-board {
  position: absolute;
  top: 32px;
  left: -76px;
  width: 120px;
  text-align: center;
  border-radius: 6px;
  box-shadow: var(--box-shadow-min);
  background-color: #FFFFFF99;
  backdrop-filter: blur(3px);
  transition: var(--transition-500ms);
  overflow: hidden;
}

.favorite-more-board div {
  padding: 6px 0;
}

.favorite-more-board div:hover {
  background-color: #B285FC46;
}
</style>