import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import _ from "lodash";
import { RegisterForm } from "../../../components/form/register-form";
import {
  registerRequest,
  resetAuthError,
} from "../../../services/actions/auth-action";
import { useEffect } from "react";
import Loader from "../../../components/loader/loader";

export default function RegisterPage() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const onSubmitForm = (formData) => {
    dispatch(registerRequest(formData));
  };

  return !_.isEmpty(user) ? (
    <Navigate to="/" replace />
  ) : (
    <>
      {/* {isLoading ? (
        <div className="flex m-20 sm:m-32 md:m-50 items-center h-full justify-center">
          <Loader />
        </div>
      ) : (
        <div className="min-h-full grid grid-cols-3">
          <div className="hidden md:col-span-2 md:flex bg-signin-signup bg-no-repeat h-full w-full bg-cover"></div>

          <RegisterForm
            handleSubmitForm={(data) => onSubmitForm(data)}
            registerError={authError}
          />
        </div>
      )} */}
      <div className="min-h-full grid grid-cols-3">
        <div className="hidden md:col-span-2 md:flex bg-signin-signup bg-no-repeat h-full w-full bg-cover"></div>

        <RegisterForm
          handleSubmitForm={(data) => onSubmitForm(data)}
        />
      </div>
    </>
  );
}
