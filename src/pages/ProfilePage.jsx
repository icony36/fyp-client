import React, { useContext } from "react";

import { AuthContext } from "../contexts";
import { ROLE } from "../constants";
import ProfileInfo from "../features/profiles/ProfileInfo";
import StudentProfileInfo from "../features/profiles/StudentProfileInfo";
import StudentTicketInfo from "../features/tickets/StudentTicketInfo";

const ProfilePage = () => {
  const { auth } = useContext(AuthContext);

  return (
    <>
      <ProfileInfo />
      {auth.role === ROLE.student ? (
        <>
          <StudentProfileInfo />
          <StudentTicketInfo />
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default ProfilePage;
