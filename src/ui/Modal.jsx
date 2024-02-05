import React, { useEffect, useRef } from "react";
import styled from "styled-components";

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
