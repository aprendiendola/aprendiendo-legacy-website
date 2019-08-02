import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import petQuiz from '/static/images/pet-quiz.svg';

const Header = styled.header`
  border-bottom: initial;
  background-color: #f5f6f7;
  justify-content: center;
  position: relative;
  padding-top: 32px;
  button {
    background-color: #f5f6f7;
    position: absolute;
    top: 15px;
    right: 15px;
    ::before {
      background-color: #d1d3d4;
      height: 3px;
      width: 100%;
    }
    ::after {
      background-color: #d1d3d4;
      height: 100%;
      width: 3px;
    }
    :hover {
      background-color: #f5f6f7;
      ::before,
      ::after {
        background-color: #d1d3d4;
      }
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  svg {
    margin-bottom: 25px;
    ${breakpoint('sm')`
      margin-bottom: 0;
    `}
  }
`;

const Title = styled.label`
  display: flex;
  font-size: 24px;
  font-weight: bold;
  color: #0fa3f4;
  margin-bottom: 12px;
`;

const Dash = styled.div`
  width: 24px;
  background-color: #00afef;
  border: 2px solid #00afef;
  ${breakpoint('md')`
    width: 26px;
  `}
  ${breakpoint('lg')`
    width: 39px;
    border: 3px solid #00afef;
  `}
`;

const Section = styled.section`
  padding: 0;
  text-align: center;
  font-size: 14px;
  color: #626262;
  ${({ showSuccess }) => (showSuccess ? 'background-color: #f5f6f7;' : '')}
  ${({ showSuccess }) => (showSuccess ? 'padding: 10px 26px;' : '')}
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
  }
  ::-webkit-scrollbar-thumb {
    background: #07a3f4;
  }
  ${breakpoint('sm')`
    ${({ showSuccess }) => (showSuccess ? 'background-color: #f5f6f7;' : '')}
  `}
`;

const Footer = styled.footer`
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: #f5f6f7;
  border-top: initial;
  min-height: 77px;
  padding: 20px 35px 40px 35px;
`;

const ScoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 240px;
  margin-left: auto;
  ${breakpoint('sm')`
    flex-direction: row;
    width: 100%;
    margin: 0;
  `}
`;

const Score = styled.label`
  display: flex;
  align-self: baseline;
  font-size: 21px;
  font-weight: ${({ fontWeight }) => fontWeight || 'bold'};
  color: ${({ color }) => color || '#001529'};
  margin-right: ${({ hasMarginRight }) => (hasMarginRight ? '4px' : 'initial')};
`;

const Label = styled.label`
  display: flex;
  font-size: 14px;
  color: #626262;
  margin-right: 3px;
`;

const Text = styled.div`
  display: flex;
  align-items: flex-end;
  height: 29px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: auto;
`;

const Button = styled.div`
  display: flex;
  border-radius: 4px;
  background-color: ${({ disabled }) => (disabled ? '#d1d3d4' : '#0fa3f4')};
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  justify-content: center;
  align-items: center;
  width: 112px;
  height: 34px;
  margin: ${({ margin }) => margin || 'initial'};
  padding-top: 3px;
`;

const SecondaryButton = styled(props => <Button {...props} />)`
  border: 1px solid #0fa3f4;
  color: #0fa3f4;
  background-color: #fff;
`;

const SuccessPet = styled.div`
  background-image: url(${petQuiz});
  background-repeat: no-repeat;
  background-size: 260px;
  background-position: center;
  width: 300px;
  height: 260px;
`;

const ModalContainer = styled.div`
  background-color: #fff;
  border-radius: 5px;
  color: $black;
  margin: auto;
  position: relative;
  width: 286px;

  @include tablet {
    width: 450px;
  }
`;

export {
  Header,
  Container,
  Title,
  Dash,
  Section,
  Footer,
  ScoreContainer,
  Score,
  Label,
  Text,
  ButtonsContainer,
  Button,
  SuccessPet,
  SecondaryButton,
  ModalContainer
};
