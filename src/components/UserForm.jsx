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

const roles = Object.values(ROLE);

const UserForm = ({ isEdit }) => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    role: "",
    name: "",
    isSuspended: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    if (isEdit) {
      handleFetchData();
    }
  }, []);

  const handleFetchData = async () => {
    try {
      const res = await fetchUser(id);

      setUserData({
        username: res.data.username,
        role: res.data.role,
        name: res.data.name,
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
      handleCreateUser(userData);
    } else {
      handleUpdateUser(userData);
    }
  };

  const handleCreateUser = async (userData) => {
    try {
      const res = await createUser(userData);

      toast.success(res.message);
    } catch (err) {
      toast.error(err.messsage);
    }
  };

  const handleUpdateUser = async (userData) => {
    try {
      const res = await updateUser(id, userData);

      toast.success(res.message);
    } catch (err) {
      toast.error(err.messsage);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="form-page">
      <Paper className="paper" sx={{ minWidth: 700, minHeight: 300 }}>
        <form
          className="register-form"
          name="registerForm"
          onSubmit={handleSubmit}
        >
          <h1>Create User</h1>
          <div>
            <FormControl sx={{ m: "8px", width: "25ch" }}>
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

            <FormControl sx={{ m: "8px", width: "25ch" }}>
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
            <FormControl sx={{ m: "8px", width: "25ch" }}>
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

            <FormControl sx={{ m: "8px", width: "25ch" }}>
              <TextField
                id="name"
                name="name"
                label="Name"
                variant="outlined"
                value={userData.name}
                onChange={handleChange}
                required
              />
            </FormControl>
          </div>

          <div style={{ marginTop: "12px" }}>
            <Button variant="contained" size="large" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Paper>
    </div>
  );
};

export default UserForm;
