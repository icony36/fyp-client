import React from "react";
import styled from "styled-components";

export const PaperContainer = styled.div`
  border-radius: 10px;
  background-color: white;
  min-width: 640px;
  border: 2px solid var(--color-light-grey);
  margin-bottom: 10px;
`;

export const TitleContainer = styled.div`
  font-family: "Playfair Display";
  font-weight: 600;
  font-size: 25px;
  border-bottom: 2px solid var(--color-light-grey);
  padding: 20px;
`;

export const ContentContainer = styled.div`
  padding: 20px;
`;

const Paper = ({ children, title }) => {
  return (
    <PaperContainer>
      {title && <TitleContainer>{title}</TitleContainer>}
      <ContentContainer>{children}</ContentContainer>
    </PaperContainer>
  );
};

export default Paper;
