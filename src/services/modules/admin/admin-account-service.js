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

export default {
  getUserInfo,
};
