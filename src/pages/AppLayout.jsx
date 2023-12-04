import React from "react";
import { Outlet } from "react-router-dom";

import { useToast } from "../hooks/useToast";

const AppLayout = () => {
  const { Toast } = useToast();

  return (
    <>
      <Toast />
      <Outlet />
    </>
  );
};

export default AppLayout;
