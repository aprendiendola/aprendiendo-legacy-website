import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import { Label } from 'components';
import bkgShape from 'assets/images/bkg-shape.svg';
import planLeftShape from 'assets/images/plan-left-shape.svg';
import planRightShape from 'assets/images/plan-right-shape.svg';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const MainContent = styled.div`
  margin: auto;
  ${breakpoint('sm')`
    display: flex;
    flex-direction: column;
    width: 100%;
    position: relative;
  `}
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const PlansContainer = styled.div`
  display: none;
  justify-content: center;
  flex-direction: column;
  max-width: 378px;
  width: 100%;
  align-items: flex-end;
  ${breakpoint('sm')`
    flex-direction: row;
    max-width: 860px;
    margin: auto;
  `}
  ${breakpoint('lg')`
    display: flex;
  `}
`;

const ShapeLeft = styled.div`
  display: none;
  position: absolute;
  background-image: url(${planLeftShape});
  background-repeat: no-repeat;
  width: 400px;
  overflow: hidden;
  left: 0;
  bottom: 0;
  background-position-y: 23px;
  background-position-x: -290px;
  background-size: cover;
  height: 485px;
  ${breakpoint('sm')`
    display: flex;
  `}
`;

const ShapeRight = styled.div`
  display: none;
  position: absolute;
  background-image: url(${planRightShape});
  background-repeat: no-repeat;
  width: 400px;
  overflow: hidden;
  right: 0;
  top: 0;
  background-position-y: 0px;
  background-position-x: 160px;
  background-size: cover;
  height: 540px;
  ${breakpoint('sm')`
    display: flex;
  `}
`;

const HidePlanOnMobile = styled.div`
  display: none;
  ${breakpoint('lg')`
    display: flex;
  `}
`;

const ShowTabPlanOnMobile = styled.div`
  display: flex;
  flex-direction: column;
  width: 337px;
  margin: auto;
  ${breakpoint('lg')`
    display: none;
  `}
`;

const TabHeader = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
  margin-bottom: 30px;
`;

const Tab = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  height: 25px;
  cursor: pointer;
  padding: 10px 15px;
  ${({ isHighlight }) =>
    isHighlight &&
    `
    background-color: #0fa3f4;
  `}
`;

const PlanDescriptionContainer = styled.div`
  display: none;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
  min-width: 270px;
  background-color: #fff;
  padding: 15px 0;
  ${breakpoint('md')`
    display: flex;
  `}
`;

const InformationContainer = styled.div`
  display: flex;
  margin: 15px 25px;
  justify-content: center;
`;

const InfoContent = styled(props => <Label {...props} />)`
  font-size: 16px;
  color: #414042;
  width: 270px;
  display: flex;
  padding-left: 25px;
`;

const DividerContainer = styled.div`
  height: 51px;
  width: 100%;
  position: relative;
`;

const Divider = styled.div`
  height: 51px;
  width: 100%;
  left: 0;
  display: flex;
  padding-left: 25px;
  align-items: center;
  position: absolute;
  background-color: #f9f9f9;
  z-index: 3;
`;

export {
  Container,
  ContentContainer,
  PlansContainer,
  ShapeLeft,
  ShapeRight,
  MainContent,
  HidePlanOnMobile,
  ShowTabPlanOnMobile,
  TabHeader,
  Tab,
  PlanDescriptionContainer,
  InformationContainer,
  InfoContent,
  DividerContainer,
  Divider
};
