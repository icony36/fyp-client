import styled from "styled-components";

export const CardContainer = styled.div`
  border-radius: 10px;
  background-color: white;
  border: 2px solid var(--color-primary);
  margin-bottom: 10px;
  text-overflow: ellipsis;
  height: 310px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const CardTitleContainer = styled.div`
  font-weight: 500;
  font-size: 20px;
  background-color: var(--color-primary);
  color: white;
  padding: 13px 20px;
`;

export const CardSubtitleContainer = styled.div`
  font-family: "Playfair Display";
  font-weight: 600;
  font-size: 28px;
  color: var(--color-primary);
  background-color: var(--color-primary-lightest);
  padding: 10px 20px;
`;

export const CardContentContainer = styled.div`
  padding: 10px 20px;
`;
