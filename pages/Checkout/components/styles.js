import styled from "styled-components";
import breakpoint from "styled-components-breakpoint";

const LoaderContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const CheckoutContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const LoaderContent = styled.div`
  text-align: center;
  width: 100%;
`;

const IconsContainer = styled.div`
  margin-left: 15px;
  display: inline-block;
  position: relative;
  bottom: 1px;
`;

const BankIcons = styled.img`
  height: 9px !important;
`;

const TextContainer = styled.div`
  width: 427px;
  p {
    color: #626262;
    font-size: 14px;
    margin-bottom: 10px;
  }
`;

const FormItem = styled.div`
  padding: 10px 0px;
`;

const InputWrapper = styled.div`
  margin-top: 6px;
  padding: 10px 15px;
  border: ${({ success }) =>
    success ? "1px solid #91d8b6" : "1px solid #e5e7e4"};
  width: ${({ width }) => width || "auto"}px;
`;

const ButtonContainer = styled.div`
  padding: 10px 0px;
  display: flex;
  justify-content: space-between;
`;

const SSLImage = styled.div`
  visibility: hidden;
  width: 0;
  ${breakpoint("sm")`
    visibility: visible;
    display: flex;
    justify-content: flex-end;
    padding-right: 15px;
    padding-top: 2px;
    width: 100%;
  `}
`;

const Label = styled.label``;

const ButtonWrapper = styled.div`
  width: 100%;
  ${breakpoint("sm")`
    width: 250px;
  `}
`;

export {
  LoaderContainer,
  CheckoutContainer,
  LoaderContent,
  IconsContainer,
  BankIcons,
  TextContainer,
  FormItem,
  InputWrapper,
  ButtonContainer,
  Label,
  SSLImage,
  ButtonWrapper
};
