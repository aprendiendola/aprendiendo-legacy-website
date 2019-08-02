/* eslint-disable max-len */
import styled from 'styled-components';
import { prop, switchProp } from 'styled-tools';

const resolveLabelColor = ({ theme, color }) => {
  if (color) return color;
  return theme.color.error;
};

const ErrorMessage = styled.label`
  color: ${resolveLabelColor};
  font-size: ${prop('fontSize', '12px')};
  font-weight: ${switchProp('weight', {
    regular: '400',
    semibold: '600',
    bold: '700',
    black: '900'
  })};
`;

export default ErrorMessage;
