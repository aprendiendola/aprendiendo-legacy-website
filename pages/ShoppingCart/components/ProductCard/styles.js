import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

const ProductCardContainer = styled.div`
  padding: 12px 14px 5px 18px;
  border: 1px solid #c5c5c5;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  min-width: 290px;
  max-width: 820px;
  margin-bottom: 12px;
  ${breakpoint('sm')`
    justify-content: initial;
  `}
`;

const ProductCardWrapper = styled.div`
  padding: 12px 14px 15px 18px;
  border-radius: 2px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  min-width: 290px;
  flex-grow: 1;
  margin-bottom: 7px;
  cursor: pointer;
  ${breakpoint('sm')`
    justify-content: initial;
  `}
`;

const ProductCardInfoContainer = styled.div`
  align-items: ${({ alignItems }) => alignItems || 'initial'};
  display: flex;
  flex-direction: ${({ direction }) => direction || 'column'};
  width: 130px;
  justify-content: space-between;
  ${breakpoint('sm')`
    width: initial;
    flex-direction: row;
    flex-grow: ${({ flexGrow }) => flexGrow || '1'};
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
  z-index: 9999;
`;
const NameLabel = styled.label`
  display: flex;
  font-size: 16px;
  font-stretch: condensed;
  font-weight: bold;
  color: #414042;
  text-transform: uppercase;
  course: pointer;
`;

const UniversityLabel = styled.label`
  display: flex;
  font-size: 14px;
  font-family: Lato;
  font-weight: bold;
  line-height: 1.8;
  color: #ff761a;
`;

const CycleLabel = styled.label`
  display: flex;
  font-size: 14px;
  font-family: Lato;
  color: #414042;
  course: pointer;
  ${breakpoint('sm')`
    font-size: 14px;
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
  font-weight: 800;
  ${breakpoint('sm')`
    font-size: 16px;
  `}
`;

const Indicators = styled.label`
  align-items: center;
  display: flex;
  justify-content: space-between;
  course: pointer;
`;

const StarRating = styled.div`
  background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/2605/star-rating-sprite.png') repeat-x;
  font-size: 0;
  height: 13px;
  line-height: 0;
  overflow: hidden;
  text-indent: -999em;
  width: 65px;
`;

const StarRatingLabel = styled.div`
  float: left;
  height: 13px;
  display: block;
`;

const FromLabel = styled.p`
  color: #414042;
  font-weight: 500;
  margin-right: 5px;
`;

export {
  ProductCardContainer,
  ProductCardInfoContainer,
  ProductLabel,
  NameAndUniversityContainer,
  NameLabel,
  UniversityLabel,
  CycleLabel,
  PriceLabel,
  Indicators,
  StarRating,
  StarRatingLabel,
  FromLabel,
  ProductCardWrapper
};
