import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

const BannerContainer = styled.div`
  height: 127px;
  flex-direction: column;
  text-align: center;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(30deg, #1f3a92 23%, #2b7323);
  color: #fff;
  ${breakpoint('md')`
    height: 55px;
    flex-direction: row;
    background-image: linear-gradient(10deg, #1f3a92 23%, #2b7323);
  `};
`;

const OfferText = styled.p`
  font-weight: 700;
  padding: 0px 18px;
  position: relative;
  top: 3px;
  width: 275px;
  font-size: 14px;
  line-height: 17px;
  ::before {
    content: ${({ withButton }) => (withButton
    ? '"¡APROVECHA LOS DESCUENTAZOS Y PASA TU CICLO SIN MIEDO!"'
    : '"¡APROVECHA LOS DESCUENTAZOS EN TODOS NUESTROS CURSOS!"')};
  }
  ${breakpoint('md')`
    font-size: 16px;
    ::before {
      content: ${({ withButton }) => (withButton
    ? '"¡APROVECHA LOS DESCUENTAZOS Y PASA TU CICLO SIN MIEDO!"'
    : '"¡APROVECHA LOS DESCUENTAZOS EN TODOS NUESTROS CURSOS Y PASA EL CICLO SIN MIEDO!"')};
    }
  
    width: auto;
    line-height: 22px;
  `};
`;

const FearlessText = styled.img`
  width: 204px;
`;

const FearlessButton = styled.button`
  border-radius: 30px;
  font-size: 16px;
  font-weight: 700;
  background: #fff;
  border: none;
  padding: 6px 22px;
  font-size: 14px;
  color: #288797;
  margin-top: 10px;
  ${breakpoint('md')`
    margin-top:0px;
  `};
`;

export {BannerContainer, FearlessText, OfferText, FearlessButton};
