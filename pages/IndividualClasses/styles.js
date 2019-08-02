import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

const IndividualLessonsContainer = styled.div`
  width: 90%;
  margin: 19px auto;
  ${breakpoint('md')`
    width: 672px;
  `}
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  line-height: 1.25;
  text-transform: uppercase;
`;

const Subtitle = styled.p`
  color: #414042;
  margin-bottom: 20px;
  font-size: 15px;
`;

export { IndividualLessonsContainer, Title, Subtitle };
