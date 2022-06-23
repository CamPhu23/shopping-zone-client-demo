import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductForm from "../../../components/form/product-form";
import { CLOUDINARY_CONFIG } from "../../../config/cloudinary";
import { NAVIGATE_URL } from "../../../constants/navigate-url";
import { CREATE_FORM_TYPE } from "../../../constants/variables";
import { adminAccountService, adminCloudinaryService, adminProductService } from "../../../services/modules";
import LoadingPage from "../../loaders/loading-page";
import _ from "lodash"
import AccountForm from "../../../components/form/account-form";

const CreateAccountPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    return () => {
      setIsLoading(false);
    };
  }, []);

  const onSubmitForm = async (data) => {
    setIsLoading(true);

    adminAccountService
      .createClient(data)
      .then((data) => {
        console.log(data);
        navigate(NAVIGATE_URL.CLIENT_LIST)
      });
  };

  return isLoading ? (
    <LoadingPage />
  ) : (
    <>
      <div className="p-6 pb-2 flex justify-center">
        <div className="text-xl text-slate-100 font-bold">
          Biểu mẫu tạo mới tài khoản
        </div>
      </div>

      <AccountForm
        type={CREATE_FORM_TYPE}
        handleSubmitForm={onSubmitForm}
      />
    </>
  );
};

export default CreateAccountPage;
