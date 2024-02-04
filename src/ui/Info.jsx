import styled from "styled-components";
import { InputLabel, InputContainer } from "./Input";
import { Heading } from "./Typography";

import React from "react";

export const Info = ({
  children,
  label,
  light,
  containerProps,
  labelProps,
}) => {
  return (
    <InputContainer style={{ flex: 1 }} {...containerProps}>
      <InputLabel light={light} {...labelProps}>
        {label}
      </InputLabel>
      <Heading
        style={{ fontWeight: "bold", fontFamily: "inherit", fontSize: "24px" }}
        light={light}
        as="h2"
      >
        {children}
      </Heading>
    </InputContainer>
  );
};
