// import Cookies from 'js-cookie';

export const namespaced = true;

export const state = () => ({
  data: {},
  userState: false,
  weather: '',
});

export const mutations = {
  setUser(state, data) {
    state.data = data;
    state.userState = true;
  },
  setWeather(state, weather) {
    state.weather = weather;
  },
  removeUser(state) {
    state.data = '';
    state.userState = false;
  },
};
export const getters = {
  storeUserState(state) {
    return state.userState;
  },
  storeUser(state) {
    return state.data;
  },
  storeImages(state) {
    return state.data.images ? `/api/storage/preview/${state.data.images}` : '';
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
  storeSignature(state) {
    return state.data.signature;
  },
  storeLocation(state) {
    return state.data.location;
  },
  storeWeather(state) {
    return state.weather;
  },
};
