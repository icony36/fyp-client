import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

import { login as apiLogin, logout as apiLogout } from "../services/auth";

export const AuthContext = createContext();

const getAuthFromToken = () => {
  const token = localStorage.getItem("jwtToken");

  if (token) {
    try {
      const decoded = jwtDecode(token);

      return { ...decoded, isAuth: true };
    } catch (err) {
      throw err;
    }
  }

  return {};
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    try {
      return getAuthFromToken();
    } catch (err) {
      return {};
    }
  });

  const resetAuth = () => {
    try {
      setAuth(getAuthFromToken());
    } catch (err) {
      throw err;
    }
  };

  const login = async (loginData) => {
    try {
      await apiLogin(loginData);
      resetAuth();
    } catch (err) {
      throw err;
    }
  };

  const logout = async () => {
    try {
      await apiLogout();
      resetAuth();
    } catch (err) {
      throw err;
    }
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, resetAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
