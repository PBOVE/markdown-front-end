import { Middleware } from '@nuxt/types';

const authMiddleware: Middleware = async context => {
  const { app, store, route, redirect } = context;

  if (!store.state.token.isGetToken) {
    const { data } = await app.$request.GetToken();
    if (!data.user.userName) app.$cookies.remove('access_token');
    else store.commit('user/setUser', data.user);
    store.commit('token/setToken', data._csrf.token);
    store.commit('token/setIsGetToken');
  }
  const ignorePaths: string[] = [ '/', '/login', '/register' ];
  const token = app.$cookies.get('access_token');
  const { path } = route;
  if (!token && !ignorePaths.includes(path)) {
    redirect('/login');
  }
};

export default authMiddleware;
