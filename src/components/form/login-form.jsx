import React, { useEffect } from 'react'
import { loginRequest, resetAuthError } from '../../services/actions/auth-action';
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

export const LoginForm = () => {
  const { register, handleSubmit, formState: { errors }, setError, setFocus, clearErrors, reset } = useForm();

  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.auth.loading);
  const authError = useSelector(state => state.auth.error);

  useEffect(() => dispatch(resetAuthError()), []);
  useEffect(() => {
    if (!_.isEmpty(authError)) {
      const { message } = authError;
      setFocus('username');

      setError('serverError', {
        type: "server",
        message,
      });
    } else {
      clearErrors('serverError');
    }
  }, [isLoading, authError]);

  const handleLogin = (data) => {
    dispatch(loginRequest(data));
    reset();
  };

  return (
    <div className=" py-2 col-span-3 md:col-span-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md lg:w-4/5 space-y-8">
        <div>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">Đăng nhập tài khoản của bạn</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            hoặc{' '}
            <a href={window.location.origin + '/sign-up'} className="font-medium text-teal-600 hover:text-teal-500">
              Tạo tài khoản mới
            </a>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(handleLogin)}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md -space-y-px">

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Tên tài khoản
              </label>
              <input
                id="username"
                type="text"
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 shadow-sm rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                placeholder="Tên tài khoản"
                onChangeCapture={() => clearErrors('serverError')}
                {...register("username", {
                  required: true,
                })}
              />

              {errors.username && errors.username.type === "required" && (
                <span className='text-red-500' role="alert">Tên tài khoản không được bỏ trống</span>
              )}
            </div>

            <div className='pt-3'>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mật khẩu
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 shadow-sm rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                placeholder="Mật khẩu"
                onChangeCapture={() => clearErrors('serverError')}
                {...register("password", { required: true, minLength: 8 })}
              />

              {errors.password && errors.password.type === "required" && (
                <span className='text-red-500' role="alert">Mật khẩu không được bỏ trống</span>
              )}
              {errors.password && errors.password.type === "minLength" && (
                <span className='text-red-500' role="alert">Mật khẩu cần ít nhất 8 ký tự</span>
              )}

              {!errors.password && errors.serverError && errors.serverError.type === "server" && (
                <span className='text-red-500' role="alert">{errors.serverError.message}</span>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-teal-500"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            </span>
            Đăng nhập
          </button>

          <div className="relative flex items-center">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="flex-shrink mx-4 text-gray-400">Hoặc</span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>

          <button
            type=""
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent border-red-600 text-sm font-medium rounded-md text-red-500 bg-white-600 hover:text-white hover:bg-red-700 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-red-500"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            </span>
            Google
          </button>

          <div className="text-sm mt-3 pt-3 flex items-center justify-center">
            <a href={window.location.origin + '/forgot-password'} className="font-medium text-teal-600 hover:text-teal-500">
              Bạn quên mật khẩu?
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}
