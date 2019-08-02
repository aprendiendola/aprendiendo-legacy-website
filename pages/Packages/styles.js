import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import { Label } from 'components';
import planLeftShape from 'assets/images/plan-left-shape.svg';
import planRightShape from 'assets/images/plan-right-shape.svg';
import bkgShape from 'assets/images/bkg-shape.svg';

const LeftShape = styled.div`
  background-image: url(${planLeftShape});
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
  width: 500px;
  height: 500px;
  position: absolute;
  left: -300px;
  bottom: 0;
  display: none;
  ${breakpoint('sm')`
    display: block;
  `}
`;

const RightShape = styled.div`
  background-image: url(${planRightShape});
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
  width: 500px;
  height: 600px;
  position: absolute;
  right: -275px;
  top: 0;
  display: none;
  ${breakpoint('sm')`
    display: block;
  `}
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 40px;
`;

const PriceTitle = styled(props => <Label {...props} />)`
  font-size: 38px;
  max-width: 307px;
  font-weight: 900;
  color: #414042;
  display: block;
`;
const PriceSubtitle = styled(props => <Label {...props} />)`
  font-size: 18px;
  margin-bottom: 10px;
  max-width: 307px;
  font-weight: 900;
  color: #626262;
`;

const Container = styled.div`
  text-align: center;
`;

const BenefitList = styled.ul`
  text-align: left;
  list-style: none;
  margin: 0 0 12px 0;
  li {
    color: #626262;
    line-height: 26px;
  }
`;

const BlueCheck = styled.img`
  width: 12px;
  margin-right: 8px;
`;

const SubscriptionText = styled(props => <Label {...props} />)`
  font-size: 16px;
  ${breakpoint('md')`
    font-size: 20px;
  `}
`;

const HidePlanOnMobile = styled.div`
  display: none;
  ${breakpoint('sm')`
    display: block;
  `}
`;

const ShowTabPlanOnMobile = styled.div`
  display: flex;
  flex-direction: column;
  width: 260px;
  ${breakpoint('sm')`
    display: none;
  `}
`;

const TabHeader = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const Tab = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #d0d2d3;
  border-bottom: ${({ isActive }) => (isActive ? 'initial' : '1px solid #d0d2d3')};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  width: 100%;
  max-width: 160px;
  height: 50px;
  cursor: pointer;
  ${({ isHighlight }) =>
    isHighlight &&
    `
    background-image: url(${bkgShape});
    background-position-x: 143px;
  `}
`;

export {
  LeftShape,
  RightShape,
  Header,
  PriceTitle,
  Container,
  PriceSubtitle,
  BenefitList,
  BlueCheck,
  SubscriptionText,
  HidePlanOnMobile,
  ShowTabPlanOnMobile,
  TabHeader,
  Tab
};
