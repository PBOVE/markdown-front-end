// import Cookies from 'js-cookie';

export const namespaced = true;

export const state = () => ({
  access_token: '',
  isGetToken: false,
});

export const mutations = {
  setToken(state, token) {
    state.access_token = token;
  },
  setIsGetToken(state) {
    state.isGetToken = true;
  },
  removeToken(state) {
    state.access_token = '';
    state.isGetToken = false;
  },
};
export const getters = {
  getIsGetToken(state) {
    return state.isGetToken;
  },
};
