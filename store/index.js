export const actions = {
  nuxtServerInit({ commit }, { req }) {
    console.log(32);
    // let cookie = req.headers.cookie;
    // // 将cookie转成json对象（自己实现该方法）
    // let token = cookieparse(cookie).token;
    // commit('setToken', token);
  },
};
