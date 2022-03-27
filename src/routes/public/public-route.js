import {HomePage, LoginPage} from '../../pages';

const CLIENT_LOGIN_ROUTE = {
  path: '/login',
  component: <LoginPage />,
  exact: true,
  private: false,
};

const HOME_ROUTE = {
  path: '/',
  component: <HomePage />,
  exact: true,
  private: false,
};

export default [
  HOME_ROUTE,
  CLIENT_LOGIN_ROUTE,
];