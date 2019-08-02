import styled, { keyframes } from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const CardContainer = styled.div`
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.24);
  border: 1px solid #ccc;
  height: 161px;
  width: 290px;
  border-radius:10px;
  margin: 15px;
  ${breakpoint('sm')`
    width: 290px;
    height: 208px;
  `};
  ${breakpoint('lg')`
    width: 260px;
    height: 208px;
  `};
`;

const pulseOpacity = keyframes`
  50% { opacity: .5; }
`;

const ImgCard = styled.span`
  display: block;
  width: 100%;
  height: 88px;
  background: #eee;
  animation: ${pulseOpacity} 1s infinite;
  animation-timing-function: ease-in-out;
  ${breakpoint('sm')`
    height: 118px;
  `};
`;

const ContentContainer = styled.div`
  display: flex;
  padding: 10px 10px 5px;
  height: 71px;
  flex-direction: column;
  ${breakpoint('sm')`
    height: 80px;
  `};
`;

const Line = styled.span`
  display: flex;
  width: ${({ width }) => width || '50%'};
  height: ${({ height }) => height || '20px'};
  margin-bottom ${({ marginBottom }) => marginBottom || 'initial'};
  background: #eee;
  animation: ${pulseOpacity} 1s infinite;
  animation-timing-function: ease-in-out;
  ${breakpoint('sm')`
    align-self: ${({ alignSelf }) => alignSelf || 'initial'};
  `};
`;

const RatingPriceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  ${breakpoint('sm')`
    flex-direction: column;
  `};
`;

export {
  Container,
  CardContainer,
  ImgCard,
  ContentContainer,
  Line,
  RatingPriceContainer
};
