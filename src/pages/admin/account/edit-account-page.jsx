import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AccountForm from "../../../components/form/account-form";
import { EDIT_FORM_TYPE } from "../../../constants/variables";
import LoadingPage from "../../loaders/loading-page";
import { adminAccountService } from '../../../services/modules/'
import { NAVIGATE_URL } from "../../../constants/navigate-url";

const EditAccountPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  // @ts-ignore
  const { data } = state;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    return () => {
      setIsLoading(false);
    }
  }, []);

  const onSubmitForm = async (formData) => {
    formData._id = data._id;
    adminAccountService
      .updateClient(formData)
      .then((result) => {
        console.log(result);
        navigate(NAVIGATE_URL.CLIENT_LIST)
      });
  };

  return isLoading ? (
    <LoadingPage />
  ) : (
    <>
      <div className="p-6 pb-2 flex justify-center">
        <div className="text-xl text-slate-100 font-bold text-">
          Biểu mẫu cập nhật tài khoản
        </div>
      </div>

      <AccountForm
        type={EDIT_FORM_TYPE}
        handleSubmitForm={onSubmitForm}
        item={data}
      />
    </>
  );
};

export default EditAccountPage;
