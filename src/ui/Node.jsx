import styled, { css } from "styled-components";

export const NodeContainer = styled.div`
  border: 2px solid black;
  border-radius: 10px;
  padding: 20px;
  background-color: white;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }

  ${({ selected }) =>
    selected &&
    css`
      border-color: var(--color-primary);
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    `}
`;
