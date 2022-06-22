import { useEffect, useState } from "react";
import TopSection from "../../../components/common/main-top-section";
// import Pagination from "../../../components/common/pagination";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import { DetailDialog } from "../../../components/common/dialog";
import { Table } from "../../../components/common/table";
import { adminReceiptSevice } from "../../../services/modules";
import { DetailReceipt } from "./detail-receipt";
import Toast from "../../../components/toast/toast";
import { ICON } from "../../../assets/svg-icon";

const ReceiptPage = () => {
  const [toastShow, setToastShow] = useState(false);
  const [toastMessages, setToastMessages] = useState("");
  const [toastIcon, setToastIcon] = useState(null);

  const [data, setData] = useState({ receipts: [], totalPage: 0, currentPage: 0 });
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogParam, setDialogParam] = useState({});

  const navigate = useNavigate();

  const updateUI = () => {
    adminReceiptSevice
      .getAllReceipts()
      .then((response) => {
        setData({ ...data, receipts: response });
      });
  }

  useEffect(() => {
    updateUI();
  }, []);

  useEffect(() => {
    if (!_.isEmpty(dialogParam)) {
      setOpenDialog(true);
    }
  }, [dialogParam]);

  const onTableRowClick = (id) => {
    adminReceiptSevice
      .getReceiptById(id)
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
    console.log(item);
    adminReceiptSevice.
      postReceiptStatus(item)
      .then((data) => {
        setOpenDialog(false);
        updateUI();

        if (!data) {
          setToastShow(true);
          setToastMessages("Lỗi cập nhật vui lòng thử lại sau");
          setToastIcon(ICON.Fail);
        }
      });
  };

  return (
    <div className="flex h-full">
      <div className="w-full flex flex-col relative shadow-md sm:rounded-lg">
        <TopSection
          titleText="Danh sách hóa đơn"
        />
        <div className="flex-1 mb-16 border border-solid border-slate-700">
          <Table
            columns={[
              "Mã hóa đơn",
              "Tên khách hàng",
              "Số điện thoại",
              "Email",
              "Phương thức thanh toán",
              "Tổng tiền",
              "Trạng thái"
            ]}
            data={data.receipts}
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
          <DetailReceipt
            item={dialogParam}
            onEditClick={onEditClick}
          />
        }
      />

      <Toast
        show={toastShow}
        messages={toastMessages}
        icon={toastIcon}
        mode={"light"}
        onClose={() => setToastShow(false)}
        autoClose={5000}
      />
    </div>
  );
};

export default ReceiptPage;
