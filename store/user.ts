// import Cookies from 'js-cookie';

export const namespaced = true;

export const state = () => ({
  data: {},
});

export const mutations = {
  setUser(state: any, data: any) {
    state.data = data;
  },
  removeUser(state: any) {
    state.data = '';
  },
};
export const getters = {
  storeUser(state: any) {
    return state.data;
  },
  storeImages(state: any) {
    return state.data.images;
  },
  storeUserName(state: any) {
    return state.data.userName;
  },
  storeNickName(state: any) {
    return state.data.nickName;
  },
  storeEmail(state: any) {
    return state.data.email;
  },
};
