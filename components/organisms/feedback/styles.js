import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import { Label } from 'components';
import shape3 from 'assets/images/shape3.svg';
import mosaic from 'assets/images/mosaic.svg';

const SpecialSectionContainer = styled.div`
  display: flex;
  background: url(${mosaic});
  justify-content: center;
  flex-direction: column;
  position: relative;
  margin: 100px 0 0;
  ${breakpoint('sm')`
    flex-direction: row;
  `}
`;

const Container = styled.div`
  display: flex;
  max-width: 768px;
  flex-direction: column;
  ${breakpoint('sm')`
    flex-direction: row;
  `}
  ${breakpoint('md')`
    max-width: 920px;
    width: 100%;
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
    margin-left: 0px;
  `}
`;

const FeedbackContainer = styled.div`
  padding: 0 15px;
  position: relative;
  overflow: hidden;
  ${breakpoint('sm')`
    padding: 0px 30px;
  `}
`;

const FeedbackSection = styled.div`
  display: flex;
  background-image: url(${shape3});
  background-position-x: right;
  background-position-y: 50px;
  background-repeat: no-repeat;
  background-size: 490px;
  flex-direction: column;
  position: absolute;
  top: 200px;
  left: 130px;
  width: 500px;
  height: 865px;
  ${breakpoint('sm')`
    background-position-x: right;
    top: 0px;
    left: 50%;
  `}
  ${breakpoint('md')`
    top: 0px;
    background-position-y: 0px;
  `}
`;

const FeedbackCard = styled.div`
  position: relative;
  border-radius: 10px;
  box-shadow: 0 3px 40px 0 rgba(0, 0, 0, 0.16);
  background-color: #ffffff;
  display: flex;
  max-width: 364px;
  margin: 50px auto;
`;

const FeedbackAvatar = styled.div`
  width: 70px;
  background: ${({ url }) => `url(${url});`};
  border-radius: 100%;
  height: 70px;
  position: absolute;
  background-size: cover;
  background-position: center;
  border: 4px solid #fff;
  right: 8px;
  top: -33px;
  box-shadow: 0 5px 16px 0 rgba(0, 0, 0, 0.16);
`;

const FeedbackColor = styled.div`
  display: flex;
  width: 2%;
  background-image: linear-gradient(4deg, #7edfb5, #4e87d0);
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;

const FeedbackContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 98%;
`;

export {
  SpecialSectionContainer,
  Container,
  SpecialTitleSection,
  FeedbackContainer,
  FeedbackSection,
  FeedbackCard,
  FeedbackColor,
  FeedbackAvatar,
  FeedbackContent
};
