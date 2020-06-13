// import Cookies from 'js-cookie';

export const namespaced = true;

export const state = () => ({
  data: '',
});

export const mutations = {
  setUser(state, data) {
    state.data = data;
  },
};
export const getters = {
  storeUser(state) {
    return state.data;
  },
  storeUserName(state) {
    return state.data.userName;
  },
  storeNickName(state) {
    return state.data.nickName;
  },
  storeEmail(state) {
    return state.data.email;
  },
};
