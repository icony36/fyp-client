import React, { useEffect, useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { setTokenHeader } from "../services/api";
import { AuthContext } from "../contexts";
import AppLayout from "./AppLayout";

const ProtectedRoute = ({ allowedRoles }) => {
  const { auth, logout, resetAuth } = useContext(AuthContext);

  const location = useLocation();

  useEffect(() => {
    const checkForToken = () => {
      if (localStorage.jwtToken) {
        setTokenHeader(localStorage.jwtToken);

        try {
          resetAuth();
        } catch (err) {
          logout();
        }
      }
    };

    checkForToken();
  }, []);

  const getComponent = () => {
    if (auth.isAuth && localStorage.getItem("jwtToken")) {
      if (allowedRoles) {
        if (allowedRoles.includes(auth.role)) {
          return <AppLayout />;
        } else {
          return <Navigate to="/" state={{ from: location }} replace />;
        }
      } else {
        return <AppLayout />;
      }
    }

    return <Navigate to="/login" state={{ from: location }} replace />;
  };

  return getComponent();
};

export default ProtectedRoute;
