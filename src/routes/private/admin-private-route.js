import { ADMIN_PERMISSION } from '../../constants/authentication';
import {
  AdminDashboardPage,
  AdminProductPage,
  AdminCreateProductPage,
  AdminEditProductPage,
  AdminReceiptPage
} from '../../pages';
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


const PRIVATE_RECEIPT_LIST_ROUTE = {
  path: NAVIGATE_URL.RECEIPTS_LIST,
  component: <AdminReceiptPage />,
  breadcrumbs: [
    { name: "Dashboard", path: NAVIGATE_URL.DASHBORAD },
    { name: "Quản lý hóa đơn" },
  ],
  ...PRIVATE_ADMIN_ROUTE,
};

export default [
  ADMIN_DASHBOARD_ROUTE,
  PRIVATE_PRODUCT_LIST_ROUTE,
  PRIVATE_PRODUCT_CREATE_ROUTE,
  PRIVATE_PRODUCT_EDIT_ROUTE,
  PRIVATE_RECEIPT_LIST_ROUTE,
];
