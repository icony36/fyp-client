import { Dialog } from "@mui/material";
import React from "react";
import { CardContainer, CardSubtitleContainer } from "./Card";

export const Modal = ({ handleClose }) => {
  return (
    <div>
      <CardContainer>
        <CardSubtitleContainer></CardSubtitleContainer>
      </CardContainer>
    </div>
  );
};
