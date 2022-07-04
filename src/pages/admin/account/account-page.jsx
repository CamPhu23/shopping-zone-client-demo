import { useEffect, useState } from "react";
import TopSection from "../../../components/common/main-top-section";
// import Pagination from "../../../components/common/pagination";
import { Table } from "../../../components/common/table";
import { adminAccountService, adminProductService } from "../../../services/modules";
import { DEFAULT_PAGE_NUMBER, NUMBER_RECORD_PER_PAGE } from "../../../constants/variables.js";
import { DetailDialog } from "../../../components/common/dialog";
import { DetailAccount } from "./detail-account";
import { useNavigate } from "react-router-dom";
import { NAVIGATE_URL } from "../../../constants/navigate-url";
import { numberToStringConverter } from "../../../converter/data-type.js"
import _ from "lodash";

const AccountPage = () => {
  const [data, setData] = useState({ accounts: [], totalPage: 0, currentPage: 0 });
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogParam, setDialogParam] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    adminAccountService
      .getAllClients()
      .then((response) => {
        if (!_.isEmpty(response)) {
          response = response.map((ele) => {
            if (!ele.fullname) {
              ele.fullname = "";
            }
            if (!ele.phone) {
              ele.phone = "";
            }
            if (!ele.address) {
              ele.address = "";
            }

            return ele
          });
        }
        
        setData({ ...data, accounts: response });
      });
  }, []);

  useEffect(() => {
    if (!_.isEmpty(dialogParam)) {
      setOpenDialog(true);
    }
  }, [dialogParam]);

  const onCreateNewButtonClick = () => {
    navigate(NAVIGATE_URL.CLIENT_CREATE);
  };

  const onTableRowClick = (id) => {
    adminAccountService
      .getClientById(id)
      .then((data) => {
        setDialogParam(data);
      });
  };

  const onPageNumberClick = (pageNumber) => {
    // productService
    //   .getProductList(pageNumber, NUMBER_RECORD_PER_PAGE)
    //   .then((response) => {
    //     setData(response);
    //   });
  };

  const onEditClick = (item) => {
    navigate(NAVIGATE_URL.CLIENT_UPDATE, { state: { data: item } });
  };

  const onDeleteClick = (id) => {
    adminAccountService
      .deleteClient(id)
      .then((result) => {
        if (result) {
          const newProducts = data.accounts.filter((product) => product._id !== id);
          setData({ ...data, accounts: newProducts });
          setOpenDialog(false);
        }
      });
  };

  return (
    <div className="flex h-full">
      <div className="w-full flex flex-col relative">
        <TopSection
          titleText="Danh sách khách hàng"
          buttonText="Tạo tài khoản"
          onButtonClick={onCreateNewButtonClick}
        />
        <div className="flex-1">
          <Table
            columns={[
              "Mã tài khoản",
              "Tên tài khoản",
              "Email",
              "Địa chỉ",
              "Họ và tên",
              "Số điện thoại",
            ]}
            data={data.accounts}
            onRowClick={onTableRowClick}
          />
        </div>

        {/* {data.totalPage > 1 && (
          <div className="absolute bottom-0 right-0 mb-4">
            <Pagination
              total={data.totalPage}
              current={data.currentPage}
              onClick={onPageNumberClick}
            />
          </div>
        )} */}
      </div>
      <DetailDialog
        isOpen={openDialog}
        onClose={() => setOpenDialog(false)}
        component={
          <DetailAccount
            item={dialogParam}
            onEditClick={onEditClick}
            onDeleteClick={onDeleteClick}
          />
        }
      />
    </div>
  );
};

export default AccountPage;