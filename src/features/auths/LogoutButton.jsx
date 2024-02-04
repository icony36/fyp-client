import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import { IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

import { useToast } from "../../hooks/useToast";
import { AuthContext } from "../../contexts";
import { ChatContext } from "../../contexts/ChatContext";

const LogoutButton = () => {
  const navigate = useNavigate();

  const { toast } = useToast();

  const { logout } = useContext(AuthContext);
  const { clearMessages } = useContext(ChatContext);

  const queryClient = useQueryClient();

  const handleLogout = async () => {
    await logout();

    queryClient.removeQueries();

    navigate("/login");

    clearMessages();

    // toast.success("You have successfully logged out.");
  };

  return (
    <IconButton
      sx={{ color: "#F5871F", backgroundColor: "white" }}
      onClick={handleLogout}
      size="large"
      disableRipple
    >
      <LogoutIcon />
    </IconButton>
  );
};

export default LogoutButton;
