import { ADMIN_PERMISSION } from '../../constants/authentication';
import { AdminDashboardPage } from '../../pages';

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

const ADMIN_DASHBOARD_ROUTE = {
  path: '/admin/dashboard',
  component: <AdminDashboardPage />,
  exact: true,
  breadcrumbs: [{ name: "Dashboard", path: "/admin/dashboard" }],
  ...PRIVATE_ADMIN_ROUTE
};

export default [
  ADMIN_DASHBOARD_ROUTE,
];