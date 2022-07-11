import {
  AdminLogInPage,
  HomePage,
  LoginPage,
  ProductPage,
  RegisterPage,
  DetailProductPage,
  ForgotPasswordPage,
  ResetPasswordPage
} from '../../pages';
import { CLIENT_PERMISSION } from '../../constants/authentication';

const PUBLIC_CLIENT_ROUTE = {
  private: false,
  permission: CLIENT_PERMISSION,
};

const CLIENT_LOGIN_ROUTE = {
  path: '/sign-in',
  component: <LoginPage />,
  exact: true,
  ...PUBLIC_CLIENT_ROUTE,
};

const CLIENT_REGISTER_ROUTE = {
  path: '/sign-up',
  component: <RegisterPage />,
  exact: true,
  ...PUBLIC_CLIENT_ROUTE,
};

const HOME_ROUTE = {
  path: '/',
  component: <HomePage />,
  exact: true,
  ...PUBLIC_CLIENT_ROUTE,
};

const PRODUCT_ROUTE = {
  path: '/product',
  component: <ProductPage />,
  exact: true,
  ...PUBLIC_CLIENT_ROUTE,
};

const DETAIL_PRODUCT_ROUTE = {
  path: '/product/:id',
  component: <DetailProductPage />,
  exact: true,
  ...PUBLIC_CLIENT_ROUTE,
}

const FORGOT_PASSWORD_ROUTE = {
  path: '/forgot-password',
  component: <ForgotPasswordPage />,
  exact: true,
  ...PUBLIC_CLIENT_ROUTE,
}

const RESET_PASSWORD_ROUTE = {
  path: '/reset-password/:token',
  component: <ResetPasswordPage />,
  exact: true,
  ...PUBLIC_CLIENT_ROUTE,
}

export default [
  HOME_ROUTE,
  CLIENT_LOGIN_ROUTE,
  CLIENT_REGISTER_ROUTE,
  PRODUCT_ROUTE,
  DETAIL_PRODUCT_ROUTE,
  FORGOT_PASSWORD_ROUTE,
  RESET_PASSWORD_ROUTE,
];