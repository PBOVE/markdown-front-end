export const namespaced = true;

export const state = () => ({
  data: {},
});

export const mutations = {
  setAuthor(state: any, data: any) {
    state.data = data;
  },
};
export const getters = {
  storeAuthorUser(state: any) {
    return state.data.user;
  },
  storeAuthorNumber(state: any) {
    return state.data.number;
  },
};
