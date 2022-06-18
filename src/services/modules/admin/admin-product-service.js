import axiosRequest from "../../../config/http-request";
import { BASE_URL } from "../../../constants/http";

const getAllProducts = async () => {
  return axiosRequest
    .get(`${BASE_URL}/admin/products`)
    .then((data) => data)
    .catch(error => {
      throw new Error(error);
    })
}

export default {
  getAllProducts,
};
