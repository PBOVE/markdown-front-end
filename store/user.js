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
  storeUserName(state) {
    return state.data.userName;
  },
  storeNickName(state) {
    return state.data.nickName;
  },
};
