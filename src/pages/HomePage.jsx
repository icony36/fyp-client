import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../contexts";
import { ROLE } from "../constants";

const HomePage = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    navigate(switchWithRole());
  }, []);

  const switchWithRole = () => {
    if (!auth.isAuth) {
      return "/login";
    }

    switch (auth.role) {
      case ROLE.admin:
        return "/users";
      case ROLE.staff:
        return "/tickets";
      case ROLE.student:
        return "/chat";
      default:
        return "/";
    }
  };

  return <></>;
};

export default HomePage;
