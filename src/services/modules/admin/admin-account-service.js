import axiosRequest from "../../../config/http-request";
import { BASE_URL } from "../../../constants/http";

const getUserInfo = async () => {
  return axiosRequest
    .get(`${BASE_URL}/admin/account/info`)
    .then((data) => data)
    .catch(error => {
      throw new Error(error);
    })
}

const getAllClients = async () => {
  return axiosRequest
    .get(`${BASE_URL}/admin/clients`)
    .then((data) => data)
    .catch(error => {
      throw new Error(error);
    })
}

const createClient = async (formData) => {
  return axiosRequest
    .post(`${BASE_URL}/admin/clients/create`, formData)
    .then((data) => data)
    .catch(error => {
      throw new Error(error);
    })
}

const getClientById = async (id) => {
  return axiosRequest
    .get(`${BASE_URL}/admin/clients/${id}`)
    .then((data) => data)
    .catch(error => {
      throw new Error(error);
    })
}

const deleteClient = async (id) => {
  return axiosRequest
    .get(`${BASE_URL}/admin/clients/delete/${id}`)
    .then((data) => data)
    .catch(error => {
      throw new Error(error);
    })
}

const updateClient = async (formData) => {
  console.log(formData);
  return axiosRequest
    .post(`${BASE_URL}/admin/clients/update`, formData)
    .then((data) => data)
    .catch(error => {
      throw new Error(error);
    })
}

export default {
  getUserInfo,
  getAllClients,
  createClient,
  getClientById,
  deleteClient,
  updateClient,
};
