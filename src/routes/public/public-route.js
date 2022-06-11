import {HomePage, LoginPage, ProductPage, RegisterPage, DetailProductPage} from '../../pages';

const CLIENT_LOGIN_ROUTE = {
  path: '/sign-in',
  component: <LoginPage />,
  exact: true,
  private: false,
};

const CLIENT_REGISTER_ROUTE = {
  path: '/sign-up',
  component: <RegisterPage />,
  exact: true,
  private: false,
};

const HOME_ROUTE = {
  path: '/',
  component: <HomePage />,
  exact: true,
  private: false,
};

const PRODUCT_ROUTE = {
  path: '/product',
  component: <ProductPage />,
  exact: true,
  private: false,
};

const DETAIL_PRODUCT_ROUTE = {
  path: '/product/:id',
  component: <DetailProductPage/>,
  exact: true,
  private: false
}

export default [
  HOME_ROUTE,
  CLIENT_LOGIN_ROUTE,
  CLIENT_REGISTER_ROUTE,
  PRODUCT_ROUTE,
  DETAIL_PRODUCT_ROUTE
];