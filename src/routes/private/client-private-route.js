import {CLIENT_PERMISSION} from '../../constants/authentication';
import { AccountInfoPage } from '../../pages';

const PRIVATE_CLIENT_ROUTE = {
  private: true,
  permission: CLIENT_PERMISSION,
};

const USER_INFO_ROUTE = {
  path: '/user-info',
  component: <AccountInfoPage />,
  exact: true,
  // => UNCOMMENT WHEN INTERGATE INTO MAIN
  // ...PRIVATE_CLIENT_ROUTE
}

/*
  OBJECTT look like: {
    path: '',
    component: <Component>,
    private: true | false,
    exact: true | false,
    permission: 'admin' | 'client',
  }
*/


export default [
  USER_INFO_ROUTE,
];