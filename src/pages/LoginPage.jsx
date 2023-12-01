import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

import { AuthContext } from "../contexts";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  const { auth } = useContext(AuthContext);

  return auth.isAuth ? <Navigate to="/" /> : <LoginForm />;
};

export default LoginPage;
