import React from "react";
import styled, { css } from "styled-components";
import { IconButton, Stack } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

export const ColorChip = styled.div`
  border-radius: 20px;
  width: 80px;
  height: 21px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  margin-bottom: 8px;
`;

export const OutlinedChip = styled.div`
  border-radius: 8px;
  padding: 6px 12px;
  display: flex;
  width: max-content;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 1.5px;
  background-color: white;
  border: 2px solid var(--color-primary);
  color: var(--color-primary);
  text-transform: uppercase;
  margin-bottom: 8px;
  flex: 0 0 auto;
`;

export const ContentChip = styled.div`
  border-radius: 40px;
  padding: 6px 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 1.5px;
  background-color: white;
  border: 2px solid var(--color-primary);
  color: var(--color-primary);
  text-transform: uppercase;
  margin-bottom: 8px;
`;

export const ChipWithDelete = ({ onDelete, label, ...remainingProps }) => {
  return (
    <ContentChip {...remainingProps}>
      {label}
      <IconButton
        sx={{ padding: "0px" }}
        onClick={onDelete}
        onMouseDown={(event) => event.preventDefault()}
      >
        <HighlightOffIcon
          sx={{
            width: "34px",
            height: "32px",
            color: "var(--color-primary)",
          }}
        />
      </IconButton>
    </ContentChip>
  );
};

export const ChipStack = ({ sx, children, ...remainingProps }) => {
  return (
    <Stack
      sx={{ width: "auto", ...sx }}
      direction="row"
      useFlexGap
      flexWrap="wrap"
      {...remainingProps}
    >
      {children}
    </Stack>
  );
};
