import styled, { css } from "styled-components";

export const ProfileImage = styled.div`
  border-radius: 50%;
  background-color: var(--color-orange);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  min-width: 48px;
  margin-right: 12px;

  ${({ size }) =>
    size &&
    css`
      height: ${size};
      width: ${size};
    `}

  ${({ primary }) =>
    primary &&
    css`
      background-color: var(--color-primary);
    `}
`;
