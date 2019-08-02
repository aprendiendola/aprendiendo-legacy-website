import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

const CourseGrid = styled.div`
  display: grid;
  grid-column-gap: 35px;
  grid-row-gap: 10px;
  margin-top: 30px;
  grid-template-columns: auto;
  padding: 0px 50px;

  ${breakpoint('sm')`
    grid-template-columns: auto auto;
    padding: 0px;
  `}

  ${breakpoint('md')`
    grid-template-columns: auto auto auto;
    padding: 0px;
  `}
`;

const UniversitySelect = styled.div`
  justify-content: center;
  align-items: center;
  padding: 0px 50px;

  ${breakpoint('sm')`
    display: flex;
  `}

  ${breakpoint('md')`
    display: flex;
  `}

  ${breakpoint('lg')`
    display: flex;
  `}
`;

export { CourseGrid, UniversitySelect };
