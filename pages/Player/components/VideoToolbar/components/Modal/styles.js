import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 9px;
`

const CloseContainer = styled.div`
  display: flex;
  height: 16px;
  cursor: pointer;
  margin-left: auto;
  justify-content: flex-end;
`

const Title = styled.h1`
  display: flex;
  font-size: 16px;
  font-family: Helvetica;
  font-weight: bold;
  font-stretch: condensed;
  color: #414042;
  margin-bottom: 10px;
  justify-content: center;
`

const SubTitle = styled.h2`
  display: flex;
  font-family: Lato;
  font-size: 12px;
  font-weight: bold;
  color: #0fa3f4;
  margin-bottom: 13px;
  justify-content: center;
`

const MaterialContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const Material = styled.a`
  display: flex;
  padding: 12px;
  align-items: center;
  cursor: pointer;
  font-size: 10px;
  color: #414042;
  justify-content: space-between;
  border-top: 1px solid #d1d3d4;
  img {
    display: none;
  }
  :hover {
    background-color: #d1d3d4;
    img {
      display: flex;
      width: 13px;
      height: 16px;
    }
  }
  ${breakpoint('sm')`
    font-size: 12px;
  `}
`

export {
  ModalContainer,
  CloseContainer,
  Title,
  SubTitle,
  MaterialContainer,
  Material
}
