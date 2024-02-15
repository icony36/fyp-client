import React, { useState, useContext, useEffect } from "react";
import { useToast } from "../../hooks/useToast";

import { AuthContext } from "../../contexts";
import { useFetchProfile } from "./useFetchProfile";
import { useEditProfile } from "./useEditProfile";
import { useFetchStudentProfile } from "./useFetchStudentProfile";
import { useEditStudentProfile } from "./useEditStudentProfile";
import { ROLE } from "../../constants";
import HeadingBar from "../../components/HeadingBar";
import { Button } from "../../ui/Button";
import Paper from "../../ui/Paper";
import { FormGroup } from "../../ui/FormGroup";
import { AddInput, Input, PasswordInput } from "../../ui/Input";
import { ChipStack, ChipWithDelete } from "../../ui/Chip";

const ProfileEditForm = () => {
  const { auth } = useContext(AuthContext);

  const { toast } = useToast();

  const {
    profile,
    isFetching: isFechingProfile,
    profileStatus,
  } = useFetchProfile({
    id: auth.id,
  });

  const { editProfile, isEditing: isEditingProfile } = useEditProfile();

  const {
    studentProfile,
    isFetching: isFetchingStudent,
    studentProfileStatus,
  } = useFetchStudentProfile({
    id: auth.id,
    enabled: auth.role === ROLE.student,
  });

  const { editStudentProfile, isEditing: isEditingStudent } =
    useEditStudentProfile();

  const isWorking =
    isFechingProfile ||
    isEditingProfile ||
    isFetchingStudent ||
    isEditingStudent;

  const [profileData, setProfileData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    role: "",
  });

  const [studentData, setStudentData] = useState({
    course: "",
    outstandingFee: 0,
    enrollments: [],
  });
  const [enrollment, setEnrollment] = useState("");

  useEffect(() => {
    if (profileStatus === "success") {
      setProfileData((prevState) => ({
        ...prevState,
        username: profile?.data?.username,
        firstName: profile?.data?.firstName,
        lastName: profile?.data?.lastName,
        email: profile?.data?.email,
        role: profile?.data?.role,
      }));
    }
  }, [profile, profileStatus]);

  useEffect(() => {
    if (studentProfileStatus === "success") {
      setStudentData((prevState) => ({
        ...prevState,
        course: studentProfile?.data?.course,
        outstandingFee: studentProfile?.data?.outstandingFee,
        enrollments: studentProfile?.data?.enrollments,
      }));
    }
  }, [studentProfile, studentProfileStatus]);

  const handleChange = (event) => {
    setProfileData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleAddEnrollment = () => {
    if (!enrollment) return;

    setStudentData((prevState) => ({
      ...prevState,
      enrollments: [...prevState.enrollments, enrollment],
    }));

    setEnrollment("");
  };

  const handleRemoveEnrollment = (data) => {
    const arr = studentData.enrollments;
    const index = arr.indexOf(data);
    arr.splice(index, 1);

    setStudentData((prevState) => ({
      ...prevState,
      enrollments: arr,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const toSubmit = {
      ...profileData,
    };

    if (toSubmit.password && toSubmit.password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }

    if (!toSubmit.password) {
      delete toSubmit.password;
    }

    await editProfile({ profileData: toSubmit, id: auth.id });

    if (auth.role === ROLE.student) {
      const toSubmitStudent = {
        ...studentData,
      };

      editStudentProfile({ profileData: toSubmitStudent, id: auth.id });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <HeadingBar title="Edit My Profile" backLink={"/profile"} checkBack>
          <Button primary="true" disabled={isWorking} type="submit">
            Save Changes
          </Button>
        </HeadingBar>

        <Paper title="Account Information">
          <FormGroup>
            <Input
              containerProps={{ style: { flex: 1, marginRight: "10px" } }}
              id="username"
              name="username"
              label="Username"
              value={profileData.username}
              onChange={handleChange}
              required
            />

            <PasswordInput
              containerProps={{ style: { flex: 1 } }}
              id="password"
              name="password"
              label="Password"
              value={profileData.password}
              onChange={handleChange}
            />
          </FormGroup>
        </Paper>

        <Paper title="User Information">
          <FormGroup style={{ marginBottom: "20px" }}>
            <Input
              containerProps={{ style: { flex: 1, marginRight: "10px" } }}
              id="firstName"
              name="firstName"
              label="First Name"
              value={profileData.firstName}
              onChange={handleChange}
              required
            />

            <Input
              containerProps={{ style: { flex: 1 } }}
              id="lastName"
              name="lastName"
              label="Last Name"
              value={profileData.lastName}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Input
              containerProps={{ style: { flex: 1, marginRight: "10px" } }}
              id="email"
              label="Email Address"
              type="email"
              required
              name="email"
              value={profileData.email}
              onChange={handleChange}
            />

            <Input
              containerProps={{ style: { flex: 1 } }}
              id="role"
              label="Role"
              name="role"
              value={profileData.role.toUpperCase()}
              disabled
            />
          </FormGroup>
        </Paper>

        {auth.role === ROLE.student && (
          <Paper title="Student Profile">
            <FormGroup style={{ marginBottom: "20px" }}>
              <Input
                containerProps={{ style: { flex: 1, marginRight: "10px" } }}
                id="course"
                label="Course"
                name="course"
                value={studentData.course}
                disabled
              />

              <Input
                containerProps={{ style: { flex: 1 } }}
                id="outstandingFee"
                label="Outstanding Fees"
                name="outstandingFee"
                value={studentData.outstandingFee}
                disabled
              />
            </FormGroup>

            <AddInput
              id="enrollments"
              label="Enrolled Modules"
              name="studentData.enrollments"
              value={enrollment}
              onChange={(e) => setEnrollment(e.target.value)}
              handleAdd={handleAddEnrollment}
            />

            <ChipStack>
              {studentData?.enrollments?.map((el, index) => (
                <ChipWithDelete
                  key={index}
                  label={el}
                  onDelete={() => handleRemoveEnrollment(el)}
                  style={{ marginRight: "8px" }}
                />
              ))}
            </ChipStack>
          </Paper>
        )}
      </form>
    </>
  );
};

export default ProfileEditForm;
