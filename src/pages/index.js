import { lazy } from 'react';
const HomePage = lazy(() => import('./client/home/home-page.jsx'));
const LoginPage = lazy(() => import('./client/login-register/login-page.jsx'));
const RegisterPage = lazy(() => import('./client/login-register/register-page.jsx'));
const ProductPage = lazy(() => import('./client/product/product-page.jsx'));
const DetailProductPage = lazy(() => import('./client/product/detail-product-page.jsx'));
const AccountInfoPage = lazy(() => import('./client/account/account-info-page.jsx'));

const UnAuthorizationPage = lazy(() => import('./errors/unauthorization-page.jsx'));

export {
  HomePage,
  LoginPage,
  RegisterPage,
  UnAuthorizationPage,
  ProductPage,
  DetailProductPage,
  AccountInfoPage,
};