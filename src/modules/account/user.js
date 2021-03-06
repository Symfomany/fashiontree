import xhr from '../../plugins/axios';

export default {
  namespaced: true,
  state: {
    connected: false,
  },

  mutations: {
    connect(state) {
      state.connected = true;
    },
    disconnect(state) {
      state.connected = false;
    },
    updateAuth(state, auth) {
      state.auth = {
        ...state.auth,
        ...auth,
      };
    },
  },

  actions: {
    download(state) {
      console.log(state)
      return xhr.get(`/pdf`);
    },
    login(state, { login, password }) {
      return xhr.post(`/login`, {
        login,
        password,
      });
    },
  },

  getters: {},
};
