import React, { useState, useContext, useEffect } from "react";

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

import { AuthContext } from "../../contexts";
import { useFetchProfile } from "./useFetchProfile";
import { useEditProfile } from "./useEditProfile";

const ProfileEditForm = () => {
  const { auth } = useContext(AuthContext);

  const { profile, isFetching, profileStatus } = useFetchProfile({
    id: auth.id,
  });

  const { editProfile, isEditing } = useEditProfile();

  const isWorking = isFetching || isEditing;

  const [profileData, setProfileData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (profileStatus === "success") {
      setProfileData((prevState) => ({
        ...prevState,
        username: profile?.data?.username,
        firstName: profile?.data?.firstName,
        lastName: profile?.data?.lastName,
        email: profile?.data?.email,
      }));
    }
  }, [profile, profileStatus]);

  const handleChange = (event) => {
    setProfileData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const toSubmit = {
      ...profileData,
    };

    if (!toSubmit.password) {
      delete toSubmit.password;
    }

    editProfile({ profileData: toSubmit, id: auth.id });
  };

  return (
    <>
      <div className="form-page">
        <Paper className="paper" sx={{ minWidth: 325, minHeight: 400 }}>
          <form className="login-form" name="loginForm" onSubmit={handleSubmit}>
            <h1>Edit Profile</h1>
            <div>
              <FormControl sx={{ width: "25ch" }} margin="normal">
                <TextField
                  id="username"
                  name="username"
                  label="Username"
                  variant="outlined"
                  value={profileData.username}
                  onChange={handleChange}
                  required
                />
              </FormControl>

              <FormControl sx={{ width: "25ch" }} margin="normal">
                <InputLabel htmlFor="password" required>
                  Password
                </InputLabel>
                <OutlinedInput
                  id="password"
                  name="password"
                  label="Password"
                  value={profileData.password}
                  type={showPassword ? "text" : "password"}
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
              <FormControl sx={{ width: "25ch" }} margin="normal">
                <TextField
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  variant="outlined"
                  value={profileData.firstName}
                  onChange={handleChange}
                  required
                />
              </FormControl>

              <FormControl sx={{ width: "25ch" }} margin="normal">
                <TextField
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  variant="outlined"
                  value={profileData.lastName}
                  onChange={handleChange}
                  required
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
                  name="email"
                  value={profileData.email}
                  onChange={handleChange}
                />
              </FormControl>
            </div>

            <div style={{ marginTop: "12px" }}>
              <Button
                disabled={isWorking}
                variant="contained"
                size="large"
                type="submit"
              >
                Update
              </Button>
            </div>
          </form>
        </Paper>
      </div>
    </>
  );
};

export default ProfileEditForm;
