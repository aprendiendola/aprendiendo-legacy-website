import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import ellipse from 'assets/images/ellipse.svg';
import ellipseDesktop from 'assets/images/ellipse-desktop.svg';
import shapeLeft from 'assets/images/shape-contact-left.svg';
import shapeRight from 'assets/images/shape-contact-right.svg';
import rocket from 'assets/images/rocket.svg';
import planets from 'assets/images/planets.svg';
import { Button } from 'components';

const EllipseContainer = styled.div`
  display: flex;
  background-image: url(${ellipse});
  display: ${({ hideOnMobile }) => (hideOnMobile ? 'none' : 'flex')};
  background-repeat: no-repeat;
  background-position: center;
  background-size: auto 850px;
  width: 100%;
  height: 850px;
  position: absolute;
  top: -20px;
  background-position-y: ${({ backgroundPositionY }) => backgroundPositionY || 'initial'} ${breakpoint('sm')`
    background-position-y: ${({ backgroundPositionY }) => backgroundPositionY || 'initial'}
    display: flex;
    background-image: url(${ellipseDesktop});
    background-size: auto 820px;
    height: 840px;
  `} ${breakpoint('lg')`
    background-position-y: ${({ backgroundPositionY }) => (backgroundPositionY ? '-132px' : 'initial')}
    display: flex;
    background-image: url(${ellipseDesktop});
    background-size: auto 938px;
    height: 840px;
  `};
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  bottom: 0px;
  ${breakpoint('sm')`
    bottom:5px;
  `}
`;

const StyledButton = styled(props => <Button {...props} />)`
  margin: auto;
  margin-top: 52px;
  margin-bottom: 52px;
  ${breakpoint('sm')`
    margin-top: 0px;
  `}
`;

const SpaceContainer = styled.div`
  ${breakpoint('sm')`
    display: flex;
    width: 100%;
    max-width: 1100px;
    justify-content: space-around;
    margin: auto;
  `}
`;

const Rocket = styled.div`
  ${breakpoint('sm')`
    background-image: url(${rocket});
    background-position: center;
    background-size: 150px;
    background-repeat: no-repeat;
    width: 150px;
    height: 150px;
    z-index: 1;
  `}
`;

const Planets = styled.div`
  ${breakpoint('sm')`
    background-image: url(${planets});
    background-position: center;
    background-size: 150px;
    background-repeat: no-repeat;
    width: 150px;
    height: 150px;
    z-index: 1;
  `}
`;

const ContactContainer = styled.div`
  margin: auto;
  ${breakpoint('sm')`
    max-width: 380px;
  `}
  ${breakpoint('md')`
    max-width: 425px;
  `}
`;

const ShapeContactLeft = styled.div`
  ${breakpoint('sm')`
    background-image: url(${shapeLeft});
    background-size: 260px;
    background-repeat: no-repeat;
    background-position-x: -118px;
    background-position-y: 95px;
    width: 150px;
  `}
  ${breakpoint('md')`
    width: 250px
    background-size: 310px;
    background-position-x: -125px;
  `}
`;

const ShapeContactRight = styled.div`
  ${breakpoint('sm')`
    background-image: url(${shapeRight});
    background-size: 475px;
    background-repeat: no-repeat;
    background-position-x: 15px;
    background-position-y: -30px;
    width: 150px;
  `}
  ${breakpoint('md')`
    width: 250px
  `}
`;

export {
  EllipseContainer,
  SpaceContainer,
  Rocket,
  Planets,
  StyledButton,
  ContactContainer,
  ShapeContactLeft,
  ShapeContactRight,
  ButtonContainer
};
