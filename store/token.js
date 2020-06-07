export const namespaced = true;

export const state = () => ({
  token: '',
});

export const mutations = {
  setToken(state, token) {
    console.log('---------------------------------------------------------------------------------------------------');
    console.log(token);
    state.token = token;
  },
};


