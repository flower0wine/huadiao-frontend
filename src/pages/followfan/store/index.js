import Vuex from "vuex";
import Vue from "vue";
import follow from "@/pages/followfan/store/modules/follow";
import global from "@/common/global-store";

Vue.use(Vuex);

const state = {
  user: {
    login: null,
    userId: null,
    nickname: null,
    uid: null,
    fans: null,
    follows: null,
    userAvatar: null
  },
};

const mutations = {
  initialUser(state, {user}) {
    state.user = user;
  },
};

export default new Vuex.Store({
  modules: {
    follow,
    global,
  },
  state,
  mutations,
});
