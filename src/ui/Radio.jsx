import {
  FormControlLabel,
  RadioGroup,
  Radio as RadioComp,
} from "@mui/material";
import React from "react";

export const Radio = ({
  value,
  onChange,
  options,
  col,
  style,
  radioColor,
  ...remainingProps
}) => {
  return (
    <>
      <RadioGroup
        sx={{ ...style }}
        row={!col}
        value={value}
        onChange={onChange}
        {...remainingProps}
      >
        {options?.map((el, index) => (
          <FormControlLabel
            key={index}
            value={el.value}
            label={el.label}
            control={
              <RadioComp
                sx={{
                  color: radioColor ? radioColor : "var(--color-primary)",
                  "&.Mui-checked": {
                    color: radioColor ? radioColor : "var(--color-primary)",
                  },
                }}
              />
            }
          />
        ))}
      </RadioGroup>
    </>
  );
};
