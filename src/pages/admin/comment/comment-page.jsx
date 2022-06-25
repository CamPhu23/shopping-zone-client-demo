import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import TopSection from "../../../components/common/main-top-section";
import NoMoreComment from "../../../assets/NoMoreComment.png";
import { dateFomatter } from "../../../utils/date-formatter";
import Toast from "../../../components/toast/toast";
import { ICON } from "../../../assets/svg-icon";
import commentService from "../../../services/modules/admin/admin-comment-service";

const TOGGLE_TYPE = {
  Comment: "comment",
  Reply: "reply",
};

const CommentPage = () => {
  const [showReplyForm, setShowReplyForm] = useState("");
  const [showReplies, setShowReplies] = useState("");
  const [comments, setComments] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessages, setToastMessages] = useState("");
  const [toastIcon, setToastIcon] = useState(null);

  useEffect(() => {
    //call api to get list comment here
    commentService
      .getAllComments()
      .then((data) => formatData(data))
      .then((formatedData) => setComments(formatedData))
      .catch((error) => {
        console.log(error);
        setShowToast(true);
        setToastMessages("Loi");
        setToastIcon(ICON.Fail);
      });

    // const data = formatData(dummyData);
    // setComments(data);
  }, []);

  const formatData = (rawData) => {
    if (!rawData || rawData.length <= 0) return [];

    const comments = rawData.filter((comment) => !comment.replyTo);
    for (let i = 0; i < comments.length; i++) {
      const currentComment = comments[i];
      const replyTo = rawData.filter(
        (comment) => comment.replyTo === currentComment.id
      );
      comments[i].replyTo = replyTo;
    }

    return comments;
  };

  const handleRefreshClick = () => {
    console.log("refresh clicked");
    //recall api to get newest list of comments here
  };

  const handleMarkComment = (id) => {
    console.log("marked comment to done ", id);

    commentService
      .markComment(id)
      .then((res) => {
        setShowToast(true);
        setToastMessages("Thanh cong");
        setToastIcon(ICON.Success);
        return comments.filter((comment) => comment.id !== id);
      })
      .then((newComments) => setComments(newComments))
      .catch((error) => {
        console.log(error);
        setShowToast(true);
        setToastMessages("Loi");
        setToastIcon(ICON.Fail);
      });
  };

  const handleDeleteComment = (id) => {
    console.log("deleted comment to done ", id);
    const deleteComment = comments.find((comment) => comment.id === id);
    const ids = deleteComment.replyTo
      ? [id, ...deleteComment.replyTo.map((reply) => reply.id)]
      : [id];

    commentService
      .deleteComment(ids)
      .then((res) => {
        setShowToast(true);
        setToastMessages("Thanh cong");
        setToastIcon(ICON.Success);
        return comments.filter((comment) => comment.id !== id);
      })
      .then((newComments) => setComments(newComments))
      .catch((error) => {
        console.log(error);
        setShowToast(true);
        setToastMessages("Loi");
        setToastIcon(ICON.Fail);
      });
  };

  const handleRepliesClick = (currentId) => {
    if (currentId === showReplies) return setShowReplies("");
    setShowReplies(currentId);
  };

  const handleReplyFormClick = (currentId) => {
    if (currentId === showReplyForm) {
      setShowReplies("");
      setShowReplyForm("");
      return;
    }
    setShowReplies(currentId);
    setShowReplyForm(currentId);
  };

  const handleReplySubmit = () => {
    console.log("submit click clicked");
  };

  //type must be 'comment' or 'reply'
  const renderToggles = (type, id) => {
    return type === TOGGLE_TYPE.Comment ? (
      <div className="h-full flex items-center space-x-3">
        <div
          onClick={() => handleRepliesClick(id)}
          className="cursor-pointer"
          title={showReplies === id ? "Ẩn phản hồi" : "Hiển thị phản hồi"}
        >
          {showReplies === id ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          )}
        </div>
        <div
          onClick={() => handleReplyFormClick(id)}
          className="cursor-pointer"
          title="Trả lời bình luận"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
            />
          </svg>
        </div>
        <div
          onClick={() => handleMarkComment(id)}
          className="cursor-pointer"
          title="Đánh dấu hoàn thành"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
            />
          </svg>
        </div>
        <div
          onClick={() => handleDeleteComment(id)}
          className="cursor-pointer"
          title="Xoá bình luận"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </div>
      </div>
    ) : type === TOGGLE_TYPE.Reply ? (
      <div className="h-full flex items-center space-x-3">
        <div className="cursor-pointer" title="Chỉnh sửa bình luận">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </div>
        <div className="cursor-pointer" title="Xoá bình luận">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </div>
      </div>
    ) : null;
  };

  const renderCommentList = (listComment) => {
    return listComment.length > 0 ? (
      <>
        {listComment.map((comment) => {
          return <div key={comment.id}>{renderCommentItem(comment)}</div>;
        })}
      </>
    ) : (
      <div className="flex items-center h-full">
        <div className="relative">
          <img src={NoMoreComment} alt="" className="rounded-lg" />
          <div className="font-semibold text-xl text-gray-600 absolute bottom-1 w-full flex justify-center">
            Tốt lắm! Không còn bình luận cần được trả lời.
          </div>
        </div>
      </div>
    );
  };

  const renderCommentItem = (comment) => {
    return (
      <div className="mb-6">
        <div className="wrapper bg-white flex flex-row p-3 rounded-xl shadow-md my-2">
          <div className="w-1/12 flex-grow-0">
            <div className="rounded-full w-full h-auto border-black border-2 p-1 overflow-hidden">
              <img
                className="pt-0 rounded-full w-full"
                src="https://reqres.in/img/faces/10-image.jpg"
                alt=""
              />
            </div>
          </div>
          <div className="w-11/12 text-left pl-3">
            <div className="text-gray-900 text-sm tracking-wide">
              <span className="font-bold py-1">{comment.name}</span> đã bình
              luận vào{" "}
              <span className="font-semibold py-1 hover:text-blue-600">
                <a
                  href={`${window.location.origin}/product/${comment.product.id}`}
                  target={"_blank"}
                >
                  {comment.product.name}
                </a>
              </span>
            </div>
            <div className="text-gray-400 text-sm flex">
              <span>Lúc {dateFomatter(comment.updatedAt)}</span>
              <span className="mx-2">|</span>
              <div>{renderToggles(TOGGLE_TYPE.Comment, comment.id)}</div>
            </div>
            <div className="mt-2 text-sm text-gray-500">{comment.content}</div>
          </div>
        </div>
        {showReplies &&
          showReplies === comment.id &&
          comment.replyTo &&
          comment.replyTo.length > 0 &&
          comment.replyTo.map((reply) => {
            return (
              <div key={reply.id}>{renderReplyItem(reply, comment.name)}</div>
            );
          })}
        {showReplyForm && showReplyForm === comment.id && renderReplyForm()}
      </div>
    );
  };

  const renderReplyItem = (reply, clientName) => {
    return (
      <div className="ml-12 wrapper bg-white flex flex-row p-3 rounded-xl shadow-md my-2">
        <div className="w-1/12 flex-grow-0">
          <div className="rounded-full w-full h-auto border-black border-2 p-1 overflow-hidden">
            <img
              className="pt-0 rounded-full w-full"
              src="https://reqres.in/img/faces/10-image.jpg"
              alt=""
            />
          </div>
        </div>
        <div className="w-11/12 text-left pl-3">
          <div className="text-gray-900 text-sm tracking-wide">
            <span className="font-bold py-1">{reply.name}</span> đã trả lời{" "}
            <span className="font-bold py-1">{clientName}</span>
          </div>
          <div className="text-gray-400 text-sm flex">
            <span>Lúc {dateFomatter(reply.updatedAt)}</span>
            <span className="mx-2">|</span>
            <div>{renderToggles(TOGGLE_TYPE.Reply)}</div>
          </div>
          <div className="mt-2 text-sm text-gray-500">{reply.content}</div>
        </div>
      </div>
    );
  };

  const renderReplyForm = () => {
    return (
      <div className="ml-12 bg-white p-3 rounded-xl shadow-md my-2">
        <div className="w-full flex items-center justify-between">
          <div className="text-gray-400 text-sm tracking-wide">
            {" "}
            Trả lời dưới tên{" "}
            <span className="font-semibold py-1">Quản trị viên</span>
          </div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
              />
            </svg>
          </div>
        </div>
        <form className="mt-1">
          <textarea
            id="message"
            rows={2}
            className="block p-2.5 w-full text-sm rounded-lg border border-gray-300 bg-gray-50 border-gray-200 placeholder-gray-400 text-gray-500 mb-3"
            placeholder="Nhập nội dung bình luận..."
          ></textarea>

          <div className="flex justify-end space-x-3">
            <button
              onClick={handleReplySubmit}
              type="submit"
              className="inline-flex items-center px-5 py-1 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800"
            >
              Trả lời
            </button>

            <button
              onClick={() => handleReplyFormClick("")}
              type="button"
              className="inline-flex items-center px-5 py-1 text-sm font-medium text-center border border-white text-gray-600 rounded-lg hover:border-gray-300"
            >
              Trở về
            </button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <div className="flex h-full">
      <div className="w-full flex flex-col relative shadow-md sm:rounded-lg">
        <TopSection
          titleText="Trả lời bình luận"
          buttonText="Làm mới"
          onButtonClick={handleRefreshClick}
        />
        <div className="flex-1 flex justify-center">
          <div className="h-full w-1/2">{renderCommentList(comments)}</div>
        </div>
      </div>

      <Toast
        show={showToast}
        messages={toastMessages}
        icon={toastIcon}
        mode={"dark"}
        onClose={() => setShowToast(false)}
        autoClose={5000}
      />
    </div>
  );
};

export default CommentPage;
