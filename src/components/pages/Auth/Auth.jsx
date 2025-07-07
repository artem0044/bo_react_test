import React from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "@components/layout/Layout";
import "./Auth.sass";

export const Auth = () => {
  return (
    <Layout>
      <main className="auth">
        <div className="auth__bg"></div>
        <div className="auth__wrapper">
          <Outlet/>
        </div>
      </main>
    </Layout>
  );
};

export default Auth;
