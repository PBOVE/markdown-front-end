import { Middleware } from '@nuxt/types';

const ignorePaths: string[] = [
  '/new',
  '/user',
  '/user/personal',
  '/user/security',
  '/accounts/nickname',
  '/accounts/delete',
  '/accounts/email',
  '/accounts/password',
  '/accounts/location',
  '/:author/:path/issues/new',
];
const redirectPath = [ '/login', '/register', '/password_reset' ];

const accessMiddleware: Middleware = (context: any) => {
  const { app, route, redirect } = context;
  const token = app.$cookies.get('access_token');
  const { path } = route;
  const verifyRoute = (route: string) => {
    const routeMatcher = new RegExp(`^${route.replace(/:[^\s/]+/g, '[\\w-.]+')}$`);
    return routeMatcher.test(path);
  };
  if (!token && ignorePaths.some(verifyRoute)) {
    redirect(`/login?redirect=${path}`);
  } else if (token && redirectPath.some(verifyRoute)) {
    redirect('/');
  }
};

export default accessMiddleware;
