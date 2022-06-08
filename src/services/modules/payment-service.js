import { BASE_URL } from "../../constants/http";
import axiosRequest from "../../config/http-request";

const postPayment = (formData) => {
  return axiosRequest
    .post(`${BASE_URL}/payment`, formData)
    .then((product) => product)
    .catch((err) => {
      let errObject = JSON.parse(err);
      let errProduct = JSON.stringify(errObject.data);

      throw new Error(errProduct);
    });
};

export default {
  postPayment
};
