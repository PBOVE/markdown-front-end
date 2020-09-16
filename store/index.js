export const actions = {
  nuxtServerInit({ commit }, { app }) {
    // eslint-disable-next-line camelcase
    const access_token = app.$cookies.get('XSRF-TOKEN');
    // eslint-disable-next-line camelcase
    if (access_token) commit('token/setToken', access_token);
  },
};
