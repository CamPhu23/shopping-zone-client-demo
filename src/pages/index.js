import { lazy } from 'react';
const HomePage = lazy(() => import('./home/home-page.jsx'));
const LoginPage = lazy(() => import('./login/login-page.jsx'));
const UnAuthorizationPage = lazy(() => import('./errors/unauthorization-page'));

export {
  HomePage,
  LoginPage,
  UnAuthorizationPage,
};