import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  width: 175px;
  flex-direction: column;
  padding: 10px 0px;
  position: absolute;
  left: -35px;
  background-color: #fff;
  box-shadow: 0 0 10px 0 rgba(168, 168, 168, 0.75);
  bottom: -87px;
`;

const OptionContainer = styled.div`
  display: flex;
  align-items: center;
  height: 26px;
  cursor: pointer;
  padding-left: 21px;
  span {
    color: #686868;
    font-family: Lato;
    font-size: 14px;
    font-weight: 600;
    padding-top: 2px;
  }
  :hover {
    background-color: #f4f4f4;
    span {
      color: #0fa3f4;
    }
  }
`;

const Arrow = styled.div`
  display: flex;
  width: 88px;
  height: 80px;
  position: absolute;
  overflow: hidden;
  top: -34px;
  left: 70px;
  &:after {
    content: '';
    position: absolute;
    width: 50px;
    height: 50px;
    background: #fff;
    transform: rotate(45deg);
    top: 79px;
    left: 25px;
    box-shadow: -1px -1px 10px -2px rgba(168, 168, 168, 0.75);
  }
`;

export { Container, OptionContainer, Arrow };
