import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import Label from '../label';

const Paragraph = styled(props => <Label {...props} />)`
  max-width: 340px;
  font-size: ${({ fontSizeMobile }) => fontSizeMobile || 'initial'};
  text-align: ${({ centerOnMobile }) => (centerOnMobile ? 'center' : 'left')};
  ${({ centerOnMobile }) => (centerOnMobile ? 'justify-content: center;' : '')}
  
  ${breakpoint('sm')`
    font-size: 20px
    max-width: 450px;
    `}
  ${breakpoint('md')`
    font-size: 20px
    max-width: 540px;
    text-align: ${({ centerOnMobile, center }) => centerOnMobile && center || 'left'};
    ${({ centerOnMobile }) => (centerOnMobile ? 'justify-content: flex-start;' : '')}
    `}
`;

export default Paragraph;
