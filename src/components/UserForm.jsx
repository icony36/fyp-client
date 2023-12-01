import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

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
  Slider,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { toast } from "react-toastify";

import { createUser, updateUser, fetchUser } from "../services/user";
import { ROLE } from "../constants";
import Toast from "../components/Toast";

const roles = Object.values(ROLE);

const UserForm = ({ isEdit }) => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    role: "",
    firstName: "",
    lastName: "",
    isSuspended: false,
  });

  const [studentData, setStudentData] = useState({
    course: "",
    enrollments: [],
    outstandingFee: 0,
    studentId: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const { id } = useParams();

  const navigate = useNavigate();

  // useEffect(() => {
  //   if (isEdit) {
  //     handleFetchData();
  //   }
  // }, []);

  const handleFetchData = async () => {
    try {
      const res = await fetchUser(id);

      setUserData({
        username: res.data.username,
        role: res.data.role,
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        isSuspended: res.data.isSuspended,
      });
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleChange = (event) => {
    setUserData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    // Prevent page reload
    event.preventDefault();

    if (isEdit) {
      handleUpdateUser(userData);

      if (userData.role === ROLE.student) {
        handleUpdateStudent(studentData);
      }
    } else {
      handleCreateUser(userData);

      if (userData.role === ROLE.student) {
        handleCreateStudent(studentData);
      }
    }
  };

  const handleCreateUser = async (userData) => {
    try {
      const res = await createUser(userData);

      toast.success(res.message);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleCreateStudent = async (studentData) => {
    try {
      // create student profile
    } catch (err) {
      toast.error(err);
    }
  };

  const handleUpdateUser = async (userData) => {
    try {
      const res = await updateUser(id, userData);

      toast.success(res.message);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleUpdateStudent = async (studentData) => {
    try {
      // update student profile
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <>
      <Toast />
      <div className="form-page">
        <Paper className="paper" sx={{ minWidth: 700, minHeight: 300 }}>
          <form
            className="register-form"
            name="registerForm"
            onSubmit={handleSubmit}
          >
            <h1>Create User</h1>
            <div>
              <FormControl sx={{ m: "8px", width: "52ch" }}>
                <TextField
                  id="username"
                  name="username"
                  label="Username"
                  variant="outlined"
                  value={userData.username}
                  onChange={handleChange}
                  required
                />
              </FormControl>
            </div>

            <div>
              <FormControl sx={{ m: "8px", width: "52ch" }}>
                <InputLabel htmlFor="password" required>
                  Password
                </InputLabel>
                <OutlinedInput
                  id="password"
                  name="password"
                  label="Password"
                  value={userData.password}
                  type={showPassword ? "text" : "password"}
                  onChange={handleChange}
                  required
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
                <InputLabel htmlFor="role" required>
                  Role
                </InputLabel>
                <Select
                  id="role"
                  name="role"
                  label="role"
                  onChange={handleChange}
                  value={userData.role}
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
            </div>

            <div>
              <FormControl sx={{ m: "8px", width: "25ch" }}>
                <TextField
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  variant="outlined"
                  value={userData.firstName}
                  onChange={handleChange}
                  required
                />
              </FormControl>

              <FormControl sx={{ m: "8px", width: "25ch" }}>
                <TextField
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  variant="outlined"
                  value={userData.lastName}
                  onChange={handleChange}
                  required
                />
              </FormControl>
            </div>

            {userData.role === ROLE.student ? (
              <>
                <h1>Student Profile Form</h1>
              </>
            ) : (
              <></>
            )}

            <div style={{ marginTop: "12px" }}>
              <Button variant="contained" size="large" type="submit">
                Submit
              </Button>
            </div>
          </form>
        </Paper>
      </div>
    </>
  );
};

export default UserForm;
