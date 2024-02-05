import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import { Heading } from "../ui/Typography";
import { HeadingContainer } from "../ui/HeadingContainer";
import { ConfirmModal } from "../ui/Modal";

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

const HeadingBar = ({ style, children, title, backLink, checkBack }) => {
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);

  const handleBack = () => {
    navigate(backLink);
  };

  return (
    <>
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
              onClick={checkBack ? () => setOpenModal(true) : handleBack}
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
      <ConfirmModal
        openModal={openModal}
        handleConfirm={handleBack}
        closeModal={() => setOpenModal(false)}
        title="Leave Without Saving?"
        subtitle=" Are you sure you want to leave? Any unsaved changes will be
        lost. Click 'Stay' to continue editing, or 'Leave' to discard
        changes."
        confirmLabel="Leave"
        cancelLabel="Stay"
      />
    </>
  );
};

export default HeadingBar;
