import React from 'react';
import styled, { keyframes } from 'styled-components';

const dash = keyframes`
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const resolveStrokeColor = ({ theme, color }) => {
  if (color) return color;
  return theme.color.primary;
};

const StyledCircle = styled.circle`
  stroke: ${resolveStrokeColor};
  stroke-linecap: round;
  animation: ${dash} 1.5s ease-in-out infinite;
`;

const StyledSpinner = styled.svg`
  animation: ${rotate} 2s linear infinite;
  width: 24px;
  height: 24px;
`;

const Spinner = props => (
  <StyledSpinner className={props.className} viewBox="0 0 24 24">
    <StyledCircle color={props.color} cx="12" cy="12" r="10" fill="none" strokeWidth="2" />
  </StyledSpinner>
);

export default Spinner;
