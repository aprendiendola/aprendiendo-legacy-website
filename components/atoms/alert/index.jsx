import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

const dangerColors = 'linear-gradient(265deg, #f92a2a, #a81717);';
const successColors = 'linear-gradient(75deg, #4e87d0, #7edfb5);';
const lightBlue = '#3ba2ef';

const Alert = styled.div`
  width: 100%;
  padding: 12px 32px;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 23px;
  height: ${({ height }) => height || '95'}px;
  font-weight: ${({ fontWeight }) => fontWeight || '400'};
  color: #fff;
  align-items: center;
  display: flex;
  border-radius: 10px;
  background: ${({ danger, lightblue }) => {
    if (danger) return dangerColors;
    if (lightblue) return lightBlue;
    return successColors;
  }};
  ${breakpoint('sm')`
    height: 70px;
  `}
`;

export default Alert;
