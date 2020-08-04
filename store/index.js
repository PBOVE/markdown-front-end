export const actions = {
  nuxtServerInit({ commit }, { app }) {
    // eslint-disable-next-line camelcase
    const access_token = app.$cookies.get('access_token');
    // eslint-disable-next-line camelcase
    if (access_token) commit('token/setToken', access_token);
  },
};
