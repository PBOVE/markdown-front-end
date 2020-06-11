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
};
