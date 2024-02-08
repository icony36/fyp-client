import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Input, PasswordInput } from "../../ui/Input";
import { Heading } from "../../ui/Typography";
import { Button } from "../../ui/Button";

import { AuthContext } from "../../contexts";
import { useToast } from "../../hooks/useToast";

const LoginForm = ({ setIsLoading }) => {
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
      setIsLoading(true);
      await login(loginData);
      setIsLoading(false);

      navigate("/", { replace: true });
    } catch (err) {
      setIsLoading(false);
      toast.error(err.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "60px", textAlign: "center" }}>
          <Heading light="true" as="h1">
            Welcome Back
          </Heading>
          <Heading light="true" as="h4">
            Sign in to your account
          </Heading>
        </div>

        <div style={{ marginBottom: "24px" }}>
          <Input
            sx={{ width: "470px" }}
            light="true"
            label="Username *"
            id="username"
            name="username"
            value={loginData.username}
            onChange={handleChange}
            required
          />

          <PasswordInput
            sx={{ width: "470px" }}
            light="true"
            id="password"
            name="password"
            label="Password *"
            value={loginData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ textAlign: "center" }}>
          <Button light="true" type="submit">
            Login
          </Button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
