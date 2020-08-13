import { Middleware } from '@nuxt/types';
import { _token } from '@/api/user';

const authMiddleware: Middleware = async(context: any) => {
  const { app, store } = context;
  if (!store.state.token.isGetToken) {
    const { data } = await _token();
    if (!data.user) {
      app.$cookies.remove('access_token');
      store.commit('user/removeUser');
    } else {
      store.commit('user/setUser', data.user);
      store.commit('user/setWeather', data.weather);
      app.$cookies.set('access_token', data._csrf.token);
    }
    app.$cookies.set('XSRF-TOKEN', data._csrf.token);
    store.commit('token/setToken', data._csrf.token);
    store.commit('token/setIsGetToken');
  }
};

export default authMiddleware;
