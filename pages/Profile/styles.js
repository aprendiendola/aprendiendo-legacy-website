import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

const Container = styled.div`
  display: flex;
  justify-content: center;
  ${breakpoint('md')`
    padding: 40px;
  `}
`;

const ContentSection = styled.div`
  padding: 20px 20px;
  ${breakpoint('md')`
    margin-left: 20px;
    width: 90%;
  `}
`;

const ContainerWrapper = styled.div`
  width: 1200px;
  ${breakpoint('md')`
    display: flex;
    justify-content: center;
  `}
`;

export {
    Container,
    ContentSection,
    ContainerWrapper
};
