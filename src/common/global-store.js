const state = {
  login: false,

  user: {
    login: false,
    nickname: null,
    userId: null,
    uid: null,
    fans: null,
    follows: null,
    userAvatar: null,
  },
};

const mutations = {
  setLogin(state, login) {
    state.login = login;
  },

  setUser(state, user) {
    state.user = user;
  },
};

export default { state, mutations };
