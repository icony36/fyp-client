import styled, { css } from "styled-components";

export const Heading = styled.h1`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: pre-wrap;

  ${(props) =>
    props.as === "h1" &&
    css`
      font-family: "Playfair Display";
      font-size: 35px;
      font-weight: bold;
      margin: 8px 0;
      color: var(--color-primary);
    `}
  ${(props) =>
    props.as === "h2" &&
    css`
      font-family: "Playfair Display";
      font-size: 25px;
      font-weight: 500;
      margin: 8px 0;
    `}
    ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 17px;
      font-weight: 400;
      margin: 8px 0;
    `}
    ${(props) =>
    props.as === "h4" &&
    css`
      font-size: 16px;
      font-weight: 400;
      margin: 8px 0;
    `}
    ${(props) =>
    props.as === "h5" &&
    css`
      font-size: 15px;
      font-weight: 400;
      margin: 8px 0;
    `}
    ${(props) =>
    props.as === "h6" &&
    css`
      font-size: 12px;
      font-weight: 400;
      margin: 8px 0;
    `};

  ${({ light }) =>
    light &&
    css`
      color: white;
    `}
`;
