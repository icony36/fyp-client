import React from "react";

import { useToast } from "../hooks/useToast";
import UsersList from "../features/users/UserList";

const UsersPage = () => {
  // const { Toast } = useToast();

  return (
    <>
      {/* <Toast /> */}
      <UsersList />
    </>
  );
};

export default UsersPage;
