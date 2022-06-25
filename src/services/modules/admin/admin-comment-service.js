import axiosRequest from "../../../config/http-request";
import { BASE_URL } from "../../../constants/http";

const dummyData = [
  {
    id: "62a40134a6a02a51a8350ccb",
    name: "client 1",
    content: "comment content",
    product: {
      id: "624570fbee34ac4d28c4b979",
      name: "product 1",
    },
    replyTo: null,
    isMarked: false,
    updatedAt: "2022-06-10T17:34:29.151Z",
  },
  {
    id: "62a40134a6a02a51a8350ccc",
    name: "admin",
    content: "comment content",
    product: {
      id: "624570fbee34ac4d28c4b979",
      name: "product 1",
    },
    replyTo: "62a40134a6a02a51a8350ccb",
    isMarked: false,
    updatedAt: "2022-06-10T17:34:29.151Z",
  },
  {
    id: "62a40134a6a02a51a8350ccd",
    name: "client 2",
    content: "comment content",
    product: {
      id: "624570fbee34ac4d28c4b979",
      name: "product 2",
    },
    replyTo: null,
    isMarked: false,
    updatedAt: "2022-06-10T17:34:29.151Z",
  },
  {
    id: "62a40134a6a02a51a8350cce",
    name: "client 3",
    content: "comment content",
    product: {
      id: "624570fbee34ac4d28c4b979",
      name: "product 3",
    },
    replyTo: null,
    isMarked: false,
    updatedAt: "2022-06-10T17:34:29.151Z",
  },
  {
    id: "62a40134a6a02a51a8350ccf",
    name: "admin",
    content: "comment content",
    product: {
      id: "624570fbee34ac4d28c4b979",
      name: "product 3",
    },
    replyTo: "62a40134a6a02a51a8350cce",
    isMarked: false,
    updatedAt: "2022-06-10T19:46:29.151Z",
  },
];

const getAllComments = () => {
  // return axiosRequest
  //   .get(`${BASE_URL}/admin/comments`)
  //   .then((data) => data)
  //   .catch((error) => {
  //     throw new Error(error);
  //   });

  return new Promise((res, rej) => {
    setTimeout(() => {
      res(dummyData);
    }, 500);
  });
};

const replyComment = (comment) => {
  return axiosRequest
    .post(`${BASE_URL}/admin/comments`, comment)
    .then((res) => res)
    .catch((error) => {
      throw new Error(error);
    });
};

const markComment = (id) => {
  // return axiosRequest
  //   .get(`${BASE_URL}/admin/comments/mark/${id}`)
  //   .then((res) => res)
  //   .catch((error) => {
  //     throw new Error(error);
  //   });

  return new Promise((res, rej) => {
    setTimeout(() => {
      res(true);
    }, 500);
  });
};

const deleteComment = (ids) => {
  // return axiosRequest
  //   .post(`${BASE_URL}/admin/comments/delete`, ids)
  //   .then((res) => res)
  //   .catch((error) => {
  //     throw new Error(error);
  //   });

  return new Promise((res, rej) => {
    setTimeout(() => {
      res(true);
    }, 500);
  });
};

const updateComment = (comment) => {
  return axiosRequest
    .post(`${BASE_URL}/admin/comment/${comment.id}`, comment)
    .then((res) => res)
    .catch((error) => {
      throw new Error(error);
    });
};

export default {
  getAllComments,
  replyComment,
  markComment,
  deleteComment,
  updateComment,
};
