import { lazy } from 'react';
const HomePage = lazy(() => import('./client/home/home-page.jsx'));
const LoginPage = lazy(() => import('./client/login-register/login-page.jsx'));
const RegisterPage = lazy(() => import('./client/login-register/register-page.jsx'));
const ProductPage = lazy(() => import('./client/product/product-page.jsx'));
const DetailProductPage = lazy(() => import('./client/product/detail-product-page.jsx'));
const PaymentPage = lazy(() => import('./client/payment/payment-page.jsx'));
const AccountInfoPage = lazy(() => import('./client/account/account-info-page.jsx'));
const UnAuthorizationPage = lazy(() => import('./errors/unauthorization-page.jsx'));
const AdminLogInPage = lazy(() => import('./admin/admin-login-page.jsx'));
const AdminDashboardPage = lazy(() => import('./admin/admin-dashboard-page.jsx'));
const AdminProductPage = lazy(() => import('./admin/product/product-page'));
const AdminCreateProductPage = lazy(() => import('./admin/product/create-product-page'));
const AdminEditProductPage = lazy(() => import('./admin/product/edit-product-page'))

export {
  HomePage,
  LoginPage,
  RegisterPage,
  PaymentPage,
  ProductPage,
  DetailProductPage,
  AccountInfoPage,
  UnAuthorizationPage,
  AdminLogInPage,
  AdminDashboardPage,
  AdminProductPage,
  AdminCreateProductPage,
  AdminEditProductPage,
};