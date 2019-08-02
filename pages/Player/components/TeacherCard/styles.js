import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'

const TeacherCardContainer = styled.div `
  display: none;
  ${breakpoint('md')`
    border-radius: 2px;
    display: flex;
    flex-direction: column;
    padding: 16px;
    border: 1px solid #d1d3d4;
    width 290px;
  `}
`

const CardLabel = styled.label `
  display: flex;
  flex-grow: 1;
  width: auto;
  min-height: 8px;
  font-stretch: ${({ fontStretch }) => fontStretch || 'normal'};
  font-family: ${({ fontFamily }) => fontFamily || 'Lato'};
  font-size: ${({ fontSize }) => fontSize || '16px'};
  font-weight: ${({ fontWeight }) => fontWeight || 'bold'};
  line-height: ${({ lineHeight }) => lineHeight || '1.6'};
  color: ${({ color }) => color || '#414042'};
`

const TeacherInfoContainer = styled.div `
  display: flex;
  align-items: center;
  margin-top: 20px;
`

const TeacherAvatar = styled.div `
  background-size: 59px auto;
  background-image: url(${({ img }) => img || 'http://via.placeholder.com/350x350'});
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 100%;
  margin-right: 15px;
  width: 59px;
  height: 59px;
`

export {
  TeacherCardContainer,
  CardLabel,
  TeacherInfoContainer,
  TeacherAvatar
}
