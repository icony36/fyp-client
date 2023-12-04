import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

import { AuthContext } from "../contexts";
import LoginForm from "../features/auths/LoginForm";
import { useToast } from "../hooks/useToast";

const LoginPage = () => {
  const { auth } = useContext(AuthContext);

  const { Toast } = useToast();

  return auth.isAuth ? (
    <Navigate to="/" />
  ) : (
    <>
      <Toast />
      <LoginForm />;
    </>
  );
};

export default LoginPage;
