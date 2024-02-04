import styled, { css } from "styled-components";

export const Button = styled.button`
  min-width: 180px;
  padding: 14px 16px;
  font-size: 14px;
  text-transform: uppercase;
  border-radius: 40px;
  border: 2px solid rgba(0, 0, 0, 0);
  cursor: pointer;
  transition: 0.3s;

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
