import React, { useState, useContext } from "react";
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
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { toast } from "react-toastify";

import { AuthContext } from "../contexts";
import Toast from "./Toast";

const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (event) => {
    setLoginData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    // Prevent page reload
    event.preventDefault();

    try {
      await login(loginData);

      navigate("/", { replace: true });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <Toast />
      <div className="form-page">
        <Paper className="paper" sx={{ minWidth: 325, minHeight: 400 }}>
          <form className="login-form" name="loginForm" onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div>
              <FormControl sx={{ width: "25ch" }} margin="normal">
                <TextField
                  id="username"
                  name="username"
                  label="Username"
                  variant="outlined"
                  value={loginData.username}
                  onChange={handleChange}
                  required
                />
              </FormControl>
            </div>

            <div>
              <FormControl sx={{ width: "25ch" }} margin="normal">
                <InputLabel htmlFor="password" required>
                  Password
                </InputLabel>
                <OutlinedInput
                  id="password"
                  name="password"
                  label="Password"
                  value={loginData.password}
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

            <div style={{ marginTop: "12px" }}>
              <Button variant="contained" size="large" type="submit">
                Login
              </Button>
            </div>
          </form>
        </Paper>
      </div>
    </>
  );
};

export default LoginForm;
