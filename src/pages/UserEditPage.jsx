import React from "react";

import { useToast } from "../hooks/useToast";
import UserForm from "../features/users/UserForm";

const UserEditPage = () => {
  // const { Toast } = useToast();

  return (
    <>
      {/* <Toast /> */}
      <UserForm isEditSession />
    </>
  );
};

export default UserEditPage;
