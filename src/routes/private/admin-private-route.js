import { ADMIN_PERMISSION } from '../../constants/authentication';
import { AdminDashboardPage, AdminProductPage, AdminCreateProductPage } from '../../pages';
import { NAVIGATE_URL } from '../../constants/navigate-url'

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

const PRIVATE_PRODUCT_LIST_ROUTE = {
  path: NAVIGATE_URL.PRODUCT_LIST,
  component: <AdminProductPage />,
  breadcrumbs: [
    { name: "Dashboard", path: NAVIGATE_URL.DASHBORAD },
    { name: "Quản lý sản phẩm" },
  ],
  ...PRIVATE_ADMIN_ROUTE,
};

const PRIVATE_PRODUCT_CREATE_ROUTE = {
  path: NAVIGATE_URL.PRODUCT_CREATE,
  component: <AdminCreateProductPage />,
  breadcrumbs: [
    { name: "Dashboard", path: NAVIGATE_URL.DASHBORAD },
    { name: "Quản lý sản phẩm", path: NAVIGATE_URL.PRODUCT_LIST },
    { name: "Tạo mới sản phẩm" },
  ],
  ...PRIVATE_ADMIN_ROUTE
};

export default [
  ADMIN_DASHBOARD_ROUTE,
  PRIVATE_PRODUCT_LIST_ROUTE,
  PRIVATE_PRODUCT_CREATE_ROUTE,
];