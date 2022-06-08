import { BASE_URL } from "../../constants/http";
import axiosRequest from "../../config/http-request";

const getProductById = (id) => {
  return axiosRequest
    .get(`${BASE_URL}/products/${id}`)
    .then((product) => product)
    .catch((err) => {
      throw new Error(err);
    });
};

export default {
  getProductById,
};
