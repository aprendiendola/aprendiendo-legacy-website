import styled from "styled-components";
import breakpoint from "styled-components-breakpoint";
import quizIcon from "assets/images/quiz-icon-blue.svg";

const CartContainer = styled.span`
  text-align: right;
`;

const CartIcon = styled.img`
  width: 18px;
  cursor: pointer;
`;

const BuyLinkContainer = styled.div`
  ${breakpoint("sm")`
    width: 100px;
  `}
`;

const BuyLink = styled.span`
  color: #959697;
  font-weight: bold;
  :hover {
    ${({ disabled }) => (!disabled ? "color: #07a1fb;" : "")}
  }
`;

const QuizContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #f8f8f8;
  border: solid #e5e7e4 1px;
  margin-bottom: 8px;
  padding: 12px;
  height: 38px;
  cursor: pointer;
  font-weight: 600;
  font-size: 12px;
  color: #363636;
  ${breakpoint("md")`
    font-size: 14px;
  `}
`;

const QuizIcon = styled.div`
  width: 17px;
  height: 17px;
  background-image: url(${quizIcon});
  background-size: 13px;
  background-repeat: no-repeat;
  background-position: center;
  margin-right: 10px;
  margin-bottom: 2px;
`;

const QuizTag = styled.label`
  font-size: 10px;
  color: #07a1fb;
  margin-left: auto;
  cursor: pointer;
  ${breakpoint("md")`
    font-size: 14px;
    margin-right: 112px;
  `}
`;

const PinIcon = styled.img`
  margin-left: 5px;
  width: 19px;
  position: relative;
  top: 3px;
`;

const EmptyContainer = styled.div`
  margin: 20px 0;
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 20px;
  color: "#41402";
`;

const List = styled.ul`
    margin-left: 18px;
    margin-top: 17px;
    font-size: 16px;
    color: #626262;
    list-style: none;
    }  
    `;

const Li = styled.li`
  &::before {
    content: "◉";
    color: #0fa3f4;
    font-weight: 700;
    display: inline-block;
    width: 1em;
    margin-right: 9px;
    font-size: 8px;
    margin-left: -2em;
    position: relative;
    bottom: 3px;
  }
`;

export {
  CartContainer,
  CartIcon,
  BuyLinkContainer,
  BuyLink,
  QuizContainer,
  QuizIcon,
  QuizTag,
  PinIcon,
  EmptyContainer,
  Title,
  List,
  Li
};
