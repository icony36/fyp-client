import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { Button } from "@mui/material";

import { AuthContext } from "../contexts";

const LogoutButton = () => {
  const { logout } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const handleLogout = async () => {
    queryClient.removeQueries();
    toast.remove();

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
