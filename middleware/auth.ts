import { Middleware } from '@nuxt/types';

const authMiddleware: Middleware = async context => {
  const { app, store, route, redirect } = context;

  if (!store.state.token.isGetToken) {
    const { data } = await app.$request.GetToken();
    if (!data.user) app.$cookies.remove('access_token');
    else store.commit('user/setUser', data.user);
    app.$cookies.set('XSRF-TOKEN', data._csrf.token);
    store.commit('token/setToken', data._csrf.token);
    store.commit('token/setIsGetToken');
  }
  const ignorePaths: string[] = [
    '/',
    '/login',
    '/register',
    '/forget',
    '/accounts/email/:requestId',
    '/accounts/password/:requestId',
  ];
  const token = app.$cookies.get('access_token');
  const { path } = route;
  const verifyRoute = (route: string) => {
    const routeMatcher = new RegExp(`^${route.replace(/:[^\s/]+/g, '[\\w-.]+')}$`);
    return routeMatcher.test(path);
  };
  if (!token && !ignorePaths.some(verifyRoute)) {
    redirect(`/login?redirect=${path}`);
  }
};

export default authMiddleware;
