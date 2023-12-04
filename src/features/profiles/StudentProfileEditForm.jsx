import React, { useState, useContext, useEffect } from "react";

import {
  Paper,
  FormControl,
  IconButton,
  TextField,
  Button,
  Stack,
  Chip,
} from "@mui/material";
import { AddCircle } from "@mui/icons-material";

import { AuthContext } from "../../contexts";
import { useFetchStudentProfile } from "./useFetchStudentProfile";
import { useEditStudentProfile } from "./useEditStudentProfile";

const StudentProfileEditForm = () => {
  const { auth } = useContext(AuthContext);

  const { studentProfile, isFetching, studentProfileStatus } =
    useFetchStudentProfile({
      id: auth.id,
    });

  const { editStudentProfile, isEditing } = useEditStudentProfile();

  const isWorking = isFetching || isEditing;

  const [profileData, setProfileData] = useState({
    enrollments: [],
  });
  const [enrollment, setEnrollment] = useState("");

  useEffect(() => {
    if (studentProfileStatus === "success") {
      setProfileData((prevState) => ({
        ...prevState,
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

    setProfileData((prevState) => ({
      ...prevState,
      enrollments: [...prevState.enrollments, enrollment],
    }));

    setEnrollment("");
  };

  const handleRemoveEnrollment = (data) => {
    const arr = profileData.enrollments;
    const index = arr.indexOf(data);
    arr.splice(index, 1);

    setProfileData((prevState) => ({
      ...prevState,
      enrollments: arr,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const toSubmit = {
      ...profileData,
    };

    editStudentProfile({ profileData: toSubmit, id: auth.id });
  };

  return (
    <>
      <div className="form-page">
        <Paper className="paper" sx={{ minWidth: 300, minHeight: 400 }}>
          <form className="login-form" name="loginForm" onSubmit={handleSubmit}>
            <h1>Edit Enrollments</h1>
            <div
              style={{
                justifyContent: "space-between",
                alignItems: "center",
                display: "flex",
                width: "54ch",
                margin: "auto",
              }}
            >
              <FormControl sx={{ m: "8px", flex: 1 }}>
                <TextField
                  id="enrollments"
                  label="Enrollments"
                  variant="outlined"
                  name="studentData.enrollments"
                  value={enrollment}
                  onChange={(e) => setEnrollment(e.target.value)}
                />
              </FormControl>

              <FormControl>
                <IconButton size="large" onClick={handleAddEnrollment}>
                  <AddCircle fontSize="40" />
                </IconButton>
              </FormControl>
            </div>

            <div>
              <Stack
                sx={{
                  width: "52ch",
                  margin: "8px auto",
                }}
                direction="row"
                useFlexGap
                flexWrap="wrap"
                spacing={1}
              >
                {profileData.enrollments.map((el, index) => {
                  return (
                    <Chip
                      onDelete={() => handleRemoveEnrollment(el)}
                      key={index}
                      label={el}
                    />
                  );
                })}
              </Stack>
            </div>

            <div style={{ marginTop: "40px" }}>
              <Button
                disabled={isWorking}
                variant="contained"
                size="large"
                type="submit"
              >
                Update Enrollments
              </Button>
            </div>
          </form>
        </Paper>
      </div>
    </>
  );
};

export default StudentProfileEditForm;
