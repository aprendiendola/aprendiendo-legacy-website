import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

const EmptyCartContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin-right: auto;
  margin-left: auto;
`;

const EmptyImage = styled.div`
  background-image: url(${({ img }) => img || 'http://via.placeholder.com/350x150'});
  background-size: 182px auto;
  background-repeat: no-repeat;
  background-position: center;
  margin-bottom: 30px;
  width: 182px;
  height: 182px;
  ${breakpoint('sm')`
    background-size: 287px auto;
    width: 287px;
    height: 287px;
  `}
`;

const Title = styled.label`
  font-size: 20px;
  font-weight: bold;
  font-stretch: condensed;
  line-height: 1.65;
  color: #414042;
  margin-bottom: 14px;
`;

const SubTitle = styled.label`
  font-family: Lato;
  font-size: 12px;
  color: #414042;
  text-align: center;
  margin-bottom: 14px;
  max-width: 272px;
  ${breakpoint('sm')`
    font-size: 14px;
  `}
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
  EmptyCartContainer,
  EmptyImage,
  Title,
  SubTitle,
  Button
};
