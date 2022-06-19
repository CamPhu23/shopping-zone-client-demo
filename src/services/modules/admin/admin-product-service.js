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

const createProduct = async (formData) => {
  return axiosRequest
    .post(`${BASE_URL}/admin/products/create`, formData)
    .then((data) => data)
    .catch(error => {
      throw new Error(error);
    })
}

const getProductById = async (id) => {
  return axiosRequest
    .get(`${BASE_URL}/admin/products/${id}`)
    .then((data) => data)
    .catch(error => {
      throw new Error(error);
    })
}

const deleteProductById = async (id) => {
  return axiosRequest
    .get(`${BASE_URL}/admin/products/delete/${id}`)
    .then((data) => data)
    .catch(error => {
      throw new Error(error);
    })
}

const updateProduct = async (formData) => {
  return axiosRequest
    .post(`${BASE_URL}/admin/products/update`, formData)
    .then((data) => data)
    .catch(error => {
      throw new Error(error);
    })
}

export default {
  getAllProducts,
  createProduct,
  getProductById,
  deleteProductById,
  updateProduct,
};
