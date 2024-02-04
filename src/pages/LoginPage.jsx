import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

import styled from "styled-components";
import LandingImage from "../images/landing.png";
import Logo from "../images/logo.png";
import { Heading } from "../ui/Typography";

import { AuthContext } from "../contexts";
import LoginForm from "../features/auths/LoginForm";
import { useToast } from "../hooks/useToast";

const LoginContainer = styled.div`
  display: flex;
  align-items: stretch;
  height: 100vh;
`;

const HeroContainer = styled.div`
  flex: 1.2;
  align-items: center;
  justify-content: center;
  display: flex;
  background-color: white;
`;

const FormContainer = styled.div`
  background-color: var(--color-primary);
  flex: 1;
  align-items: center;
  justify-content: center;
  display: flex;
`;

const LogoImage = styled.img`
  position: absolute;
  top: 12px;
  left: 40px;
`;

const LoginPage = () => {
  const { auth } = useContext(AuthContext);

  const { Toast } = useToast();

  return auth.isAuth ? (
    <Navigate to="/" />
  ) : (
    <>
      <Toast />
      <LoginContainer>
        <HeroContainer>
          <div style={{ textAlign: "center", maxWidth: "540px" }}>
            <LogoImage src={Logo} alt="chatbot logo" />
            <img
              style={{ marginBottom: "20x" }}
              src={LandingImage}
              alt="chatbot"
            />
            <Heading as="h2" style={{ marginBottom: "20px" }}>
              UniBot - the future of student support
            </Heading>
            <Heading as="h4" style={{ marginBottom: "20px" }}>
              Explore a world of personalized assistance, 24/7 availability, and
              streamlined interactions.
            </Heading>
            <Heading
              as="p"
              style={{
                fontSize: "12px",
                fontStyle: "italic",
              }}
            >
              *By continuing to use our services, you consent to the collection
              and utilization of your information in accordance with the
              Personal Data Protection Act (PDPA)
            </Heading>
          </div>
        </HeroContainer>

        <FormContainer>
          <LoginForm />
        </FormContainer>
      </LoginContainer>
    </>
  );
};

export default LoginPage;
