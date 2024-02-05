import styled, { css } from "styled-components";

import React from "react";

import { IconButton } from "@mui/material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

export const Button = styled.button`
  min-width: 180px;
  padding: 14px 16px;
  font-size: 14px;
  text-transform: uppercase;
  border-radius: 40px;
  border: 2px solid rgba(0, 0, 0, 0);
  cursor: pointer;
  transition: 0.3s;
  user-select: none;
  -moz-user-select: none;

  ${({ small }) =>
    small &&
    css`
      min-width: 72px;
    `}

  ${({ medium }) =>
    medium &&
    css`
      min-width: 108px;
    `}

  ${({ condensed }) =>
    condensed &&
    css`
      padding: 10px 12px;
      font-size: 15px;
      min-width: 120px;
    `}

  ${({ simple }) =>
    simple &&
    css`
      min-width: 80px;
      padding: 8px 14px;
      font-size: 15px;
      background-color: transparent;
      border-color: transparent;
      font-weight: 600;
      &:hover {
        background-color: var(--color-grey-lightest);
      }
    `}

  ${({ primary }) =>
    primary &&
    css`
      background-color: var(--color-primary);
      color: var(--color-white);
      &:hover {
        background-color: transparent;
        color: var(--color-primary);
        border: 2px solid var(--color-primary);
      }
    `}
  
    ${({ outlined }) =>
    outlined &&
    css`
      background-color: transparent;
      border: 2px solid var(--color-primary);
      color: var(--color-primary);
      &:hover {
        background-color: var(--color-primary);
        color: var(--color-white);
      }
    `}

  ${({ light }) =>
    light &&
    css`
      background-color: var(--color-white);
      color: var(--color-primary);
      &:hover {
        background-color: var(--color-primary);
        color: var(--color-white);
        border: 2px solid var(--color-white);
      }
    `}
`;

export const CancelButton = (props) => {
  const reload = (event) => {
    event.preventDefault();

    window.location.reload();
  };

  return (
    <Button
      type="button"
      outlined="true"
      style={{ marginLeft: "16px" }}
      onClick={reload}
      {...props}
    >
      Cancel
    </Button>
  );
};

export const FilterButton = ({ onClick, style, ...remainingProps }) => {
  return (
    <>
      <IconButton
        sx={{
          color: "var(--color-primary)",
          border: "2px solid var(--color-primary)",
          ...style,
        }}
        onClick={onClick}
        {...remainingProps}
      >
        <FilterAltOutlinedIcon sx={{ height: "30px", width: "30px" }} />
      </IconButton>
    </>
  );
};
