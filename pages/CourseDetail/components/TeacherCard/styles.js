import styled from "styled-components";
import breakpoint from "styled-components-breakpoint";

const Container = styled.div`
  font-size: 12px;
  margin: 0 auto;
  width: 100%;
  padding: 0px 6%;

  ${breakpoint("sm")`
    font-size: 14px;
    padding: 20px 6% 0px 6%;
    margin: 0;
    max-width: 1090px;
  `}

  ${breakpoint("md")`
    border-radius: 5px;
    box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.23);
    background: white;
    max-width: 300px;
    padding: 30px 25px 0px 25px;
  `}

  ${breakpoint("lg")`
    max-width: unset;
    width: 360px;
  `}
`;

const CourseInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  ${breakpoint("sm")`
  display: initial;
  `}
`;

const CourseNameContainer = styled.div`
  margin-bottom: 20px;
  margin-top: 20px;
  width: 80%;
  ${breakpoint("md")`
    margin-top: 0px;
  `}
`;

const TeacherName = styled.span`
  display: ${({ isMobile }) => (isMobile ? "initial" : "none")};
  ${breakpoint("sm")`
    display: ${({ isMobile }) => (isMobile ? "none" : "initial")};
  `}
`;

const CourseTitle = styled.h1`
  margin: 0px;
  padding: 0px;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.25;
  font-weight: 900;
  text-transform: uppercase;
`;

export {
  Container,
  CourseInfoContainer,
  TeacherName,
  CourseNameContainer,
  CourseTitle
};
