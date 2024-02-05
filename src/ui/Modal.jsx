import React, { useEffect, useRef } from "react";
import styled from "styled-components";

import { IconButton } from "@mui/material";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "../ui/Button";
import { Heading } from "../ui/Typography";

const Dialog = styled.dialog`
  border: none;
  padding: 0;
  background-color: transparent;
  transition: 0.3s;
`;

const DialogBackdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  /* background: #252424cc; */
  height: 100%;
  width: 100vw;
  z-index: 50;
`;

const ConfirmModalContainer = styled.div`
  border-radius: 10px;
  background-color: white;
  padding: 20px;
  text-align: center;
  align-items: center;
  display: flex;
  justify-content: center;
  max-width: 800px;
`;

export const Modal = ({ openModal, closeModal, children }) => {
  const ref = useRef();

  useEffect(() => {
    if (openModal) {
      document.body.style.overflow = "hidden";
      ref.current?.showModal(); // Shows the dialog and makes it the top-most modal dialog
    } else {
      document.body.style.overflow = null;
      ref.current?.close();
    }
  }, [openModal]);

  return (
    <>
      {openModal && <DialogBackdrop />}
      <Dialog
        ref={ref}
        onCancel={closeModal}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </Dialog>
    </>
  );
};

export const ConfirmModal = ({
  handleConfirm,
  openModal,
  closeModal,
  title,
  subtitle,
  confirmLabel,
  cancelLabel,
}) => {
  return (
    <>
      <Modal openModal={openModal}>
        <ConfirmModalContainer>
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
                {title}
              </Heading>

              <Heading as="h3" style={{ marginBottom: "20px" }}>
                {subtitle}
              </Heading>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <Button
                type="button"
                outlined="true"
                onClick={handleConfirm}
                style={{ marginRight: "20px", width: "280px", height: "46px" }}
              >
                {confirmLabel}
              </Button>
              <Button
                type="button"
                primary="true"
                onClick={closeModal}
                style={{ width: "280px", height: "46px" }}
              >
                {cancelLabel}
              </Button>
            </div>
          </div>
        </ConfirmModalContainer>
      </Modal>
    </>
  );
};
