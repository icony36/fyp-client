import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Icon, IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import CloseIcon from "@mui/icons-material/Close";
import { Heading } from "../ui/Typography";
import { HeadingContainer } from "../ui/HeadingContainer";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";

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

const BackModalContainer = styled.div`
  border-radius: 10px;
  background-color: white;
  padding: 20px;
  text-align: center;
  align-items: center;
  display: flex;
  justify-content: center;
  max-width: 800px;
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
      <BackModal
        openModal={openModal}
        handleBack={handleBack}
        closeModal={() => setOpenModal(false)}
      />
    </>
  );
};

export default HeadingBar;

export const BackModal = ({ handleBack, openModal, closeModal }) => {
  return (
    <>
      <Modal openModal={openModal}>
        <BackModalContainer>
          <div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <IconButton onClick={closeModal}>
                <CloseIcon
                  sx={{ color: "black", width: "40px", height: "40px" }}
                />
              </IconButton>
            </div>

            <div style={{ padding: "0 40px 40px 40px" }}>
              <ErrorOutlineRoundedIcon
                sx={{
                  height: "100px",
                  width: "100px",
                  color: "var(--color-red)",
                  marginBottom: "20px",
                }}
              />

              <Heading as="h1" style={{ color: "black", marginBottom: "20px" }}>
                Leave Without Saving?
              </Heading>

              <Heading as="h3" style={{ marginBottom: "20px" }}>
                Are you sure you want to leave? Any unsaved changes will be
                lost. Click 'Stay' to continue editing, or 'Leave' to discard
                changes.
              </Heading>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <Button
                type="button"
                outlined="true"
                onClick={handleBack}
                style={{ marginRight: "20px", width: "280px", height: "46px" }}
              >
                Leave
              </Button>
              <Button
                type="button"
                primary="true"
                onClick={closeModal}
                style={{ width: "280px", height: "46px" }}
              >
                Stay
              </Button>
            </div>
          </div>
        </BackModalContainer>
      </Modal>
    </>
  );
};
