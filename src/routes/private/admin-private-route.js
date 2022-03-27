import {ADMIN_PERMISSION} from '../../constants/authentication';

const PRIVATE_ADMIN_ROUTE = {
  private: true,
  permission: ADMIN_PERMISSION,
};

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
];;