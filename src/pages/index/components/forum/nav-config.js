import {svg} from "@/assets/js/constants/svgs";
import NoteList from "@/pages/index/components/forum/note/NoteList";
import AnimeList from "@/pages/index/components/forum/anime/AnimeList";

export const navList = [
  {
    title: "笔记",
    svg: svg.blog,
    contentComponent: NoteList,
    list: [{
      title: "综合",
      svg: svg.comprehensiveness,
    }, {
      title: "前端",
      svg: svg.frontend,
      tagId: 1,
    }, {
      title: "后端",
      svg: svg.backend,
      tagId: 2,
    }],
  },
  {
    title: "番剧",
    svg: svg.fanju,
    contentComponent: AnimeList,
    list: [{
      title: "关注",
      svg: svg.follow,
    }, {
      title: "综合",
      svg: svg.comprehensiveness,
    }],
  },
];
