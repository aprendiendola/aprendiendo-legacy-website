import styled from 'styled-components';
import { CARD_ICONS } from '../../styles';

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 552px;
  height: 52px;
  border-radius: 2px;
  border: solid 1px #d1d3d4;
  background-color: #ffffff;
  padding: 0 18px;
  margin: 5px 0;
  :hover {
    border: solid 1px #0fa3f4;
    cursor: pointer;
    label {
      display: block;
    }
  }
`;

const CardIcon = styled.div`
  background-image: url(${({ cardType }) => {
    return CARD_ICONS[cardType];
  }});
  background-size: 30px;
  background-position: center;
  background-repeat: no-repeat;
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

export {
  Container,
  CardIcon
};
