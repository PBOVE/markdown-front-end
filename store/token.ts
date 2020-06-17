// import Cookies from 'js-cookie';

export const namespaced = true;

export const state = () => ({
  access_token: '',
  isGetToken: false,
});

export const mutations: any = {
  setToken(state: any, token: string) {
    state.access_token = token;
  },
  setIsGetToken(state: any) {
    state.isGetToken = true;
  },
  removeToken(state: any) {
    state.access_token = '';
    state.isGetToken = false;
  },
};
export const getters = {
  getIsGetToken(state: any) {
    return state.isGetToken;
  },
};
