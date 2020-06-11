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
