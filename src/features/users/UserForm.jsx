import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  Paper,
  FormControl,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  IconButton,
  TextField,
  Button,
  Select,
  MenuItem,
  Stack,
  Chip,
} from "@mui/material";
import { Visibility, VisibilityOff, AddCircle } from "@mui/icons-material";

import { fetchStudentProfileByUser } from "../../services/studentProfile";
import { ROLE } from "../../constants";
import { useToast } from "../../hooks/useToast";
import { useFetchUsers } from "./useFetchUsers";
import { useCreateUser } from "./useCreateUser";
import { useEditUser } from "./useEditUser";
import { useDeleteUser } from "./useDeleteUser";

const roles = Object.values(ROLE);

const UserForm = ({ isEditSession }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { toast } = useToast();

  const { users, usersStatus, isFetching } = useFetchUsers(
    isEditSession ? { enabled: true } : { enabled: false }
  );
  const { createUser, isCreating } = useCreateUser({
    onSuccess: () => setFormData(defaultValues),
  });
  const { editUser, isEditing } = useEditUser();
  const { deleteUser, isDeleting } = useDeleteUser({
    onSuccess: () => navigate("/users"),
  });

  const isWorking = isFetching || isCreating || isEditing || isDeleting;

  const defaultValues = {
    userData: {
      username: "",
      password: "",
      email: "",
      firstName: "",
      lastName: "",
      role: ROLE.student,
      isSuspended: false,
    },
    studentData: {
      course: "",
      outstandingFee: 0,
      enrollments: [],
    },
    profileId: "",
  };

  const [formData, setFormData] = useState(defaultValues);
  const [enrollment, setEnrollment] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isEditSession && usersStatus === "success") {
      setUserToEdit();
    }
  }, [usersStatus, users]);

  const setUserToEdit = async () => {
    const userData = users.data?.filter((el) => el._id === id)[0];

    if (!userData) {
      navigate("/users");
      toast.error("User doesn't exist");
      return;
    }

    setFormData((prevState) => ({
      ...prevState,
      userData: {
        username: userData.username,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: userData.role,
        isSuspended: userData.isSuspended,
        password: "",
      },
    }));

    if (userData.role === ROLE.student) {
      try {
        const res = await fetchStudentProfileByUser(id);
        const studentData = res.data[0];

        setFormData((prevState) => ({
          ...prevState,
          studentData: {
            course: studentData.course,
            enrollments: studentData.enrollments,
            outstandingFee: studentData.outstandingFee,
          },
          profileId: studentData._id,
        }));
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  const handleChange = (event) => {
    const path = event.target.name;
    const value = event.target.value;
    const keys = path.split(".");

    setFormData((prevState) => ({
      ...prevState,
      [keys[0]]: {
        ...prevState[keys[0]],
        [keys[1]]: value,
      },
    }));
  };

  const handleAddEnrollment = () => {
    if (!enrollment) return;

    setFormData((prevState) => ({
      ...prevState,
      studentData: {
        ...prevState.studentData,
        enrollments: [...prevState.studentData.enrollments, enrollment],
      },
    }));

    setEnrollment("");
  };

  const handleRemoveEnrollment = (data) => {
    const arr = formData.studentData.enrollments;
    const index = arr.indexOf(data);
    arr.splice(index, 1);

    setFormData((prevState) => ({
      ...prevState,
      studentData: {
        ...prevState.studentData,
        enrollments: arr,
      },
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      userData: formData.userData,
      studentData: formData.studentData,
    };

    if (isEditSession) {
      if (!data.userData.password) {
        delete data.userData.password;
      }

      editUser({ id, data, profileId: formData.profileId });
    } else {
      createUser(data);
    }
  };

  return (
    <>
      <div className="form-page">
        <Paper className="paper" sx={{ minWidth: 700, minHeight: 300 }}>
          <form
            className="register-form"
            name="registerForm"
            onSubmit={handleSubmit}
          >
            <h1>{isEditSession ? "Edit User" : "Create User"}</h1>

            <div>
              <FormControl sx={{ m: "8px", width: "25ch" }}>
                <TextField
                  id="username"
                  label="Username"
                  variant="outlined"
                  required
                  name="userData.username"
                  value={formData.userData.username}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl sx={{ m: "8px", width: "25ch" }}>
                <InputLabel htmlFor="password" required>
                  Password
                </InputLabel>
                <OutlinedInput
                  id="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  required={!isEditSession}
                  name="userData.password"
                  value={formData.userData.password}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((show) => !show)}
                        onMouseDown={(event) => event.preventDefault()}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>

            <div>
              <FormControl sx={{ m: "8px", width: "52ch" }}>
                <TextField
                  id="email"
                  label="Email"
                  type="email"
                  variant="outlined"
                  required
                  name="userData.email"
                  value={formData.userData.email}
                  onChange={handleChange}
                />
              </FormControl>
            </div>

            <div>
              <FormControl sx={{ m: "8px", width: "25ch" }}>
                <TextField
                  id="firstName"
                  label="First Name"
                  variant="outlined"
                  required
                  name="userData.firstName"
                  value={formData.userData.firstName}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl sx={{ m: "8px", width: "25ch" }}>
                <TextField
                  id="lastName"
                  label="Last Name"
                  variant="outlined"
                  required
                  name="userData.lastName"
                  value={formData.userData.lastName}
                  onChange={handleChange}
                />
              </FormControl>
            </div>

            <div>
              <FormControl sx={{ m: "8px", width: "25ch" }}>
                <InputLabel htmlFor="role" required>
                  Role
                </InputLabel>
                <Select
                  id="role"
                  label="Role"
                  name="userData.role"
                  value={formData.userData.role}
                  onChange={handleChange}
                >
                  {roles.map((role) => {
                    let text = role.charAt(0).toUpperCase() + role.slice(1);

                    return (
                      <MenuItem key={role} value={role}>
                        {text}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

              <FormControl sx={{ m: "8px", width: "25ch" }}>
                <InputLabel htmlFor="role" required>
                  Is Suspended
                </InputLabel>
                <Select
                  id="isSuspended"
                  label="Is Suspended"
                  name="userData.isSuspended"
                  value={formData.userData.isSuspended}
                  onChange={handleChange}
                >
                  <MenuItem key={"false"} value={false}>
                    No
                  </MenuItem>
                  <MenuItem key={"true"} value={true}>
                    Yes
                  </MenuItem>
                </Select>
              </FormControl>
            </div>

            {formData.userData.role === ROLE.student ? (
              <>
                <h1>Student Profile</h1>
                <div>
                  <FormControl sx={{ m: "8px", width: "25ch" }}>
                    <TextField
                      id="course"
                      label="Course"
                      variant="outlined"
                      required
                      name="studentData.course"
                      value={formData.studentData.course}
                      onChange={handleChange}
                    />
                  </FormControl>

                  <FormControl sx={{ m: "8px", width: "25ch" }}>
                    <TextField
                      id="outstandingFee"
                      label="Outstanding Fee"
                      variant="outlined"
                      type="number"
                      required
                      name="studentData.outstandingFee"
                      value={formData.studentData.outstandingFee}
                      onChange={handleChange}
                    />
                  </FormControl>
                </div>

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
                    {formData.studentData.enrollments.map((el, index) => {
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
              </>
            ) : (
              <></>
            )}

            <div style={{ marginTop: "36px" }}>
              {isEditSession ? (
                <Button
                  disabled={isWorking}
                  variant="contained"
                  size="large"
                  color="secondary"
                  sx={{ marginRight: "8px" }}
                  onClick={() => deleteUser(id)}
                >
                  Delete User
                </Button>
              ) : (
                <></>
              )}

              <Button
                disabled={isWorking}
                variant="contained"
                size="large"
                type="submit"
              >
                {isEditSession ? "Update User" : "Create New User"}
              </Button>
            </div>
          </form>
        </Paper>
      </div>
    </>
  );
};

export default UserForm;
