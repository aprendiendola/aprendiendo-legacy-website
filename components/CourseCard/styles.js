import styled from 'styled-components';

const PriceCourseCard = styled.div`
align-items: center;
display: flex;
justify-content: flex-end;
`;

const LabelCourseCard = styled.span`
display: flex;
align-items: center;
font-size: 14px;
font-weight: normal;
height: 22px;
`;

const ValueCourseCard = styled.span`
display: flex;
align-items: center;
color: $blue-light;
font-size: 14px;
padding-left: 5px;
height: 22px;
color: #54a1fb;
`;

export {
  PriceCourseCard,
  LabelCourseCard,
  ValueCourseCard
};
