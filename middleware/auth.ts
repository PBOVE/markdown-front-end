import { Middleware } from '@nuxt/types';

const authMiddleware: Middleware = async context => {
  const { app, store, route, redirect } = context;
  let token = app.$cookies.get('access_token');
  if (!store.state.token.isGetToken) {
    const { data } = await app.$request.GetToken();
    if (!data.user) {
      token = false;
      app.$cookies.remove('access_token');
      store.commit('user/removeUser');
    } else {
      store.commit('user/setUser', data.user);
      app.$cookies.set('access_token', data._csrf.token);
    }
    app.$cookies.set('XSRF-TOKEN', data._csrf.token);
    store.commit('token/setToken', data._csrf.token);
    store.commit('token/setIsGetToken');
  }
  const ignorePaths: string[] = [
    '/user',
    '/user/personal',
    '/user/secrity',
    '/accounts/nickname',
    '/accounts/delete',
    '/accounts/email',
    '/accounts/password'
  ];
  const redirectPath = [ '/login', '/register', '/password_reset' ];
  const { path } = route;
  const verifyRoute = (route: string) => {
    const routeMatcher = new RegExp(`^${route.replace(/:[^\s/]+/g, '[\\w-.]+')}$`);
    return routeMatcher.test(path);
  };
  if (!token && ignorePaths.some(verifyRoute)) {
    redirect(`/login?redirect=${path}`);
  } else if (token && redirectPath.some(verifyRoute)) {
    redirect('/dashboard');
  }
};

export default authMiddleware;
