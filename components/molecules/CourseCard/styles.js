import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import { Button, Label } from 'components';
import premiumLogo from 'assets/images/premium_logo.svg';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 230px;
  width: 100%;
  ${breakpoint('md')`
    max-width: 296px;
  `}
`;

const StyledButton = styled(Button)`
  border: 1px solid #1178f2;
  min-width: auto;
  width: 100%;
  cursor: pointer;
  background-color: #fff;
  border-radius: 50px;
  label {
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
  }
  :hover {
    background-color: #1178f2;
    label {
      color: #fff;
    }
    b {
      color: #fff !important;
    }
  }
  transition: all .2s;
  height: 30px;
  ${breakpoint('md')`
    height: 40px;
    font-size: 16px;
  `}
`;

const CourseCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  margin-bottom: 20px;
`;

const TeacherImg = styled.div`
  background-image: url(${({ img }) => img});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  width: 100%;
  height: 200px;
  position: relative;
  :hover {
    div {
      display: flex;
    }
  }
  transition: all .2s;
  ${breakpoint('md')`
    height: 220px;
  `}
`;

const TeacherHover = styled.div`
  display: none;
  width: 100%;
  height: 100%;
  background-color: rgba(65, 64, 66, 0.95);
  justify-content: center;
  align-items: center;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
  transition: all .2s;
  label {
    font-size: 16px;
    font-weight: 900;
    color: #fff;
    cursor: pointer;
  }
`;

const TeacherHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 17px;
  width: 100%;
`;

const CourseTag = styled.div`
  display: flex;
  height: 21px;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  background-color: #fff;
  font-size: 14px;
  font-weight: 900;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
  color: ${({ color }) => color || '#88ce00'};
`;

const PremiumLogo = styled.div`
  background-image: url(${premiumLogo});
  background-size: contain;
  width: 21px;
  height: 21px;
  margin-right: 17px;
  margin-left: auto;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 17px;
  border-bottom: 1px solid #d8d8d8;
  border-left: 1px solid #d8d8d8;
  border-right: 1px solid #d8d8d8;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  max-height: 160px;
`;

const CourseTitle = styled(Label)`
  font-size: 17px;
  font-weight: 900;
  color: #414042;
  min-height: 46px;
  margin-bottom: 27px;
`;

const ContentFooter = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 30px;
`;

const TeacherName = styled(Label)`
  font-size: 14px;
  color: #414042;
`;

const StyledLabel = styled(Label)`
  font-size: 14px;
  font-weight: 900;
  color: #414042;
`;

const CurrencySymbol = styled(Label)`
  font-size: 20px;
  font-weight: 900;
  color: #0fa3f4;
`;

const Price = styled(Label)`
  font-size: 28px;
  font-weight: 900;
  color: #0fa3f4;
`;

export {
  Container,
  StyledButton,
  CourseCardContainer,
  TeacherImg,
  TeacherHover,
  TeacherHeader,
  CourseTag,
  PremiumLogo,
  ContentContainer,
  CourseTitle,
  ContentFooter,
  TeacherName,
  StyledLabel,
  CurrencySymbol,
  Price
};
