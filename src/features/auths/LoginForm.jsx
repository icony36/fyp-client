import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Input, PasswordInput } from "../../ui/Input";
import { Heading } from "../../ui/Typography";
import { Button } from "../../ui/Button";

import { AuthContext } from "../../contexts";
import { useToast } from "../../hooks/useToast";

const LoginForm = () => {
  const navigate = useNavigate();

  const { toast } = useToast();

  const { login } = useContext(AuthContext);

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

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
      <div className="form-page">
        <form className="login-form" name="loginForm" onSubmit={handleSubmit}>
          <div style={{ marginBottom: "60px", textAlign: "center" }}>
            <Heading light as="h1">
              Welcome Back
            </Heading>
            <Heading light as="h4">
              Sign in to your account
            </Heading>
          </div>

          <div style={{ marginBottom: "24px" }}>
            <Input
              sx={{ width: "470px" }}
              light
              label="Username *"
              id="username"
              name="username"
              value={loginData.username}
              onChange={handleChange}
              required
            />

            <PasswordInput
              sx={{ width: "470px" }}
              light
              id="password"
              name="password"
              label="Password *"
              value={loginData.password}
              onChange={handleChange}
              required
            />
          </div>

          <Button light type="submit">
            Login
          </Button>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
