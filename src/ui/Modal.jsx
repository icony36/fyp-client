import styled from "styled-components";
import React from "react";
import { CardContainer, CardSubtitleContainer } from "./Card";

const Dialog = styled.dialog`
  position: relative;
  max-width: 20rem;
  padding: 2rem;
  border: 0;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem 0.25rem hsl(0 0% 0% / 10%);
`;

export const Modal = ({ handleClose }) => {
  return (
    <Dialog>
      <CardContainer>
        <CardSubtitleContainer>Test</CardSubtitleContainer>
      </CardContainer>
    </Dialog>
  );
};
