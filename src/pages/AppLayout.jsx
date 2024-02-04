import React from "react";
import { Outlet } from "react-router-dom";

import { useToast } from "../hooks/useToast";

import Navbar from "../components/Navbar";

const AppLayout = () => {
  const { Toast } = useToast();

  return (
    <>
      <Toast />
      <Navbar />
      <div className="sidebar-content">
        <Outlet />
      </div>
    </>
  );
};

export default AppLayout;
