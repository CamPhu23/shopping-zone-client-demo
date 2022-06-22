import { BASE_URL } from "../../constants/http";
import axiosRequest from "../../config/http-request";

const postPayment = (formData) => {
  return axiosRequest
    .post(`${BASE_URL}/payment`, formData)
    .then((product) => product)
    .catch((err) => {
      let errObject = JSON.parse(err).data;
      console.log(errObject);

      throw new Error(errObject);
    });
};

export default {
  postPayment
};
