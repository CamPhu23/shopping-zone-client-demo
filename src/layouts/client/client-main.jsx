import React from "react";
import { Header } from "./header";
import { Footer } from "./footer";

export const ClientLayout = ({ component }) => {
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
    <div>
      <Header />
      {component}
      <Footer />
    </div>
  );
};
