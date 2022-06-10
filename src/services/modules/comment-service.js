import { BASE_URL } from "../../constants/http";
import axiosRequest from "../../config/http-request";

const addComment = (formInput) => {
    // console.log(formInput)
    return axiosRequest
        .post(`${BASE_URL}/comment/addcomment`, formInput)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}
const getAllComments = (id) => {
    return axiosRequest.get(`${BASE_URL}/products/${id}`)
      .then(function (response) {
        return response.comments;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
export default {
  addComment,
  getAllComments
};
