import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import ulUniversity from 'assets/images/UL.jpg';
import pucpUniversity from 'assets/images/PUCP.jpg';
import upUniversity from 'assets/images/UP.jpg';
import upcUniversity from 'assets/images/UPC.jpg';

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

const UniversityCardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  ${breakpoint('sm')`
    flex-direction: row;
    flex-wrap: wrap;
  `}
  ${breakpoint('md')`
    max-width: 1280px;
    width: 100%;
    margin: auto;
  `}
`;

const UniversityCard = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  width: 100%;
  max-width: 341px;
  margin: 13px auto;
  cursor: pointer;
  ${breakpoint('sm')`
    width: 253px;
  `}
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-image: url(${({ shortName }) => {
    let uni;
    switch (shortName) {
      case 'UL':
        uni = ulUniversity;
        break;
      case 'PUCP':
        uni = pucpUniversity;
        break;
      case 'UP':
        uni = upUniversity;
        break;
      case 'UPC':
        uni = upcUniversity;
        break;
      default:
        uni = upcUniversity;
    }
    return uni;
  }});
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const CardColorBrand = styled.div`
  display: flex;
  padding: 8px 25px;
  background: linear-gradient(to right, ${({ linearGradient }) => linearGradient});
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  justify-content: flex-end;
`;

export {
  Section,
  UniversityCardsContainer,
  UniversityCard,
  CardContainer,
  CardColorBrand
};
