import React from "react";
import { Outlet } from "react-router-dom";
import { Header, Footer } from "../../../components";

const Public = () => {
  return (
    <>
      <Header />
      <div id="auth-wrapper">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Public;
