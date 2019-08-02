import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  ${breakpoint('sm')`
    display: flex;
    justify-content: space-evenly;
  `}
`;

const CourseWrapper = styled.div`
  padding: 15px;
  min-width: 280px;
  display: flex;
  justify-content: center;
  ${breakpoint('sm')`
    width: 300px;
    min-width: 300px;
  `}
`;

export {
  Container,
  CourseWrapper
};
