import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import mosaic from 'assets/images/mosaic.svg';
import shape2 from 'assets/images/shape2.svg';
import { Label } from 'components';

const Section = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  button {
    display: none;
  }
  ${breakpoint('sm')`
    button {
      display: block;
      margin-top: 15px;
    }
  `}
`;

const LearnContainer = styled.div`
  display: flex;
  ${({ hideBackground }) => (hideBackground ? '' : `background-image: url(${mosaic});`)}
  background-position: center;
  background-repeat: no-repeat;
  background-size: 300%;
  ${({ hideBackground }) => (hideBackground ? '' : 'box-shadow: 0 0 8px 8px white inset;')}
  flex-direction: column;
  ${breakpoint('sm')`
    flex-direction: row;
    background-size: 180%;
    justify-content: center;
  `}
  ${breakpoint('md')`
    background-size: 100%;
  `}
`;

const IconsSectionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  max-width: 400px;
  ${breakpoint('sm')`
    justify-content: space-around;
    margin: ${({ withButton }) => {
    return withButton ? '38px 0' : '100px 0';
  }};
    max-width: 620px;
  `}
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 10px 20px;
  ${breakpoint('md')`
    margin: 10px 10px 20px;
  `}
`;

const Icon = styled.div`
  background-image: url(${({ image }) => image});
  background-size: 80px;
  background-repeat: no-repeat;
  background-position: center;
  width: 80px;
  height: 80px;
  margin: 10px auto;
  z-index: 1;
`;

const IconTitle = styled(props => <Label {...props} />)`
  max-width: 140px;
  font-size: 20px;
  color: #00aeef;
  margin-top: 7px;
  margin-bottom: 9px;
  text-align: center;
  align-self: center;
  ${breakpoint('md')`
    max-width: 300px;
  `}
`;

const IconSubtitle = styled(props => <Label {...props} />)`
  max-width: 120px;
  font-size: 16px;
  color: #626262;
  text-align: center;
  margin: auto;
  ${breakpoint('md')`
    ${({ hasLargeText }) => (hasLargeText ? 'max-width: 215px;' : 'max-width: 215px')};
  `}
`;

const Shape = styled.div`
  display: ${({ hideBackground }) => (hideBackground ? 'none' : 'flex')};
  background-image: url(${shape2});
  background-repeat: no-repeat;
  margin-right: auto;
  width: 130px;
  position: absolute;
  bottom: -105px;
  background-size: 95px;
  height: 100px;
  background-position-x: -35px;
  ${breakpoint('sm')`
    background-size: 160px;
    width: 130px;
    height: 170px;
    background-position-x: -50px;
  `}
`;

export {
  Section,
  LearnContainer,
  IconsSectionContainer,
  IconContainer,
  Icon,
  IconTitle,
  IconSubtitle,
  Shape
};
