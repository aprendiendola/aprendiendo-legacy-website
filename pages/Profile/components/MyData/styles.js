import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

const SectionTitle = styled.label`
  font-size: 16px;
  font-weight: 900;
  color: #0fa3f4;
`;

const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  ${breakpoint('md')`
    flex-direction: row;
    max-width: 500px;
  `}
`;

const FormLabel = styled.p`
  font-weight: 900;
  font-size: 14px;
  color: #6d6d6d;
  margin-bottom: 10px;
`;

export {
  SectionTitle,
  NameContainer,
  FormLabel,
};
