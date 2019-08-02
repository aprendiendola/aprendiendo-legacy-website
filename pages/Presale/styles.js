import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import checkIcon from 'assets/images/icons/check.png';
import shapeJetBkg from 'assets/images/shape-jet-background.svg';
import jetKid from 'assets/images/jetkid.svg';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 844px;
  margin: auto;
  ${breakpoint('sm')`
    flex-direction: row-reverse;
  `}
`;

const Loading = styled.img`
  width: 70px;
  margin: 126px auto;
  display: flex`;

const CardContainer = styled.div`
  display: flex;
  border: 1px solid #d1d3d4;
  border-radius: 10px;
  flex-direction: column;
  padding: 25px 18px;
  width: 100%;
  max-width: 375px;
  margin: 33px auto;
`;

const Text = styled.span`
  font-size: 16px;
  color: #626262;
  margin: 5px 0;
`;

const CoursesContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 341px;
  margin: 33px auto;
`;

const LiContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Check = styled.div`
  width: 12px;
  height: 12px;
  background-image: url(${checkIcon});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 12px;
  margin-right: 10px;
`;

const Badge = styled.div`
  padding: 1px 5px;
  background-image: linear-gradient(64deg, #8800ff, #b605ff);
  border-radius: 3px;
  color: #fff;
  font-size: 14px;
  font-weight: 900;
  margin-left: 10px;
`;

const ShapeRight = styled.div`
  display: none;
  position: absolute;
  background-image: url(${shapeJetBkg});
  background-size: auto 670px;
  background-repeat: no-repeat;
  width: 400px;
  overflow: hidden;
  right: 0;
  top: 0;
  ${breakpoint('lg')`
    display: block;
    background-position-y: -50px;
    background-position-x: 125px;
    background-size: auto 820px;
    width: 500px;
    height: 700px;
  `}
`;

const JetKid = styled.div`
  position: absolute;
  top: 200px;
  left: 32px;
  background-image: url(${jetKid});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 225px;
  width: 235px;
  height: 235px;
  z-index: 1;
  ${breakpoint('lg')`
    top: 205px;
    left: 218px;
    background-size: 230px;
    width: 250px;
    height: 295px;
  `}
`;

const BenefitList = styled.ol`
  list-style: none;
  counter-reset: benefit-counter;
  padding-left: 30px;
  padding-right: 15px;
  margin-left: 0px;
  li {
    counter-increment: benefit-counter;
    line-height: 26px;
    position: relative;
    margin-bottom: 10px;
  }
  li::before {
    content: counter(benefit-counter);
    font-weight: bold;
    margin-right: 10px;
    font-weight: 900;
    height: 100%;
    position: absolute;
    left: -20px;
    }  
`;


export {
  Container,
  CardContainer,
  Text,
  CoursesContainer,
  LiContainer,
  Check,
  Badge,
  ShapeRight,
  JetKid,
  Loading,
  BenefitList
};

