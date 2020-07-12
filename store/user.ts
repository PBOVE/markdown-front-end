// import Cookies from 'js-cookie';

export const namespaced = true;

export const state = () => ({
  data: {},
  userState: false,
  weather: '',
});

export const mutations = {
  setUser(state: any, data: any) {
    state.data = data;
    state.userState = true;
  },
  setWeather(state: any, weather: any) {
    state.weather = weather;
  },
  removeUser(state: any) {
    state.data = '';
    state.userState = false;
  },
};
export const getters = {
  storeUserState(state: any) {
    return state.userState;
  },
  storeUser(state: any) {
    return state.data;
  },
  storeImages(state: any) {
    return state.data.images ? `/api/storage/preview/${state.data.images}` : '';
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
  storeSignature(state: any) {
    return state.data.signature;
  },
  storeLocation(state: any) {
    return state.data.location;
  },
  storeWeather(state: any) {
    return state.weather;
  },
};
