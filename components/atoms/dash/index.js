import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import { prop, ifProp } from 'styled-tools';

const Dash = styled.div`
  width: 60px;
  background-color: ${({ color }) => color || '#00afef'};
  border: ${ifProp({ borderSize: true }, '3px', prop('borderSize'))} solid ${({ color }) => color || '#00afef'};
  ${breakpoint('md')`
    width: ${ifProp({ borderWidth: true }, '60px', prop('borderWidth'))}
  `}
`;

export default Dash;
