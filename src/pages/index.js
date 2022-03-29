import { lazy } from 'react';
const HomePage = lazy(() => import('./home/home-page.jsx'));
const LoginPage = lazy(() => import('./login-register/login-page.jsx'));
const RegisterPage = lazy(() => import('./login-register/register-page.jsx'));
const ProductPage = lazy(() => import('./product/product-page.jsx'));
const UnAuthorizationPage = lazy(() => import('./errors/unauthorization-page'));

export {
  HomePage,
  LoginPage,
  RegisterPage,
  UnAuthorizationPage,
  ProductPage
};