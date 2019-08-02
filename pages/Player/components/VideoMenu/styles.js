import styled from 'styled-components';
import quizIcon from 'assets/images/quiz-icon.svg';

const QuizContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ isActive }) => (isActive ? '#1178f2' : '#333')};
  padding: 12px;
  height: 44px;
  span {
    font-size: 12px;
    font-weight: 600;
    color: ${({ isActive }) => (isActive ? '#fff' : '#0fa3f4')};
  }
  img {
    color: ${({ isActive }) => (isActive ? '#fff' : '#0fa3f4')};
  }
`;

const Icon = styled.div`
  width: 17px;
  height: 20px;
  background-image: url(${quizIcon});
  background-size: 15px;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
`;

export {
  QuizContainer,
  Icon
};
