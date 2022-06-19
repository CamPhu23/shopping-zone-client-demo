import axiosRequest from "../../config/http-request";
import { BASE_URL } from "../../constants/http";

const getUserInfo = () => {
  return axiosRequest
    .get(`${BASE_URL}/accounts/info`)
    .then((info) => info)
    .catch((err) => {
      throw new Error(err);
    });
};

const updateUserInfo = (formData) => {
  return axiosRequest.put(`${BASE_URL}/accounts/info`, formData)
  .then((response) => response)
  .catch((err) => {
    throw new Error(err);
  })
};

const getUserOrderHistory = (page = 1, size = 10) => {
  return axiosRequest
    .get(`${BASE_URL}/accounts/orders?page=${page}&size=${size}`)
    .then((orders) => orders)
    .catch((err) => {
      throw new Error(err);
    });
};

export default {
  getUserInfo,
	getUserOrderHistory,
  updateUserInfo,
};
