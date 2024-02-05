import styled, { css } from "styled-components";
import React, { useState } from "react";

import {
  OutlinedInput,
  Select,
  MenuItem,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  AddCircleOutline,
} from "@mui/icons-material";
import { getCapitalize } from "../utils/helpers";

export const InputContainer = styled.div`
  text-align: left;
  padding: 0;
  margin-bottom: 8px;
`;

export const InputLabel = styled.p`
  font-size: 16px;
  margin: 0 0 8px 0;

  ${({ light }) =>
    light &&
    css`
      color: var(--color-white);
    `}
`;

const TextArea = styled.textarea`
  width: 100%;
  box-sizing: border-box;
  border: 2px solid black;
  border-radius: 8px;
  background-color: white;
  padding: 10px 12px;
  font-family: inherit;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.5px;

  &:focus {
    border-color: var(--color-primary);
    outline: none;
  }
`;

export const Input = ({
  label,
  light,
  containerProps,
  labelProps,
  sx,
  ...remainingProps
}) => {
  return (
    <>
      <InputContainer {...containerProps}>
        <InputLabel light={light} {...labelProps}>
          {label}
        </InputLabel>
        <OutlinedInput
          sx={{
            borderRadius: "8px",
            backgroundColor: "white",
            height: "48px",
            width: "100%",
            "& .MuiOutlinedInput-notchedOutline": {
              border: "2px solid black",
            },
            "&.Mui-focused": {
              "& .MuiOutlinedInput-notchedOutline": {
                border: `2px solid ${
                  light ? "var(--color-primary-darker)" : "var(--color-primary)"
                }`,
              },
            },
            ...sx,
          }}
          margin="none"
          fullWidth
          // inputLabelProps={{ shrink: false }}
          {...remainingProps}
        />
      </InputContainer>
    </>
  );
};

export const PasswordInput = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Input
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={() => setShowPassword((show) => !show)}
              onMouseDown={(event) => event.preventDefault()}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        {...props}
      />
    </>
  );
};

export const AddInput = ({ handleAdd, ...remainingProps }) => {
  return (
    <>
      <Input
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              size="large"
              onClick={handleAdd}
              onMouseDown={(event) => event.preventDefault()}
            >
              <AddCircleOutline sx={{ color: "black" }} fontSize="40" />
            </IconButton>
          </InputAdornment>
        }
        {...remainingProps}
      />
    </>
  );
};

export const SelectInput = ({
  options,
  light,
  label,
  capitalizeOption,
  containerProps,
  labelProps,
  sx,
  ...remainingProps
}) => {
  return (
    <InputContainer {...containerProps}>
      <InputLabel light={light} {...labelProps}>
        {label}
      </InputLabel>
      <Select
        sx={{
          borderRadius: "8px",
          backgroundColor: "white",
          height: "48px",
          width: "100%",
          "& .MuiOutlinedInput-notchedOutline": {
            border: "2px solid black",
          },
          "&.Mui-focused": {
            "& .MuiOutlinedInput-notchedOutline": {
              border: `2px solid ${
                light ? "var(--color-primary-darker)" : "var(--color-primary)"
              }`,
            },
          },
          ...sx,
        }}
        {...remainingProps}
      >
        {options?.map((el, i) => (
          <MenuItem key={i} value={el}>
            {capitalizeOption ? getCapitalize(el) : el}
          </MenuItem>
        ))}
      </Select>
    </InputContainer>
  );
};

export const TextAreaInput = ({
  label,
  light,
  containerProps,
  labelProps,
  ...remainingProps
}) => {
  return (
    <InputContainer {...containerProps}>
      <InputLabel light={light} {...labelProps}>
        {label}
      </InputLabel>
      <TextArea rows="10" {...remainingProps} />
    </InputContainer>
  );
};
