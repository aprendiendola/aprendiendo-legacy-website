import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

const Section = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 50px 15px 0;
  button {
    display: none;
  }
  ${breakpoint('sm')`
    button {
      display: block;
      margin-top: 15px;
    }
  `}
  ${breakpoint('md')`
    padding: ${({ withNoPadding, paddingTop }) => (withNoPadding ? '0px 15px 0' : `${paddingTop || '150px'} 15px 0`)};
  `}
`;


const ContactContainer = styled.div`
  margin: auto;
  max-width: 380px;
  ${breakpoint('sm')`
    max-width: 750px;
  `}
`;

export {
  Section,
  ContactContainer
};
