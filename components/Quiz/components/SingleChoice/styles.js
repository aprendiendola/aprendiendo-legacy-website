import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: ${({ helper }) => (!helper ? '600' : 'normal')};
  color: #626262;
  margin-bottom: ${({ marginBottom }) => (marginBottom || 'initial')};
  text-align: left;
`;

const Option = styled.button`
  display: flex;
  min-height: 41px;
  background-color: ${({ isSelected }) => (isSelected ? '#00afef' : '#fff')};
  border-radius: 4px;
  border: ${({ isSelected }) => (isSelected ? 'solid 1px #00afef' : 'solid 1px #d1d3d4')};
  margin-left: 10px;
  margin-bottom: 10px;
  padding: 15px;
  cursor: pointer;
  font-size: 14px;
  color: ${({ isSelected }) => (isSelected ? '#fff' : '#626262')};
  text-align: left;
  transition: all .2s;
  ${({ isCorrect }) => (isCorrect ? `
    background-color: #87e400;
    border: solid 1px #87e400;
    color: #fff;
  ` : '')};
  ${({ isIncorrect }) => (isIncorrect ? `
    background-color: #f7215e;
    border: solid 1px #f7215e;
    color: #fff;
  ` : '')};
`;

const MessageContainer = styled.div`
  flex-direction: row;
  margin-left: 10px;
  text-align: left;
  ${breakpoint('sm')`
    flex-direction: row;
    align-items: initial;
  `}
`;

const Message = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #0fa3f4;
  align-items: center;
  ${({ isCorrect }) => (isCorrect ? 'color: #87e400' : '')};
  ${({ isIncorrect }) => (isIncorrect ? 'color: #f7215e' : '')};
`;

export {
  Container,
  Label,
  Option,
  MessageContainer,
  Message
};
