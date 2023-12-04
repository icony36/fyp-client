import React from "react";

import { Typography, Container } from "@mui/material";

import { useToast } from "../hooks/useToast";

const NotFoundPage = () => {
  const { Toast } = useToast();

  return (
    <>
      <Toast />
      <Container>
        <Typography>404 This page could not be found.</Typography>
      </Container>
    </>
  );
};

export default NotFoundPage;
