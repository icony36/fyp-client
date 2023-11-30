import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const roles = ["admin", "staff", "student"];

const UserNewPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    // Prevent page reload
    event.preventDefault();

    toast.success(formData);
    toast.error("Error Message Here");
    console.log(formData);
  };

  const navigate = useNavigate();

  return (
    <div className="form-page">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        limit={1}
        newestOnTop={false}
        closeOnClick={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Paper className="paper" sx={{ minWidth: 325, minHeight: 500 }}>
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
                value={formData.username}
                onChange={handleChange}
                required
              />
            </FormControl>
          </div>
          <div>
            <FormControl sx={{ m: "8px", width: "25ch" }}>
              <InputLabel htmlFor="password" required>
                Password
              </InputLabel>
              <OutlinedInput
                id="password"
                name="password"
                label="Password"
                value={formData.password}
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
                value={formData.role}
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

export default UserNewPage;
