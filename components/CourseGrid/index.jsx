import React from 'react';
import { CourseCard } from 'components'
import { Container, CourseWrapper } from './styles';

const Courses = ({
  courseList, history, lowestPrice, isAccountFreezed
}) => (
  <Container>
    {
      courseList.map(course => {
        return (
          <CourseWrapper>
            <CourseCard
              data={course}
              key={course.id}
              history={history}
              lowestPrice={lowestPrice}
              isAccountFreezed={isAccountFreezed}
            />
          </CourseWrapper>
        );
      })
    }
  </Container>
);

export default Courses;
