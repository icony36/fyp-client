import styled, { keyframes } from "styled-components";

const dotAnimation = keyframes`
   0% {
    box-shadow: 9984px 0 0 0 var(--color-light-grey), 9999px 0 0 0 var(--color-light-grey), 10014px 0 0 0 var(--color-light-grey);
  }
  16.667% {
    box-shadow: 9984px -10px 0 0 var(--color-light-grey), 9999px 0 0 0 var(--color-light-grey), 10014px 0 0 0 var(--color-light-grey);
  }
  33.333% {
    box-shadow: 9984px 0 0 0 var(--color-light-grey), 9999px 0 0 0 var(--color-light-grey), 10014px 0 0 0 var(--color-light-grey);
  }
  50% {
    box-shadow: 9984px 0 0 0 var(--color-light-grey), 9999px -10px 0 0 var(--color-light-grey), 10014px 0 0 0 var(--color-light-grey);
  }
  66.667% {
    box-shadow: 9984px 0 0 0 var(--color-light-grey), 9999px 0 0 0 var(--color-light-grey), 10014px 0 0 0 var(--color-light-grey);
  }
  83.333% {
    box-shadow: 9984px 0 0 0 var(--color-light-grey), 9999px 0 0 0 var(--color-light-grey), 10014px -10px 0 0 var(--color-light-grey);
  }
  100% {
    box-shadow: 9984px 0 0 0 var(--color-light-grey), 9999px 0 0 0 var(--color-light-grey), 10014px 0 0 0 var(--color-light-grey);
  }
`;

const DotTyping = styled.div`
  position: relative;
  left: -9999px;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: var(--color-light-grey);
  color: var(--color-light-grey);
  box-shadow: 9984px 0 0 0 var(--color-light-grey),
    9999px 0 0 0 var(--color-light-grey), 10014px 0 0 0 var(--color-light-grey);
  animation-name: ${dotAnimation};
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
`;

export const LoadingTyping = ({ ...remainingProps }) => {
  return (
    <>
      <DotTyping {...remainingProps} />
    </>
  );
};
