import React, { useContext } from "react";

import { AuthContext } from "../contexts";
import { ROLE } from "../constants";
import ProfileInfo from "../features/profiles/ProfileInfo";
import StudentProfileInfo from "../features/profiles/StudentProfileInfo";

const ProfilePage = () => {
  const { auth } = useContext(AuthContext);

  return (
    <>
      <ProfileInfo />
      {auth.role === ROLE.student ? <StudentProfileInfo /> : <></>}
    </>
  );
};

export default ProfilePage;
