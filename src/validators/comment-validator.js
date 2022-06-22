export const commentValidator = {
  nameOfCustomer: {
    required: {
      value: true,
      message: "Họ và tên không được bỏ trống",
    },
  },
  content: {
    required: {
      value: true,
      message: "Nội dung không được bỏ trống",
    },
  }
}

export const renderError = (error) => {
  return error && (<span className='flex justify-start mx-1 text-red-500' role="alert">{error.message}</span>)
}