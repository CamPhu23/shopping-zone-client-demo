import React from "react";
import { Header } from "./header";
import { Footer } from "./footer";
import { useDispatch, useSelector } from "react-redux";
import { logoutRequest } from "../../services/actions/auth-action";
import LoadingPage from "../../pages/loaders/loading-page";

export const ClientLayout = ({ component }) => {
  const user = useSelector((state) => state.auth.user);
  const isLoading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logoutRequest());
  };

  return (
    // <div className="flex flex-col">
    //   <div className="h-30 z-40 sticky top-0">
    //     <Header />
    //   </div>
    //   <div className="flex-1">
    //     {component}
    //   </div>
    //   <div className="h-10">
    //     <Footer />
    //   </div>
    // </div>
    isLoading ? (
      <LoadingPage />
    ) : (
      <div>
        <Header handleLogout={() => onLogout()} user={user} />
        {component}
        <Footer />
      </div>
    )
  );
};
