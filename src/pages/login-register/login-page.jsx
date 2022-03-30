import { Navigate } from "react-router-dom";
import _ from "lodash";
import { LoginForm } from "../../components/form/login-form";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "../../services/actions/auth-action";

export default function LoginPage() {
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const onSubmitLoginForm = (data) => {
    dispatch(loginRequest(data));
  };

  return !_.isEmpty(user) ? (
    <Navigate to="/" replace />
  ) : (
    <>
      <div className="min-h-full grid grid-cols-3">
        <div className="hidden md:col-span-2 md:flex bg-signin-signup bg-no-repeat h-full w-full bg-cover"></div>

        <LoginForm handleSubmitForm={(data) => onSubmitLoginForm(data)} />
      </div>
    </>
  );
}
