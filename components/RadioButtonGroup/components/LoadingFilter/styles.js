import styled, { keyframes } from 'styled-components';

const Container = styled.div`
  display: flex;
  width: 235px;
  flex-direction: column;
`;

const pulseOpacity = keyframes`
  50% { opacity: .5; }
`;

const Line = styled.span`
  display: flex;
  width: ${({ width }) => width || '50%'};
  height: ${({ height }) => height || '20px'};
  margin-bottom ${({ marginBottom }) => marginBottom || '2px'};
  background: #eee;
  animation: ${pulseOpacity} 1s infinite;
  animation-timing-function: ease-in-out;
`;

export {
  Container,
  Line
};
