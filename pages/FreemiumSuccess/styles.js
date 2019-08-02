import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import { Button, Label } from 'components';
import registerSuccessImg from 'assets/images/register-success.svg';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 70px;
  justify-content: center;
  ${breakpoint('md')`
    flex-direction: row-reverse;
  `}
`;

export const ImgContent = styled.div`
  background-image: url(${registerSuccessImg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  width: 240px;
  height: 200px;
  ${breakpoint('sm')`
    width: 390px;
    height: 280px;
    margin-bottom: 60px;
  `}
  ${breakpoint('md')`
    width: 415px;
    height: 315px;
    margin-left: 90px;
  `}
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${breakpoint('lg')`
    align-items: flex-start;
  `}
`;

export const Description = styled(props => <Label {...props} />)`
  text-align: center;
  align-self: center;
  color: #626262;
  font-size: 16px;
  max-width: 245px;
  display: block;
  ${breakpoint('md')`
    text-align: left;
    align-self: flex-start;
    max-width: 335px;
  `}
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 170px;
  justify-content: space-around;
  ${breakpoint('sm')`
    height: 100px;
    flex-direction: initial;
    align-items: center;
    width: 440px;
    margin: auto;
  `}
  ${breakpoint('md')`
    flex-direction: initial;
    width: 100%;
  `}
`;

export const StyledButton = styled(props => <Button {...props} />)`
  background-color: ${({ isHighlight }) => (isHighlight ? '#87e400' : '#fff')};
  border: ${({ isHighlight }) => (isHighlight ? 'initial' : '1px solid #1178f2')};
  padding: 10px 20px;
  cursor: pointer;
  max-width: 176px;
  min-width: initial;
  width: 100%;
  height: 34px;
  padding: initial;
  ${breakpoint('md')`
    margin-right: 10px;
  `}
`;

export const StyledLabel = styled(props => <Label {...props} />)`
  color: ${({ isHighlight }) => (isHighlight ? '#fff' : '#1178f2')};
  font-weight: 900;
  font-size: 16px;
  cursor: pointer;
`;

export const DescriptionTitle = styled(props => <Label {...props} />)`
  font-size: 16px;
  font-weight: 900;
  display: flex;
  align-self: center;
  color: #626262;
  ${breakpoint('md')`
    align-self: flex-start;
  `}
`;

export const BenefitsGrid = styled.div`
  display: grid;
  grid-column-gap: 35px;
  grid-row-gap: 10px;
  margin-top: 30px;
  grid-template-columns: auto;
  padding: 0px 50px;
  margin-left: auto;
  margin-right: auto;
  ${breakpoint('sm')`
    grid-template-columns: auto auto;
    padding: 0px;
    margin-left: initial;
    margin-right: initial;
  `}

  ${breakpoint('md')`
    grid-template-columns: auto;
    padding: 0px;
    margin-left: initial;
    margin-right: initial;
  `}
`;
