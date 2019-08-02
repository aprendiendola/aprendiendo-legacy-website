import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'

const WhatsAppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 26px;
  ${breakpoint('sm')`
    margin-left: auto;
  `}
  ${breakpoint('md')`
    margin-left: initial;
  `}
`

const WhatsAppNumberContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 14px;
  align-items: center;
`

const SummaryCardContainer = styled.div`
  display: flex;
  padding: 24px
  flex-direction: column;
  box-shadow: 0px 4px 18px 0 rgba(58, 58, 58, 0.28);
  margin-top: 7px;
  ${breakpoint('sm')`
    padding: 24px
  `}
  ${breakpoint('md')`
    margin-top: initial;
    margin-left: 22px;
    width: 295px;
  `}
  ${breakpoint('lg')`
    width: 360px;
  `}
`

const PayingContainer = styled.div`
  display: flex;
  flex-direction: column;
  ${breakpoint('sm')`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    border-bottom: 1px solid #d1d3d4;
  `}
  ${breakpoint('md')`
    flex-direction: column;
    align-items: flex-start;
    justify-content: initial;
    margin-bottom: initial;
    border-bottom: initial;
  `}
`

const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 21px;
`

const SummaryLabel = styled.label`
  display: flex;
  font-family: Lato;
  line-height: normal;
  min-height: 9px;
  padding-top: ${({ paddingTop }) => paddingTop || 'initial'};
  padding-bottom: ${({ paddingBottom }) => paddingBottom || 'initial'};
  font-size: ${({ fontSize }) => fontSize || '14px'};
  font-weight: ${({ fontWeight }) => fontWeight || 'bold'};
  color: ${({ color }) => color || '#414042'};
`

const Button = styled.button`
  width: 252px;
  height: 35px;
  background-color: ${({ backgroundColor }) => backgroundColor || '#1178f2'};
  border-radius: 50px;
  color: #fff;
  border: none;
  ${breakpoint('sm')`
    width: ${({ isDiscountBtn }) => (isDiscountBtn ? '104px' : '252px')};
  `}
  ${breakpoint('md')`
    width: ${({ isDiscountBtn }) => (isDiscountBtn ? '104px' : '100%')};
  `}
`

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 17px;
  ${breakpoint('sm')`
    flex-direction: row;
  `}
  ${breakpoint('md')`
    flex-direction: column;
  `}
`

const PayMethodContainer = styled.div`
  display: flex;
  border-bottom: initial;
  flex-direction: column;
  padding-bottom: 21px;
  margin-bottom: initial;
  width: 100%;
  ${breakpoint('sm')`
    border-bottom: initial;
  `}
  ${breakpoint('md')`
    border-bottom: initial;
  `}
`
const PayMethodBrandsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  ${breakpoint('sm')`
    justify-content: initial;
  `}
`

const PayMethodBrand = styled.div`
  background-size: ${({ backgroundSize }) => backgroundSize || '30px auto'};
  background-image: url(${({ img }) => img || 'http://via.placeholder.com/350x150'});
  background-repeat: no-repeat;
  background-position: center;
  width: ${({ width }) => width || '30px'};
  height: ${({ height }) => height || '30px'};
  ${breakpoint('sm')`
    margin-right: ${({ marginRight }) => marginRight || '21px'};
  `}
`

const DiscountContainer = styled.div`
  display: none;
  flex-direction: column;
`

const DiscountCallToAction = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 12px;
  align-items: center;
`

const DiscountInput = styled.input`
  padding: 11px 0 8px 7px;
  border: 1px solid #d1d3d4;
  margin-right: 18px;
  width: 129px;
  ${breakpoint('md')`
    flex-grow: 1;
    width: initial;
  `}
`

export {
  SummaryCardContainer,
  PayingContainer,
  PriceContainer,
  SummaryLabel,
  Button,
  InfoContainer,
  PayMethodContainer,
  PayMethodBrandsContainer,
  PayMethodBrand,
  DiscountContainer,
  DiscountCallToAction,
  DiscountInput,
  WhatsAppContainer,
  WhatsAppNumberContainer
}
