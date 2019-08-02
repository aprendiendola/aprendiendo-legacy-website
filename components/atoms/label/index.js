/* eslint-disable max-len */
import styled from 'styled-components';
import { prop, switchProp, ifProp } from 'styled-tools';

const resolveLabelColor = ({ theme, color }) => {
  if (color) return color;
  return theme.color.primary;
};

const Label = styled.label`
  align-self: ${prop('align')};
  color: ${resolveLabelColor};
  display: ${prop('display', 'inline-flex')};
  flex-basis: ${prop('flexBasis')};
  font-size: ${prop('fontSize', '12px')};
  font-weight: ${switchProp('weight', {
    regular: '400',
    semibold: '600',
    bold: '700',
    black: '900'
  })};
  margin: ${prop('margin')};
  margin-bottom: ${ifProp({ marginBottom: true }, '20px', prop('marginBottom'))};
  margin-left: ${ifProp({ marginLeft: true }, '20px', prop('marginLeft'))};
  margin-right: ${ifProp({ marginRight: true }, '20px', prop('marginRight'))};
  margin-top: ${ifProp({ marginTop: true }, '20px', prop('marginTop'))};
  max-width: ${prop('maxWidth')};
  min-width: ${prop('minWidth')};
  min-height: ${prop('minHeight')};
  padding: ${prop('padding')};
  padding-bottom: ${ifProp({ paddingBottom: true }, '20px', prop('paddingBottom'))};
  padding-left: ${ifProp({ paddingLeft: true }, '20px', prop('paddingLeft'))};
  padding-right: ${ifProp({ paddingRight: true }, '20px', prop('paddingRight'))};
  padding-top: ${ifProp({ paddingTop: true }, '20px', prop('paddingTop'))};
  pointer-events: ${prop('pointerEvents')};
  text-align: ${prop('textAlign')};
  text-decoration: ${ifProp('underline', 'underline #407eff', 'none')};
  width: ${prop('width')};
  line-height: ${ifProp('hasLineHeight', '0.98', 'initial')};
  z-index: 1;
  :hover {
    cursor: ${ifProp('isClickable', 'pointer', 'default')};
  }
`;

export default Label;
