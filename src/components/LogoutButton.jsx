import React, { useContext } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../contexts";

const LogoutButton = () => {
  const { logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();

    navigate("/login", { replace: true });
  };

  return (
    <Button
      sx={{ color: "white", display: "block", fontWeight: "900" }}
      variant="text"
      onClick={handleLogout}
    >
      Log Out
    </Button>
  );
};

export default LogoutButton;
