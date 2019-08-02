import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import becomeTeacher from 'assets/images/referral_success.svg';
import ellipse from 'assets/images/ellipse.svg';
import ellipseDesktop from 'assets/images/ellipse-desktop.svg';

const BecomeTeacherContainer = styled.div`
  padding: 15px;
  position: relative;
  display: flex;
  flex-direction: column;
  ${breakpoint('sm')`
    flex-direction: row;
  `}
  ${breakpoint('md')`
    align-items: center;
    justify-content: center;
    margin: 80px 0px;
  `}
`;

const BecomeTeacherImg = styled.div`
  background-image: url(${becomeTeacher});
  background-position: center;
  background-size: 270px auto;
  background-repeat: no-repeat;
  width: 270px;
  height: 250px;
  margin: auto;
  z-index: 1;
  ${breakpoint('md')`
    background-size: 480px auto;
    width: 525px;
    height: 370px;
    margin: 0;
    margin-right: 80px;
  `}
`;

const SpecialTitleSection = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  max-width: 470px;
  margin: auto;
  padding: 15px;
  button {
    margin: auto;
  }
  ${breakpoint('sm')`
    max-width: 380px;
    margin: 45px auto auto 35px;
    padding: 0 30px 0 0;
    button {
      margin: 0 0 0 auto;
    }
  `}
  ${breakpoint('md')`
    margin: 0;
  `}
`;

const Ellipse = styled.div`
  background-image: url(${ellipse});
  background-position: center;
  background-size: 1295px;
  background-repeat: no-repeat;
  position: absolute;
  top: -160px;
  right: 0;
  width: 100%;
  height: 710px;
  ${breakpoint('sm')`
    background-size: 1024px;
    top: -250px;
  `}
  ${breakpoint('md')`
    background-image: url(${ellipseDesktop});
    background-size: auto 100%;
  `}
`;

export {
  BecomeTeacherContainer,
  BecomeTeacherImg,
  SpecialTitleSection,
  Ellipse
};
