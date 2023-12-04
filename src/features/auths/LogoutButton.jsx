import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import { Button } from "@mui/material";

import { useToast } from "../../hooks/useToast";
import { AuthContext } from "../../contexts";

const LogoutButton = () => {
  const navigate = useNavigate();

  const { toast } = useToast();

  const { logout } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const handleLogout = async () => {
    await logout();

    queryClient.removeQueries();

    navigate("/login");

    toast.success("You have successfully logged out.");
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
