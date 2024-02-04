import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../contexts";
import { useFetchProfile } from "./useFetchProfile";
import { useFetchStudentProfile } from "./useFetchStudentProfile";
import HeadingBar from "../../components/HeadingBar";
import { Button } from "../../ui/Button";
import Paper from "../../ui/Paper";
import { FormGroup } from "../../ui/FormGroup";
import { Info } from "../../ui/Info";
import { ROLE } from "../../constants";

const ProfileInfo = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const { profile, isFetching: isFetchingProfile } = useFetchProfile({
    id: auth.id,
  });

  const { studentProfile, isFetching: isFetchingStudent } =
    useFetchStudentProfile({
      id: auth.id,
      enabled: auth.role === ROLE.student,
    });

  const isWorking = isFetchingProfile || isFetchingStudent;

  return (
    <>
      <HeadingBar title="My Profile">
        <Button
          primary
          disabled={isWorking}
          onClick={() => navigate(`/profile/edit`)}
        >
          Edit
        </Button>
      </HeadingBar>

      <Paper title="Account Information">
        <FormGroup>
          <Info label="Username">{profile?.data?.username}</Info>
        </FormGroup>
      </Paper>

      <Paper title="User Information">
        <FormGroup style={{ marginBottom: "20px" }}>
          <Info label="First Name">{profile?.data?.firstName}</Info>
          <Info label="Last Name">{profile?.data?.lastName}</Info>
        </FormGroup>

        <FormGroup>
          <Info label="Email Address">{profile?.data?.email}</Info>
          <Info label="Role">{profile?.data?.role?.toUpperCase()}</Info>
        </FormGroup>
      </Paper>

      {auth.role === ROLE.student && (
        <Paper title="Student Profile">
          <FormGroup style={{ marginBottom: "20px" }}>
            <Info label="Course">{studentProfile?.data?.course}</Info>
          </FormGroup>

          <FormGroup>
            <Info label="Outstanding Fee">
              {studentProfile?.data?.outstandingFee}
            </Info>
            <Info label="Enrolled Modules">
              {studentProfile?.data?.enrollments?.map((el, index) => {
                if (index !== studentProfile.data.enrollments.length - 1) {
                  return `${el}, `;
                }

                return el;
              })}
            </Info>
          </FormGroup>
        </Paper>
      )}
    </>
  );
};

export default ProfileInfo;
