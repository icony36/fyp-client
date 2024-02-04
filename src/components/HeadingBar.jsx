import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Heading } from "../ui/Typography";
import { HeadingContainer } from "../ui/HeadingContainer";

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 8;
`;

const ActionContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 2;
  justify-content: flex-end;
`;

const HeadingBar = ({ style, children, title, backLink }) => {
  const navigate = useNavigate();

  return (
    <HeadingContainer style={style}>
      <TitleContainer>
        {backLink ? (
          <IconButton
            sx={{
              backgroundColor: "transparent",
              border: "2px solid var(--color-primary)",
              color: "var(--color-primary)",
              marginRight: "20px",
            }}
            onClick={() => navigate(backLink)}
            size="large"
          >
            <ArrowBackIosNewIcon />
          </IconButton>
        ) : (
          <></>
        )}
        <Heading as="h1">{title}</Heading>
      </TitleContainer>
      <ActionContainer>{children}</ActionContainer>
    </HeadingContainer>
  );
};

export default HeadingBar;
