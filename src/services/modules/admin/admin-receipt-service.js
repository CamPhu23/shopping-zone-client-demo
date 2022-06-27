import axiosRequest from "../../../config/http-request";
import { BASE_URL } from "../../../constants/http";

const getAllReceipts = async () => {
  return axiosRequest
    .get(`${BASE_URL}/admin/receipts`)
    .then((data) => data)
    .catch(error => {
      throw new Error(error);
    })
}

const getReceiptById = async (id) => {
  return axiosRequest
    .get(`${BASE_URL}/admin/receipts/${id}`)
    .then((data) => data)
    .catch(error => {
      throw new Error(error);
    })
}

const postReceiptStatus = async (status) => {
  return axiosRequest
    .post(`${BASE_URL}/admin/receipts/update-status`, status)
    .then((data) => data)
    .catch(error => {
      throw new Error(error);
    })
}

export default {
  getAllReceipts,
  getReceiptById,
  postReceiptStatus,
};
