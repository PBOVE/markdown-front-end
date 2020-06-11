export const actions = {
  nuxtServerInit({ commit }, { app }) {
    const access_token = app.$cookies.get('access_token');
    if (access_token) commit('token/setToken', access_token);
  },
};
