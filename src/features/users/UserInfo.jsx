import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { ROLE } from "../../constants";
import { useToast } from "../../hooks/useToast";
import { useFetchUsers } from "./useFetchUsers";
import { fetchStudentProfileByUser } from "../../services/studentProfile";
import { useDeleteUser } from "./useDeleteUser";
import HeadingBar from "../../components/HeadingBar";
import { Button } from "../../ui/Button";
import Paper from "../../ui/Paper";
import { FormGroup } from "../../ui/FormGroup";
import { Info } from "../../ui/Info";

const UserInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { toast } = useToast();

  const { users, usersStatus, isFetching } = useFetchUsers({});
  const { deleteUser, isDeleting } = useDeleteUser({
    onSuccess: () => navigate("/users"),
  });

  const isWorking = isFetching || isDeleting;

  const [profile, setProfile] = useState({});
  const [studentProfile, setStudentProfile] = useState({});

  // const { profile, isFetching: isFetchingProfile } = useFetchProfile({
  //   id,
  // });

  // const isWorking = isFetchingProfile || isFetchingStudent;

  useEffect(() => {
    if (usersStatus === "success") {
      setUserToProfile();
    }
  }, [usersStatus, users]);

  const setUserToProfile = async () => {
    const userData = users.data?.filter((el) => el._id === id)[0];

    if (!userData) {
      navigate("/users");
      toast.error("User doesn't exist");
      return;
    }

    setProfile((prevState) => ({
      username: userData.username,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      role: userData.role,
      isSuspended: userData.isSuspended,
      password: "",
    }));

    if (userData.role === ROLE.student) {
      try {
        const res = await fetchStudentProfileByUser(id);
        const studentData = res.data;

        if (!studentData) {
          throw Error("Can't get student profile.");
        }

        setStudentProfile((prevState) => ({
          course: studentData.course,
          enrollments: studentData.enrollments,
          outstandingFee: studentData.outstandingFee,
        }));
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  return (
    <>
      <HeadingBar title="View Profile" backLink={"/users"}>
        <Button
          primary
          disabled={isWorking}
          onClick={() => navigate(`/users/${id}/edit`)}
        >
          Edit
        </Button>

        <Button
          outlined
          style={{ marginLeft: "16px" }}
          disabled={isWorking}
          onClick={() => deleteUser(id)}
        >
          Delete
        </Button>
      </HeadingBar>

      <Paper title="Account Information">
        <FormGroup>
          <Info label="Username">{profile?.username}</Info>
        </FormGroup>
      </Paper>

      <Paper title="User Information">
        <FormGroup style={{ marginBottom: "20px" }}>
          <Info label="First Name">{profile?.firstName}</Info>
          <Info label="Last Name">{profile?.lastName}</Info>
        </FormGroup>

        <FormGroup>
          <Info label="Email Address">{profile?.email}</Info>
          <Info label="Role">{profile?.role?.toUpperCase()}</Info>
        </FormGroup>
      </Paper>

      {profile?.role === ROLE.student && (
        <Paper title="Student Profile">
          <FormGroup style={{ marginBottom: "20px" }}>
            <Info label="Course">{studentProfile?.course}</Info>
          </FormGroup>

          <FormGroup>
            <Info label="Outstanding Fee">
              {studentProfile?.outstandingFee}
            </Info>
            <Info label="Enrolled Modules">
              {studentProfile?.enrollments?.map((el, index) => {
                if (index !== studentProfile.enrollments.length - 1) {
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

export default UserInfo;
