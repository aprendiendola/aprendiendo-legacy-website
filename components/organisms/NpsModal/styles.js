import styled from 'styled-components';

const ModalContainer = styled.div`
  color: #434244;
`;

const ModalTitle = styled.h1`
  font-size: 28px;
  text-align: center;
`;

const Question = styled.p`
  font-weight: 600;
  font-size: 15px;
  margin: 0px 0px 8px 0px;
`;

const ButtonsWrapper = styled.div`
  margin-top: 15px;
  text-align: right;
`;

const ButtonGroup = styled.div`
  display: inline-grid;
  grid-gap: 10px;
  grid-template-columns: auto auto;
`;

const Content = styled.div`
  margin-top: 20px;
`;

const QuestionWrapper = styled.div`
  padding: 5px 0px;
`;

const ContentWrapper = styled.div`
  padding: 0px 35px 22px 35px;
  max-height: 650px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
  }
  ::-webkit-scrollbar-thumb {
    background: #07a3f4;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  height: 80px;
`;

const ModalImage = styled.img`
  position: absolute;
  transform: translateX(-50%);
  left: 50%;
  top: -77px;
`;

export {
  ModalContainer,
  ModalTitle,
  Question,
  ButtonsWrapper,
  ButtonGroup,
  Content,
  QuestionWrapper,
  ContentWrapper,
  ImageWrapper,
  ModalImage
};
