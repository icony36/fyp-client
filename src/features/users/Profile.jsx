import React, { useContext } from "react";

import { AuthContext } from "../../contexts";
import { useFetchProfile } from "./useFetchProfile";

const Profile = () => {
  const { auth } = useContext(AuthContext);

  const { profile, isFetching } = useFetchProfile({
    id: auth.id,
  });

  return (
    <>
      <h1>Profile</h1>
    </>
  );
};

export default Profile;
