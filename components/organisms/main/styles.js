import styled, { keyframes } from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import { Button, Label } from 'components';
import background from 'assets/images/main-background.svg';
import flyingGuySpring from 'assets/images/flying-guy-spring.svg';
import flyingGuyWinter from 'assets/images/flying-guy-winter.svg';
import friends from 'assets/images/friends.svg';

import moment from 'moment';

import shape1 from 'assets/images/shape1.svg';

const seasons = {
  summer: [12, 1, 2, 3],
  fall: [4, 5, 6],
  winter: [7, 8, 9],
  spring: [10, 11]
};

const getCurrentSeason = () => {
  const month = new Date().getMonth() + 1;
  for (const key in seasons) {
    if (seasons[key].indexOf(month) >= 0) {
      return key;
      FlyingGuy;
    }
  }
};

const ChooseUniversityContainer = styled.div`
  display: flex;
  flex-direction: column;
  ${breakpoint('md')`
    flex-direction: row;
  `}
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  ${breakpoint('sm')`
    flex-direction: row-reverse;
  `}
  ${breakpoint('md')`
    width: 100%;
  `}
`;

const LeftMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 15px;
  button {
    display: none;
  }
  ${breakpoint('sm')`
    width: 40%;
    height: 450px;
    justify-content: flex-end;
    padding: 35px;
    button {
      display: block;
      margin-top: 15px;
    }
  `}
  ${breakpoint('md')`
    justify-content: center;
    width: 402px;
    padding: 0;
  `}
`;

const RightMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  ${breakpoint('sm')`
    width: 60%;
  `}
`;

const ChooseUniImageContainer = styled.div`
  background-image: url(${background});
  background-position: top right;
  background-size: 345px;
  background-position-x: 100%;
  background-repeat: no-repeat;
  height: 180px;
  width: 100%;
  position: relative;
  ${breakpoint('sm')`
    background-size: 768px;
    background-position-x: 0px;
    height: 450px;
  `}
  ${breakpoint('md')`
    background-size: 1024px;
    width: 1030px;
    margin-left: auto;
  `}
`;

const flyMobile = keyframes`
  0% {
    top: 60px;
  }
  100% {
    top: 55px;
  }
`;

const flyTablet = keyframes`
  0% {
    top: 105px;
  }
  100% {
    top: 110px;
  }
`;

const FlyingGuy = styled.div`
  display: block;
  background-image: url(${getCurrentSeason() === 'summer' ? friends : friends});
  background-size: 160px auto;
  background-repeat: no-repeat;
  width: 160px;
  height: 110px;
  position: absolute;
  top: 60px;
  animation: ${flyMobile} 1.5s alternate infinite;
  ${breakpoint('sm')`
    background-size: 260px auto;
    width: 260px;
    height: 200px;
    top: 105px;
    right: 185px;
    animation: ${flyTablet} 1.5s alternate infinite;
  `}
  ${breakpoint('md')`
    background-size: 370px auto;
    width: 370px;
    height: 260px;
    top: 105px;
    right: 269px;
  `}
`;

const Graduated = styled.div`
  display: block;
  background-image: url(${friends});
  background-size: 160px auto;
  background-repeat: no-repeat;
  position: absolute;
  width: 160px;
  height: 169px;
  top: 20px;
  right: 120px;
  ${breakpoint('sm')`
    width: 290px;
    height: 300px;
    top: 30px;
    left: 50px;
    background-size: 290px auto;
    `}
  ${breakpoint('md')`
    background-size: 360px auto;
    background-size: 400px auto;
    width: 400px;
    height: 426px;
    top: 27px;
    right: 172px;
    left: 100px;
      `}
`;
const ChooseUniversityButton = styled(props => <Button {...props} />)`
  ${breakpoint('sm')`
    display: none;
  `}
`;

const MainRightShape = styled.div`
  display: flex;
  background-image: url(${shape1});
  background-position: left;
  background-size: 80px;
  background-repeat: no-repeat;
  width: 50px;
  height: 80px;
  margin-left: auto;
  ${breakpoint('md')`
    display: none;
  `}
`;

const Title = styled(props => <Label {...props} />)`
  font-size: 44px;
  ${breakpoint('sm')`
    font-size: 62px;
  `}
`;

const Subtitle = styled(props => <Label {...props} />)`
  font-size: 15px;
  ${breakpoint('sm')`
    font-size: 22px;
    max-width: 220px;
  `}
`;

export {
  ChooseUniversityContainer,
  MainContainer,
  RightMainContainer,
  ChooseUniImageContainer,
  FlyingGuy,
  LeftMainContainer,
  ChooseUniversityButton,
  MainRightShape,
  Graduated,
  Title,
  Subtitle
};
