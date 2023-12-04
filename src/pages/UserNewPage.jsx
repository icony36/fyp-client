import React from "react";

import { useToast } from "../hooks/useToast";
import UserForm from "../features/users/UserForm";

const UserNewPage = () => {
  // const { Toast } = useToast();

  return (
    <>
      {/* <Toast /> */}
      <UserForm />
    </>
  );
};

export default UserNewPage;
