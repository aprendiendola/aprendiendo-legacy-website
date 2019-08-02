import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import topShape from 'assets/images/top-shape.svg';
import bkgShape from 'assets/images/bkg-shape.svg';

const PlanCardContainer = styled.div`
  display: flex;
  z-index: 1;
  flex-direction: column;
  justify-content: flex-start;
  background-repeat: no-repeat;
  background-size: ${({ backgroundSize }) => backgroundSize || '440px auto'};
  width: 260px;
  background-color: #fff0;
  max-width: 258px;
  position: relative;
  ${({ noStyle }) =>
    !noStyle &&
    `
    box-shadow: 0 3px 20px 0 rgba(0, 0, 0, 0.16);
    margin: 10px 13px;
    border-radius: 10px;
  `}
  ${breakpoint('sm')`
    ${({ isHighlight }) => isHighlight && 'box-shadow: 0 3px 23px 0 rgba(0, 0, 0, 0.43);'}
    background-color: #fff;
    width: 225px;
    max-width: 225px;
  `}
  ${breakpoint('md')`
    background-color: #fff;
    width: 260px;
    max-width: 260px;
  `}
`;

const Header = styled.div`
  display: flex;
  z-index: 1;
  flex-direction: column;
  justify-content: flex-start;
  padding: 20px 15px 0;
  background-size: 100% 354px;
  ${breakpoint('sm')`
  background-size: 100% 332px;
  `}
  ${breakpoint('md')`
  background-size: 100% 360px;
  `}
  ${({ noStyle }) =>
    !noStyle &&
    `
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  `}
  ${({ isHighlight }) =>
    (isHighlight
      ? `
  background-image: url(${bkgShape});
  background-position-y: bottom;
  background-repeat: no-repeat;
  padding-bottom: 45px;
  `
      : '')})
`;

export { PlanCardContainer, Header };
