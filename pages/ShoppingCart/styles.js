import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'

const ShoppingCardContainer = styled.div`
  padding: 20px 15px 32px;
  ${breakpoint('sm')`
    padding: 20px 15px 32px;
  `}
  ${breakpoint('md')`
    padding: 19px 65px;
    max-width: 1280px;
    margin: auto;
  `}
`;

const TitleCard = styled.span`
  color: #414042;
  font-size: 16px;
  font-stretch: condensed;
  font-style: normal;
  font-weight: bold;
  height: 14px;
  letter-spacing: normal;
  line-height: 2.06;
  text-align: left;
  ${breakpoint('sm')`
    font-size: 20px;
  `}
`

const SubTitleCard = styled.p`
  color: #414042;
  font-family: Lato;
  font-size: 12px;
  font-stretch: normal;
  font-style: normal;
  font-weight: normal;
  height: 11px;
  letter-spacing: normal;
  line-height: normal;
  text-align: left;
  ${breakpoint('sm')`
    font-size: 14px;
  `}
`

const CounterCard = styled.p`
  color: #414042;
  font-family: Lato;
  font-size: 12px;
  font-stretch: normal;
  font-style: normal;
  font-weight: normal;
  height: 11px;
  letter-spacing: normal;
  line-height: normal;
  margin-top: 32px;
  margin-bottom: 15px;
  text-align: left;
  ${breakpoint('sm')`
    font-size: 14px;
  `}
`

const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  ${breakpoint('sm')`
    flex-direction: column;
  `}
  ${breakpoint('md')`
    flex-direction: row;
    align-items: flex-start;
  `}
`

const CoursesContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export {
  ShoppingCardContainer,
  TitleCard,
  SubTitleCard,
  CounterCard,
  CartContainer,
  CoursesContainer
}
