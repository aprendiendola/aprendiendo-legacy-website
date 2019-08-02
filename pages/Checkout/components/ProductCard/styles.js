import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

const ProductCardContainer = styled.div`
  padding: 12px 14px 15px 18px;
  border: 1px solid #c5c5c5;
  border-radius: 2px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  min-width: 290px;
  flex-grow: 1;
  margin-bottom: 7px;
  ${breakpoint('sm')`
    justify-content: initial;
  `}
`;

const ProductCardInfoContainer = styled.div`
  align-items: ${({ alignItems }) => alignItems || 'initial'};
  display: flex;
  flex-direction: ${({ direction }) => direction || 'column'};
  width: 130px;
  ${breakpoint('sm')`
    width: initial;
    flex-direction: row;
    flex-grow: ${({ flexGrow }) => flexGrow || '3'};
  `}
`;

const NameAndUniversityContainer = styled.div`
  display: flex;
  flex-direction: column;
  ${breakpoint('sm')`
    width: 232px;
  `}
`;

const ProductLabel = styled.label`
  display: flex;
  font-size: ${({ fontSize }) => fontSize || '12px'};
  font-family: ${({ fontFamily }) => fontFamily || 'Lato'};
  font-stretch: ${({ fontStretch }) => fontStretch || 'normal'};
  font-weight: ${({ fontWeight }) => fontWeight || 'bold'};
  line-height: ${({ lineHeight }) => lineHeight || 'normal'};
  color: ${({ color }) => color || '#414042'};
  margin-left: ${({ marginLeft }) => marginLeft || 'initial'};
  margin-right: ${({ marginRight }) => marginRight || 'initial'};
  cursor: ${({ cursor }) => cursor || 'initial'};
`;
const NameLabel = styled.label`
  display: flex;
  font-size: 12px;
  font-stretch: condensed;
  font-weight: bold;
  color: #414042;
  text-transform: uppercase;
  ${breakpoint('sm')`
    font-size: 14px;
  `}
`;

const UniversityLabel = styled.label`
  display: flex;
  font-size: 10px;
  font-family: Lato;
  font-weight: bold;
  line-height: 1.8;
  color: #ff761a;
`;

const CycleLabel = styled.label`
  display: flex;
  font-size: 10px;
  font-family: Lato;
  color: #414042;
  ${breakpoint('sm')`
    font-size: 12px;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
  `}
`;

const PriceLabel = styled.label`
  display: flex;
  font-size: 14px;
  font-family: Lato;
  font-weight: 500;
  color: #0fa3f4;
  margin-left: auto;
  ${breakpoint('sm')`
    font-size: 16px;
  `}
`;

export {
  ProductCardContainer,
  ProductCardInfoContainer,
  ProductLabel,
  NameAndUniversityContainer,
  NameLabel,
  UniversityLabel,
  CycleLabel,
  PriceLabel
};
