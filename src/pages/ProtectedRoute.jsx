import React, { useEffect, useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { AuthContext } from "../contexts";
import { setTokenHeader } from "../services/api";

const ProtectedRoute = ({ allowedRoles }) => {
  const { auth, logout, resetAuth } = useContext(AuthContext);

  const location = useLocation();

  useEffect(() => {
    checkForToken();
  }, []);

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

  const getComponent = () => {
    if (auth.isAuth && localStorage.getItem("jwtToken")) {
      if (allowedRoles) {
        if (allowedRoles.includes(auth.role)) {
          return <Outlet />;
        } else {
          return <Navigate to="/" state={{ from: location }} replace />;
        }
      } else {
        return <Outlet />;
      }
    }

    return <Navigate to="/login" state={{ from: location }} replace />;
  };

  return getComponent();
};

export default ProtectedRoute;
