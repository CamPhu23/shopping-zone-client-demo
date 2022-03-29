import React from "react";
import { Header } from "./header";
import { Footer } from "./footer";

export const ClientLayout = ({ component }) => {
  return (
    <div>
      <Header />
      {component}
      <Footer />
    </div>
  );
};
