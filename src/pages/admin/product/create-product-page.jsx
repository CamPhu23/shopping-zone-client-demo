import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductForm from "../../../components/form/product-form";
import { CLOUDINARY_CONFIG } from "../../../config/cloudinary";
import { NAVIGATE_URL } from "../../../constants/navigate-url";
import { CREATE_FORM_TYPE } from "../../../constants/variables";
import { adminCloudinaryService, adminProductService } from "../../../services/modules";
import LoadingPage from "../../loaders/loading-page";
import _ from "lodash"

const CreateProductPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    return () => {
      setIsLoading(false);
    };
  }, []);

  const onSubmitForm = async (data, images, selectedCategory, selectedTags) => {
    setIsLoading(true);

    let imagesInfo = [];
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const config = CLOUDINARY_CONFIG(image);

      const resonse = await adminCloudinaryService.uploadImage(config);
      imagesInfo.push(resonse);
    }

    const formData = { ...data };
    if (_.isEmpty(formData.discount)) {
      formData.discount = 0;
    }
    formData.images = imagesInfo;
    formData.tags = selectedTags;
    formData.category = selectedCategory;

    console.log(formData);
    adminProductService
      .createProduct(formData)
      .then((data) => {
        console.log(data);
        navigate(NAVIGATE_URL.PRODUCT_LIST)
      });
  };

  return isLoading ? (
    <LoadingPage />
  ) : (
    <>
      <div className="p-6 pb-2 flex justify-center">
        <div className="text-xl text-slate-100 font-bold">
          Biểu mẫu tạo mới sản phẩm
        </div>
      </div>

      <ProductForm
        type={CREATE_FORM_TYPE}
        handleSubmitForm={onSubmitForm}
      />
    </>
  );
};

export default CreateProductPage;
