import { Middleware } from '@nuxt/types';

const ignorePaths: string[] = [
  '/new',
  '/user',
  '/user/personal',
  '/user/security',
  '/account/nickname',
  '/account/delete',
  '/account/email',
  '/account/password',
  '/account/location',
  '/:author/:path/issues/new',
];
const redirectPath = [ '/login', '/register', '/password_reset' ];

const accessMiddleware: Middleware = (context: any) => {
  const { route, redirect, store } = context;
  const userState = store.state.user.userState;
  const { path } = route;
  const verifyRoute = (route: string) => {
    const routeMatcher = new RegExp(`^${route.replace(/:[^\s/]+/g, '[\\w-.]+')}$`);
    return routeMatcher.test(path);
  };
  if (!userState && ignorePaths.some(verifyRoute)) {
    redirect(`/login?redirect=${path}`);
  } else if (userState && redirectPath.some(verifyRoute)) {
    redirect('/');
  }
};

export default accessMiddleware;
