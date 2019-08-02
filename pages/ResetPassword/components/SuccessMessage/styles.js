import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  margin-right: auto;
  margin-left: auto;
`;

const Icon = styled.div`
  background-image: url(${({ img }) => img || 'http://via.placeholder.com/350x150'});
  background-size: 98px auto;
  background-repeat: no-repeat;
  background-position: center;
  margin-bottom: 30px;
  width: 98px;
  height: 98px;
`;

const Title = styled.label`
  font-size: 20px;
  font-weight: bold;
  font-stretch: condensed;
  line-height: 1.65;
  color: #414042;
  margin-bottom: 14px;
`;

const Button = styled.button`
  width: 150px;
  height: 35px;
  background-color: #1178f2;
  font-family: Lato;
  font-size: 16px;
  font-weight: bold;
  line-height: 1.38;
  border-radius: 50px;
  color: #fff;
  border: none;
  ${breakpoint('sm')`
    width: 170px;
  `}
`;

export {
  Container,
  Icon,
  Title,
  Button
};
